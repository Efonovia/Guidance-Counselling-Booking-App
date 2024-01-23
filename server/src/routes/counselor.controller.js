import CounselorDatabase from "../models/counselor.model.js"
import { hashPassword, verifyPassword } from "../utilities/encryption.utilities.js"

export const getAllCounselors = async (req, res) => {
    try {
        return res.status(200).json(await CounselorDatabase.find({}, { '_id': 0, '__v': 0 }))
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
}

export const getCounselor = async (req, res) => {
    try {
        const { id } = req.params
        const counselor = await CounselorDatabase.findById(id)
        return res.status(200).json(counselor)
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
}

export const loginCounselor = async(req, res) => {
  try {
    const { email, password } = req.body
    //Check if the counselor exists by using their email
    const counselor = await CounselorDatabase.findOne({ email: email })
    if(!counselor) {
      return res.status(400).json({ok: false, msg: "invalid email" })
    }

    //Check if password is correct
    const isPasswordValid = verifyPassword(password, counselor.passwordSalt, counselor.passwordHash)
    if(!isPasswordValid) return res.status(400).json({ok: false, msg: "Invalid credentials" })

    
    return await res.status(200).json({ ok: true, counselor: counselor })
  } catch (error) {
      return res.status(500).json({ error: error.message })
  }
}

export const createNewCounselor = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      telephone,
      picturePath,
      isAdmin
    } = req.body

    console.log(req.body)

    const { salt, hash } = hashPassword(password);

    CounselorDatabase.findOne({ email: email })
    .then((counselor) => {
      if (counselor) {
        console.log(counselor); // Found counselor
        return res.status(200).json({exists: true, body: counselor})
      } else {
          console.log(`Counselor with email ${email} not found.`);

          const newCounselor = new CounselorDatabase({
            firstName,
            lastName,
            email,
            passwordHash: hash,
            passwordSalt: salt,
            telephone,
            picturePath: picturePath || "",
            isAdmin
          })

          newCounselor.save().then(() => {
            console.log('New counselor added successfully');
          }).catch((error) => {
              console.log(error);
            });

        return res.status(201).json({exists: false, body: newCounselor})
      }
    })
    .catch((error) => {
      console.log(`Error finding counselor with email ${email}: ${error}`);
      return res.status(500).json({error: error.message})
    });

  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}