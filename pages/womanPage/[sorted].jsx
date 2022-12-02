import "rc-slider/assets/index.css";
import WomanProductsSorted from "../../components/screens/womanProducts/WomanProductsSorted";
import Product from "../../models/Product";
import db from "../../utils/db";

const SortedScreen = ({ products }) => {
  return <WomanProductsSorted products={products} />;
};

export default SortedScreen;

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
