import ManProducts from "../components/screens/manProducts/ManProducts";
import Product from "../models/Product";
import db from "../utils/db";

const ManPage= ({ products }) => {
  return <ManProducts products={products} />;
};

export default ManPage;

export const getServerSideProps = async () => {
    await db.connect();
    const products = await Product.find({ productFor: "man" }).lean();
    return {
      props: {
        products: products.map(db.convertDocToObj),
      },
    };
};

