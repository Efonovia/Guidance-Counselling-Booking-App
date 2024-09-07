const API_URL = "https://nile-gc-api.vercel.app"


export const httpSignUpStudent = async (studentDetails) => {
    try {
        const response = await fetch(`${API_URL}/students/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(studentDetails)
        })
        if (response.error) {
            throw new Error('Failed to sign you up. try again');
        }
        const result = await response.json()
        if(result.ok) {
            return result;
        } else {
            if(result.exists) {
                alert("that account already exists. try logging in")
            } else {
                throw new Error("server error try again")
            }
        }
    } catch (error) {
        console.log(error)
        alert("server error. try again")
    }
}

export const httpCreateCounselor = async (counselorDetails) => {
    try {
        const response = await fetch(`${API_URL}/counselors/signup`, {
            method: "POST",
            body: counselorDetails
        })
        if (response.error) {
            throw new Error('Failed to sign you up. try again');
        }
        const result = await response.json()
        if(!result.exists) {
            return result;
        } else {
            if(result.exists) {
                alert("that counselor already exists")
            } else if(result.error) {
                throw new Error("server error try again")
            }
        }
    } catch (error) {
        console.log(error)
        alert("server error. try again")
    }
}


export const httpLoginStudent = async (studentDetails) => {
    try {
        const response = await fetch(`${API_URL}/students/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(studentDetails)
        })
        if (response.error) {
            throw new Error('Failed to log you in. try again');
        }
        const result = await response.json()
        if(result?.ok) {
            return result;
        } else {
            alert(result.msg)
        }
    } catch (error) {
        console.log(error)
        alert(error)
    }
}

export const httpLoginCounselor = async (counselorDetails) => {
    try {
        const response = await fetch(`${API_URL}/counselors/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(counselorDetails)
        })
        if (response.error) {
            throw new Error('Failed to log you in. try again');
        }
        const result = await response.json()
        if(result?.ok) {
            return result;
        } else {
            alert(result.msg)
        }
    } catch (error) {
        console.log(error)
        alert(error)
    }
}


export const httpGetCurrentAppointment = async (studentSchoolId) => {
    try {
        const response = await fetch(`${API_URL}/appointments/getcurrent/${studentSchoolId}`)
        if (response.error) {
            throw new Error('Failed to fetch data. try again');
        }
        const result = await response.json()
        return result.body;
    } catch (error) {
        console.log(error)
        alert(error)
    }
}

export const httpBookAppointment = async (appointmentDetails) => {
    try {
        const response = await fetch(`${API_URL}/appointments/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(appointmentDetails)
        })
        const result = await response.json()
        if(result.exists) {
            throw new Error('Student already has an active appointment');
        }
        if(result?.ok) {
            return result;
        } else {
            throw new Error('Failed to book appointment. try again');
        }
    } catch (error) {
        console.log(error)
        alert(error)
    }
}


export const httpSendMessage = async (messageDetails) => {
    try {
        const response = await fetch(`${API_URL}/messages/send`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(messageDetails)
        })
        const result = await response.json()
        if(result?.ok) {
            return result;
        } else {
            throw new Error('Failed to send message. try again');
        }
    } catch (error) {
        console.log(error)
        alert(error)
    }
}


export const httpViewMessage = async (messageId) => {
    try {
        const response = await fetch(`${API_URL}/messages/view/${messageId}`, {
            method: "POST",
        })
        const result = await response.json()
        if(!result.ok) {
            throw new Error(result.error + ". try again");
        }
        console.log(result)
        return result
    } catch (error) {
        console.log(error)
        alert(error)
    }
}


export const httpGetMessagesByAppointment = async (appointmentId) => {
    try {
        const response = await fetch(`${API_URL}/messages/appointment/${appointmentId}`)
        const result = await response.json()
        if(!result?.ok) {
            throw new Error(result.error + ". try again");
        } else if(result?.ok) {
            return result
        }
    } catch (error) {
        console.log(error)
        alert(error)
    }
}


export const httpGetMessagesBetweenCounselors = async (counselorId1,counselorId2) => {
    try {
        const response = await fetch(`${API_URL}/messages/betweencounselors/${counselorId1}/${counselorId2}`)
        const result = await response.json()
        if(result?.ok) {
            return result
        } else {
            throw new Error(result.error + ". try again");
        }
    } catch (error) {
        console.log(error)
        alert(error)
    }
}

export const httpGetAllAppointments = async (counselorId) => {
    try {
        const response = await fetch(`${API_URL}/appointments/all/${counselorId}`)
        if (response.error) {
            throw new Error('Failed to fetch appointments. try again');
        }
        const result = await response.json()
        return result;
    } catch (error) {
        console.log(error)
        alert(error)
    }
}

export const httpEditAppointment = async (updateDetails) => {
    try {
        const response = await fetch(`${API_URL}/appointments/edit`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateDetails)
        })
        const result = await response.json()
        if(result?.ok) {
            return result;
        } else {
            throw new Error('Failed to edit appointment. try again');
        }
    } catch (error) {
        console.log(error)
        alert(error)
    }
}

export const httpGetAppointment = async (appointmentId) => {
    try {
        const response = await fetch(`${API_URL}/appointments/${appointmentId}`)
        if (response.error) {
            throw new Error('Failed to fetch appointment. try again');
        }
        const result = await response.json()
        return result;
    } catch (error) {
        console.log(error)
        alert(error)
    }
}


export const httpGetAllCounselors = async () => {
    try {
        const response = await fetch(`${API_URL}/counselors/all`)
        if (response.error) {
            throw new Error('Failed to fetch appointments. try again');
        }
        const result = await response.json()
        return result;
    } catch (error) {
        console.log(error)
        alert(error)
    }
}

export const httpGetStudent = async (studentId) => {
    try {
        const response = await fetch(`${API_URL}/students/${studentId}`)
        if (response.error) {
            throw new Error('Failed to fetch student info. try again');
        }
        const result = await response.json()
        return result;
    } catch (error) {
        console.log(error)
        alert(error)
    }
}

export const httpGetCounselor = async (counselorId) => {
    try {
        const response = await fetch(`${API_URL}/counselors/${counselorId}`)
        if (response.error) {
            throw new Error('Failed to fetch counselor info. try again');
        }
        const result = await response.json()
        return result;
    } catch (error) {
        console.log(error)
        alert(error)
    }
}