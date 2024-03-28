const express = require("express");
require("./db/mongoose.js");
const dotenv = require('dotenv');
const userRouter = require('./routers/user.js')
const taskRouter = require('./routers/task.js')
var cors = require('cors')
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
// const corsOptions = {
//   origin:"https://taskify-bhavey.netlify.app/",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",};
// app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://taskify-bhavey.netlify.app/"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});
app.use(express.json());
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
  console.log("Server is running on " + port);
});

// app.use((req, res, next)=>{
//   if(req.method === 'GET'){
//     res.send('GET requests are disabled')
//   }
//   else{
//     next()
//   }
// })


// Without middleware: new request -> run route handler
// With middleware: new request -> do something -> run route handler 

// app.use((req, res, next)=>{
//   // res.status(503).send('Site is under maintenance. Please try again later')
//   // console.log(req.method, req.path)
//   // next()
//   if(req.method === 'GET'){
//     res.send('GET requests are disabled')
//   }
//   else{
//     next()
//   }
// })


// const Task = require('./models/task.js')
// const User = require('./models/user.js')

// const main = async ()=>{
  // const task = await Task.findById('66008aa9445f66eca0574b8f')
  // await task.populate('owner').then((task)=>{

  // })
  // console.log(task.owner)

  // const user = await User.findById('660041d3a45fcc061d12a14f')
  // await user.populate('tasks').then((user)=>{
  //   // console.log(user)
  // })
  // console.log(user.tasks)
// } 
// main()



// const myFunction = async ()=>{

//   const bcrypt = require('bcryptjs');
//   const password = 'Bhavey@6626'
//   const hashedPassword = await bcrypt.hash(password, 8);
//   console.log(password)
//   console.log(hashedPassword)
//   // const isMatch = await bcrypt.compare('Bhavey@6626', hashedPassword)
//   const isMatch = await bcrypt.compare('bhavey@6626', hashedPassword)
//   console.log(isMatch)
// }
// myFunction();

// const jwt = require('jsonwebtoken');
// const myFunction = async ()=>{
//   const token = jwt.sign({_id: 'abc123'}, 'thisismynewcourse', {expiresIn: '7 days'})
//   // console.log(token)
//   const data = jwt.verify(token, 'thisismynewcourse')
//   // console.log(data)
// }
// myFunction();

// const pet = {
//   name: 'Hal'
// }

// pet.toJSON = function(){
//   return {}
// }

// console.log(JSON.stringify(pet))



// app.post("/users", (req, res) => {
//   //   res.send("Testing Web Server for users");
//   const user = new User(req.body);
//   user
//     .save()
//     .then(() => {
//       res.status(201).send(user);
//     })
//     .catch((err) => {
//       res.status(400).send(err);
//     });
// });

// app.get("/users", (req, res) => {
//   User.find({})
//     .then((users) => res.send(users))
//     .catch((err) => res.status(500).send(err));
// });

// app.get("/users/:id", (req, res) => {
//   User.findOne({
//     _id: new ObjectId(req.params.id),
//   })
//     .then((user) => {
//       if (!user) res.status(404).send("User Not Found");
//       res.send(user);
//     })
//     .catch((err) => res.status(500).send(err));
// });


// app.post("/tasks", (req, res) => {
//   //   res.send("Testing Web Server for tasks");
//   const task = new Task(req.body);
//   task
//     .save()
//     .then(() => {
//       res.status(201).send(task);
//     })
//     .catch((err) => {
//       res.status(400).send(err);
//     });
// });

// app.get("/tasks", (req, res) => {
//   Task.find({})
//     .then((tasks) => res.send(tasks))
//     .catch((err) => res.status(500).send(err));
// });

// app.get("/tasks/:id", (req, res) => {
//   Task.findOne({
//     _id: new ObjectId(req.params.id),
//   })
//     .then((task) => {
//       if (!task) res.status(404).send("User Not Found");
//       res.send(task);
//     })
//     .catch((err) => res.status(500).send(err));
// });
