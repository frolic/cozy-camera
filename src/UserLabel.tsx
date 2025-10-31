import { Account as JazzAccount } from "jazz-tools";
import { Link } from "react-router";

export function UserLabel({ user }: { user: JazzAccount }) {
  const label = user.profile?.name ?? "Unknown user";
  return (
    <Link
      to={`/users/${user.$jazz.id.replace(/^co_/, "")}`}
      className="font-medium text-blue-600"
    >
      {label}
    </Link>
  );
}
