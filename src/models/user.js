const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Task = require('./task')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    validate(value) {
      if (value < 0) throw new Error("Age must be positive");
    },
    default: 0,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error("Email is invalid");
    },
    lowercase: true,
  },
  mobile: {
    type: String,
    validate(value) {
      if (
        !validator.isMobilePhone(value, "any", { strictMode: false }) ||
        value.length !== 10
      ) {
        throw new Error("Mobile Number is invalid");
      }
    },
    // required: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isLength(value, { min: 7 })) {
        throw new Error("Password must be at least 7 characters long.");
      }
      if (value.toLowerCase().includes("password")) {
        throw new Error('Password cannot contain the string "password".');
      }
    },
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }],
  avatar: {
    type:Buffer
  }
},{
  timestamps: true
});

userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner'
})

// Hiding password and tokens from user profile
userSchema.methods.toJSON = function(){
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
} 

// Generating auth token for login
userSchema.methods.generateAuthToken = async function(){
  const user = this;
  const token = jwt.sign({_id: user._id.toString()}, 'thisismynewcourse');  
  user.tokens = user.tokens.concat({token});
  await user.save();
  return token;
}

// Comparing email and password for login
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("Kindly check your credentials and try again.");
    error.status = 401; // Custom status code
    throw error;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error("Kindly check your credentials and try again.");
    error.status = 401; // Custom status code
    throw error;
  }
  return user;
}

// Hashing the password before saving
userSchema.pre("save", async function(next){
  const user = this;
  if(user.isModified('password')){
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
})

// Delete user tasks when user profile is removed
userSchema.pre("deleteOne", async function(next){
  const user = this;
  await Task.deleteMany({owner: user._conditions._id});
  next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;
