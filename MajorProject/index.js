const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./Models/listing");
const path = require("path");
const listing = require("./Models/listing");
const methodOverride = require("method-override");

mongoose
  .connect("mongodb://localhost:27017/majorlist")
  .then(() => {
    console.log("connect to mongoDB");
  })
  .catch((err) => {
    console.log("error in connection of mongodb", err);
  });

const PORT = 3000;
const app = express();
app.use(express.json());
app.set("view engine", "ejs"); // Set EJS as the view engine
app.set("views", "./views");
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.send("working");
});
// app.get('/test', async(req, res) =>{
//     const list = new listing({
//         title: 'wonderful place',
//         description: 'this place was',
//         price: 3333,
//         location: 'peshawar, board',
//         country: 'pakistan'
//     })
//     await list.save();
//     res.send('working........')
// })

//index route
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find();
  res.render("listings/index", { allListings });
});

//new route
app.get("/listings/new", (req, res) => {
  res.render("listings/new");
});
//create route
app.post("/listings", async (req, res) => {
  const { title, image, description, price, location, country } = req.body;
  try {
    const newListings = new Listing({
      title,
      description,
      price,
      image,
      location,
      country,
    });
    await newListings.save();
    res.redirect("listings");
  } catch (error) {
    console.log("error in create listings");
  }
});
//update route
app.get("/listings/:id/edit", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit", { listing });
});

app.put("/listings/:id", async (req, res) => {
  const { id } = req.params;
  const { title, image, description, price, location, country } = req.body;
  try {
    const updateListings = await Listing.findByIdAndUpdate(
      id,
      {
        title,
        description,
        price,
        image,
        location,
        country,
      },
      { new: true }
    );
    res.redirect(`/listings/${updateListings._id}`);
  } catch (error) {
    console.log("error in updating");
  }
});
//delete route
app.delete('/listings/:id', async(req, res) =>{
    const {id} = req.params;
   const deletedListing = await Listing.findByIdAndDelete(id)
   res.redirect('/listings')
   console.log(deletedListing)
})
//REad route
app.get("/listings/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const foundListing = await Listing.findById(id);
    if (!foundListing) {
      return res.status(404).send("Listing not found");
    }
    res.render("listings/read", { listing: foundListing });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching listing");
  }
});

app.listen(PORT, () => {
  console.log(`server in listening on http://localhost:${PORT}`);
});
