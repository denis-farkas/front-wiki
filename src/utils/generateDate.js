export const generateDateTime = () => {
    const now = new Date();

    // Format year, month, day
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(now.getDate()).padStart(2, '0');

    // Format hours, minutes, seconds
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    // Combine date and time
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};