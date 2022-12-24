import Link from "next/link";
import { useRouter } from "next/router";
import { adminLinks } from "../../constants/adminLinks";
import Layout from "../Layout";

const LayoutAdmin = ({ children, title }) => {
  const router = useRouter();

  return (
    <Layout title={title}>
      <div className="container mt-20 max-w-[1200px] m-auto px-[30px] sm:px-2.5">
        <div className="grid grid-cols-[15%_85%] pt-10 lg:grid-cols-1">
          <div className="mr-5 lg:mr-0">
            <ul className="lg:grid lg:grid-cols-4 lg:text-center xs:grid-cols-2">
              {adminLinks.map(item => (
                <li key={item.id} className="py-2 text-lg">
                  <Link href={item.href}>
                    <a
                      className={
                        item.href === router.pathname
                          ? "text-red-600 font-bold"
                          : ""
                      }
                    >
                      {item.link}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:mt-10">{children}</div>
        </div>
      </div>
    </Layout>
  );
};

export default LayoutAdmin;
