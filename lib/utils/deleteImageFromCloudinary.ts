"use server";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function deleteImageFromCloudinary(publicId: string) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return { ok: true, result };
  } catch (error) {
    console.error("Error eliminando imagen en Cloudinary:", error);
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Error inesperado",
    };
  }
}
