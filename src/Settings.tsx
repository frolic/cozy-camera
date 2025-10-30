import { useAccount } from "jazz-tools/react";
import { Account } from "./schema";
import { UserLabel } from "./UserLabel";
import { removeFriend } from "./friends/removeFriend";
import { acceptFriend } from "./friends/acceptFriend";
import { Layout } from "./Layout";
import { Button } from "./ui/Button";
import { useNavigate } from "react-router";

export function Settings() {
  const navigate = useNavigate();
  const { me, logOut } = useAccount(Account, {
    resolve: {
      profile: {
        friends: true,
        friendRequests: { $each: { from: true } },
      },
    },
  });
  if (!me) return;

  console.log(
    "my friend requests",
    me.$jazz.id,
    me.profile.friendRequests.map((request) => request.from.$jazz.id)
  );

  return (
    <Layout>
      <div className="border-t border-stone-200 space-y-4 py-4">
        <h1>Settings</h1>
        <div>
          Account: {me.profile.name}{" "}
          <span className="opacity-50 text-sm">(id: {me.$jazz.id})</span>
        </div>
        <div>
          <h2>My friends</h2>
          <ul>
            {me.profile.friends.members
              .filter((member) => !member.account.isMe)
              .map((member) => (
                <li key={member.id} className="flex gap-2 justify-between">
                  <span>
                    <UserLabel user={member.account} /> ({member.role})
                  </span>
                  <button
                    className="text-sm p-1 rounded text-red-600"
                    onClick={async () => {
                      const them = await Account.load(member.account.$jazz.id, {
                        resolve: {
                          profile: {
                            friends: true,
                            friendRequests: { $each: { from: true } },
                          },
                        },
                      });
                      if (!them)
                        throw new Error("Could not load their account");
                      removeFriend(me, them);
                    }}
                  >
                    Remove
                  </button>
                </li>
              ))}
          </ul>
        </div>
        <div>
          <h2>Friend requests</h2>
          <ul className="flex flex-col gap-2">
            {me.profile.friendRequests.map((request, i) => (
              <li key={i} className="flex gap-2 justify-between">
                <UserLabel user={request.from} />
                <span className="inline-flex gap-1">
                  <button
                    className="text-sm p-1 rounded text-red-600"
                    onClick={async () => {
                      const them = await Account.load(request.from.$jazz.id, {
                        resolve: {
                          profile: {
                            friends: true,
                            friendRequests: { $each: { from: true } },
                          },
                        },
                      });
                      if (!them)
                        throw new Error("Could not load their account");
                      removeFriend(me, them);
                    }}
                  >
                    Reject
                  </button>
                  <button
                    className="text-sm p-1 rounded bg-blue-500 text-white"
                    onClick={async () => {
                      acceptFriend(me, request.from);
                    }}
                  >
                    Accept
                  </button>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <Button
          onClick={() => {
            logOut();
            navigate("/");
          }}
        >
          Sign out
        </Button>
      </div>
    </Layout>
  );
}
