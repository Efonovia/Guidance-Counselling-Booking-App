import StudentDatabase from "../models/student.model.js"
import { hashPassword, verifyPassword } from "../utilities/encryption.utilities.js"
import path from "path"
import { getDirname } from '../utilities/common.utilities.js';


export const getAllStudents = async (req, res) => {
    try {
        return res.status(200).json(await StudentDatabase.find({}, { '__v': 0 }))
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
}

export const getStudent = async (req, res) => {
    try {
        const { id } = req.params
        const student = await StudentDatabase.findById(id)
        return res.status(200).json(student)
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
}

export const loginStudent = async(req, res) => {
  try {
    const { schoolId, password } = req.body
    console.log(req.body)
    //Check if the student exists by using their schoolId
    const student = await StudentDatabase.findOne({ schoolId: schoolId })
    if(!student) {
      return res.status(400).json({ok: false, msg: "invalid schoolId" })
    }

    //Check if password is correct
    const isPasswordValid = verifyPassword(password, student.passwordSalt, student.passwordHash)
    if(!isPasswordValid) return res.status(400).json({ok: false, msg: "Invalid password" })

    
    return await res.status(200).json({ ok: true, body: student })
  } catch (error) {
      return res.status(500).json({ error: error.message })
  }
}

export const createNewStudent = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      telephone,
      schoolId
    } = req.body

    console.log(req.body)

    const { salt, hash } = hashPassword(password);

    StudentDatabase.findOne({ schoolId: schoolId })
    .then((student) => {
      if (student) {
        console.log(student); // Found student
        return res.status(200).json({ok: false, exists: true, body: student})
      } else {
          console.log(`Student with schoolId ${schoolId} not found. creating new student...`);

          let picturePath = "";
          if (req.file) {
              picturePath = req.file.filename;
          }

          const newStudent = new StudentDatabase({
            firstName,
            lastName,
            email,
            passwordHash: hash,
            passwordSalt: salt,
            telephone,
            schoolId,
            picturePath
          })

          newStudent.save().then(() => {
            console.log('New student added successfully');
          }).catch((error) => {
              console.log(error);
            });

        return res.status(201).json({ok: true, exists: false, body: newStudent})
      }
    })
    .catch((error) => {
      console.log(`Error finding student with schoolId ${schoolId}: ${error}`);
      return res.status(500).json({ok: false, error: error.message})
    });

  } catch (error) {
    return res.status(500).json({ok: false, error: error.message})
  }
}

export const getStudentPicture = async (req, res) => {
  try {
      const { picturePath } = req.params
      return res.sendFile(path.join(getDirname(), "../../uploads", picturePath))
  } catch (error) {
      return res.status(404).json({error: error.message})
  }
}