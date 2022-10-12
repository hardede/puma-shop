import Link from "next/link";
import { useAppDispatch } from "../../../hooks/redux";
import { logout } from "../../../store/reducers/AuthSlice";
import UserProfile from "../../Account/UserProfile";
import Layout from "../../Layout/Layout";

const UserAccount = () => {
  const dispatch = useAppDispatch();

  return (
    <Layout title="Woman Products">
      <div className="flex justify-between items-center mt-20 px-28 py-[26px]  bg-[#eee] w-screen">
        <h4 className="text-2xl uppercase">Profile</h4>
        <Link href="/">
          <div
            className=" text-center py-3 hover:opacity-70 transition duration-500 cursor-pointer underline uppercase"
            onClick={() => dispatch(logout())}
          >
            Log out
          </div>
        </Link>
      </div>
      <div className="container max-w-[1120px] m-auto">
        <UserProfile />
      </div>
    </Layout>
  );
};

export default UserAccount;
