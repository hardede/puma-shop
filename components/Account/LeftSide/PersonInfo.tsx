import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  selectUserState,
  updatePersonInfo
} from "../../../store/reducers/AuthSlice";
import { IUser } from "../../../types/IUser";
import AuthorizationInput from "../../UI/AuthorizationInput";

const PersonInfo = () => {
  const userState = useAppSelector(selectUserState);
  const [firstName, setFirstName] = useState(userState.firstName);
  const [lastName, setLastName] = useState(userState.lastName);
  const [email, setEmail] = useState(userState.email);
  const dispatch = useAppDispatch();
  const password = userState.password;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUser>({ mode: "onChange" });

  const onClickPersonInfo = () => {
    dispatch(updatePersonInfo({ firstName, lastName, email, password }));
    reset();
  };

  return (
    <div>
      <h5 className="after:mt-3 after:block after:bg-[#d2a1a1] after:w-[520px] after:h-0.5 text-xl">
        Personal information
      </h5>
      <form
        className="flex flex-col mt-10"
        onSubmit={handleSubmit(onClickPersonInfo)}
      >
        <label className="uppercase text-xs mb-1 text-[#777]">firstName:</label>
        <AuthorizationInput
          {...register("firstName", {
            required: "firstName is require field",
            minLength: {
              value: 3,
              message: "There must be at least 3 letters",
            },
          })}
          value={firstName}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFirstName(e.target.value)
          }
          placeholder="firstName"
          type="firstName"
        />
        {errors?.firstName && (
          <div className="text-red-500">
            {errors?.firstName?.message || "Error!"}
          </div>
        )}
        <label className="uppercase text-xs mt-4  mb-1 text-[#777]">
          lastName:
        </label>
        <AuthorizationInput
          {...register("lastName", {
            required: "lastName is require field",
            minLength: {
              value: 3,
              message: "There must be at least 3 letters",
            },
          })}
          value={lastName}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setLastName(e.target.value)
          }
          placeholder="lastName"
          type="lastName"
        />
        {errors?.lastName && (
          <div className="text-red-500">
            {errors?.lastName?.message || "Error!"}
          </div>
        )}
        <label className="uppercase text-xs mt-4  mb-1 text-[#777]">
          email address:
        </label>
        <AuthorizationInput
          {...register("email", {
            required: "email is require field",
            pattern: {
              value:
                /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
              message: "Please enter valid Email",
            },
          })}
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          placeholder="e-mail"
          type="email"
        />
        {errors?.email && (
          <div className="text-red-500">
            {errors?.email?.message || "Error!"}
          </div>
        )}
        <input
          type="submit"
          value="save"
          className="mt-4 w-[250px] bg-black font-bold uppercase text-xl text-white py-2.5 hover:opacity-60 transition duration-500 cursor-pointer"
        />
      </form>
    </div>
  );
};

export default PersonInfo;
