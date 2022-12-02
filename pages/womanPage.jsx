import WomanProducts from "../components/screens/womanProducts/WomanProducts";
import Product from "../models/Product";
import db from "../utils/db";

const WomanPage= ({ products }) => {
  return <WomanProducts products={products} />;
};

export default WomanPage;

export const getServerSideProps = async () => {
  try {
    await db.connect();
    const products = await Product.find({ productFor: "woman" }).lean();
    return {
      props: {
        products: products.map(db.convertDocToObj),
      },
    };
  } catch (e) {
    console.error(e);
  }
};
