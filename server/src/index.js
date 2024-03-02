import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv"
import helmet from "helmet";
import morgan from "morgan";
import studentsRouter from "./routes/student.route.js";
import counselorsRouter from "./routes/counselor.route.js";
import messagesRouter from "./routes/message.route.js";
import appointmentsRouter from "./routes/appointment.route.js";
import { createNewStudent } from "./routes/student.controller.js";
import multer from "multer";


// CONFIGURATION
dotenv.config()
const app = express()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const userId = req.body.firstName + "_" + req.body.lastName;
        const timestamp = Date.now();
        const originalName = file.originalname;
        const extension = originalName.split('.').pop();
        const customFileName = `${userId}_${timestamp}.${extension}`;
        cb(null, customFileName);
    }
});

const upload = multer({ storage: storage });
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())



//ROUTES
app.get("/", (req, res) => res.send("hello"))
app.use("/students", studentsRouter)
app.use("/counselors", counselorsRouter)
app.use("/messages", messagesRouter)
app.use("/appointments", appointmentsRouter)
app.post("/students/signup", upload.single("picturePath"), createNewStudent)



//MONGOOSE SETUP
const PORT = process.env.PORT || 6001
mongoose.connect(process.env.MONGO_URL).then(() => app.listen(PORT, () => {
    console.log("Connected to mongo database")
    console.log('Server running at PORT: '+PORT)
}))
.catch(err => console.log(err+ " failed to connect to database"))