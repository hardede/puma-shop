import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GiExitDoor } from "react-icons/gi";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import useTotalPrice from "../../hooks/useTotalPrice";
import {
  logout,
  selectUserState,
  updatePersonInfo,
} from "../../store/reducers/AuthSlice";
import { selectCartState } from "../../store/reducers/CartSlice";
import { IUser } from "../../types/IUser";
import { ProductPage } from "../../types/product/productPage";
import CheckoutItems from "./CheckoutItems/CheckoutItems";
import PaymentMethods from "./PaymentMethods/PaymentMethods";

interface CheckoutProps extends ProductPage {
  size: number;
  quantity: number;
  countInStock: number;
}

const Checkout: FC = () => {
  const userState = useAppSelector(selectUserState);
  const cartState = useAppSelector(selectCartState);
  const { status, data: session } = useSession();

  const [firstName, setFirstName] = useState(
    status === "loading" ? "Loading" : session?.user && session.user.firstName
  );
  const [lastName, setLastName] = useState(
    status === "loading" ? "Loading" : session?.user && session.user.lastName
  );

  const [email, setEmail] = useState(
    status === "loading" ? "Loading" : session?.user && session.user.email
  );
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState(userState.city ? userState.city : "");

  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { totalPrice, totalPriceOld, discountString, discount } =
    useTotalPrice();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUser>({ mode: "onChange" });

  useEffect(() => {
    cartState.length === 0 && router.push("/checkout/cart");
  }, []);

  const onClickPersonInfo = () => {
    dispatch(updatePersonInfo({ firstName, lastName, email, phone, city }));
    reset();
  };

  return (
    <div className="mt-[140px]">
      <div className="flex justify-between">
        <div className="mr-10">
          <div className="flex items-center py-[41px] border-y border-[#d2a1a1]">
            <div className="pl-10">
              <GiExitDoor className="text-2xl" />
            </div>
            <div className="flex ml-44">
              You are logged in as&nbsp;
              <p className="font-semibold">
                {userState.firstName} {userState.lastName}.
              </p>
            </div>
            <Link href="/">
              <div
                className="ml-4 text-center py-3 hover:opacity-70 transition duration-500 cursor-pointer underline text-red-500"
                onClick={() => dispatch(logout())}
              >
                Log out
              </div>
            </Link>
          </div>
          <div>
            <form className="mt-4" onSubmit={handleSubmit(onClickPersonInfo)}>
              <div className="flex items-center py-[41px] border-b border-[#d2a1a1]">
                <p className="px-10 uppercase text-xl font-bold">
                  delivery method
                </p>
                <p className="pr-5 font-semibold">Your place of residence:</p>
                <div>
                  <input
                    value={city}
                    {...register("city", {
                      required: "city is require field",
                      minLength: {
                        value: 3,
                        message: "There must be at least 3 letters",
                      },
                    })}
                    onChange={e => setCity(e.target.value)}
                    className="placeholder:uppercase w-[195px] px-4 py-2.5 border-2 focus:border-black outline-none mr-20"
                  />
                  {errors?.city && (
                    <div className="text-red-500 absolute">
                      {errors?.city?.message || "Error!"}
                    </div>
                  )}
                </div>
              </div>
              <h4 className="mt-8 uppercase text-lg font-bold">
                Contact information
              </h4>
              <div className="grid grid-cols-2">
                <div className="flex flex-col">
                  <label className="uppercase text-xs mt-4 mb-1 text-[#777]">
                    firstName:
                  </label>
                  <input
                    className="placeholder:uppercase w-[300px] px-4 py-2.5 border-2 focus:border-black outline-none"
                    {...register("firstName", {
                      required: "firstName is require field",
                      minLength: {
                        value: 3,
                        message: "There must be at least 3 letters",
                      },
                    })}
                    // @ts-ignore: Unreachable code error
                    value={
                      status === "loading"
                        ? "Loading"
                        : session?.user && session.user.firstName
                    }
                    // onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    //   setFirstName(e.target.value)
                    // }
                    placeholder="firstName"
                    type="firstName"
                  />
                  {errors?.firstName && (
                    <div className="text-red-500">
                      {errors?.firstName?.message || "Error!"}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="uppercase text-xs mt-4  mb-1 text-[#777]">
                    lastName:
                  </label>
                  <input
                    className="placeholder:uppercase w-[300px] px-4 py-2.5 border-2 focus:border-black outline-none"
                    {...register("lastName", {
                      required: "lastName is require field",
                      minLength: {
                        value: 3,
                        message: "There must be at least 3 letters",
                      },
                    })}
                    // @ts-ignore: Unreachable code error
                    value={
                      status === "loading"
                        ? "Loading"
                        : session?.user && session.user.lastName
                    }
                    // onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    //   setLastName(e.target.value)
                    // }
                    placeholder="lastName"
                    type="lastName"
                  />
                  {errors?.lastName && (
                    <div className="text-red-500">
                      {errors?.lastName?.message || "Error!"}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="uppercase text-xs mt-4  mb-1 text-[#777]">
                    email address:
                  </label>
                  <input
                    className="placeholder:uppercase w-[300px] px-4 py-2.5 border-2 focus:border-black outline-none"
                    {...register("email", {
                      required: "email is require field",
                      pattern: {
                        value:
                          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                        message: "Please enter valid Email",
                      },
                    })}
                    // @ts-ignore: Unreachable code error
                    value={
                      status === "loading"
                        ? "Loading"
                        : session?.user && session.user.email
                    }
                    // onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    //   setEmail(e.target.value)
                    // }
                    placeholder="e-mail"
                    type="email"
                  />
                  {errors?.email && (
                    <div className="text-red-500">
                      {errors?.email?.message || "Error!"}
                    </div>
                  )}
                </div>
                <div className="flex flex-col mt-4">
                  <label className="uppercase text-xs  mb-1 text-[#777]">
                    phone:
                  </label>
                  <PhoneInput
                    inputStyle={{
                      color: "#d2a1a1",
                      height: "48px",
                      fontSize: "18px",
                    }}
                    containerStyle={{ height: "48px" }}
                    buttonStyle={{}}
                    country={"ua"}
                    onlyCountries={["ua"]}
                    placeholder="+380"
                    value={phone}
                    onChange={(
                      value,
                      country: any,
                      e: ChangeEvent<HTMLInputElement>,
                      formattedValue
                    ) => {
                      const { format, dialCode } = country;
                      if (
                        format?.length === formattedValue?.length &&
                        (value.startsWith(dialCode) ||
                          dialCode.startsWith(value))
                      ) {
                        setIsPhoneValid(true);
                        setPhone(e.target.value);
                      } else {
                        setIsPhoneValid(false);
                      }
                    }}
                  />
                  {isPhoneValid ? (
                    ""
                  ) : (
                    <div className="text-red-500">phone is not valid</div>
                  )}
                </div>
              </div>
              <div className="">
                <PaymentMethods isPhoneValid={isPhoneValid} />
              </div>
            </form>
          </div>
        </div>
        <div className="w-[346px] h-fit p-4 bg-[#f9f9f9]">
          <div className="flex justify-between pb-4 border-b border-[#d2a1a1]">
            <p className="uppercase">your order</p>
            <Link href="/checkout/cart">
              <div className="cursor-pointer">Change</div>
            </Link>
          </div>
          <div className="mb-4">
            {cartState.map((order: CheckoutProps) => (
              <CheckoutItems key={order.id} order={order} />
            ))}
          </div>
          <div className="flex justify-between items-center py-0.5 text-sm text-[#181818]">
            <h4 className="">Sum</h4>
            <span>{totalPriceOld}</span>
          </div>
          <div
            className={
              discount === 0
                ? "hidden"
                : "flex justify-between items-center py-0.5 text-sm text-[#181818]"
            }
          >
            <h4 className="">Discount</h4>
            <span>{discountString}</span>
          </div>
          <div className="flex justify-between items-center py-0.5 text-sm text-[#181818]">
            <h4 className="">Delivery</h4>
            <span>0</span>
          </div>
          <div className="flex justify-between items-center font-bold text-xl text-[#181818]">
            <h4 className="uppercase">All</h4>
            <span>{totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
