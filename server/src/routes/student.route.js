import express from "express"
import { 
    createNewStudent, 
    getAllStudents, 
    getStudent, 
    loginStudent 
} from "./student.controller.js"


const studentsRouter = express.Router()
studentsRouter.get("/all", getAllStudents)
studentsRouter.get("/:id", getStudent)
studentsRouter.post("/signup", createNewStudent)
studentsRouter.post("/login", loginStudent)

export default studentsRouter