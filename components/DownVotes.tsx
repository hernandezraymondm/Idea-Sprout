import { client } from "@/sanity/lib/client";
import { STARTUP_DOWNVOTES_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import { Button } from "./ui/button";
import { ThumbsDown } from "lucide-react";
import { auth } from "@/auth";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import Login from "./Login";

const UpVotes = async ({ id }: { id: string }) => {
  const session = await auth();

  const { downvotes: totalDownvotes } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_DOWNVOTES_QUERY, { id });

  const handleDownvote = async () => {
    "use server";
    await writeClient
      .patch(id)
      .set({ downvotes: totalDownvotes + 1 })
      .commit();
  };

  return (
    <form action={handleDownvote}>
      {session ? (
        <Button type="submit" className="startup-card_btn bg-gray-500">
          {totalDownvotes} <ThumbsDown className="size-6" />
        </Button>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button type="reset" className="startup-card_btn bg-gray-500">
              {totalDownvotes} <ThumbsDown className="size-6" />
            </Button>
          </DialogTrigger>
          <DialogContent className="p-8 bg-white border-4 border-black rounded-2xl shadow-200">
            <Login />
          </DialogContent>
        </Dialog>
      )}
    </form>
  );
};

export default UpVotes;
