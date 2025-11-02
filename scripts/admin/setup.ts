import { startWorker } from "jazz-tools/worker";
import { co } from "jazz-tools";
import { PostFeed } from "../../src/schemas";

const { shutdownWorker } = await startWorker({
  accountID: process.env.VITE_JAZZ_ADMIN_ACCOUNT,
  accountSecret: process.env.JAZZ_ADMIN_SECRET,
});

const admin = await co.account().load(process.env.VITE_JAZZ_ADMIN_ACCOUNT!);
if (!admin) {
  throw new Error("No admin account found. Did you run `pnpm admin:init`?");
}

const globalPostFeed = (() => {
  const owner = co.group().create();
  // cofeeds are append-only so `writer` allows us to read/write but doesn't allow
  // users to overwrite data from others
  owner.addMember("everyone", "writer");
  const feed = PostFeed.create([], owner);
  return feed;
})();

await shutdownWorker();

console.log(`
VITE_GLOBAL_POST_FEED=${globalPostFeed.$jazz.id}
`);
