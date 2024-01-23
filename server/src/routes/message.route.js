import express from "express"
import { 
    deleteMessage,
    getAllMessages, 
    getMessage, 
    getMessagesByAppointment, 
    sendMessage, 
    viewMessage
} from "./message.controller.js"


const messagesRouter = express.Router()
messagesRouter.get("/all", getAllMessages)
messagesRouter.get("/:id", getMessage)
messagesRouter.get("/appointment/:id", getMessagesByAppointment)
messagesRouter.post("/send", sendMessage)
messagesRouter.post("/view/:id", viewMessage)
messagesRouter.post("/delete/:id", deleteMessage)


export default messagesRouter