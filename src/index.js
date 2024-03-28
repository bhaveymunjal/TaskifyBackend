const express = require("express");
require("./db/mongoose.js");
const dotenv = require('dotenv');
const userRouter = require('./routers/user.js')
const taskRouter = require('./routers/task.js')
var cors = require('cors')
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
app.use(cors())
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
  console.log("Server is running on " + port);
});
