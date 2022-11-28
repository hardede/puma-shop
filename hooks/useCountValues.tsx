const useCountValues = ( price: any, sale : any) => {
  let priceWithSale;
  let priceWithSaleString;
  let saleString;
  {
    sale !== 0 &&
      ((priceWithSale = Math.round(price * (sale / 100))),
      (priceWithSaleString = `${priceWithSale
        .toLocaleString()
        .concat(",00 ₴")}`),
      (saleString = sale.toLocaleString().concat("%")));
  }
  let priceString = `${price.toLocaleString().concat(",00 ₴")}`;

  return { priceWithSale, priceWithSaleString, price, priceString, saleString };
};

export default useCountValues;
