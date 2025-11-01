import { Children, ReactNode } from "react";

export function PostCard({
  id,
  images,
  caption,
}: {
  id: string;
  images: ReactNode;
  caption?: ReactNode;
}) {
  const imagesCount = Children.count(images);
  return (
    <div className="bg-white p-2 shadow">
      <div className="w-full aspect-square grid *:col-start-1 *:row-start-1">
        <div className="flex overflow-x-scroll snap-x snap-mandatory [scrollbar-width:none] scroll-smooth">
          {Children.map(images, (child, i) => (
            <div
              id={`${id}-${i}`}
              className="w-full box-content snap-start flex-none flex"
            >
              {child}
            </div>
          ))}
        </div>
        {imagesCount > 1 ? (
          <div className="self-end justify-self-center flex m-1">
            {Array.from({ length: Children.count(images) }).map((_, i) => (
              <button
                key={i}
                type="button"
                className="group inline-flex cursor-pointer p-1"
                onClick={() => {
                  const el = document.querySelector(`#${id}-${i}`);
                  el?.scrollIntoView({ block: "nearest" });
                }}
              >
                <span className="inline-flex size-2 rounded-full bg-white/50 group-hover:bg-white"></span>
              </button>
            ))}
          </div>
        ) : null}
      </div>
      {caption}
    </div>
  );
}
