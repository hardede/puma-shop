const useCountValues = (price: number, sale: number) => {
  let priceWithSale;
  let priceWithSaleString;
  let saleString;
  {
    sale !== 0 &&
      ((priceWithSale = Math.round(price * (1 - sale / 100))),
      (priceWithSaleString = `${priceWithSale
        .toLocaleString()
        .concat(",00 ₴")}`),
      (saleString = `-${sale.toLocaleString().concat("%")}`));
  }
  let priceString = `${price.toLocaleString().concat(",00 ₴")}`;

  return { priceWithSale, priceWithSaleString, price, priceString, saleString };
};

export default useCountValues;
