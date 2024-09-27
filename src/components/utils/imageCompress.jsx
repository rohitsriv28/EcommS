import React, { useEffect } from "react";
import imageCompression from "browser-image-compression";

const ImageCompressor = ({ images = [], onCompress }) => {
  const compressImage = async (imageFile) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      onProgress: (progress) => console.log(`Progress: ${progress}%`),
    };

    try {
      const compressedFile = await imageCompression(imageFile, options);
      return URL.createObjectURL(compressedFile);
    } catch (error) {
      console.error("Error during compression:", error);
      return null;
    }
  };

  useEffect(() => {
    const compressAllImages = async () => {
      if (Array.isArray(images) && images.length > 0) {
        const compressedImages = await Promise.all(
          images.map((image) => compressImage(image))
        );
        onCompress(compressedImages.filter((url) => url !== null));
      } else if (images instanceof File) {
        // If a single image is passed, compress it
        const compressedImageUrl = await compressImage(images);
        if (compressedImageUrl) {
          onCompress([compressedImageUrl]);
        }
      }
    };

    compressAllImages();
  }, [images, onCompress]);

  return null; // No UI needed, as this component just processes images
};

export default ImageCompressor;
