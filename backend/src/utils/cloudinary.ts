import cloudinary from "cloudinary";

export const uploadImagesToCloudinary = async (
  imageFiles: Express.Multer.File[]
): Promise<string[]> => {
  // empty check
  if (!imageFiles || imageFiles.length === 0) {
    return [];
  }

  // Upload images
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${b64}`;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  // Wait for all promises to resolve, then get string urls
  const imageUrls = await Promise.all(uploadPromises);
  console.log("Image URLs from Cloudinary Util:", imageUrls);
  return imageUrls;
};
