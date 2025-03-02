
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
    const date = new Date(departureTime);

    // Array of weekday names for easier lookup
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = weekdays[date.getDay()]; // Get day of the week
    const day = String(date.getDate()).padStart(2, '0'); // Day of the month
    const month = date.toLocaleString('default', { month: 'long' }); // Full month name
    const year = date.getFullYear(); // Full year

    // Return formatted date in "Thursday 20 March 2025" format
    return `${dayOfWeek} ${day} ${month} ${year}`;
};
