import { useEffect, useReducer } from "react";
import { timeAgo } from "./timeAgo";

export function RelativeTime({ time }: { time: Date }) {
  const [, forceUpdate] = useReducer((i) => i + 1, 0);
  useEffect(() => {
    const id = setInterval(forceUpdate, 1000);
    return () => {
      clearInterval(id);
    };
  }, [time]);

  return (
    <time dateTime={time.toISOString()} title={time.toLocaleString()}>
      {timeAgo(time)}
    </time>
  );
}
