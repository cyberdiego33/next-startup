import Searchform from "@/components/searchform";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = {search: query || null} 
  const {data: posts} = await sanityFetch({query: STARTUPS_QUERY, params})

  // console.log(JSON.stringify(posts, null, 2));

  return (
    <>
      {/* Hero Section  */}
      <section className="pink-container pattern">
        <h1 className="text-2xl heading">
          Pitch Your Startup, <br /> Connect with Entrepreneurs
        </h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
        </p>

        <Searchform query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for ${query}` : "All Startups available"}
        </p>
        <ul className="mt-7 card_grid ">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post._id} post={post} />
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
