const useDate = () => {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  let currentDate = `${date}.${month}.${year}`;

  return { currentDate };
};

export default useDate;
