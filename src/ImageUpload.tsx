import { ReactNode, useId } from "react";

export function ImageUpload({
  disabled,
  multiple,
  className,
  onChange,
  children,
}: {
  disabled?: boolean;
  multiple?: boolean;
  className?: string;
  onChange: (files: readonly File[]) => void;
  children: ReactNode;
}) {
  const inputId = useId();
  return (
    <>
      <input
        id={inputId}
        hidden
        disabled={disabled}
        type="file"
        accept="image/png, image/jpeg, image/gif, image/bmp"
        multiple={multiple}
        className="peer"
        onChange={(event) => {
          const files = Array.from(event.currentTarget.files ?? []);
          // clear input so picking the same file can trigger onChange again
          event.currentTarget.value = "";
          onChange(files);
        }}
      />
      <label htmlFor={inputId} className={className}>
        {children}
      </label>
    </>
  );
}
