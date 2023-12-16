const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
// const UserModel = require("./models/UserModel");
const userRoutes = require("./routes/userRoutes");

const connectDB = async () => {
  try {
    console.log("connecting");
    const conn = await mongoose.connect(`mongodb://0.0.0.0:27017/jourvel`, {
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// const conn = mongoose.connect("mongodb://0.0.0.0:27017/jourvel-db").then((conn) => console.log(conn));

app.get("/hello", (req, res) => {
  res.send("Hello World");
});

// app.post("/api/register", async (req, res) => {
//   console.log(req.body);
//   try {
//     const user = await UserModel.create({
//       username: req.body.username,
//       email: req.body.email,
//       password: req.body.password,
//     });
//     console.log(user);
//     res.json({ status: "ok" });
//   } catch (err) {
//     res.json({ status: "error" });
//   }
// });

app.use("/api/users", userRoutes);

app.listen(3001, () => {
  console.log("Server running at 3001.");
});
