export const formatSlashDateTime = (isoString?: string | null) => {
    if (!isoString) {
        return "";
    }

    const date = new Date(isoString);
    if (isNaN(date.getTime())) {
        return "";
    }

    // 'en-GB' formats dates as DD/MM/YYYY (e.g., 13/11/2026)
    const formattedDate = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    // Formats time in 24-hour format (e.g., 09:21)
    const formattedTime = date.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

    return `${formattedDate}, ${formattedTime}`;
};
