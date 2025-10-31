import { useAccount } from "jazz-tools/react-core";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export function ProfileRedirect() {
  const navigate = useNavigate();
  const { me } = useAccount();

  useEffect(() => {
    // loading
    if (me === undefined) return;

    const to = me ? `/users/${me.$jazz.id.replace(/^co_/, "")}` : "/";
    navigate(to, { replace: true });
  }, [me]);

  return null;
}
