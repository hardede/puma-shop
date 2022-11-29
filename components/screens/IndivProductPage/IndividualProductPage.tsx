import { FC } from "react";
import { ProductPage } from "../../../types/product/productPage";
import IndividualPage from "../../IndividualPage/IndividualPage";
import Layout from "../../Layout/Layout";

interface IndividualProps {
  product: ProductPage;
}

const IndividualProductPage: FC<IndividualProps> = ({ product }) => {
  return (
    <Layout title="Man sorted products">
      <div className="container max-w-[1140px] py-2 mt-20 m-auto">
        <IndividualPage product={product} />
      </div>
    </Layout>
  );
};

export default IndividualProductPage;
