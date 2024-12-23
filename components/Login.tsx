import React from "react";
import { signIn } from "@/auth";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./ui/dialog";
import Image from "next/image";

const Login = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="login">Login</button>
      </DialogTrigger>
      <DialogContent className="p-8 bg-white border-4 border-black rounded-2xl shadow-200">
        <DialogTitle className="text-24-black mb-4">Login</DialogTitle>
        <DialogDescription className="text-20-medium mb-8">
          Select your login method:
        </DialogDescription>
        <div className="flex flex-col gap-4">
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
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
          <form
            action={async () => {
              "use server";
              await signIn("github");
            }}
          >
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
      </DialogContent>
    </Dialog>
  );
};

export default Login;
