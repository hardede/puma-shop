const useSumForItem = (quantity: number, price: number, sale: number) => {
  const sumPriceWithSale = `${(quantity * sale === 0
    ? price
    : Math.round(price * (sale / 100)) * quantity
  )
    .toLocaleString()
    .concat(",00 ₴")}`;
  const sumPrice = `${(quantity * price).toLocaleString().concat(",00 ₴")}`;

  return {
    sumPrice,
    sumPriceWithSale,
  };
};

export default useSumForItem;
