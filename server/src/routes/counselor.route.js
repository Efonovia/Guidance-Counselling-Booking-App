import express from "express"
import { 
    createNewCounselor, 
    getAllCounselors, 
    getCounselor, 
    loginCounselor 
} from "./counselor.controller.js"


const counselorsRouter = express.Router()
counselorsRouter.get("/all", getAllCounselors)
counselorsRouter.get("/:id", getCounselor)
counselorsRouter.post("/signup", createNewCounselor)
counselorsRouter.post("/login", loginCounselor)

export default counselorsRouter