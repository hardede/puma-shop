import React from "react";
import Layout from "../../Layout/Layout";
import PageForProducts from "../../PageForProducts/PageForProducts";
import data from "../../../utils/data";
import FilterMenu from "../../PageForProducts/FilterMenu/FilterMenu";

const ManProducts = () => {
  return (
    <Layout title="Man Products">
      <div className="container max-w-[1140px] m-auto">
        {/* <FilterMenu /> */}
        <PageForProducts title="goods for men" category="sneakersMan" />
      </div>
    </Layout>
  );
};

export default ManProducts;
