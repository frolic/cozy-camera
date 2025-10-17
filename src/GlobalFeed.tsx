import { Image, useCoState } from "jazz-tools/react";
import { PhotoFeed } from "./schema";
import { UserLabel } from "./UserLabel";
import { RelativeTime } from "./RelativeTime";

export default function GlobalFeed() {
  const feed = useCoState(PhotoFeed, import.meta.env.VITE_GLOBAL_PHOTO_FEED);
  // TODO: show something else?
  if (!feed) return;

  const photos = Object.values(feed.perAccount)
    .flatMap((accountFeed) => Array.from(accountFeed.all))
    .toSorted((a, b) => b.madeAt.getTime() - a.madeAt.getTime());

  return (
    <div className="space-y-4 py-4">
      {photos.map((photo) => (
        <div key={photo.ref.id} data-jazz-id={photo.ref.id}>
          {photo.by ? (
            <>
              <UserLabel user={photo.by} />{" "}
            </>
          ) : null}
          <RelativeTime time={photo.madeAt} />
          {photo.value?.image ? (
            <div className="-mx-2">
              <Image imageId={photo.value.image.$jazz.id} className="w-full" />
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
