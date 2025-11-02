import { co } from "jazz-tools";
import { Account } from "../schemas";

export async function removeFriend(
  me: co.loaded<
    typeof Account,
    { profile: { friends: true; friendRequests: { $each: { from: true } } } }
  >,
  them: co.loaded<
    typeof Account,
    { profile: { friends: true; friendRequests: { $each: { from: true } } } }
  >
) {
  // remove me from their friends group
  them.profile.friends.removeMember(me);
  // remove them from my friends group
  me.profile.friends.removeMember(them);

  me.profile.friendRequests.$jazz.remove((request) => {
    if (request.from.$jazz.id === them.$jazz.id) {
      // mark the request as deleted before removing, so they can see
      // because they won't be able to see the value removed from the writeOnly list
      request.$jazz.set("isDeleted", true);
      return true;
    }
    return false;
  });

  them.profile.friendRequests.$jazz.remove((request) => {
    if (request.from.$jazz.id === me.$jazz.id) {
      // mark the request as deleted before removing, so they can see
      // because they won't be able to see the value removed from the writeOnly list
      request.$jazz.set("isDeleted", true);
      return true;
    }
    return false;
  });
}
