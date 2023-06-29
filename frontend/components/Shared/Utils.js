export function dateFormatString(startDate, endDate) {
  const dateOptions = {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const startDateString = startDate.toLocaleDateString("en-US", dateOptions);
  const endDateString = endDate.toLocaleDateString("en-US", dateOptions);

  let dateRangeString;

  if (startDate.toDateString() === endDate.toDateString()) {
    // Same day then display "mmmm dd, hh:mm AM/PM - hh:mm AM/PM"
    dateRangeString = `${startDateString} - ${endDate.toLocaleTimeString(
      "en-US",
      { hour: "numeric", minute: "numeric", hour12: true }
    )}`;
  } else {
    // Different day then display "mmmm dd, hh:mm AM/PM - mmmm dd, hh:mm AM/PM"
    dateRangeString = `${startDateString} - ${endDateString}`;
  }

  return dateRangeString;
}
