import mongoose from "mongoose";

const MessageSchema = mongoose.Schema({
    sender: {
        type: Object,
        required: true
    },
    receiver: {
        type: Object,
        required: true
    },
    dateSent: {
        type: Date,
        required: true,
    },
    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'appointments',
        required: true
    },
    seen: {
        type: Boolean,
        required: true,
    },
    messageContent: {
        type: String,
        required: true,
    },
}, { timestamps: true })

const Message = mongoose.model("Message", MessageSchema)
export default Message