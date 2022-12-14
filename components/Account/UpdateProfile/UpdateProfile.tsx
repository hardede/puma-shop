import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { IUser } from "../../../types/IUser";
import { getError } from "../../../utils/error";
import AuthorizationInput from "../../UI/AuthorizationInput";

interface UpdateTypes {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const UpdateProfile = () => {
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<IUser>({ mode: "onChange" });

  useEffect(() => {
    // @ts-ignore: Unreachable code error
    setValue("firstName", session?.user.firstName);
    // @ts-ignore: Unreachable code error
    setValue("lastName", session?.user.lastName);
    // @ts-ignore: Unreachable code error
    setValue("email", session?.user.email);
  }, [session, setValue]);

  const submitHandler = async ({
    firstName,
    lastName,
    email,
    password,
  }: UpdateTypes) => {
    try {
      await axios.put("/api/auth/update", {
        firstName,
        lastName,
        email,
        password,
      });
      await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <div>
      <form className="mt-10" onSubmit={handleSubmit(submitHandler)}>
        <div className="flex justify-between md:block">
          <div className="flex flex-col">
            <h5 className="after:mt-3 after:block after:bg-[#d2a1a1] after:w-[520px] after:h-0.5 text-xl xl:after:w-[450px] lg:after:w-[340px] md:after:w-full">
              Personal information
            </h5>
            <div className="flex flex-col mt-10">
              <label
                htmlFor="firstName"
                className="uppercase text-xs mb-1 text-[#777]"
              >
                firstName:
              </label>
              <AuthorizationInput
                {...register("firstName", {
                  minLength: {
                    value: 3,
                    message: "There must be at least 3 letters",
                  },
                })}
                id="firstName"
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
                  minLength: {
                    value: 3,
                    message: "There must be at least 3 letters",
                  },
                })}
                id="lastName"
                type="text"
              />
              {errors?.lastName && (
                <div className="text-red-500">
                  {errors?.lastName?.message || "Error!"}
                </div>
              )}
              <label
                htmlFor="email"
                className="uppercase text-xs mt-4  mb-1 text-[#777]"
              >
                email address:
              </label>
              <AuthorizationInput
                {...register("email", {
                  pattern: {
                    value:
                      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                    message: "Please enter valid Email",
                  },
                })}
                id="email"
                type="email"
              />
              {errors?.email && (
                <div className="text-red-500">
                  {errors?.email?.message || "Error!"}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <h5 className="after:mt-3 after:block after:bg-[#d2a1a1] after:w-[520px]  after:h-0.5 text-xl xl:after:w-[450px] lg:after:w-[340px] md:hidden">
              Password
            </h5>
            <div className="flex flex-col mt-10 md:mt-4">
              <label className="uppercase text-xs mb-1 text-[#777]">
                password:
              </label>
              <AuthorizationInput
                {...register("password", {
                  required:
                    "To update profile data you need to enter new password or old one",
                  minLength: {
                    value: 6,
                    message:
                      "There must be at least 6 letters in your password",
                  },
                  maxLength: {
                    value: 15,
                    message:
                      "There cannot be more then 15 letters in your password",
                  },
                })}
                type="password"
                id="password"
                placeholder="password"
              />
              {errors.password && (
                <div className="text-red-500 ">{errors.password.message}</div>
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
                    message:
                      "There must be at least 6 letters in your password",
                  },
                  maxLength: {
                    value: 15,
                    message:
                      "There cannot be more then 15 letters in your password",
                  },
                })}
                id="confirmPassword"
                type="password"
                placeholder="confirm Password"
              />
              {errors.confirmPassword && (
                <div className="text-red-500 ">
                  {errors.confirmPassword.message}
                </div>
              )}
              {errors.confirmPassword &&
                errors.confirmPassword.type === "validate" && (
                  <div className="text-red-500 ">Password do not match</div>
                )}
            </div>
          </div>
        </div>
        <input
          type="submit"
          value="save"
          className="mt-4 w-[250px] bg-black font-bold uppercase text-xl text-white py-2.5 hover:opacity-60 transition duration-500 cursor-pointer md:w-full"
        />
      </form>
    </div>
  );
};

export default UpdateProfile;
