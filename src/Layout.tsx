import { ReactNode } from "react";
import { TopNav } from "./TopNav";
import { twMerge } from "tailwind-merge";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className={twMerge(
        "min-h-full overflow-x-clip py-3 gap-y-3",
        "grid",
        "grid-cols-[minmax(0,1fr)_min(100%,theme(maxWidth.xl))_minmax(0,1fr)]",
        "grid-rows-[auto_1fr]"
      )}
    >
      <div className="row-start-1 col-start-2 col-span-1 sticky top-0">
        <div className="absolute -inset-x-1 inset-y-0 rounded-b-md backdrop-blur-2xl bg-stone-100/60" />
      </div>
      <div className="row-start-1 col-start-2 col-span-1 sticky top-0 px-4 py-2">
        <TopNav />
      </div>
      <div className="row-start-2 col-start-2 col-span-1 px-4">{children}</div>
    </div>
  );
}
