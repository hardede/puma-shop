import bcryptjs from "bcryptjs";
import User from "../../../models/User";
import db from "../../../utils/db";
import { getSession } from "next-auth/react";
import _ from "lodash";

async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(400).send({ message: `${req.method} not supported` });
  }

  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send({ message: "signin required" });
  }

  const { user } = session;

  const { firstName, lastName, email, password } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !email.includes("@") ||
    (password && password.trim().length < 5)
  ) {
    res.status(422).json({
      message: "Validation error",
    });
    return;
  }

  await db.connect();

  if (
    !_.isNil(firstName) &&
    (firstName.length < 2 || typeof email !== "string")
  ) {
    await db.disconnect();
    return res.status(401).json({
      status: "error",
      massage:
        "Firstname and should not be empty or should be at least 2 characters long!",
    });
  }

  if (
    !_.isNil(lastName) &&
    (lastName.length < 2 || typeof email !== "string")
  ) {
    await db.disconnect();

    return res.status(401).json({
      status: "error",
      massage:
        "LastName and should not be empty or should be at least 2 characters long!",
    });
  }

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (
    !_.isNil(email) &&
    (typeof email !== "string" || !email.match(emailRegex))
  ) {
    await db.disconnect();
    return res.status(401).json({
      status: "error",
      massage: "Invalid email",
    });
  }

  const userEmail = await User.findOne({ email });
  if (!_.isEmpty(userEmail)) {
    await db.disconnect();

    return res.status(401).json({
      status: "error",
      message: "Email already in use",
    });
  }

  const toUpdateUser = await User.findById(user._id);
  toUpdateUser.firstName = firstName;
  toUpdateUser.lastName = lastName;
  toUpdateUser.email = email;
  if (password) {
    toUpdateUser.password = bcryptjs.hashSync(password);
  }

  await toUpdateUser.save();
  await db.disconnect();
  res.send({
    message: "User updated",
  });
}

export default handler;
