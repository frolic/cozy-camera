import { co } from "jazz-tools";
import { Account } from "../schema";

export function isFriend(
  them: co.loaded<typeof Account, { profile: { friends: true } }>
) {
  return them.profile.friends.members.some((member) => member.account.isMe);
}
