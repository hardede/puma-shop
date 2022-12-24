import { signOut } from "next-auth/react";
import Link from "next/link";
import UserProfile from "../../Account/UserProfile";
import Layout from "../../Layout/Layout";

const UserAccount = () => {
  const onClickLogOut = () => {
    signOut();
  };

  return (
    <Layout title="User Account">
      <div className="flex justify-between items-center mt-20 px-28 py-[26px]  bg-[#eee] w-screen md:px-14 xs:px-2.5">
        <h4 className="text-2xl uppercase xs:text-xl">Profile</h4>
        <Link href="/">
          <div
            className="text-center py-3 hover:opacity-70 transition duration-500 cursor-pointer underline uppercase"
            onClick={onClickLogOut}
          >
            Log out
          </div>
        </Link>
      </div>
      <div className="container max-w-[1200px] m-auto px-[30px] sm:px-2.5">
        <UserProfile />
      </div>
    </Layout>
  );
};

export default UserAccount;
