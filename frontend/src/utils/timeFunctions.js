
export const getTimeFromDate = (dateString) => {
    const date = new Date(dateString);

    // Get hours and minutes
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Format the time (adding leading zero if necessary)
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    return formattedTime
}

export const getFlightDuration = (departureTime, arrivalTime) => {
    const departureDate = new Date(departureTime);
    const arrivalDate = new Date(arrivalTime);

    // Calculate the difference in milliseconds
    const durationMs = arrivalDate - departureDate;

    // Convert milliseconds to total minutes
    const totalMinutes = Math.floor(durationMs / (1000 * 60));

    // Calculate hours and minutes
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    // Format the duration string
    let durationStr = '';
    if (hours > 0) {
        durationStr += `${hours}h `;
    }
    if (minutes > 0) {
        durationStr += `${minutes}m`;
    }

    // If the duration is less than an hour, only show minutes
    if (durationStr === '') {
        durationStr = `${minutes}m`;
    }

    return durationStr.trim();
};

export const getDateFormatFromDate = (departureTime) => {
    // Create a new Date object from the departureTime
    const date = new Date(departureTime);

    // Extract day, month, and year
    const day = String(date.getDate()).padStart(2, '0'); // Pad day with leading zero if needed
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-11), add 1 for 1-12 range, and pad
    const year = date.getFullYear(); // Get the full year

    // Return the formatted date as DD-MM-YYYY
    return `${day}-${month}-${year}`;
};
