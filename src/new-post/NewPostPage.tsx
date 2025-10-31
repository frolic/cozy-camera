import { createImage } from "jazz-tools/media";
import { useAccount } from "jazz-tools/react";
import { useEffect, useId } from "react";
import { Account, Post, PostFeed } from "../schema";
import { useLocation, useNavigate, useNavigationType } from "react-router";
import { isBlobArray } from "./isBlobArray";
import { ImagePreview } from "./ImagePreview";
import { Textarea } from "../ui/Textarea";
import { Button } from "../ui/Button";
import { Form } from "../ui/Form";
import { co } from "jazz-tools";
import { Select } from "../ui/Select";
import { PostCard } from "../feed/Post";

export function NewPostPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const navigationType = useNavigationType();

  const ids = {
    caption: useId(),
    visibility: useId(),
  };

  // TODO: this as this doesn't seem to trigger for client nav (push/pop)
  // useBeforeUnload((event) => {
  //   event.preventDefault();
  //   return "Are you sure you want to discard this post?";
  // });

  const { me } = useAccount(Account, {
    resolve: { profile: { friends: true } },
  });

  const uploads = location.state?.uploads;
  useEffect(() => {
    if (isBlobArray(uploads)) return;

    if (navigationType === "PUSH") {
      navigate(-1);
      return;
    }
    navigate("/", { replace: true });
    return;
  }, [uploads]);

  if (!me) return null;

  if (!isBlobArray(uploads)) {
    return null;
  }

  return (
    <Form
      className="flex flex-col gap-4 pb-16"
      onSubmit={async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        if (!me) return;

        const feed = await PostFeed.load(import.meta.env.VITE_GLOBAL_POST_FEED);
        if (!feed) throw new Error("could not load global post feed");

        const owner = co.group().create();
        const visibility = formData.get("visibility") as string;
        if (visibility === "public") {
          owner.addMember("everyone", "reader");
        } else if (visibility === "friends") {
          owner.addMember(me.profile.friends, "reader");
        }

        const caption = formData.get("caption") as string;

        const images = await Promise.all(
          uploads.map((upload) => {
            const startTime = performance.now();
            const image = createImage(upload, {
              owner,
              progressive: true,
              placeholder: "blur",
            });
            const endTime = performance.now();
            console.log(
              `Image upload took ${endTime - startTime} milliseconds`
            );
            return image;
          })
        );

        const photo = Post.create({ images, caption }, owner);
        feed.$jazz.push(photo);

        navigate("/");
      }}
    >
      <PostCard
        images={
          <div>
            {uploads.map((upload, i) => (
              <ImagePreview key={i} image={upload} />
            ))}
          </div>
        }
        user={me}
      />

      <div className="flex flex-col">
        <label htmlFor={ids.caption}>Caption</label>
        <Textarea
          id={ids.caption}
          name="caption"
          className="field-sizing-content min-h-24"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor={ids.visibility}>Privacy</label>
        <Select id={ids.visibility} name="visibility" required>
          <option value="private">Just me</option>
          <option value="friends">Friends</option>
          <option value="public">Public</option>
        </Select>
      </div>

      <Button type="submit" className="text-lg">
        Post
      </Button>
    </Form>
  );
}

// onChange={async (event: ChangeEvent<HTMLInputElement>) => {
//   if (!me) return;

//   const file = event.currentTarget.files?.[0];

//   if (file) {
//     const objectUrl = URL.createObjectURL(file);
//     setImagePreviewUrl(objectUrl);

//     try {
//       const feed = await PhotoFeed.load(
//         import.meta.env.VITE_GLOBAL_PHOTO_FEED
//       );
//       if (!feed) throw new Error("could not load global photo feed");

//       const startTime = performance.now();

//       // create a public post
//       // const owner = co.group().create();
//       // owner.makePublic();

//       // create a friends-only post
//       const owner = me.profile.friends;

//       const image = await createImage(file, {
//         owner,
//         progressive: true,
//         placeholder: "blur",
//       });

//       const photo = Photo.create({ image }, image.$jazz.owner);
//       feed.$jazz.push(photo);

//       const endTime = performance.now();
//       console.log(
//         `Image upload took ${endTime - startTime} milliseconds`
//       );
//     } catch (error) {
//       console.error("Error uploading image:", error);
//     } finally {
//       URL.revokeObjectURL(objectUrl);
//       setImagePreviewUrl(null);
//     }
//   }
