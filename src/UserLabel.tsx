import { Account as JazzAccount } from "jazz-tools";
import { useAccount, useCoState } from "jazz-tools/react";
import { Account } from "./schema";
import { isFriend } from "./friends/isFriend";
import { requestFriend } from "./friends/requestFriend";
import { isPendingFriend } from "./friends/isPendingFriend";

export function UserLabel({ user }: { user: JazzAccount }) {
  const label = user.profile?.name ?? "Unknown user";
  if (user.isMe) {
    return <span className="font-medium text-cyan-600">{label}</span>;
  }

  const { me } = useAccount(Account, {
    resolve: { profile: { friends: true } },
  });
  const them = useCoState(Account, user.$jazz.id, {
    resolve: {
      profile: {
        friends: true,
        friendRequests: { $each: { from: true } },
      },
    },
  });
  if (!me || !them) {
    return (
      <span className="font-medium text-neutral-600 animate-pulse">
        {label}
      </span>
    );
  }

  if (isFriend(them)) {
    return <span className="font-medium text-green-600">{label}</span>;
  }

  return (
    <button
      type="button"
      className="font-medium text-blue-600 cursor-pointer aria-busy:cursor-wait aria-busy:after:content-['⏳']"
      aria-busy={isPendingFriend(them)}
      onClick={async (event) => {
        if (event.currentTarget.ariaBusy === "true") return;
        requestFriend(me, them);
      }}
    >
      {label}
    </button>
  );
}
