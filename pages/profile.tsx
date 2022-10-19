import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { IUser } from "../types/IUser";

export default function ProfileScreen() {
  const { status, data: session } = useSession();

   const {
     handleSubmit,
     register,
     getValues,

     formState: { errors },
   } = useForm<IUser>({});

  return <div>ProfileScreen</div>;
}
