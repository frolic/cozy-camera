import { co, z } from "jazz-tools";

/**
 * Account schemas
 */

export const AccountPublicData = co.profile({
  image: co.image().optional(),
  friends: co.group(),
  friendRequests: co.list(
    co.map({
      from: co.account(),
      isDeleted: z.boolean().optional(),
    })
  ),
});

export const AccountPrivateData = co.map({});

export const Account = co
  .account({
    profile: AccountPublicData,
    root: AccountPrivateData,
  })
  .withMigration((account) => {
    if (account.profile && !account.profile.$jazz.has("friends")) {
      console.log("setting up friends");
      account.profile.$jazz.set(
        "friends",
        AccountPublicData.shape.friends.create()
      );
    }

    if (account.profile && !account.profile.$jazz.has("friendRequests")) {
      console.log("setting up friend requests");
      const group = co.group().create();
      group.addMember("everyone", "writeOnly");
      account.profile.$jazz.set(
        "friendRequests",
        AccountPublicData.shape.friendRequests.create([], group)
      );
    }
  });

/**
 * Post schemas
 */

export const Post = co.map({
  images: co.list(co.image()),
  caption: z.string().optional(),
});

export const PostFeed = co.feed(Post);
