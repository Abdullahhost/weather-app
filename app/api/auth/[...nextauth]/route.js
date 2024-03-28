import { connectdb } from "../../../../lib/mongodb";
import User from "../../../../models/user";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const authOption = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const { name, email } = user;
        try {
          await connectdb();

          const existingUser = await User.findOne({ email });
          if (!existingUser) {
            const res = await fetch("http://localhost:3000/api/user", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name,
                email,
              }),
            });

            if (res.ok) {
              return user;
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
      return user;
    },
  },
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
