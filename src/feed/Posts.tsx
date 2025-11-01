import { Image } from "jazz-tools/react";
import { Post } from "../schema";
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
      {posts.map((post) =>
        post.value ? (
          <PostCard
            key={post.ref.id}
            id={post.ref.id}
            images={post.value.images?.map((image) =>
              image ? (
                <Image
                  imageId={image.$jazz.id}
                  loading="lazy"
                  className="w-full aspect-square object-cover"
                />
              ) : null
            )}
            caption={
              <>
                <div>
                  {post.by ? (
                    <>
                      <UserLabel user={post.by} />{" "}
                    </>
                  ) : null}
                  {post.value.caption}
                </div>
                <div className="text-xs text-neutral-500">
                  <RelativeTime time={post.madeAt} />
                </div>
              </>
            }
          />
        ) : null
      )}
    </>
  );
}
