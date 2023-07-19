const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const saltRounds = 10;
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
const opts = {};
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

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});

// modal
const House = mongoose.model("Houses", houseSchema);
const User = mongoose.model("user", userSchema);

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.ACCESS_TOKEN_SECRET;
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ id: jwt_payload.id }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });
  })
);

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
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * 10;
    const houses = await House.find().limit(10).skip(skip);
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
    const house = await House.findByIdAndDelete({ _id: req.params.id });
    if (house) {
      res.status(200).send({
        success: true,
        message: "House deleted",
        data: house,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "House is not found with this id",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

app.put("/houses/:id", async (req, res) => {
  try {
    const house = req.body;
    const updatedHouse = await House.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: house,
      },
      { new: true }
    );
    if (updatedHouse) {
      res.status(200).send({
        success: true,
        message: "House updated",
        data: updatedHouse,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "House is not found with this id",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

// register route
app.post("/register", async (req, res) => {
  try {
    const newRegister = req.body;
    const user = await User.findOne({ name: req.body.name });
    if (user) return res.status(400).send("User already exists");
    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      const newUser = new User({
        name: req.body.name,
        role: req.body.role,
        phone: req.body.phone,
        email: req.body.email,
        password: hash,
      });

      await newUser
        .save()
        .then((user) => {
          res.send({
            success: true,
            message: "User is created successfully",
            user: {
              id: user._id,
              name: user.name,
            },
          });
        })
        .catch((error) => {
          res.send({
            success: false,
            message: "User is not created",
            error: error,
          });
        });
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// login route
app.post("/login", async (req, res) => {
  const user = await User.findOne({ name: req.body.name });
  if (!user) {
    return res.status(401).send({
      success: false,
      message: "User is not found",
    });
  }

  if (!bcrypt.compareSync(req.body.password, user.password)) {
    return res.status(401).send({
      success: false,
      message: "Incorrect password",
    });
  }
  const payload = {
    id: user._id,
    name: user.name,
  };
  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "2d",
  });

  return res.status(200).send({
    success: true,
    message: "User is logged in seccessfully",
    token: "Bearer " + token,
  });
});

// profile route
app.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    return res.status(200).send({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
      },
    });
  }
);

// home route
app.get("/", (req, res) => {
  res.send("<h1> Welcome to the Server</h1>");
});

// resource not found
app.use((req, res, next) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// server error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, async () => {
  console.log(`App listening on port ${port}`);
  await connectDb();
});
