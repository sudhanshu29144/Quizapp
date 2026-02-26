import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";
import bcrypt from "bcryptjs";

const providers = [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: {},
      password: {},
    },
    async authorize(credentials) {
      const email = credentials?.email;
      const password = credentials?.password;

      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      const { default: connectDB } = await import("@/lib/mongodb");
      await connectDB();

      const user = await User.findOne({ email });
      if (!user || !user.password) {
        throw new Error("User not found");
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new Error("Invalid password");
      }

      return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      };
    },
  }),
];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.unshift(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
}

const handler = NextAuth({
  providers,
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
