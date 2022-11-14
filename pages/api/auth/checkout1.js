import bcryptjs from "bcryptjs";
import User from "../../../models/User";
import db from "../../../utils/db";
import { getSession } from "next-auth/react";
import _ from "lodash";

async function handler(req, res) {
  if (req.method !== "PATCH") {
    return res.status(400).send({ message: `${req.method} not supported` });
  }

  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send({ message: "signin required" });
  }

  const { user } = session;

  const { phone, city } = req.body;

  if (!phone || !city ) {
    res.status(422).json({
      message: "Validation error",
    });
    return;
  }

  await db.connect();

  const toUpdateUser = await User.findById(user._id);
  toUpdateUser.phone = phone;
  toUpdateUser.city = city;

  await toUpdateUser.save();
  await db.disconnect();
  res.send({
    message: "User updated",
    phone: toUpdateUser.phone,
    city: toUpdateUser.city,
  });
}

export default handler;
