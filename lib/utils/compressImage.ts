"use client";

import Compressor from "compressorjs";

export const compressImage = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality: 0.8,
      maxWidth: 1920,
      mimeType: "image/webp",
      success(result) {
        // Convertimos el Blob resultante a un objeto File con extensión .webp
        const webpFile = new File(
          [result],
          file.name.replace(/\.[^/.]+$/, "") + ".webp",
          { type: "image/webp" }
        );
        resolve(webpFile);
      },
      error(err) {
        reject(err);
      },
    });
  });
};
