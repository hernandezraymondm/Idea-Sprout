import React from "react";
import { DialogTitle, DialogDescription, DialogClose } from "./ui/dialog";
import Image from "next/image";
import { signInWithGoogle, signInWithGitHub } from "@/lib/actions";

const Login = () => {
  return (
    <>
      <DialogTitle className="text-24-black mb-4">Login</DialogTitle>
      <DialogDescription className="text-20-medium mb-8">
        Select your login method:
      </DialogDescription>
      <div className="flex flex-col gap-4">
        <form action={signInWithGoogle}>
          <button
            type="submit"
            className="flex items-center justify-center p-4 bg-white border-4 border-black rounded-lg shadow-200 hover:shadow-none transition-all duration-500 w-full"
          >
            <Image
              src="/images/google.png"
              alt="Google Logo"
              width={24}
              height={24}
              className="mr-3"
            />
            <span className="font-semibold text-black text-lg">
              Login with Google
            </span>
          </button>
        </form>
        <form action={signInWithGitHub}>
          <button
            type="submit"
            className="flex items-center justify-center p-4 bg-white border-4 border-black rounded-lg shadow-200 hover:shadow-none transition-all duration-500 w-full"
          >
            <Image
              src="/images/github.png"
              alt="GitHub Logo"
              width={24}
              height={24}
              className="mr-3"
            />
            <span className="font-semibold text-black text-lg">
              Login with GitHub
            </span>
          </button>
        </form>
      </div>
      <DialogClose asChild>
        <button className="mt-8 p-4 bg-primary text-white rounded-lg">
          Close
        </button>
      </DialogClose>
    </>
  );
};

export default Login;
