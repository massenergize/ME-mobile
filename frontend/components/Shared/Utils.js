/**
 * formats a date range string based on the start and end date
 * @param {Date} startDate
 * @param {Date} endDate
 * @returns {String} if same day: "mmmm dd, hh:mm AM/PM - hh:mm AM/PM", if same month: "mmmm dd-dd yyyy", if same year: "mmmm dd - mmmm dd, yyyy", if different year: "mmmm dd, yyyy - mmmm dd, yyyy"
 */
export function dateFormatString(startDate, endDate) {
  const dateOptions = {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const startDateString = startDate.toLocaleDateString("en-US", dateOptions);

  let dateRangeString;

  if (startDate.toDateString() === endDate.toDateString()) {
    // Same day then display "mmmm dd, hh:mm AM/PM - hh:mm AM/PM"
    dateRangeString = `${startDateString} - ${endDate.toLocaleTimeString(
      "en-US",
      { hour: "numeric", minute: "numeric", hour12: true }
    )}`;
  } else {
    // Same month
    if (startDate.getMonth() === endDate.getMonth()) {
      // Display "mmmm dd-dd yyyy"
      dateRangeString = `${startDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      })}-${endDate.toLocaleDateString("en-US", {
        day: "numeric",
        year: "numeric",
      })}`;
    } else {
      // Same year
      if (startDate.getFullYear() === endDate.getFullYear()) {
        // Display "mmmm dd - mmmm dd, yyyy"
        dateRangeString = `${startDate.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
        })} - ${endDate.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}`;
      } else {
        // Different year then display "mmmm dd, yyyy - mmmm dd, yyyy"
        dateRangeString = `${startDate.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })} - ${endDate.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}`;
      }
    }
  }

  return dateRangeString;
}
