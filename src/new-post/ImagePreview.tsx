import { useEffect, useMemo } from "react";

export function ImagePreview({ image }: { image: Blob }) {
  const url = useMemo(() => URL.createObjectURL(image), [image]);
  useEffect(() => {
    // strict mode's double mounting seems to revoke these too early
    // so disable in dev for now
    if (import.meta.env.DEV) return;

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [url]);

  return <img src={url} className="w-full aspect-square object-cover" />;
}
