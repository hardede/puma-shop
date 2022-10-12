import Link from "next/link";
import React from "react";
import { footerAbout, footerHelp1, footerHelp2 } from "../../constants/footer";

export const FooterCol1 = () => {
  return (
    <div className="mr-40">
      <h1 className="mb-4">Help</h1>
      {footerHelp1.map(link => (
        <div
          key={link.id}
          className="opacity-50 hover:opacity-100 transition ease-in-out duration-200 pb-1 last:pb-0"
        >
          <Link href={link.href}>
            <a>{link.title}</a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export const FooterCol2 = () => {
  return (
    <div className="pt-10 mr-40">
      {footerHelp2.map(link => (
        <div
          key={link.id}
          className="opacity-50 hover:opacity-100 transition ease-in-out duration-200 pb-1 last:pb-0"
        >
          <Link href={link.href}>
            <a>{link.title}</a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export const FooterCol3 = () => {
  return (
    <div className="">
      <h1 className="mb-4">About Puma</h1>
      {footerAbout.map(link => (
        <div
          key={link.id}
          className="opacity-50 hover:opacity-100 transition ease-in-out duration-200 pb-1 last:pb-0"
        >
          <Link href={link.href}>
            <a>{link.title}</a>
          </Link>
        </div>
      ))}
    </div>
  );
};
