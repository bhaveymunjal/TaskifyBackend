const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const auth = require("../middleware/auth");
const multer = require('multer')


// Create a new user
router.post("/users", async (req, res) => {
  //   res.send("Testing Web Server for users");
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    if(error.code === 11000) return res.status(400).send({error: 'Email already exists'})
    res.status(400).send({error: error.message});
  }
});

// Get user Profile
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);

  // try {
  //   const users = await User.find({});
  //   res.send(users);
  // }
  // catch (err) {
  //   res.status(500).send(err);
  // }
});

// Login a user
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(error.status || 500).send({ error: error.message });
  }
});

// Logout a user
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send({message:"Logged Out"});
  } catch (error) {
    res.status(500).send(error);
  }
});

// Logout all users
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send("Logged Out of All Devices");
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a user
router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "age", "email", "mobile", "password"];
  const isValid = updates.every((update) => allowedUpdates.includes(update));

  if (!isValid) return res.status(400).send({ error: "Invalid Updates" });
  try {
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
    // const user = await User.findById(req.user._id);
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();

    res.send(req.user);
  } catch (error) {
    res.status(400).send({error});
  }
});

// Delete a user
router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.deleteOne()
    res.send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Upload profile picture

const upload = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb){
    if(!file.originalname.match(/\.(jpg|jpeg|png|heic)$/)){
      return cb(new Error('Please upload an image'))
    }
    cb(undefined, true)

  }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res)=>{
  req.user.avatar = req.file.buffer
  await req.user.save()
  res.send();
}, (error, req, res, next)=>{
  res.status(400).send({error:error.message})
})


// Delete User Avatar
router.delete('/users/me/avatar', auth, async(req,res)=>{
  req.user.avatar = undefined
  await req.user.save()
  res.send()
})

// Get user avatar
router.get('/users/:id/avatar', async(req,res)=>{
  try {
    const user = await User.findById(req.params.id)

    if(!user || !user.avatar){
      throw new Error()
    }

    res.set('Content-Type','image/jpg')
    res.send(user.avatar)

  } catch (error) {
    res.status(404).send();
  }
})

module.exports = router;
