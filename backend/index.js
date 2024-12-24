const express = require("express");
const mongoose = require('mongoose')
const bodyParser = require("body-parser");
const dotenv = require("dotenv")
const userRoute = require("./routes/user.route")
const cors = require("cors")
const app = express();
dotenv.config();


const PORT = process.env.PORT || 3000;

app.use(cors())


app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(express.json())
app.use("/api/user",userRoute);
// app.use("/api/job",jobRoute);


app.listen(PORT, () => {
  console.log(`Server is Listening on PORT : ${PORT}`);
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Mongo db Connected");
    })
    .catch((error) => {
      console.log(error);
    });
});
