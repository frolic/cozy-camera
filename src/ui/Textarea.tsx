import { TextareaHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={twMerge("rounded p-2 border-2 border-neutral-300", className)}
      {...props}
    />
  );
}
