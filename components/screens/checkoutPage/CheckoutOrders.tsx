import Checkout from "../../Checkout/Checkout";
import Layout from "../../Layout/Layout";

const CheckoutOrders = () => {
  return (
    <Layout title="Checkout Orders">
      <div className="container max-w-[1140px] mt-20 m-auto">
        <Checkout />
      </div>
    </Layout>
  );
};

export default CheckoutOrders;
