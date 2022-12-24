import { getSession } from "next-auth/react";
import User from "../../../models/User";
import db from "../../../utils/db";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send({ message: "sign in required" });
  }

  const { user } = session;
  await db.connect();
  const userFind = await User.findById(user._id);

  await db.disconnect();
  res.status(201).send(userFind);
};
export default handler;
