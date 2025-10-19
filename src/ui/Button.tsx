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
        "rounded bg-indigo-500 hover:brightness-125 active:brightness-90 text-white p-2 leading-none cursor-pointer",
        // TODO: improve pending
        "aria-busy:saturate-50 aria-busy:animate-pulse",
        className
      )}
      {...props}
    />
  );
}
