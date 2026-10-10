import Image from "next/image";
import { urlFor } from "@/sanity/client";
import type { SanityImage } from "@/sanity/types";

type Props = {
  image?: SanityImage;
  /** Shown in the grey block until an image is uploaded, as in the design. */
  placeholder: string;
  className: string;
  /** Width / height of the frame, used to crop the Sanity image. */
  ratio: number;
  sizes: string;
  priority?: boolean;
};

export function Media({ image, placeholder, className, ratio, sizes, priority }: Props) {
  if (!image?.asset) {
    return <div className={`media ${className}`}>{placeholder}</div>;
  }
  const width = 1600;
  return (
    <div className={`media ${className}`}>
      <Image
        src={urlFor(image).width(width).height(Math.round(width / ratio)).url()}
        alt={image.alt ?? ""}
        fill
        sizes={sizes}
        priority={priority}
      />
    </div>
  );
}
