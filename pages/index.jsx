import Layout from "../components/Layout/Layout";
import HomePage from "../components/screens/Home";
import Product from "../models/Product";
import db from "../utils/db";

const Home= ({ products }) => {
  return (
    <Layout title="Home Page">
      <HomePage products={products} />
    </Layout>
  );
};

export default Home;

export const getServerSideProps = async () => {
  await db.connect();
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
};
