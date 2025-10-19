import { ReactNode, useId } from "react";
import { Link, useNavigate } from "react-router";

export function Layout({ children }: { children: ReactNode }) {
  const inputId = useId();
  const navigate = useNavigate();
  return (
    <div className="max-w-xl mx-auto px-2 h-full grid grid-rows-[1fr_auto]">
      <div>{children}</div>
      <div className="sticky bottom-0 p-2 -mx-2 bg-white border-t border-black/10 grid grid-cols-[1fr_auto_1fr] items-center *:flex">
        <div className="font-black">
          <Link to="/">dear.you</Link>
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
          <label htmlFor={inputId} className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-[2ch]"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
        <div className="justify-self-end">
          <Link to="/settings">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-[2ch]"
            >
              <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
