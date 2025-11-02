import { co, Account as JazzAccount } from "jazz-tools";
import { Account } from "../schemas";

export function acceptFriend(
  me: co.loaded<
    typeof Account,
    { profile: { friends: true; friendRequests: { $each: { from: true } } } }
  >,
  them: JazzAccount
) {
  // add them to my friends group
  me.profile.friends.addMember(them, "reader");
  // and remove their friend request
  me.profile.friendRequests.$jazz.remove((request) => {
    if (request.from.$jazz.id === them.$jazz.id) {
      // mark the request as deleted before removing, so they can see
      // because they won't be able to see the value removed from the writeOnly list
      request.$jazz.set("isDeleted", true);
      return true;
    }
    return false;
  });
}
