import { timeAgo } from "./timeAgo";

export function RelativeTime({ time }: { time: Date }) {
  return (
    <time dateTime={time.toISOString()} title={time.toLocaleString()}>
      {timeAgo(time)}
    </time>
  );
}
