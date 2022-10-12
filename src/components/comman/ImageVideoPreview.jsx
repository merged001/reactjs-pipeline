import React, { useEffect, useState } from "react";
import ImagePlaceHolder from "../../assets/images/icon/image-placeholder.jpg";
import { last } from "lodash";

const convertMediaUrl = (url = "") => {
  const mediaId = last(url.split("/"));
  return `https://ipfs.io/ipfs/${mediaId}`;
};

const ImageVideoPreview = (props) => {
  const [media, setMedia] = useState({
    src: "",
    isImage: true,
    isError: false,
  });

  useEffect(() => {
    if (props.data) {
      const isImage = props.data.image ? true : false;
      const src = isImage ? props.data.image : props.data.animation_url;
      setMedia({ src: src, isImage });
    }
  }, [props]);

  const handleError = () => {
    if (media.isError) {
      setMedia({ src: ImagePlaceHolder, isImage: true });
    } else {
      setMedia({
        src: convertMediaUrl(media.src),
        isImage: media.isImage,
        isError: true,
      });
    }
  };
  return (
    <>
      {media.isImage ? (
        <img src={media.src} alt={props.alt} onError={handleError} />
      ) : (
        <video src={media.src} autoPlay alt={props.alt} onError={handleError} />
      )}
    </>
  );
};

export default ImageVideoPreview;
