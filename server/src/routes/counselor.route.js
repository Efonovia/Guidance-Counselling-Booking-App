import express from "express"
import { 
    deleteCounselor, 
    getAllCounselors, 
    getCounselor, 
    getCounselorPicture, 
    loginCounselor 
} from "./counselor.controller.js"


const counselorsRouter = express.Router()
counselorsRouter.get("/all", getAllCounselors)
counselorsRouter.get("/:id", getCounselor)
counselorsRouter.get("/pic/:picturePath", getCounselorPicture)
counselorsRouter.post("/login", loginCounselor)
counselorsRouter.delete("/delete/:counselorId", deleteCounselor)

export default counselorsRouter