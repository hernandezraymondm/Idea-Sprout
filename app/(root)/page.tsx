import { auth } from "@/auth";
import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupCardType } from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { PLAYLIST_BY_SLUG_QUERY, STARTUPS_QUERY } from "@/sanity/lib/queries";
import { BadgeCheck, Crown } from "lucide-react";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string } | null>;
}) {
  const query = (await searchParams)?.query;
  const params = { search: query || null };

  const session = await auth();

  console.log(session?.id);

  const [{ select: editorPosts }, { data: posts }] = await Promise.all([
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {
      slug: "editor-s-choice",
    }),
    sanityFetch({ query: STARTUPS_QUERY, params }),
  ]);

  return (
    <>
      <section className="hero_container">
        <h1 className="heading">
          Pitch Your Startup, <br /> Grow Your Business
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Connect with Entrepreneurs.
        </p>
        <SearchForm query={query} />
      </section>

      {editorPosts?.length > 0 && (
        <section className="section_container">
          <div className="flex items-center gap-2">
            <p className="text-30-semibold">Editor&apos;s Choice</p>
            <Crown color="#19bde5" size={30} />
          </div>
          <ul className="mt-7 card_grid">
            {editorPosts.map((post: StartupCardType, i: number) => (
              <StartupCard key={i} post={post} />
            ))}
          </ul>
        </section>
      )}

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? (
            `Search results for "${query}"`
          ) : (
            <div className="flex items-center gap-2">
              <p className="text-30-semibold">Latest Pitches</p>
              <BadgeCheck color="#7edd0d" size={30} />
            </div>
          )}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupCardType) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>
      <SanityLive />
    </>
  );
}
