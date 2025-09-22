// import asyncHandler from "express-async-handler";
// import bcrypt from "bcryptjs";
// import User from "../models/User.js";
// import generateToken from "../utils/generateToken.js";

// // Register
// const registerUser = asyncHandler(async (req, res) => {
//   const { name, email, password, role } = req.body;
//   const userExists = await User.findOne({ email });
//   if (userExists) {
//     res.status(400);
//     throw new Error("User already exists");
//   }
//   const salt = await bcrypt.genSalt(10);
//   const hashed = await bcrypt.hash(password, salt);
//   const user = await User.create({ name, email, password: hashed, role });
//   if (user) {
//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(400);
//     throw new Error("Invalid user data");
//   }
// });

// // Login
// const authUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (user && (await bcrypt.compare(password, user.password))) {
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(401);
//     throw new Error("Invalid email or password");
//   }
// });

// export { registerUser, authUser };
// controllers/authController.js
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  console.log("Request Body:", req.body); // Debug incoming data
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
