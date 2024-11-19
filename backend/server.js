require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workout");
const userRoutes = require("./routes/user");
const cors = require("cors");

MONGO_URI='mongodb+srv://pakhileshbsc23:akhilesh123@cluster0.qi1jjoo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
PORT=3000
//express app
const app = express();

//middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);
// app.get('/',(req,res)=>{
//     res.json({mssg:"welcome to the app"})
// })

//connect to db
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to DB");
    //listens for request
    app.listen(PORT, () => {
      console.log("listening on port", PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
