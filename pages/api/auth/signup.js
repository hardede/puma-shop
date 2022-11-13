import bcryptjs from "bcryptjs";
import User from "../../../models/User";
import db from "../../../utils/db";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  const { firstName, lastName, email, password } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 5
  ) {
    res.status(422).json({
      message: "Validation error",
    });
    return;
  }

  await db.connect();

  const existingEmail = await User.findOne({ email: email });
  if (existingEmail) {
    res.status(422).json({ message: "email exists already" });
    await db.disconnect();
    return;
  }

  const newUser = new User({
    firstName,
    lastName,
    email,
    password: bcryptjs.hashSync(password),
    isAdmin: false,
  });

  const user = await newUser.save();
  await db.disconnect();
  res.status(201).send({
    message: "Created user",
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    city: "",
    phone: "",
    isAdmin: user.isAdmin,
  });
}

export default handler;
