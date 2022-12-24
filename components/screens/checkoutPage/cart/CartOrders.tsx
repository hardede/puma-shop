import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { useAppSelector } from "../../../../hooks/redux";
import { selectCartState } from "../../../../store/reducers/CartSlice";
import Cart from "../../../Checkout/Cart/Cart";
import Layout from "../../../Layout/Layout";

const CartOrders = () => {
  const cartState = useAppSelector(selectCartState);

  return (
    <Layout title="Cart">
      <div className="flex justify-between  mt-20 px-28 py-[26px]  bg-[#eee] w-screen md:px-14 xs:px-5">
        <div className="flex items-center">
          <h4 className="text-2xl uppercase mr-1 xs:text-xl">Cart</h4>
          {cartState.length > 0 ? (
            <span className="text-2xl xs:text-xl">
              ({cartState.reduce((a: any, c: any) => a + c.quantity, 0)})
            </span>
          ) : (
            <span className="text-2xl">(0)</span>
          )}
        </div>
        <Link href="/">
          <div className="flex items-center text-center py-3 hover:opacity-70 transition duration-500 cursor-pointer underline opacity-60">
            <IoIosArrowBack className="text-xl mr-1" />
            Continue shopping
          </div>
        </Link>
      </div>
      <div className="container max-w-[1200px] mt-20 m-auto px-[30px] sm:px-2.5 xs:mt-10">
        {cartState.length > 0 ? (
          <Cart />
        ) : (
          <div className="uppercase font-serif text-3xl text-center xs:text-xl">
            Your basket is empty
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartOrders;
