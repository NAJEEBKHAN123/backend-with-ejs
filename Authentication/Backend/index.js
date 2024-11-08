require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./Routes/Users");
const authRoutes = require("./Routes/Auth");

// database connection
connection();
const PORT = process.env.PORT || 3000
// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);


app.listen(PORT, () =>{
    console.log(`Server is listening on http://localhost:${PORT} `);
})
