import Product from "../../../models/Product";
import db from "../../../utils/db";

const handler = async (req, res) => {
  await db.connect();
  const productsFind = await Product.find();

  await db.disconnect();
  res.status(201).send(productsFind);
};
export default handler;
