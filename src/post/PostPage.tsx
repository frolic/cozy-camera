import { useCoState, Image } from "jazz-tools/react";
import { Post } from "../schemas";
import { useNavigate, useParams } from "react-router";
import { twMerge } from "tailwind-merge";

export function PostPage() {
  const { postId: id } = useParams<{ postId: string }>();
  const post = useCoState(Post, id, {
    resolve: { images: { $each: true } },
  });

  const navigate = useNavigate();

  // TODO: loading indicator
  // TODO: redirect or not-found when no post found for ID
  if (!post) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/80"
        onClick={() => navigate("/")}
      />
      <div className="fixed inset-0 overflow-auto py-16 px-2">
        <div className="grid *:col-start-1 *:row-start-1">
          <div className="flex overflow-x-scroll snap-x snap-mandatory [scrollbar-width:none] scroll-smooth">
            {post.images.map((image, i) => {
              const [width, height] = image.originalSize;
              return (
                <div
                  id={`${id}-${i}`}
                  className="w-full box-content snap-start flex-none flex justify-center"
                >
                  <Image
                    imageId={image.$jazz.id}
                    loading="lazy"
                    className={twMerge("max-w-5xl")}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
