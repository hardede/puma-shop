import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../hooks/redux";
import { login } from "../../store/reducers/AuthSlice";
import { IUser } from "../../types/IUser";
import AuthorizationInput from "../UI/AuthorizationInput";

const Registration = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUser>({ mode: "onChange" });

  const onClickRegistration = () => {
    dispatch(login({ firstName, lastName, email, password }));
    router.push("/");
    reset();
  };

  return (
    <div>
      <h3 className="text-xl font-bold after:block after:w-[185px] after:h-0.5 after:bg-[#d2a1a1] after:mt-2">
        Registration
      </h3>
      <form
        className="flex flex-col mt-10"
        onSubmit={handleSubmit(onClickRegistration)}
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
        <label className="uppercase text-xs mt-4 mb-1 text-[#777]">
          password:
        </label>
        <AuthorizationInput
          {...register("password", {
            required: "password is require field",
            minLength: {
              value: 6,
              message: "There must be at least 6 letters in your password",
            },
            maxLength: {
              value: 15,
              message: "There cannot be more then 15 letters in your password",
            },
          })}
          type="password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          placeholder="password"
        />
        {errors?.password && (
          <div className="text-red-500">
            {errors?.password?.message || "Error!"}
          </div>
        )}
        <input
          type="submit"
          value="create an account"
          className="mt-4 bg-black font-bold uppercase text-xl text-white py-2.5 hover:opacity-60 transition duration-500 cursor-pointer"
        />
      </form>
    </div>
  );
};

export default Registration;
