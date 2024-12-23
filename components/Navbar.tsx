import { auth, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Login from "./Login";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/" className="flex items-center text-3xl font-black gap-1">
          <span className="text-logo text-primary ">IDEA</span>
          <Image
            className="logo"
            src="/logo.png"
            alt="logo"
            width={35}
            height={35}
          />
          <span className="text-logo text-secondary">SPROUT</span>
        </Link>
        <div className="flex items-center gap-5">
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
