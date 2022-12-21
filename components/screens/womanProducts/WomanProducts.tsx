import { FC } from "react";
import { ProductPage } from "../../../types/product/productPage";
import Layout from "../../Layout/Layout";
import PageForProducts from "../../PageForProducts/PageForProducts";

interface WomanProductsProps {
  products: ProductPage[];
};

const WomanProducts: FC<WomanProductsProps> = ({ products }) => {
  return (
    <Layout title="Woman Products">
      <div className="container max-w-[1200px] m-auto px-[30px] sm:px-2.5">
        <PageForProducts
          title="sneakers Woman"
          category="goods for woman"
          products={products}
        />
      </div>
    </Layout>
  );
};

export default WomanProducts;
