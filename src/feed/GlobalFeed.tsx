import { useCoState } from "jazz-tools/react";
import { PostFeed } from "../schema";
import { Posts } from "./Posts";

export function GlobalFeed() {
  const feed = useCoState(PostFeed, import.meta.env.VITE_GLOBAL_POST_FEED);
  // TODO: show something else?
  if (!feed) return;

  const posts = Object.values(feed.perAccount)
    .flatMap((accountFeed) => Array.from(accountFeed.all))
    .toSorted((a, b) => b.madeAt.getTime() - a.madeAt.getTime());

  return (
    <div className="-mx-2 space-y-4">
      <Posts posts={posts} />
      <div className="py-24 text-center text-sm italic text-stone-400">
        take a breath, relax your shoulders
      </div>
    </div>
  );
}
