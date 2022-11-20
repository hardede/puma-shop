import Link from "next/link";
import AdminMenuOrders from "../../AdminMenu/AdminMenuOrders";
import { adminLinks } from "../../constants/adminLinks";
import Layout from "../../Layout/Layout";

interface Links {
  id: string;
  link: string;
  href: string;
}

const AdminOrder = () => {
  return (
    <Layout title="Admin Orders">
      <div className="container max-w-[1140px] mt-20 m-auto">
        <div className="grid md:grid-cols-4 md:gap-5">
          <div>
            <ul>
              {adminLinks.map((item: Links) => (
                <li key={item.id}>
                  <Link href={item.href}>
                    <a className={item.link === "Orders" ? "fond-bold" : ""}>
                      {item.link}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <AdminMenuOrders />
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrder;
