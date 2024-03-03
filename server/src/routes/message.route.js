import express from "express"
import { 
    deleteMessage,
    findMessagesBetweenCounselors,
    getAllMessages, 
    getMessage, 
    getMessagesByAppointment, 
    sendMessage, 
    viewMessage
} from "./message.controller.js"


const messagesRouter = express.Router()
messagesRouter.get("/all", getAllMessages)
messagesRouter.get("/:id", getMessage)
messagesRouter.get("/betweencounselors/:counselorId1/:counselorId2", findMessagesBetweenCounselors)
messagesRouter.get("/appointment/:id", getMessagesByAppointment)
messagesRouter.post("/send", sendMessage)
messagesRouter.post("/view/:id", viewMessage)
messagesRouter.post("/delete/:id", deleteMessage)


export default messagesRouter