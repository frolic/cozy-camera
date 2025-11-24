import { useCoState, Image } from "jazz-tools/react";
import { Account, PostFeed } from "../schemas";
import { Posts } from "../feed/Posts";
import { useParams } from "react-router";
import { FriendStatus } from "./FriendButton";
import { ImageUpload } from "../ImageUpload";
import { co } from "jazz-tools";
import { createImage } from "jazz-tools/media";
import { FriendRequests } from "./FriendRequests";

export function ProfilePage() {
  const params = useParams<{ userId: string }>();
  // TODO: redirect?
  if (!params.userId) return;

  const userId = `co_${params.userId}`;
  const user = useCoState(Account, userId, {
    resolve: { profile: { image: true, friends: true } },
  });
  const feed = useCoState(PostFeed, import.meta.env.VITE_GLOBAL_POST_FEED);

  // TODO: show something while loading?
  // TODO: differentiate between loading and not found?
  if (!user) return;
  if (!feed) return;

  const posts = Array.from(feed.perAccount[userId]?.all ?? []).toSorted(
    (a, b) => b.madeAt.getTime() - a.madeAt.getTime()
  );

  return (
    <div className="border-t border-stone-200 space-y-8 py-8">
      <div className="flex gap-4">
        <ImageUpload
          disabled={!user.isMe}
          className="size-24 aspect-square object-cover rounded-full overflow-clip bg-stone-200 peer-enabled:cursor-pointer peer-enabled:hover:opacity-50"
          onChange={async (files) => {
            if (!user.isMe) return;

            const file = files[0];
            if (!file) return;

            const owner = co.group().create();
            owner.addMember("everyone", "reader");

            const image = await createImage(file, { owner, maxSize: 600 });

            user.profile.$jazz.set("image", image);
          }}
        >
          {user.profile.image ? (
            <Image
              imageId={user.profile.image.$jazz.id}
              width={512}
              height={512}
              className="size-full object-cover"
            />
          ) : null}
        </ImageUpload>
        <div className="space-y-3">
          <div>
            <div className="text-xl leading-tight text-black">
              {user.profile.name}
            </div>
            <div className="text-sm leading-tight text-stone-400">
              joined{" "}
              {new Date(user.$jazz.createdAt).toLocaleDateString(undefined, {
                month: "short",
                year: "numeric",
              })}
            </div>
          </div>
          <FriendStatus user={user} />
        </div>
      </div>
      <FriendRequests user={user} />
      <div className="-mx-2 grid grid-cols-2 gap-3">
        <Posts posts={posts} />
      </div>
    </div>
  );
}
