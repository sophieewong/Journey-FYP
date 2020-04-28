/**
 * Takes a UTC date string and returns the locale date string.
 * @param {string} dateString
 */
const formatDateString = dateString => {
  const newDateString = new Date(dateString).toLocaleDateString();
  return newDateString;
};

export default formatDateString;
