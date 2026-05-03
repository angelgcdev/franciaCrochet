"use client";

import Compressor from "compressorjs";

export const compressImage = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality: 0.6,
      maxWidth: 1920,
      convertTypes: ["image/png"],
      convertSize: 1000000,
      success(result) {
        resolve(result as File);
      },
      error(err) {
        reject(err);
      },
    });
  });
};
