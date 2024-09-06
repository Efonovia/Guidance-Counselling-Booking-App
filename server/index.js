import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv"
import helmet from "helmet";
import morgan from "morgan";
import studentsRouter from "./src/routes/student.route.js";
import counselorsRouter from "./src/routes/counselor.route.js";
import messagesRouter from "./src/routes/message.route.js";
import appointmentsRouter from "./src/routes/appointment.route.js";
import multer from "multer";
import cloudinary from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import { createNewCounselor } from "./src/routes/counselor.controller.js";


// CONFIGURATION
dotenv.config()
const app = express()


cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });
  
  // Multer storage configuration with dynamic `public_id`
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: async (req, file) => {
      const userId = req.body.firstName + "_" + req.body.lastName;
      const timestamp = Date.now();
      const customFileName = `${userId}_${timestamp}`;
      const customPublicId = customFileName; // Use provided public_id or default to a timestamp

      return {
        folder: 'nile_GC', // Cloudinary folder name
        public_id: customPublicId, // Set the custom public_id
      };
    },
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
app.get("/", (req, res) => {
    res.send("Welcome to Nile University Guidance & Counselling...")
})
app.use("/students", studentsRouter)
app.use("/counselors", counselorsRouter)
app.use("/messages", messagesRouter)
app.use("/appointments", appointmentsRouter)
app.post("/counselors/signup", upload.single("picturePath"), createNewCounselor)



//MONGOOSE SETUP
const PORT = process.env.PORT || 6001
mongoose.connect(process.env.MONGO_URL).then(() => app.listen(PORT, () => {
    console.log("Connected to mongo database")
    console.log('Server running at PORT: '+PORT)
}))
.catch(err => console.log(err + " failed to connect to database"))