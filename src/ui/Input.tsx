import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={twMerge("rounded p-2 border-2 border-neutral-300", className)}
      {...props}
    />
  );
}
