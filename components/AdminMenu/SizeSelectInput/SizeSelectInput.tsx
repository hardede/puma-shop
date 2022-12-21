import React, { useState } from "react";

const SizeSelectInput = ({ item }: any) => {
  const [sizeCount, setSizeCount] = useState();
  return (
    <>
      <input
        value={sizeCount}
        defaultValue={item.sizeCountInStock}
        // onChange={e => setSizeCount(e.target.value)}
        className="placeholder:uppercase w-[100px] px-4 py-0.5 border-2 focus:border-black outline-none mr-20"
      />
    </>
  );
};

export default SizeSelectInput;
