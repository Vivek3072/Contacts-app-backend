const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

// @description = Register the user
// @route = POST /api/users/register
// @access = public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(404);
    throw new Error("All fields are mandatory!");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }

  //Hash Password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  if (newUser) res.status(201).json({ _id: newUser.id, email: newUser.email });
  else throw new Error("User data invalid!");
});

// @description = Login the user
// @route = POST /api/users/login
// @access = public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  const user = await User.findOne({ email });

  // compare password with hashed pasword
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign({
        user:{
            username:user.username,
            email:user.email,
            id:user.id
        },
    },process.env.ACCESS_TOKEN_SECRET , {expiresIn :"15m"});
    res.status(200).json({ accessToken });
  }
  else{
    res.status(401);
    throw new Error("Email or password is not valid!")
  }

//   res.json({ message: "Login the user!" });
});


// @description = Current user info
// @route = POST /api/users/current
// @access = private i.e, only authenticated users will have access to this route
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
