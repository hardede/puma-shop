import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { toast } from "react-toastify";
import { ProductPage } from "../../../types/product/productPage";
import { getError } from "../../../utils/error";

interface ProductInfoProps {
  product: ProductPage;
}

interface sizeSelectionTypes {
  sizeEur: number;
  sizeUK: number;
  sizeCountInStock: number;
}

const ProductInfo: FC<ProductInfoProps> = ({ product }) => {
  const [showSizes, setShowSizes] = useState(false);
  const router = useRouter();

  const deleteHandler = async (productId: string) => {
    if (!window.confirm("Are you sure?")) {
      return;
    }
    try {
      await axios.delete(`/api/admin/products/${productId}`);
      toast.success("Product deleted successfully");
      router.reload();
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <tr className="border-b">
      <td className="p-3">{product._id.substring(20, 24)}</td>
      <td className="p-3 max-w-[150px] truncate hover:text-clip hover:overflow-visible hover:whitespace-normal">
        {product.model}
      </td>
      <td className="p-3 max-w-[135px] truncate">{product.price}</td>
      <td className="p-3 max-w-[80px] truncate">{product.sale}</td>
      <td className="p-3">
        <div
          className="cursor-pointer"
          onClick={() => setShowSizes(!showSizes)}
        >
          {showSizes ? (
            <>
              <table className="w-[160px]">
                <thead>
                  <tr>
                    <th>Size Eur</th>
                    <th>Size Uk</th>
                    <th>Count in stock</th>
                  </tr>
                </thead>
                {product.sizeSelection.map((item: sizeSelectionTypes) => (
                  <tbody key={item.sizeEur} onClick={e => e.stopPropagation()}>
                    <tr>
                      <th>{item.sizeEur}</th>
                      <th>{item.sizeUK}</th>
                      <th>{item.sizeCountInStock}</th>
                    </tr>
                  </tbody>
                ))}
              </table>
            </>
          ) : (
            <div>Show size</div>
          )}
        </div>
      </td>
      <td className=" p-5 ">
        <Link href={`/admin/products/${product._id}`}>Edit</Link>
        &nbsp;
        <button
          onClick={() => deleteHandler(product._id)}
          className="default-button"
          type="button"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ProductInfo;
