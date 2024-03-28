const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

const url = process.env.MONGODB_URL;
mongoose.connect(url).then(() => {
  console.log("Connected to MongoDB");
}
).catch((err) => {
  console.log(err);
});
