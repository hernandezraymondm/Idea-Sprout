import { auth, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Login from "./Login";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center h-16">
        <Link href="/" className="flex items-center text-3xl font-black gap-1">
          <span className="text-logo text-primary -mt-2">Idea</span>
          <Image
            className="logo"
            src="/logo.png"
            alt="logo"
            width={35}
            height={35}
          />
          <span className="text-logo text-secondary -mt-2">Sprout</span>
        </Link>
        <div className="flex items-center gap-5 font-semibold text-lg">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span>Create</span>
              </Link>

              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">Logout</button>
              </form>

              <Link href={`/user/${session.user.id}`}>
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <Login />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
