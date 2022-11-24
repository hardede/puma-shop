const dateDeliveredAt = () => {
  let newDate = new Date();
  newDate.setDate(newDate.getDate() + 4);
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  let deliveredAt = `${date}.${month}.${year}`;

  return { deliveredAt, newDate };
};

export default dateDeliveredAt;
