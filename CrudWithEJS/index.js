const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/user");

const PORT = 3000;
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/read", async (req, res) => {
  const users = await User.find();
  res.render("read", { users });
});

//find users
app.get("/edit/:id", async (req, res) => {
  const users = await User.findOne({ _id: req.params.id });
  res.render("edit", { users });
});

//update user
app.post("/update/:id", async (req, res) => {
  const { name, email, image } = req.body;
  try {
    const updateUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      { name, email, image },
      { new: true }
    );
    if(!updateUser){
        res.status(404).json({message: '404 not found'})
    }
    res.redirect('/read')
  } catch (error) {
    res.status(500).json({message: 'error in updating users'})
  }
});

app.post("/create", async (req, res) => {
    try {
        const { name, email, image } = req.body;
        const createUser = await User.create({
            name,
            email,
            image,
          });
          res.redirect("/read");
    } catch (error) {
        res.status(500).json({message: 'error in creating userss'})
    }
});

//Delete user
app.get("/delete/:id", async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.redirect("/read");
  } catch (err) {
    console.log("Error in deleting user:", err.message);
    res.status(500).json({ message: "Error in deleting user" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost${PORT}`);
});
