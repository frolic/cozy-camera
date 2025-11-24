import { Account as JazzAccount } from "jazz-tools";
import { useAccount, useCoState } from "jazz-tools/react";
import { Account } from "../schemas";
import { isFriend } from "../friends/isFriend";
import { requestFriend } from "../friends/requestFriend";
import { isPendingFriend } from "../friends/isPendingFriend";
import { Button } from "../ui/Button";
import { removeFriend } from "../friends/removeFriend";

export function FriendStatus({ user }: { user: JazzAccount }) {
  // TODO: move this out and do it where the status button is rendered
  if (user.isMe) {
    return <p>It's you!</p>;
  }

  const { me } = useAccount(Account, {
    resolve: {
      profile: { friends: true, friendRequests: { $each: { from: true } } },
    },
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
    return <Button disabled>Add friend</Button>;
  }

  // TODO: distinguish between friend request and mutual friend
  if (isFriend(them)) {
    return (
      <>
        <Button disabled>Friend</Button>
        <button
          type="button"
          className="p-2 cursor-pointer text-stone-400 hover:text-red-500"
          onClick={() => removeFriend(me, them)}
        >
          &times;
        </button>
      </>
    );
  }

  return (
    <Button
      disabled={isPendingFriend(them)}
      onClick={async (event) => {
        if (event.currentTarget.disabled) return;
        requestFriend(me, them);
      }}
    >
      <span className="inline-flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-[1em]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
          />
        </svg>

        {isPendingFriend(them) ? <>Friend requested</> : <>Add friend</>}
      </span>
    </Button>
  );
}
