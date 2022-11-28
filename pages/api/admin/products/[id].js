import { getSession } from "next-auth/react";
import Product from "../../../../models/Product";
import db from "../../../../utils/db";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).send("sign in required");
  }

  const { user } = session;
  if (req.method === "GET") {
    return getHandler(req, res, user);
  } else if (req.method === "PUT") {
    return putHandler(req, res, user);
  } else if (req.method === "DELETE") {
    return deleteHandler(req, res, user);
  } else {
    return res.status(400).send({ message: "Method not allowed" });
  }
};
const getHandler = async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  await db.disconnect();
  res.send(product);
};
const putHandler = async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  if (product) {
    product.model = req.body.model;
    product.slug = req.body.slug;
    product.price = req.body.price;
    product.sale = req.body.sale;
    product.img = req.body.img;
    product.sizeSelection.sizeEur = req.body.sizeSelection.sizeEur;
    product.sizeSelection.sizeUK = req.body.sizeSelection.sizeUK;
    product.sizeSelection.countInStock = req.body.sizeSelection.countInStock;
    await product.save();
    await db.disconnect();
    res.send({ message: "Product updated successfully" });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "Product not found" });
  }
};
const deleteHandler = async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  if (product) {
    await product.remove();
    await db.disconnect();
    res.send({ message: "Product deleted successfully" });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "Product not found" });
  }
};
export default handler;
