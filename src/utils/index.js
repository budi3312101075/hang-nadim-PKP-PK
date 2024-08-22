export const formatDate = (rawDate) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Date(rawDate).toLocaleDateString("id-ID", options);
  return formattedDate;
};
