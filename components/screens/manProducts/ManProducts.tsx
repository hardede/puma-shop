import { FC } from "react";
import { ProductPage } from "../../../types/product/productPage";
import Layout from "../../Layout/Layout";
import PageForProducts from "../../PageForProducts/PageForProducts";

interface ManProductsProps {
  products: ProductPage[];
}

const ManProducts: FC<ManProductsProps> = ({ products }) => {
  return (
    <Layout title="Man Products">
      <div className="container max-w-[1200px] m-auto px-[30px] sm:px-2.5">
        <PageForProducts
          title="sneakers Man"
          category="goods for men"
          products={products}
        />
      </div>
    </Layout>
  );
};

export default ManProducts;
