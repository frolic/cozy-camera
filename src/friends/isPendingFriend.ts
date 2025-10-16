import { co } from "jazz-tools";
import { Account } from "../schema";

export function isPendingFriend(
  them: co.loaded<
    typeof Account,
    { profile: { friendRequests: { $each: { from: true } } } }
  >
) {
  return them.profile.friendRequests.some(
    (request) => request.from.isMe && !request.isDeleted
  );
}
