import mongoose from "mongoose";

let userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: { type: String, default: "student", enum: ["student", "admin", "teacher"] },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})

let UserModal = mongoose.model("user", userSchema);

export default UserModal;