import { co } from "jazz-tools";
import { Account } from "../schemas";

export function getFriendRequests(
  them: co.loaded<
    typeof Account,
    { profile: { friendRequests: { $each: { from: true } } } }
  >
) {
  return them.profile.friendRequests.filter((request) => !request.isDeleted);
}
