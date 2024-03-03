import express from "express"
import { 
    createAppointment, 
    editAppointment, 
    getAllAppointments, 
    getAppointment,
    getCurrentAppointment
} from "./appointment.controller.js"


const appointmentsRouter = express.Router()
appointmentsRouter.get("/all/:counselorId", getAllAppointments)
appointmentsRouter.get("/:id", getAppointment)
appointmentsRouter.post("/create", createAppointment)
appointmentsRouter.get("/getcurrent/:studentSchoolId", getCurrentAppointment)
appointmentsRouter.post("/edit", editAppointment)


export default appointmentsRouter