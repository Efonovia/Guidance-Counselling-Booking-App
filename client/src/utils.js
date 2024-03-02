export function shortenText(len, text) {
    return text.length <= len ? text : text.slice(0, len-3)+"..."  
}

export function checkFormFields(formData) {
    const emptyFields = [];

    for (const field in formData) {
        if (!formData[field]) {
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
        // Check if the key already exists in the JSON object
        if (jsonObject.hasOwnProperty(key)) {
            // If the key already exists, convert the value to an array
            // This is necessary to handle multiple values for the same key
            if (!Array.isArray(jsonObject[key])) {
                jsonObject[key] = [jsonObject[key]];
            }
            jsonObject[key].push(value);
        } else {
            // If the key doesn't exist, simply assign the value
            jsonObject[key] = value;
        }
    });
    return jsonObject;
}

export function getOrdinalSuffix(number) {
    if (number % 100 >= 11 && number % 100 <= 13) {
        return `${number}th`;
    }
  
    switch (number % 10) {
        case 1:
            return `${number}st`;
        case 2:
            return `${number}nd`;
        case 3:
            return `${number}rd`;
        default:
            return `${number}th`;
    }
  }