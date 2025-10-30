import { Image, useCoState } from "jazz-tools/react";
import { PostFeed } from "./schema";
import { UserLabel } from "./UserLabel";
import { RelativeTime } from "./RelativeTime";

export default function GlobalFeed() {
  const feed = useCoState(PostFeed, import.meta.env.VITE_GLOBAL_POST_FEED);
  // TODO: show something else?
  if (!feed) return;

  const posts = Object.values(feed.perAccount)
    .flatMap((accountFeed) => Array.from(accountFeed.all))
    .toSorted((a, b) => b.madeAt.getTime() - a.madeAt.getTime());

  return (
    <div className="-mx-3 space-y-4">
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

            <div className="p-1">
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
      <div className="py-24 text-center text-sm italic text-stone-400">
        take a breath, relax your shoulders
      </div>
    </div>
  );
}
