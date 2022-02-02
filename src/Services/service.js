export const dateConversion = (date) => {
  if (!date) return null;
  let formattedDate = new Date(date);
  formattedDate = [
    [
      formattedDate.getUTCDate() < 10
        ? `0${formattedDate.getUTCDate()}`
        : formattedDate.getUTCDate(),
      formattedDate.getUTCMonth() + 1 < 10
        ? `0${formattedDate.getUTCMonth() + 1}`
        : formattedDate.getUTCMonth() + 1,
      formattedDate.getUTCFullYear(),
    ].join("-"),
    [
      formattedDate.getHours() < 10
        ? `0${formattedDate.getHours()}`
        : formattedDate.getHours(),
      formattedDate.getMinutes() < 10
        ? `0${formattedDate.getMinutes()}`
        : formattedDate.getMinutes(),
    ].join(":"),
  ].join(" ");

  return formattedDate;
};
