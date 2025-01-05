import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries";
import { client } from "./sanity/lib/client";
import { writeClient } from "./sanity/lib/write-client";

const getProviderId = (account, profile) => {
  if (account.provider === "google") return profile.sub;
  if (account.provider === "github") return profile.id.toString();
};

const fetchUser = async (id) => {
  return client
    .withConfig({ useCdn: false })
    .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id });
};

const createUser = async ({ id, name, username, email, image, bio }) => {
  await writeClient.create({
    _type: "author",
    id,
    name,
    username,
    email,
    image,
    bio: bio || "",
  });
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ account, user, profile }) {
      if (account.provider === "google" && !profile.email_verified) {
        return false;
      }

      const id = getProviderId(account, profile);
      const existingUser = await fetchUser(id);

      if (!existingUser) {
        await createUser({
          id,
          name: user.name,
          username: account.provider === "github" ? profile.name : user.name,
          email: user.email,
          image: user.image,
          bio: account.provider === "github" ? profile.bio : "",
        });
      }

      return true;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const id = getProviderId(account, profile);
        const user = await fetchUser(id);
        token.id = user?._id;
      }

      return token;
    },
    async session({ session, token }) {
      session.id = token.id;
      return session;
    },
  },
});
