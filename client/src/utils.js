export const centerStyle = {display: "flex", justifyContent: "center", alignItems: "center"}

export function shortenText(len, text) {
    return text.length <= len ? text : text.slice(0, len-3)+"..."  
}

export function checkFormFields(formData) {
    const emptyFields = [];

    for (const field in formData) {
        if (!formData[field] && field !== "isAdmin") {
            emptyFields.push(field);
        }
    }

    return emptyFields;
}

export function formatDate(date) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString('en-US', options);
    return formattedDate;
}

export function capitalizeWords(text) {
    if (!text) return '';
    const words = text.split(' ');
    const capitalizedWords = words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return capitalizedWords.join(' ');
}

export function formatTime(dateString) {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const amOrPm = hours >= 12 ? 'pm' : 'am';
    hours %= 12;
    hours = hours || 12;
    const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${amOrPm}`;
    return formattedTime;
}

export function formDataToJson(formData) {
    const jsonObject = {};
    formData.forEach((value, key) => {
        if (jsonObject.hasOwnProperty(key)) {
            if (!Array.isArray(jsonObject[key])) {
                jsonObject[key] = [jsonObject[key]];
            }
            jsonObject[key].push(value);
        } else {
            jsonObject[key] = value;
        }
    });
    return jsonObject;
}

export function dateTimeStringToDate(dateString, timeString) {
    const [year, month, day] = dateString.split('-')
    const [hours, minutes] = timeString.split(':')

    const appointmentDate = new Date(year, month - 1, day, hours, minutes)
    return appointmentDate
}

export function getStatus({completed, cancelled, approved}) {
    if(completed) {
        return "completed"
    } else if(cancelled) {
        return "cancelled"
    } else if(approved && !completed) {
        return "active"
    } else if(!approved && !cancelled) {
        return "pending"
    }
}

export function getStatusColor(status) {
    switch(status) {
        case "active":
            return {background: "blue", color: "white"}
        case "completed":
            return {background: "green", color: "white"}
        case "cancelled":
            return {background: "red", color: "white"}
        case "pending":
            return {background: "black", color: "white"}
        default:
            return
    }
}

export function getDateAndTimeObject(dateInput) {
    const date = new Date(dateInput)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const appointmentDate = `${year}-${month}-${day}`;
    const appointmentTime = `${hours}:${minutes}`;

    return { appointmentDate, appointmentTime };
}
