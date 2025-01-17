import { cn, formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Author, Startup } from "@/sanity/types";
import { Skeleton } from "./ui/skeleton";
import { Suspense } from "react";
import UpVotes from "./UpVotes";
import DownVotes from "./DownVotes";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export type StartupCardType = Omit<Startup, "author"> & { author?: Author };

const StartupCard = ({ post }: { post: StartupCardType }) => {
  const {
    _id,
    _createdAt,
    title,
    category,
    image,
    description,
    views,
    author,
  } = post;

  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup-card_date">{formatDate(_createdAt)}</p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/?query=${category?.toLowerCase()}`}>
            <p className="text-16-medium hover:underline hover:text-blue-400">
              {category}
            </p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="text-26-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Link href={`/user/${author?._id}`}>
                <Image
                  src={author?.image || "/images/github.png"}
                  alt={author?.name || "profile-image"}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-semibold">{author?.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Link href={`/startup/${_id}`}>
        <p className="startup-card_desc">{description}</p>
        <Image
          src={
            image ||
            "https://res.cloudinary.com/ddzz4trls/image/upload/v1734963266/business_ujotcb.jpg"
          }
          alt="placehlder"
          className="startup-card_img"
          width={512}
          height={512}
        />
      </Link>
      <div className="flex-between gap-1 mt-5">
        <Button className="startup-card_btn bg-black-200 " asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
        <div className="flex gap-1">
          <Suspense
            fallback={<Skeleton className="startup-card_btn_skeleton" />}
          >
            <UpVotes id={_id} />
          </Suspense>

          <Suspense
            fallback={<Skeleton className="startup-card_btn_skeleton" />}
          >
            <DownVotes id={_id} />
          </Suspense>
        </div>
      </div>
    </li>
  );
};

export const StartupCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn("skeleton", index)}>
        <Skeleton className="startup-card_skeleton" />
      </li>
    ))}
  </>
);

export default StartupCard;
