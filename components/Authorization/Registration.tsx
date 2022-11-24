import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { IUser } from "../../types/IUser";
import { getError } from "../../utils/error";
import AuthorizationInput from "../UI/AuthorizationInput";

interface RegisterTypes {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const Registration = () => {
  const router = useRouter();
  const { redirect } = router.query;
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<IUser>({ mode: "onChange" });

  useEffect(() => {
    if (session?.user) {
      // @ts-ignore: Unreachable code error
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);

  const submitHandler = async ({
    firstName,
    lastName,
    email,
    password,
  }: RegisterTypes) => {
    try {
      await axios.post("/api/auth/signup", {
        firstName,
        lastName,
        email,
        password,
      });
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result?.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold after:block after:w-[185px] after:h-0.5 after:bg-[#d2a1a1] after:mt-2">
        Registration
      </h3>
      <form
        className="flex flex-col mt-10"
        onSubmit={handleSubmit(submitHandler)}
      >
        <label
          htmlFor="firstName"
          className="uppercase text-xs mb-1 text-[#777]"
        >
          firstName:
        </label>
        <AuthorizationInput
          {...register("firstName", {
            required: "firstName is require field",
            minLength: {
              value: 3,
              message: "There must be at least 3 letters",
            },
          })}
          id="firstName"
          placeholder="firstName"
          type="text"
        />
        {errors?.firstName && (
          <div className="text-red-500">
            {errors?.firstName?.message || "Error!"}
          </div>
        )}
        <label
          htmlFor="lastName"
          className="uppercase text-xs mt-4  mb-1 text-[#777]"
        >
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
          id="lastName"
          placeholder="lastName"
          type="text"
        />
        {errors?.lastName && (
          <div className="text-red-500">
            {errors?.lastName?.message || "Error!"}
          </div>
        )}
        <label
          htmlFor="emailReg"
          className="uppercase text-xs mt-4  mb-1 text-[#777]"
        >
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
          id="emailReg"
          placeholder="e-mail"
          type="email"
        />
        {errors?.email && (
          <div className="text-red-500">
            {errors?.email?.message || "Error!"}
          </div>
        )}
        <label
          htmlFor="password"
          className="uppercase text-xs mt-4 mb-1 text-[#777]"
        >
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
          id="password"
          type="password"
          placeholder="password"
        />
        {errors?.password && (
          <div className="text-red-500">
            {errors?.password?.message || "Error!"}
          </div>
        )}
        <label
          htmlFor="confirmPassword"
          className="uppercase text-xs mt-4 mb-1 text-[#777]"
        >
          confirm password:
        </label>
        <AuthorizationInput
          {...register("confirmPassword", {
            required: "password is require field",
            validate: value => value === getValues("password"),
            minLength: {
              value: 6,
              message: "There must be at least 6 letters in your password",
            },
            maxLength: {
              value: 15,
              message: "There cannot be more then 15 letters in your password",
            },
          })}
          id="confirmPassword"
          type="password"
          placeholder="password"
        />
        {errors.confirmPassword && (
          <div className="text-red-500">{errors?.confirmPassword.message}</div>
        )}
        {errors.confirmPassword &&
          errors.confirmPassword.type === "validate" && (
            <div className="text-red-500">Password do not match</div>
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
