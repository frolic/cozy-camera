import {
  ButtonHTMLAttributes,
  MouseEventHandler,
  useCallback,
  useRef,
  useState,
} from "react";

export function ButtonBase({
  type,
  onClick,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const pendingValueRef = useRef<Promise<unknown>>(undefined);
  const [isPending, setIsPending] = useState<true | undefined>(undefined);
  const [isFormPending, setIsFormPending] = useState<true | undefined>(
    undefined
  );

  const asyncOnClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (...args) => {
      if (!onClick) return;
      const pendingValue = Promise.resolve(onClick(...args));
      pendingValueRef.current = pendingValue;
      setIsPending(true);
      pendingValue.finally(() => {
        if (pendingValueRef.current === pendingValue) {
          setIsPending(undefined);
        }
      });
    },
    [onClick]
  );

  return (
    <button
      type={type ?? "button"}
      aria-busy={isPending ?? isFormPending ?? props["aria-busy"]}
      data-is-pending={isPending}
      data-is-form-pending={isFormPending}
      onClick={onClick ? asyncOnClick : undefined}
      // for submit buttons, listen for form's aria-busy
      ref={(button) => {
        if (button?.type !== "submit") return;
        const form = button.form;
        if (!form) return;

        function update() {
          if (!form) return;
          setIsFormPending(
            form.getAttribute("aria-busy") === "true" ? true : undefined
          );
        }

        update();

        const observer = new MutationObserver(update);
        observer.observe(form, {
          attributes: true,
          attributeFilter: ["aria-busy"],
        });
        return () => {
          observer.disconnect();
        };
      }}
      {...props}
    />
  );
}
