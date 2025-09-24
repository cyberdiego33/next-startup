import Searchform from "@/components/searchform";
import StartupCard from "@/components/StartupCard";

type PostsType = [
  {
    _createdAt: string;
    views: number;
    author: { _id: number; name: string };
    _id: number;
    description: string;
    image: string;
    category: string;
    title: string;
  }
];

type StartupTypeCard = {
  _createdAt: string;
  views: number;
  author: { _id: number; name: string };
  _id: number;
  description: string;
  image: string;
  category: string;
  title: string;
};

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const posts: PostsType = [
    {
      _createdAt: `${new Date()}`,
      views: 55,
      author: { _id: 1, name: "Greatness" },
      _id: 1,
      description: "Landing page startup",
      image:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Animations",
      title: "Hero Sections",
    },
  ];
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
    </>
  );
}
