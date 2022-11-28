import Link from "next/link";
import { useRouter } from "next/router";
import AdminMenuDetails from "../../AdminMenu/AdminMenuDetails";
import { adminLinks } from "../../constants/adminLinks";
import Layout from "../../Layout/Layout";

interface Links {
  id: string;
  link: string;
  href: string;
}

const AdminOrderDetails = () => {
  const router = useRouter();
  return (
    <Layout title="Admin details">
      <div className="flex justify-between container max-w-[1140px] mt-20 m-auto">
        <div>
          <ul>
            {adminLinks.map((item: Links) => (
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
        <AdminMenuDetails />
      </div>
    </Layout>
  );
};

export default AdminOrderDetails;
