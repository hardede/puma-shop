import Login from "../../Authorization/Login";
import Registration from "../../Authorization/Registration";
import Layout from "../../Layout/Layout";

const UserAuthorization = () => {
  return (
    <Layout title="Authorization">
      <div className="container flex justify-between max-w-[940px] m-auto mt-32 px-[30px] sm:px-2.5">
        <Login />
        <Registration />
      </div>
    </Layout>
  );
};

export default UserAuthorization;
