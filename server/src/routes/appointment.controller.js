import AppointmentDatabase from "../models/appointment.model.js";
import CounselorDatabase from "../models/counselor.model.js";
import StudentDatabase from "../models/student.model.js"


export const getAllAppointments = async (req, res) => {
    const { counselorId } = req.params
    console.log(req.params)
    let filter = {}
    if(counselorId) {
        filter = { counselorId }
    }
    try {
        return res.status(200).json({ok: true, body: await AppointmentDatabase.find({...filter, cancelled: false}, { '__v': 0 })})
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
}

export const getAppointment = async (req, res) => {
    try {
        const { id } = req.params
        console.log(req.params)
        const appointment = await AppointmentDatabase.findById(id)
        if (!appointment) {
            return res.status(200).json({ ok: true, body: null });
        }
        const counselor = await CounselorDatabase.findById(appointment.counselorId)
        
        return res.status(200).json({ok: true, body: { ...appointment._doc, counselorName: counselor.firstName + " " + counselor.lastName, counselorPic: counselor.picturePath}});

    } catch (error) {
        console.log(error)
        return res.status(404).json({error: error.message})
    }
}

export const createAppointment = async(req, res) => {
    try {
        const { studentSchoolId, counselorId, referralInfo, isReferral, note, appointmentDate } = req.body
        console.log(req.body)
        let studentId = null
        const student = await StudentDatabase.findOne({ schoolId: studentSchoolId })
        if(student) {
            studentId = student._id
        }

        const newAppointment = new AppointmentDatabase({
            studentId: student._id,
            studentSchoolId,
            counselorId,
            appointmentDate: appointmentDate,
            dateCreated: new Date(),
            approved: false,
            completed: false,
            cancelled: false,
            seen: false,
            isReferral: JSON.parse(isReferral),
            referralInfo: JSON.parse(referralInfo) || null,
            note: note || ""
        })

        await newAppointment.save()
        return res.status(201).json({ok: true, body: newAppointment})
    } catch (error) {
        console.log(error)
        res.status(500).json({ok: false, error: error, message: "Couldn't book appointment. try again"})
    }
}

export const editAppointment = async(req, res) => {
    try {
        const { appointmentId, updates } = req.body
        const appointment = await AppointmentDatabase.findById(appointmentId);
        
        if (!appointment) {
            console.log("Appointment not found");
            return res.status(404).json({ok: false, error: "Appointment not found"})
        }

        const studentSchoolIdUpdate = updates.find(update => update.field === "studentSchoolId")
        if(studentSchoolIdUpdate) {
            const student = await StudentDatabase.findOne({ schoolId: studentSchoolIdUpdate.value })
            updates.push({field: "studentId", value: student._id})
        }
        updates.forEach(({ field, value }) => {
            appointment[field] = value;
        })
        await appointment.save()

        const updatedAppointment = await AppointmentDatabase.findById(appointmentId);
        console.log("fields updated successfully")
        return res.status(201).json({ok: true, body: updatedAppointment})
    } catch (error) {
        console.error("Error updating" + field +":", error.message);
        return res.status(500).json({ok: false, error: "Error updating :" + field + error.message})
    }
}

export const getCurrentAppointment = async (req, res) => {
    const { studentSchoolId } = req.params;

    try {
        const appointment = await AppointmentDatabase.findOne({
            studentSchoolId,
            completed: false,
            cancelled: false
        });

        
        if (!appointment) {
            return res.status(200).json({ ok: true, body: null });
        }
        const counselor = await CounselorDatabase.findById(appointment._id)
        
        return res.status(200).json({ok: true, body: { ...appointment, counselorName: counselor.firstName + " " + counselor.lastName}});
    } catch (error) {
        console.error("Error finding appointment:", error);
        return res.status(500).json({ ok: false, error: "Internal server error" });
    }
}
