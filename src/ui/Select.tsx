import { SelectHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export function Select({
  className,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={twMerge("rounded p-2 border-2 border-neutral-300", className)}
      {...props}
    />
  );
}
