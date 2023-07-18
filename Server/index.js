const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
const connectDb = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vucpekr.mongodb.net/?retryWrites=true&w=majority`
    );
    console.log("db connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

// schema
const houseSchema = new mongoose.Schema({
  name: String,
  address: String,
  city: String,
  bedrooms: Number,
  bathrooms: Number,
  size: String,
  picture: String,
  available: String,
  rent: Number,
  phone: Number,
  description: String,
});

// modal
const House = mongoose.model("Houses", houseSchema);

app.post("/addhouse", async (req, res) => {
  try {
    const newHouse = new House({
      name: req.body.name,
      address: req.body.address,
      city: req.body.city,
      bedrooms: req.body.bedrooms,
      bathrooms: req.body.bathrooms,
      size: req.body.size,
      picture: req.body.picture,
      available: req.body.available,
      rent: req.body.rent,
      phone: req.body.phone,
      description: req.body.description,
    });
    const houseData = await newHouse.save();
    res.status(201).send(houseData);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.get("/houses", async (req, res) => {
  try {
    const houses = await House.find();
    if (houses) {
      res.status(200).send({
        success: true,
        message: "Returned houses",
        data: houses,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Houses not found",
      });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.delete("/houses/:id", async (req, res) => {
  try {
    const house = await House.findOne({ _id: req.params.id });
    if (house) {
      await House.deleteOne({ _id: req.params.id });
      res.status(200).send({
        message: "House data is deleted",
      });
    } else {
      res.status(404).send({ message: "House is not found with this id" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, async () => {
  console.log(`App listening on port ${port}`);
  await connectDb();
});
