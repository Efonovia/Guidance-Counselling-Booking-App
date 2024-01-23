import mongoose from "mongoose";

const StudentSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    schoolId: {
        type: String,
        required: true,
        unique: true
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
}, { timestamps: true })

const Student = mongoose.model("Student", StudentSchema)
export default Student