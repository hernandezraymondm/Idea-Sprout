import { client } from "@/sanity/lib/client";
import { STARTUP_UPVOTES_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import { Button } from "./ui/button";
import { ThumbsUp } from "lucide-react";
import { auth } from "@/auth";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import Login from "./Login";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const UpVotes = async ({ id }: { id: string }) => {
  const session = await auth();

  const { upvotes: totalUpvotes } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_UPVOTES_QUERY, { id });

  const handleUpvote = async () => {
    "use server";
    await writeClient
      .patch(id)
      .set({ upvotes: totalUpvotes + 1 })
      .commit();
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <form action={handleUpvote}>
            {session ? (
              <Button type="submit" className="startup-card_btn bg-gray-500">
                {totalUpvotes} <ThumbsUp className="size-6" />
              </Button>
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    type="submit"
                    className="startup-card_btn bg-gray-500"
                  >
                    {totalUpvotes} <ThumbsUp className="size-6" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="p-8 bg-white border-4 border-black rounded-2xl shadow-200">
                  <Login />
                </DialogContent>
              </Dialog>
            )}
          </form>
        </TooltipTrigger>
        <TooltipContent>
          <p>Up vote</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default UpVotes;
