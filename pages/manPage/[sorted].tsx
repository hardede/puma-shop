import "rc-slider/assets/index.css";
import ManProductsSorted from "../../components/screens/manProducts/ManProductsSorted";
import Product from "../../models/Product";
import db from "../../utils/db";

const SortedScreen = ({ products }: any) => {
  return <ManProductsSorted products={products} />;
};

export default SortedScreen;

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({ productFor: "man" }).lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
