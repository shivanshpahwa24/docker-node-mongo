const express = require("express");
const connectDB = require("./config/db");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
connectDB();

const Item = require("./models/Item");

app.get("/", (req, res) => {
  Item.find()
    .then((items) => res.render("index", { items }))
    .catch((err) => res.status(404).json({ msg: "No items found" }));
});

app.post("/item/add", (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });

  newItem.save().then((item) => res.redirect("/"));
});

const port = 3000;

app.listen(port, () => console.log("Server running..."));
