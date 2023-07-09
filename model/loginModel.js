import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name Is Require"],
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: [true, " Email is Require"],
        unique: true,
        validate: validator.isEmail,
    },
    password: {
        type: String,
        required: [true, "password is require"],
        minlength: [6, "Password length should be greater than 6 character"],
        select: true,
    },
    location: {
         type: String,
        default: "India",
    },
    },
    { timestamps: true }
);
export default mongoose.model('Users', userSchema)