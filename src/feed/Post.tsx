import { UserLabel } from "../UserLabel";
import { RelativeTime } from "../RelativeTime";
import { Account as JazzAccount } from "jazz-tools";
import { ReactNode } from "react";

export function PostCard({
  images,
  user,
  caption,
  createdAt,
}: {
  images: ReactNode;
  user: JazzAccount;
  caption?: string;
  createdAt?: Date;
}) {
  return (
    <div className="bg-white p-2 shadow">
      <div className="w-full aspect-square object-cover">{images}</div>

      <div className="p-2">
        <div>
          <UserLabel user={user} />
          {caption}
        </div>
        <div className="text-xs text-neutral-500">
          {createdAt ? <RelativeTime time={createdAt} /> : <>just now</>}
        </div>
      </div>
    </div>
  );
}
