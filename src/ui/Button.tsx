import { ComponentProps } from "react";
import { ButtonBase } from "./ButtonBase";
import { twMerge } from "tailwind-merge";

export function Button({
  className,
  ...props
}: ComponentProps<typeof ButtonBase>) {
  return (
    <ButtonBase
      className={twMerge(
        "rounded bg-indigo-500 text-white p-2 leading-none cursor-pointer",
        // TODO: improve pending
        "aria-busy:bg-neutral-400 aria-busy:animate-pulse",
        className
      )}
      {...props}
    />
  );
}
