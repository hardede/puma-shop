const datePaidAt = () => {
  let newDate = new Date();
  let hours = newDate.getHours();
  let minutes = newDate.getMinutes();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  let paidAt = `${hours}:${minutes} ${date}.${month}.${year}`;

  return { paidAt };
};

export default datePaidAt;
