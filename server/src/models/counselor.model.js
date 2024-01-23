import mongoose from "mongoose";

const CounselorSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    passwordSalt: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        min: 8,
        max: 50,
    },
    telephone: {
        type: String,
        required: true,
    },
    picturePath: {
        type: String,
        default: "",
    },
    isAdmin: {
        type: Boolean,
        required: true,
    },
}, { timestamps: true })

const Counselor = mongoose.model("Counselor", CounselorSchema)
export default Counselor