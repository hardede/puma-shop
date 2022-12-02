import bcryptjs from "bcryptjs";
import NextAuth from "next-auth";
import User from "../../../models/User";
import db from "../../../utils/db";
import CredentialProvider from "next-auth/providers/credentials";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) token._id = user._id;
      if (user?.firstName) token.firstName = user.firstName;
      if (user?.lastName) token.lastName = user.lastName;
      if (user?.isAdmin) token.isAdmin = user.isAdmin;
      return token;
    },
    async session({ session, token }) {
      session.user._id = token._id;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      session.user.isAdmin = token.isAdmin;
      return session;
    },
  },
  providers: [
    CredentialProvider({
      async authorize(credentials) {
        await db.connect();
        const user = await User.findOne({
          email: credentials.email,
        });
        await db.disconnect();
        if (user && bcryptjs.compareSync(credentials.password, user.password)) {
          return {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
          };
        }
        throw new Error("Invalid email or password");
      },
    }),
  ],
});
