import { co } from "jazz-tools";
import { Account } from "../schema";

export function requestFriend(
  me: co.loaded<typeof Account, { profile: { friends: true } }>,
  them: co.loaded<
    typeof Account,
    { profile: { friendRequests: { $each: { from: true } } } }
  >
) {
  // add them to my friends
  me.profile.friends.addMember(them, "reader");

  // remove any previous requests
  them.profile.friendRequests.$jazz.remove((request) => request.from.isMe);
  // add fresh request
  them.profile.friendRequests.$jazz.push({ from: me });
}
