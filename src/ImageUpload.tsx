import { createImage } from "jazz-tools/media";
import { useAccount } from "jazz-tools/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Account, Photo, PhotoFeed } from "./schema";
import { co } from "jazz-tools";

export default function ImageUpload() {
  const { me } = useAccount(Account, {
    resolve: { profile: { friends: true } },
  });
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (imagePreviewUrl) {
        e.preventDefault();
        return "Upload in progress. Are you sure you want to leave?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);

      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  const onImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!me) return;

    const file = event.currentTarget.files?.[0];

    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImagePreviewUrl(objectUrl);

      try {
        const feed = await PhotoFeed.load(
          import.meta.env.VITE_GLOBAL_PHOTO_FEED
        );
        if (!feed) throw new Error("could not load global photo feed");

        const startTime = performance.now();

        // create a public post
        // const owner = co.group().create();
        // owner.makePublic();

        // create a friends-only post
        const owner = me.profile.friends;

        const image = await createImage(file, {
          owner,
          progressive: true,
          placeholder: "blur",
        });

        const photo = Photo.create({ image }, image.$jazz.owner);
        feed.$jazz.push(photo);

        const endTime = performance.now();
        console.log(`Image upload took ${endTime - startTime} milliseconds`);
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        URL.revokeObjectURL(objectUrl);
        setImagePreviewUrl(null);
      }
    }
  };

  if (imagePreviewUrl) {
    return (
      <div className="relative">
        <p className="z-10 absolute font-semibold text-gray-900 inset-0 flex items-center justify-center">
          Uploading image...
        </p>
        <img
          src={imagePreviewUrl}
          alt="Preview"
          className="opacity-50 w-full h-auto"
        />
      </div>
    );
  }

  return (
    <div className="flex justify-end p-2">
      <label
        htmlFor="image"
        className="bg-blue-500 rounded cursor-pointer text-white p-2"
      >
        Add photo
      </label>
      <input
        id="image"
        name="image"
        ref={inputRef}
        type="file"
        accept="image/png, image/jpeg, image/gif, image/bmp"
        onChange={onImageChange}
        hidden
      />
    </div>
  );
}
