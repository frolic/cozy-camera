import { Image, useCoState } from "jazz-tools/react";
import { Account } from "../schemas";
import { twMerge } from "tailwind-merge";

export function ProfileImage({
  userId,
  className,
}: {
  userId: string;
  className?: string;
}) {
  const user = useCoState(Account, userId, {
    resolve: { profile: { image: true } },
  });
  return (
    <div
      className={twMerge(
        "size-full aspect-square rounded-full overflow-clip bg-stone-200",
        className
      )}
    >
      {user?.profile.image ? (
        <Image
          imageId={user.profile.image.$jazz.id}
          width={512}
          height={512}
          className="size-full object-cover"
          alt={user.profile.name}
        />
      ) : null}
    </div>
  );
}
