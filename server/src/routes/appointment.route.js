import express from "express"
import { 
    createAppointment, 
    editAppointment, 
    getAllAppointments, 
    getAppointment
} from "./appointment.controller.js"


const appointmentsRouter = express.Router()
appointmentsRouter.get("/all", getAllAppointments)
appointmentsRouter.get("/:id", getAppointment)
appointmentsRouter.post("/create", createAppointment)
appointmentsRouter.post("/edit", editAppointment)


export default appointmentsRouter