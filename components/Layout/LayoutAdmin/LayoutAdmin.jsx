import Link from "next/link";
import React from "react";
import Layout from "../Layout";
import { adminLinks } from "../../constants/adminLinks";
import { useRouter } from "next/router";

const LayoutAdmin = ({ children, title }) => {
  const router = useRouter()

  return (
    <Layout title={title}>
      <div className="container max-w-[1140px] mt-20 m-auto">
        <div className="grid pt-10 md:grid-cols-4 md:gap-5">
          <div>
            <ul>
              {adminLinks.map(item => (
                <li key={item.id} className="py-2 text-lg">
                  <Link href={item.href}>
                    <a className={item.href === router.pathname ? "text-red-600 font-bold" : ""}>
                      {item.link}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {children}
        </div>
      </div>
    </Layout>
  );
};

export default LayoutAdmin;
