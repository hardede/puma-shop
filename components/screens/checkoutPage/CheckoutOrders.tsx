import Checkout from "../../Checkout/Checkout";
import Layout from "../../Layout/Layout";

const CheckoutOrders = () => {
  return (
    <Layout title="Checkout Orders">
      <div className="container max-w-[1200px] mt-20 m-auto px-[30px] sm:px-2.5">
        <Checkout />
      </div>
    </Layout>
  );
};

export default CheckoutOrders;
