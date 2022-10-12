import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../hooks/redux";
import { login } from "../../store/reducers/AuthSlice";
import { IUser } from "../../types/IUser";
import AuthorizationInput from "../UI/AuthorizationInput";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUser>({ mode: "onChange" });

  const onClickLogin = () => {
    setIsAuth(!isAuth);
    dispatch(login({ email, password, isAuth }));
    router.push("/");
    reset();
  };

  return (
    <div>
      <h3 className="text-xl font-bold after:block after:w-[185px] after:h-0.5 after:bg-[#d2a1a1] after:mt-2">
        Log in
      </h3>
      <form
        className="flex flex-col mt-10"
        onSubmit={handleSubmit(onClickLogin)}
      >
        <label className="uppercase text-xs mb-1 text-[#777]">
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
          value="log in"
          className="mt-4 bg-black font-bold uppercase text-xl text-white py-2.5 hover:opacity-60 transition duration-500 cursor-pointer"
        />
      </form>
    </div>
  );
};

export default Login;
