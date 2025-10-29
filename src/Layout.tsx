import { ReactNode, useId } from "react";
import { Link, useNavigate } from "react-router";

export function Layout({ children }: { children: ReactNode }) {
  const inputId = useId();
  const navigate = useNavigate();
  return (
    <div className="max-w-xl mx-auto px-2 h-full grid grid-rows-[1fr_auto]">
      <div className="sticky top-0">
        <div className="py-1 px-2 -mx-2 grid grid-cols-[1fr_auto_1fr] items-center *:flex bg-stone-100/60 backdrop-blur-2xl sm:rounded-b">
          <div className="font-medium">
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
              className="cursor-pointer bg-white shadow rounded-full p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-[2ch]"
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
            <Link to="/settings">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-[2ch]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
