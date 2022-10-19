import type { NextPage } from "next";
import Layout from "../components/Layout/Layout";
import HomePage from "../components/screens/Home";

const Home: NextPage = () => {
  return (
    <Layout title="Home Page">
      <HomePage />
    </Layout>
  );
};

export default Home;