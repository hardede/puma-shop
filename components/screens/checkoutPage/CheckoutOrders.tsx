import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppSelector } from "../../../hooks/redux";
import { selectCartState } from "../../../store/reducers/CartSlice";
import Checkout from "../../Checkout/Checkout";
import Layout from "../../Layout/Layout";

const CheckoutOrders = () => {
  const cartState = useAppSelector(selectCartState);

  const router = useRouter();

  // useEffect(() => {
  //   {
  //     cartState <= 0 && router.push("/checkout/cart");
  //   }
  // }, [cartState]);

  return (
    <Layout title="Checkout Orders">
      <div className="container max-w-[1140px] mt-20 m-auto">
        <Checkout />
      </div>
    </Layout>
  );
};

export default CheckoutOrders;
