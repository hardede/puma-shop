import NextLink from "next/link";
import { forwardRef } from "react";

const Link1 = (
  { href, shallow, replace, children, passHref, className },
  ref
) => {
  return href ? (
    <NextLink
      href={href}
      passHref={passHref}
      scroll={false}
      shallow={shallow}
      replace={replace}
      prefetch={false}
      className={className}
    >
      {children}
    </NextLink>
  ) : (
    <div className={className}>{children}</div>
  );
};

export default forwardRef(Link1);
