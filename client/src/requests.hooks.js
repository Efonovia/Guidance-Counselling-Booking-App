const API_URL = "http://localhost:8000"


export const httpSignUpStudent = async (studentDetails) => {
    try {
        const response = await fetch(`${API_URL}/signup`, {
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
        alert(error)
    }
}