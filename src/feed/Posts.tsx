import { Image } from "jazz-tools/react";
import { Post } from "../schema";
import { UserLabel } from "../UserLabel";
import { RelativeTime } from "../RelativeTime";
import { co, CoFeedEntry } from "jazz-tools";

export function Posts({
  posts,
}: {
  posts: readonly Omit<CoFeedEntry<co.loaded<typeof Post>>, "all">[];
}) {
  return (
    <>
      {posts.map((post) =>
        post.value ? (
          <div
            key={post.ref.id}
            data-post-id={post.ref.id}
            className="bg-white p-2 shadow"
          >
            {post.value.images?.map((image) =>
              image ? (
                <div key={image.$jazz.id}>
                  <Image
                    imageId={image.$jazz.id}
                    loading="lazy"
                    className="w-full aspect-square object-cover"
                  />
                </div>
              ) : null
            )}

            <div className="p-2">
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
            </div>
          </div>
        ) : null
      )}
    </>
  );
}
