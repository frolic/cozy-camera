import {
  FormEventHandler,
  FormHTMLAttributes,
  useCallback,
  useRef,
  useState,
} from "react";

export function Form({
  onSubmit,
  ...props
}: FormHTMLAttributes<HTMLFormElement>) {
  const pendingValueRef = useRef<Promise<unknown>>(undefined);
  const [isPending, setIsPending] = useState<true | undefined>(undefined);

  const asyncOnSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    (...args) => {
      if (!onSubmit) return;
      const pendingValue = Promise.resolve(onSubmit(...args));
      pendingValueRef.current = pendingValue;
      setIsPending(true);
      pendingValue.finally(() => {
        if (pendingValueRef.current === pendingValue) {
          setIsPending(undefined);
        }
      });
    },
    [onSubmit]
  );

  return (
    <form
      aria-busy={isPending ?? props["aria-busy"]}
      onSubmit={onSubmit ? asyncOnSubmit : undefined}
      {...props}
    />
  );
}
