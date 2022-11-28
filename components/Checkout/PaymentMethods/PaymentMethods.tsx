import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import dateDeliveredAt from "../../../helpers/dateDeliveredAt";
import datePaidAt from "../../../helpers/datePaidAt";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import useTotalPrice from "../../../hooks/useTotalPrice";
import {
  cartDeleteAll,
  selectCartState,
} from "../../../store/reducers/CartSlice";

interface PaymentMethodsProps {
  isPhoneValid: boolean;
  city: string;
  phone: string;
}

const PaymentMethods: FC<PaymentMethodsProps> = ({
  isPhoneValid,
  city,
  phone,
}) => {
  const { data: session } = useSession();
  const cartState = useAppSelector(selectCartState);
  const [personData, setPersonData] = useState(false);
  const [activeCard, setActiveCard] = useState(true);
  const [activeCash, setActiveCash] = useState(false);
  const { paidAt } = datePaidAt();
  const { deliveredAt } = dateDeliveredAt();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    totalPrice,
    totalQuantity,
    totalValueString,
    discountString,
    discount,
    discountByCardString,
    totalPriceWithCard,
    totalPriceWithCardString,
  } = useTotalPrice();

  useEffect(() => {}, [session]);

  const onChangePaymentMethod = () => {
    setActiveCard(!activeCard);
    setActiveCash(!activeCash);
  };

  const onClickPersonData = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setPersonData(!personData);
  };

  const user = {
    firstName: session && session?.user ? session?.user.firstName : null,
    lastName: session && session?.user ? session?.user.lastName : null,
    email: session && session?.user ? session?.user.email : null,
    city: city,
    phone: phone,
  };

  const onClickCheckout = async (e: React.SyntheticEvent) => {
    e.stopPropagation();
    await axios.post("api/orders", {
      totalPrice,
      totalQuantity,
      totalValueString,
      discount,
      discountString,
      activeCard,
      discountByCardString,
      totalPriceWithCard,
      totalPriceWithCardString,
      paidAt: paidAt,
      deliveredAt: deliveredAt,
      orderItems: cartState,
      shippingAddress: user,
    });
    router.push("/account");
    dispatch(cartDeleteAll());
  };
  return (
    <>
      <h4 className="mt-8 px-10 py-[41px] uppercase text-lg font-bold border-y border-[#d2a1a1]">
        payment method
      </h4>
      <div className="border-b [#d2a1a1] border-[#d2a1a1] pb-[41px]">
        <div className="flex px-10 pt-10">
          <input
            type="radio"
            checked={activeCard}
            onChange={onChangePaymentMethod}
          />
          <p className="pl-1" onClick={onChangePaymentMethod}>
            Bank card{" "}
            <span className="text-red-500">(5% discount + free shipping)</span>
          </p>
        </div>
        <div
          className={activeCard ? " px-10" : "hidden"}
          onClick={onChangePaymentMethod}
        >
          <div className="flex">
            <input
              className={personData ? "" : "mt-5 mb-2"}
              type="checkbox"
              checked={personData}
              onChange={onClickPersonData}
            />
            <p
              className={
                personData ? "pl-1 py-5 text-xs" : "pl-1  pt-5 pb-2  text-xs"
              }
              onClick={onClickPersonData}
            >
              I agree with the{" "}
              <Link href="https://ua.puma.com/uk/terms.html">
                <a className="cursor=pointer font-medium hover:underline text-sm">
                  Basic Terms
                </a>
              </Link>{" "}
              and the{" "}
              <Link href="https://ua.puma.com/uk/politika-obrabotki.html">
                <a className="cursor=pointer font-medium hover:underline text-sm">
                  Regulation on the processing of personal data
                </a>
              </Link>
            </p>
          </div>
          {!personData && (
            <div className="text-sm text-red-500 mb-5">
              You need to accept Privacy
            </div>
          )}
          <input
            disabled={!isPhoneValid}
            type="submit"
            value="checkout"
            className=" px-10 py-2 bg-red-500 text-white text-xl uppercase"
            onClick={onClickCheckout}
          />
        </div>
      </div>
      <div className="border-b [#d2a1a1] border-[#d2a1a1] pb-[41px]">
        <div className="flex px-10 pt-6">
          <input
            type="radio"
            checked={activeCash}
            onChange={onChangePaymentMethod}
          />
          <p className="pl-1" onClick={onChangePaymentMethod}>
            Payment in cash upon receipt
          </p>
        </div>
        <div
          className={activeCash ? " px-10 " : "hidden"}
          onClick={onChangePaymentMethod}
        >
          <div className="flex">
            <input
              className={personData ? "" : "mt-5 mb-2"}
              type="checkbox"
              checked={personData}
              onChange={onClickPersonData}
            />
            <p
              className={
                personData ? "pl-1 py-5 text-xs" : "pl-1  pt-5 pb-2  text-xs"
              }
              onClick={onClickPersonData}
            >
              I agree with the{" "}
              <Link href="https://ua.puma.com/uk/terms.html">
                <a className="cursor=pointer font-medium hover:underline text-sm">
                  Basic Terms
                </a>
              </Link>{" "}
              and the{" "}
              <Link href="https://ua.puma.com/uk/politika-obrabotki.html">
                <a className="cursor=pointer font-medium hover:underline text-sm">
                  Regulation on the processing of personal data
                </a>
              </Link>
            </p>
          </div>
          {!personData && (
            <div className="text-sm text-red-500 mb-5">
              You need to accept Privacy
            </div>
          )}
          <input
            disabled={!isPhoneValid}
            type="submit"
            value="checkout"
            className=" px-10 py-2 bg-red-500 text-white text-xl uppercase"
            onClick={onClickCheckout}
          />
        </div>
      </div>
    </>
  );
};

export default PaymentMethods;
