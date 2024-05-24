require('dotenv').config();
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const cors = require("cors")



// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
require("./db");

const { isAuthenticated } = require("../middleware/jwt.middleware");
// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(cors())
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

const allRoutes = require("../routes");
app.use("/api", allRoutes);

const cohortRoutes = require("../routes/cohort.route");
app.use("/api", isAuthenticated, cohortRoutes);

const studentsRoutes = require("../routes/students.routes");
app.use("/api", studentsRoutes);

const authRoutes = require("../routes/auth.routes");
app.use("/auth", authRoutes);

// START SERVER 
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
