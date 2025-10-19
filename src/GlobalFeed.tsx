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
    <div className="space-y-4 py-4">
      {posts.map((post) =>
        post.value ? (
          <div key={post.ref.id} data-jazz-id={post.ref.id}>
            {post.value.images?.map((image) =>
              image ? (
                <div key={image.$jazz.id} className="-mx-2">
                  <Image
                    imageId={image.$jazz.id}
                    loading="lazy"
                    className="w-full aspect-square object-cover"
                  />
                </div>
              ) : null
            )}

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
        ) : null
      )}
    </div>
  );
}
