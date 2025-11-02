import { Account as JazzAccount } from "jazz-tools";
import { Link } from "react-router";

export function UserLabel({
  user,
  className,
}: {
  user: JazzAccount;
  className?: string;
}) {
  const label = user.profile?.name ?? "Unknown user";
  return (
    <Link
      to={`/users/${user.$jazz.id.replace(/^co_/, "")}`}
      className={className}
    >
      {label}
    </Link>
  );
}
