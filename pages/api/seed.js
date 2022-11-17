import Product from "../../models/Product";
import ProductMan from "../../models/ProductMan";
import ProductWoman from "../../models/ProductWoman";
import User from "../../models/User";
import data from "../../utils/data";
import db from "../../utils/db";

const handler = async (req, res) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await Product.deleteMany();
  await Product.insertMany(data.sneakers);
  await ProductMan.deleteMany();
  await ProductMan.insertMany(data.sneakersMan);
  await ProductWoman.deleteMany();
  await ProductWoman.insertMany(data.sneakersWoman);
  await db.disconnect();
  res.send({ message: "seeded successfully" });
};

export default handler;
