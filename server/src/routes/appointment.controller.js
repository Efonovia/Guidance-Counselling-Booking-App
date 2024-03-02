import AppointmentDatabase from "../models/appointment.model.js";


export const getAllAppointments = async (req, res) => {
    try {
        return res.status(200).json(await AppointmentDatabase.find({}, { '_id': 0, '__v': 0 }))
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
}

export const getAppointment = async (req, res) => {
    try {
        const { id } = req.params
        const appointment = await AppointmentDatabase.findById(id)
        return res.status(200).json(appointment)
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
}

export const createAppointment = async(req, res) => {
    try {
        const { studentSchoolId, counselorId, referralInfo, isReferral, note, appointmentDate } = req.body
        const newAppointment = new AppointmentDatabase({
            studentSchoolId,
            counselorId,
            appointmentDate: appointmentDate || new Date(2024, 3, 11, 12),
            dateCreated: new Date(),
            approved: false,
            completed: false,
            cancelled: false,
            seen: false,
            isReferral,
            referralInfo: referralInfo || null,
            note: note || ""
        })

        await newAppointment.save()
        return res.status(201).json({ok: true, body: newAppointment})
    } catch (error) {
        res.status(500).json({ok: false, error: error})
    }
}

export const editAppointment = async(req, res) => {
    try {
        const { appointmentId, field, value } = req.body
        const appointment = await AppointmentDatabase.findById(appointmentId);
        
        if (!appointment) {
            console.log("Appointment not found");
            return res.status(404).json({ok: false, error: "Appointment not found"})
        }
        appointment[field] = value;
        await appointment.save();
        const updatedAppointment = await AppointmentDatabase.findById(appointmentId);
        console.log(field + "field updated successfully")
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
            approved: true
        });

        if (!appointment) {
            return res.status(200).json({ ok: true, body: null });
        }

        res.status(200).json({ok: true, body: appointment});
    } catch (error) {
        console.error("Error finding appointment:", error);
        res.status(500).json({ ok: false, error: "Internal server error" });
    }
}