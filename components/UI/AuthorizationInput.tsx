import React, { FC } from "react";

const AuthorizationInput: FC<any> = React.forwardRef<HTMLInputElement>(
  function AuthorizationInput(props, ref) {
    return (
      <input
        className="placeholder:uppercase w-[382px] px-4 py-2.5 border-2 focus:border-black outline-none lg:w-[280px] md:w-full"
        {...props}
        ref={ref}
      />
    );
  }
);

export default AuthorizationInput;
