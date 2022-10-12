import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  selectUserState,
  updatePassword,
} from "../../../store/reducers/AuthSlice";
import { IUser } from "../../../types/IUser";
import AuthorizationInput from "../../UI/AuthorizationInput";

const Password = () => {
  const userState = useAppSelector(selectUserState);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRepeat, setNewPasswordRepeat] = useState("");
  const dispatch = useAppDispatch();
  const firstName = userState.firstName;
  const lastName = userState.lastName;
  const email = userState.email;
  const oldPassword = userState.password;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUser>({ mode: "onChange" });

  const onClickPassword = () => {
    oldPassword === password
      ? newPassword === newPasswordRepeat
        ? dispatch(
            updatePassword({
              firstName,
              lastName,
              email,
              password: newPassword,
            })
          )
        : alert("Passwords do not match")
      : alert("Password is  not correct");
    reset();
  };
  return (
    <div>
      <h5 className="after:mt-3 after:block after:bg-[#d2a1a1] after:w-[520px]  after:h-0.5 text-xl">
        Password
      </h5>
      <form
        className="flex flex-col mt-10"
        onSubmit={handleSubmit(onClickPassword)}
      >
        <label className="uppercase text-xs mb-1 text-[#777]">password:</label>
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
        <label className="uppercase text-xs mt-4 mb-1 text-[#777]">
          new password:
        </label>
        <AuthorizationInput
          {...register("password1", {
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
          value={newPassword}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNewPassword(e.target.value)
          }
          placeholder="new password"
        />
        {errors?.password && (
          <div className="text-red-500">
            {errors?.password?.message || "Error!"}
          </div>
        )}
        <label className="uppercase text-xs mt-4 mb-1 text-[#777]">
          repeat password:
        </label>
        <AuthorizationInput
          {...register("password2", {
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
          value={newPasswordRepeat}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNewPasswordRepeat(e.target.value)
          }
          placeholder="Repeat Password"
        />
        {errors?.password && (
          <div className="text-red-500">
            {errors?.password?.message || "Error!"}
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

export default Password;
