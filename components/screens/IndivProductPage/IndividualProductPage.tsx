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
      <div className="container max-w-[12000px] py-2 mt-20 m-auto px-[30px] sm:px-2.5">
        <IndividualPage product={product} />
      </div>
    </Layout>
  );
};

export default IndividualProductPage;
