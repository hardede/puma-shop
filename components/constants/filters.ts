import { v4 as uuidv4 } from "uuid";
import { useAppDispatch } from "../../hooks/redux";
import { sortByDescending } from "../../store/reducers/ProductSlice";

export const filters = [
  {
    id: uuidv4(),
    title: "Default sort",
    slug: "product_list_order=position",
    
  },
  {
    id: uuidv4(),
    title: "Price: Ascending",
    slug: "product_list_order=price&product_list_dir=asc",
  },
  {
    id: uuidv4(),
    title: "Price: descending",
    slug: "product_list_order=price&product_list_dir=desc",
  },
  {
    id: uuidv4(),
    title: "Maximum discount",
    slug: "product_list_order=discount",
  },
  {
    id: uuidv4(),
    title: "Novelties",
    slug: "product_list_order=novelty",
  },
];
