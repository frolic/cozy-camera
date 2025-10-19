import { useEffect, useMemo } from "react";

export function ImagePreview({ image }: { image: Blob }) {
  const url = useMemo(() => URL.createObjectURL(image), [image]);
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [url]);

  return <img src={url} className="w-full aspect-square object-cover" />;
}
