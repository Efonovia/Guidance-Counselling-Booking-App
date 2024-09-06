import express from "express"
import { 
    createNewStudent,
    getAllStudents, 
    getStudent, 
    getStudentPicture, 
    loginStudent 
} from "./student.controller.js"


const studentsRouter = express.Router()
studentsRouter.get("/all", getAllStudents)
studentsRouter.get("/:id", getStudent)
studentsRouter.get("/pic/:picturePath", getStudentPicture)
studentsRouter.post("/login", loginStudent)
studentsRouter.post("/signup", createNewStudent)


export default studentsRouter