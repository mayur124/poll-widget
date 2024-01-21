const getZeroAppendedString = (num: number) => {
  return String(num).padStart(2, "0");
};

export const getFormattedDate = (timestamp: number) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = getZeroAppendedString(date.getMonth() + 1); // month starts from 0
  const day = getZeroAppendedString(date.getDate());

  return `${day}-${month}-${year}`;
};
