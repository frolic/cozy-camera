import { Account as JazzAccount } from "jazz-tools";
import { useCoState } from "jazz-tools/react";
import { Account } from "../schemas";
import { getFriendRequests } from "../friends/getFriendRequests";
import { UserLabel } from "../UserLabel";
import { removeFriend } from "../friends/removeFriend";
import { acceptFriend } from "../friends/acceptFriend";
import { Button } from "../ui/Button";

export function FriendRequests({ user }: { user: JazzAccount }) {
  const me = useCoState(Account, user.isMe ? user.$jazz.id : undefined, {
    resolve: {
      profile: { friends: true, friendRequests: { $each: { from: true } } },
    },
  });
  if (me == null) {
    return null;
  }

  const friendRequests = getFriendRequests(me);
  if (friendRequests.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      {friendRequests.map((request) => (
        <div
          key={request.$jazz.id}
          className="flex gap-2 justify-between items-center ring-2 ring-yellow-600/20 rounded text-sm p-2 -mx-2"
        >
          <span>
            <UserLabel
              user={request.from}
              className="font-medium text-yellow-700"
            />{" "}
            wants to be your friend.
            <br />
            <span className="text-xs">
              They will be able to see all posts you've shared with your
              friends.
            </span>
          </span>
          <span className="inline-flex gap-1">
            <Button
              className="text-xs leading-none"
              onClick={async () => {
                const them = await Account.load(request.from.$jazz.id, {
                  resolve: {
                    profile: {
                      friends: true,
                      friendRequests: { $each: { from: true } },
                    },
                  },
                });
                if (!them) throw new Error("Could not load their account");
                removeFriend(me, them);
              }}
            >
              Reject
            </Button>
            <Button
              className="text-xs leading-none"
              onClick={async () => {
                acceptFriend(me, request.from);
              }}
            >
              Accept
            </Button>
          </span>
        </div>
      ))}
    </div>
  );
}
