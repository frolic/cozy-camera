import { Image } from "jazz-tools/react";
import { Post } from "../schemas";
import { UserLabel } from "../UserLabel";
import { RelativeTime } from "../RelativeTime";
import { co, CoFeedEntry } from "jazz-tools";
import { PostCard } from "./PostCard";

export function Posts({
  posts,
}: {
  posts: readonly Omit<CoFeedEntry<co.loaded<typeof Post>>, "all">[];
}) {
  return (
    <>
      {posts.map((entry) => {
        const post = entry.value;
        const author = entry.by;
        if (!post) return;
        if (!author) return;

        const owner = post.$jazz.owner;
        const isPublic = owner.getRoleOf("everyone") != null;
        const visibleTo = owner.members
          .map((member) => member.account)
          .filter((user) => user.$jazz.id !== author.$jazz.id);

        return (
          <div key={post.$jazz.id}>
            <PostCard
              id={post.$jazz.id}
              url={`/posts/${post.$jazz.id}`}
              images={post.images?.map((image) =>
                image ? (
                  <Image
                    imageId={image.$jazz.id}
                    loading="lazy"
                    className="w-full aspect-square object-cover"
                  />
                ) : null
              )}
              caption={
                <div className="p-2 text-sm">
                  <UserLabel
                    user={author}
                    className="font-medium text-yellow-700"
                  />{" "}
                  {post.caption}
                </div>
              }
            />
            <div className="grow flex gap-2 px-2 py-1 items-center justify-between text-xs text-stone-300">
              <div className="flex items-center gap-1">
                {isPublic ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="size-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                    public
                  </>
                ) : visibleTo.length > 0 ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="size-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                    {visibleTo.length} friends
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="size-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                      />
                    </svg>
                    just me
                  </>
                )}
              </div>
              <RelativeTime time={new Date(post.$jazz.createdAt)} />
            </div>
          </div>
        );
      })}
    </>
  );
}
