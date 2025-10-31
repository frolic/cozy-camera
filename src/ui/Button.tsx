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
        "inline-flex self-start",
        "rounded border-[1.5px] border-transparent",
        "bg-yellow-600 enabled:hover:brightness-115 enabled:active:brightness-90 text-white",
        "disabled:bg-stone-200 disabled:text-stone-500 disabled:border-stone-300",
        "py-2 px-3 leading-none",
        "enabled:cursor-pointer",
        // TODO: improve pending
        "aria-busy:saturate-50 aria-busy:animate-pulse",
        className
      )}
      {...props}
    />
  );
}
