
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health endpoint
app.get("/", (req, res) => {
  res.send("Server is UP and running");
});

// Check-user endpoint
app.get("/check-user", (req, res) => {
  res.send("checking the user");
});

// Add user to database
app.post("/adduser", async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username,email,password)

  try {
    const userDb = await pool.query(
      "INSERT INTO users(username,email,password) VALUES($1,$2,$3) RETURNING *",
      [username, email, password]
    );

    return res.status(201).send({
      status: 201,
      message: "User added successfully",
      data: userDb.rows[0]
    });
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: "Internal server error",
      error
    });
  }
});

// Get user from database
app.get("/get-user", async (req, res) => {
  try {
    const userDetails = await pool.query("SELECT * FROM users");

    return res.status(200).send({
      status: 200,
      message: "User details fetched successfully",
      data: userDetails.rows[0]
    });
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: "Internal server error"
    });
  }
});

module.exports = app;
