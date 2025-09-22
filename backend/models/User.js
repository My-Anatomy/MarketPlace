import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  country: String,
  zip: String,
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "seller", "admin"], default: "user" },
    phone: { type: String },
    address: addressSchema,
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    profilePic: String,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
