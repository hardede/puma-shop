import React from "react";
import Layout from "../../Layout/Layout";
import PageForProducts from "../../PageForProducts/PageForProducts";

const WomanPage = () => {
  return (
    <Layout title="Woman Products">
      <div className="container max-w-[1140px] m-auto">
        {/* <FilterMenu /> */}
        <PageForProducts title="goods for woman" category="sneakersWoman" />
      </div>
    </Layout>
  );
};

export default WomanPage;
