const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
// const validator = require("validator");

const url = process.env.MONGODB_URL;
mongoose.connect(url);

// const User = mongoose.model("User", {
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   age: {
//     type: Number,
//     validate(value) {
//       if (value < 0) 
//         throw new Error("Age must be positive");
//     },
//     default: 0,
//   },
//   email: {
//     type: String,
//     required: true,
//     validate(value) {
//       if (!validator.isEmail(value)) 
//         throw new Error("Email is invalid");
//     },
//     lowercase: true,
//   },
//   mobile: {
//     type: String,
//     validate(value) {
//       if (!validator.isMobilePhone(value, "any", { strictMode: false }) || value.length !== 10) {
//         throw new Error("Mobile Number is invalid");
//       }
//     },
//     required: true,
// },
// password:{
//     type: String,
//     required: true,
//     trim: true,
//     validate(value){
//         if (!validator.isLength(value, { min: 7 })) {
//             throw new Error('Password must be at least 7 characters long.');
//         }
//         if (value.toLowerCase().includes('password')) {
//             throw new Error('Password cannot contain the string "password".');
//         }
//     }
//   }
// });

// const me = new User({
//   name: "Vansh",
//   //   age: -5,
//   //   email: 'ankit@'
//   email: "VB23@abc.co.in",
//   mobile: "9466482404",
//   password: 'frvdefef'
// });
// me.save()
//   .then(() => {
//     console.log(me);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// const Task = mongoose.model("Task", {
//   description: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   isCompleted: {
//     type: Boolean,
//     default: false
//   },
// });

// const work1 = new Task({
//   description: "Description is again added",
  // isCompleted: false,
// });
// work1
//   .save()
//   .then(() => console.log("Work 1 entry inserted"))
//   .catch((err) => console.log(err));

// REST API: Representational State Transfer - Application Programming Interface