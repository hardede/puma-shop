import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { IUser } from "../../types/IUser";
import { getError } from "../../utils/error";
import AuthorizationInput from "../UI/AuthorizationInput";

const Login = () => {
  const router = useRouter();
  const { redirect } = router.query;
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      // @ts-ignore: Unreachable code error
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({ mode: "onChange" });

  const submitHandler = async ({ email, password }: any) => {
    try {
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
        Log in
      </h3>
      <form
        className="flex flex-col mt-10"
        onSubmit={handleSubmit(submitHandler)}
      >
        <label htmlFor="email" className="uppercase text-xs mb-1 text-[#777]">
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
          id="email"
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
          htmlFor="password"
          type="password"
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
