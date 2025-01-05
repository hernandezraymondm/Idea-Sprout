import { auth, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Login from "./Login";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center h-16">
        <Link href="/" className="flex items-center text-3xl font-black gap-1">
          <span className="text-logo text-primary -mt-2">Idea</span>
          <Image
            className="logo"
            src="/images/logo.png"
            alt="logo"
            width={35}
            height={35}
          />
          <span className="text-logo text-secondary -mt-2">Sprout</span>
        </Link>
        <div className="flex items-center gap-5 font-semibold text-lg">
          {session && session?.user ? (
            <>
              <Link href="/startup/create" className="flex">
                <span className="max-sm:hidden">Create</span>
                <BadgePlus className="size-6 sm:hidden" />
              </Link>

              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit" className="flex">
                  <span className="max-sm:hidden">Logout</span>
                  <LogOut className="size-6 sm:hidden text-red-500" />
                </button>
              </form>

              <Link href={`/user/${session?.id}`}>
                <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
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
