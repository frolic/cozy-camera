import { useAccount } from "jazz-tools/react-core";
import { useId } from "react";
import { Link, useNavigate } from "react-router";
import { Account } from "./schemas";
import { getFriendRequests } from "./friends/getFriendRequests";

export function TopNav() {
  const inputId = useId();
  const navigate = useNavigate();
  const { me } = useAccount(Account, {
    resolve: { profile: { friendRequests: { $each: { from: true } } } },
  });
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center *:flex">
      <div className="text-sm font-medium">
        <Link to="/">cozy&bull;camera</Link>
      </div>
      <div>
        <input
          id={inputId}
          hidden
          type="file"
          accept="image/png, image/jpeg, image/gif, image/bmp"
          multiple
          onChange={(event) => {
            const uploads = Array.from(event.currentTarget.files ?? []);
            // clear input so picking the same file can trigger onChange again
            event.currentTarget.value = "";

            if (uploads.length) {
              navigate("/new", { state: { uploads } });
            }
          }}
        />
        <label
          htmlFor={inputId}
          className="cursor-pointer bg-white shadow rounded-full p-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </label>
      </div>
      <div className="justify-self-end">
        <Link to="/me" className="inline-grid *:col-start-1 *:row-start-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          {me && getFriendRequests(me).length > 0 ? (
            <span className="self-start justify-self-end inline-flex size-2 rounded-full bg-red-600 ring ring-white translate-x-0.5"></span>
          ) : null}
        </Link>
      </div>
    </div>
  );
}
