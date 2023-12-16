import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: true,
    }
})

export const UserModel = mongoose.model("User", UserSchema);