const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");
const cors = require("cors");
// Create a new Sequelize instance with your PostgreSQL connection details

// Docker Mode
const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

// Local mode
// const sequelize = new Sequelize({
//   dialect: "postgres",
//   host: "localhost",
//   database: "postgres",
//   username: "postgres",
//   password: "admin",
//   port: 5432,
// });

// Define the Employee model
const Employee = sequelize.define("Employee", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  cell_phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  home_phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// Configure the body-parser middleware
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define the routes for CRUD operations
app.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.send(employees);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.get("/employees/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const employee = await Employee.findByPk(id);
    if (employee) {
      res.send(employee);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.post("/employees", async (req, res) => {
  const { first_name, last_name, address, id_number, email, cell_phone, home_phone } = req.body;
  try {
    const employee = await Employee.create({
      first_name,
      last_name,
      address,
      id_number,
      email,
      cell_phone,
      home_phone,
    });
    res.send(employee);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.put("/employees/:id", async (req, res) => {
  const id = req.params.id;
  const { first_name, last_name, address, id_number, email, cell_phone, home_phone } = req.body;
  try {
    const employee = await Employee.findByPk(id);
    if (employee) {
      employee.first_name = first_name;
      employee.last_name = last_name;
      employee.address = address;
      employee.id_number = id_number;
      employee.email = email;
      employee.cell_phone = cell_phone;
      employee.home_phone = home_phone;
      await employee.save();
      res.send(employee);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.delete("/employees/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const employee = await Employee.findByPk(id);
    if (employee) {
      await employee.destroy();
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// Start the server
const port = process.env.PORT || 5000;
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
