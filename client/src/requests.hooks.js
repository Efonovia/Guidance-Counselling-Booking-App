const API_URL = "http://localhost:8000"


export const httpSignUpStudent = async (studentDetails) => {
    try {
        const response = await fetch(`${API_URL}/students/signup`, {
            method: "POST",
            body: studentDetails
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
