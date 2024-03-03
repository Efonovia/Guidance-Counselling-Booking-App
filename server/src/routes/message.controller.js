import MessageDatabase from "../models/message.model.js"


export const getAllMessages = async (req, res) => {
    try {
        return res.status(200).json(await MessageDatabase.find({}, { '_id': 0, '__v': 0 }))
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
}

export const getMessage = async (req, res) => {
    try {
        const { id } = req.params
        const message = await MessageDatabase.findById(id)
        return res.status(200).json(message)
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
}

export const sendMessage = async(req, res) => {
    try {
        const { sender, receiver, messageContent, appointmentId } = req.body
        const newMessage = new MessageDatabase({
            sender,
            receiver,
            messageContent,
            seen: false,
            dateSent: new Date(),
            appointmentId
        })

        await newMessage.save()
        return res.status(201).json({ok: true, body: newMessage})
    } catch (error) {
        res.status(500).json({ok: false, error: error})
    }
}

export const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params
        await MessageDatabase.deleteOne({ _id: id })
        console.log('Document deleted successfully')
        return res.status(201).json({ok: true})
  } catch (error) {
        console.log(error)
        return res.status(404).json({ok: false, error: error.message})
  }
}

export const getMessagesByAppointment = async (req, res) => {
    try {
        const { id } = req.params
        const messages = await MessageDatabase.find({ appointmentId: id })
        const unseenMessages = messages.filter(message => !message.seen).length
        return res.status(201).json({ok: true, messages, unseenMessages})
  } catch (error) {
        console.log(error)
        return res.status(404).json({ok: false, error: error.message})
  }
}

export const viewMessage = async(req, res) => {
    try {
        const { id } = req.params
        const message = await MessageDatabase.findById(id);
        
        if (!message) {
            console.log("Message not found");
            return res.status(404).json({ok: false, error: "Message not found"})
        }
        message.seen = true;
        await message.save();
        return res.status(201).json({ok: true})
    } catch (error) {
        console.error("Error viewing message:", error.message);
        return res.status(500).json({ok: false, error: "Error viewing message"})
    }
}


const findMessagesBetweenCounselors = async (req, res) => {
    try {
        const { counselorId1, counselorId2 } = req.params;
        const messages = await MessageDatabase.find({
            $or: [
                { 'sender.userId': counselorId1, 'receiver.userId': counselorId2 },
                { 'sender.userId': counselorId2, 'receiver.userId': counselorId1 }
            ]
        });

        res.status(200).json({ok: true, body: messages});
    } catch (error) {
        console.error('Error finding messages between counselors:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export { findMessagesBetweenCounselors };
