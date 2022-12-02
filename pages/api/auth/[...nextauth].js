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
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token._id = profile._id;
        token.firstName = profile.firstName;
        token.lastName = profile.lastName;
        token.isAdmin = profile.isAdmin;
      }
      return token;
    },
    async session({ session, token, user }) {
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
