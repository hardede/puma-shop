import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GiExitDoor } from "react-icons/gi";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";
import { useAppSelector } from "../../hooks/redux";
import useTotalPrice from "../../hooks/useTotalPrice";
import { selectCartState } from "../../store/reducers/CartSlice";
import { IUser } from "../../types/IUser";
import { ProductPage } from "../../types/product/productPage";
import { getError } from "../../utils/error";
import CheckoutItems from "./CheckoutItems/CheckoutItems";
import PaymentMethods from "./PaymentMethods/PaymentMethods";

const Checkout: FC = () => {
  const cartState = useAppSelector(selectCartState);
  const { status, data: session } = useSession();
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");

  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const router = useRouter();

  const { totalPrice, totalValueString, discountString, discount } =
    useTotalPrice();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IUser>({ mode: "onChange" });

  useEffect(() => {
    // @ts-ignore: Unreachable code error
    setValue("firstName", session?.user.firstName);
    // @ts-ignore: Unreachable code error
    setValue("lastName", session?.user.lastName);
    // @ts-ignore: Unreachable code error
    setValue("email", session?.user.email);
    setValue("city", city);
    setValue("phone", phone);
  }, [session, setValue, phone, city]);

  useEffect(() => {
    cartState.length === 0 && router.push("/checkout/cart");
  }, [router, cartState.length]);

  const submitHandler = async ({ phone, city }: any) => {
    try {
      await axios.patch("/api/auth/checkout", {
        phone,
        city,
      });
      toast.success("Delivery cleared");
    } catch (err) {
      toast.error(getError(err));
    }
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
              {status === "loading"
                ? "Loading"
                : session?.user && (
                    <div className="font-semibold">
                      {session.user.firstName} {session.user.lastName}.
                    </div>
                  )}
            </div>
            <Link href="/">
              <div
                className="ml-4 text-center py-3 hover:opacity-70 transition duration-500 cursor-pointer underline text-red-500"
                onClick={() => signOut()}
              >
                Log out
              </div>
            </Link>
          </div>
          <div>
            <form className="mt-4" onSubmit={handleSubmit(submitHandler)}>
              <div className="flex items-center py-[41px] border-b border-[#d2a1a1]">
                <p className="px-10 uppercase text-xl font-bold">
                  delivery method
                </p>
                <p className="pr-5 font-semibold">Your place of residence:</p>
                <div>
                  <input
                    {...register("city", {
                      required: "city is require field",
                      minLength: {
                        value: 3,
                        message: "There must be at least 3 letters",
                      },
                    })}
                    id="city"
                    className="placeholder:uppercase w-[195px] px-4 py-2.5 border-2 focus:border-black outline-none mr-20"
                    onChange={e => setCity(e.target.value)}
                    type="text"
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
                  <label
                    htmlFor="firstName"
                    className="uppercase text-xs mt-4 mb-1 text-[#777]"
                  >
                    firstName:
                  </label>
                  <input
                    className="placeholder:uppercase w-[300px] px-4 py-2.5 border-2 focus:border-black outline-none"
                    {...register("firstName", { disabled: true })}
                    id="firstName"
                    type="text"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="lastName"
                    className="uppercase text-xs mt-4  mb-1 text-[#777]"
                  >
                    lastName:
                  </label>
                  <input
                    className="placeholder:uppercase w-[300px] px-4 py-2.5 border-2 focus:border-black outline-none"
                    {...register("lastName", { disabled: true })}
                    id="lastName"
                    type="text"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="email"
                    className="uppercase text-xs mt-4  mb-1 text-[#777]"
                  >
                    email address:
                  </label>
                  <input
                    className="placeholder:uppercase w-[300px] px-4 py-2.5 border-2 focus:border-black outline-none"
                    {...register("email", { disabled: true })}
                    id="email"
                    type="email"
                  />
                </div>
                <div className="flex flex-col mt-4">
                  <label
                    htmlFor="phone"
                    className="uppercase text-xs  mb-1 text-[#777]"
                  >
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
                <PaymentMethods
                  isPhoneValid={isPhoneValid}
                  city={city}
                  phone={phone}
                />
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
            {cartState.map((order: ProductPage) => (
              <CheckoutItems key={order._id} order={order} />
            ))}
          </div>
          <div className="flex justify-between items-center py-0.5 text-sm text-[#181818]">
            <h4 className="">Sum</h4>
            <span>{totalValueString}</span>
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
