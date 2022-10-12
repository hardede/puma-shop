const useSumForItem = (
  quantity: number,
  newPrice: number,
  oldPrice: number
) => {

  const newSumPrice = `${(quantity * newPrice)
    .toLocaleString()
    .concat(",00 ₴")}`;
  const oldSumPrice = `${(quantity * (oldPrice ? oldPrice : 0))
    .toLocaleString()
    .concat(",00 ₴")}`;

  return {
    newSumPrice,
    oldSumPrice,
  };
};

export default useSumForItem;
