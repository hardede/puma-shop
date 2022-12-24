import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  selectUserEdit,
  selectUserEditError,
  selectUserEditIsLoading,
  userToEdit,
} from "../../store/reducers/Admin/AdminUserEditSlice";
import { IUser } from "../../types/IUser";
import { getError } from "../../utils/error";

const AdminMenuUserEdit = () => {
  const { query } = useRouter();
  const router = useRouter();
  const userId = query.id;
  const [phone, setPhone] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const dispatch = useAppDispatch();
  const userToEditState = useAppSelector<IUser>(selectUserEdit);
  const isLoading = useAppSelector(selectUserEditIsLoading);
  const error = useAppSelector(selectUserEditError);

  useEffect(() => {
    dispatch(userToEdit(userId));
  }, [dispatch, userId]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IUser>();

  useEffect(() => {
    setValue("firstName", userToEditState.firstName);
    setValue("lastName", userToEditState.lastName);
    setValue("email", userToEditState.email);
    setValue("city", userToEditState.city);
    setValue("phone", phone);
  }, [
    phone,
    userToEditState.city,
    userToEditState.firstName,
    userToEditState.lastName,
    userToEditState.email,
    setValue,
  ]);

  const submitHandler = async ({
    firstName,
    lastName,
    email,
    phone,
    city,
  }: any) => {
    try {
      await axios.put(`/api/admin/users/${userId}`, {
        firstName,
        lastName,
        email,
        phone,
        city,
      });
      toast.success("User updated successfully");
      router.push("/admin/users");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <div className="md:col-span-3">
      {isLoading ? (
        <div className="block border-4 border-red-500 rounded-full border-dashed w-28 h-28 mx-auto mt-20 text-center pt-10 text-red-500 animate-rotateLoader">
          Loading...
        </div>
      ) : error ? (
        <div className="alert-error">{error}</div>
      ) : (
        <form
          className="mx-auto max-w-screen-md"
          onSubmit={handleSubmit(submitHandler)}
        >
          <h1 className="mb-4 text-xl">{`Edit User ${userId}`}</h1>
          <div className="grid grid-cols-2 md:grid-cols-1">
            <div className="mb-4 flex flex-col">
              <label
                htmlFor="firstName"
                className="uppercase text-sm mb-1 text-[#777]"
              >
                first name:
              </label>
              <input
                type="text"
                className="placeholder:uppercase w-[300px] px-4 py-2.5 border-2 focus:border-black outline-none mr-20 md:w-full"
                id="firstName"
                autoFocus
                {...register("firstName", {
                  required: "Please enter firstName",
                  minLength: {
                    value: 3,
                    message: "There must be at least 3 letters",
                  },
                  maxLength: {
                    value: 30,
                    message: "Maximum length is 30",
                  },
                })}
              />
              {errors?.firstName && (
                <div className="text-red-500">
                  {errors?.firstName?.message || "Error!"}
                </div>
              )}
            </div>
            <div className="mb-4 flex flex-col">
              <label
                htmlFor="lastName"
                className="uppercase text-sm mb-1 text-[#777]"
              >
                Last name:
              </label>
              <input
                type="text"
                className="placeholder:uppercase w-[300px] px-4 py-2.5 border-2 focus:border-black outline-none mr-20 md:w-full"
                id="lastName"
                {...register("lastName", {
                  required: "Please enter lastName",
                  minLength: {
                    value: 3,
                    message: "There must be at least 3 letters",
                  },
                  maxLength: {
                    value: 30,
                    message: "Maximum length is 30",
                  },
                })}
              />
              {errors.lastName && (
                <div className="text-red-500">{errors.lastName.message}</div>
              )}
            </div>
            <div className="mb-4 flex flex-col">
              <label
                htmlFor="email"
                className="uppercase text-sm mb-1 text-[#777]"
              >
                email:
              </label>
              <input
                type="text"
                className="placeholder:uppercase w-[300px] px-4 py-2.5 border-2 focus:border-black outline-none mr-2 md:w-full"
                id="email"
                {...register("email", {
                  required: "Please enter email",
                  pattern: {
                    value:
                      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                    message: "Please enter valid Email",
                  },
                  maxLength: {
                    value: 40,
                    message: "Maximum length is 40",
                  },
                })}
              />
              {errors.email && (
                <div className="text-red-500">{errors.email.message}</div>
              )}
            </div>
            <div className="mb-4 flex flex-col">
              <label
                htmlFor="city"
                className="uppercase text-sm mb-1 text-[#777]"
              >
                City:
              </label>
              <input
                type="text"
                className="placeholder:uppercase w-[300px] px-4 py-2.5 border-2 focus:border-black outline-none mr-20 md:w-full"
                id="city"
                {...register("city", {
                  required: "Please enter city",
                  minLength: {
                    value: 3,
                    message: "There must be at least 3 letters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Maximum length is 20",
                  },
                })}
              />
              {errors.city && (
                <div className="text-red-500">{errors.city.message}</div>
              )}
            </div>
            <div className="flex flex-col mb-4">
              <label
                htmlFor="phone"
                className="uppercase text-sm mb-1 text-[#777]"
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
                    (value.startsWith(dialCode) || dialCode.startsWith(value))
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
          <div className="flex">
            <input
              disabled={!isPhoneValid}
              type="submit"
              value={isLoading ? "Loading" : "Update User"}
              className="w-[140px] h-[40px] mr-5 text-white bg-green-500 border-white border-2 hover:text-black hover:border-black hover:bg-opacity-50 transition-all duration-500 cursor-pointer"
            />
            <div className="mb-4 w-[140px] py-1.5 text-center text-white bg-orange-500 border-white border-2 hover:text-black hover:border-black hover:bg-opacity-50 transition-all duration-500">
              <Link href={`/admin/users`}>Back</Link>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminMenuUserEdit;
