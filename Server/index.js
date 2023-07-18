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
      "mongodb+srv://House-Hunter:SBl31RgWPcHKSMca@cluster0.vucpekr.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("db connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, async () => {
  console.log(`App listening on port ${port}`);
  await connectDb();
});
