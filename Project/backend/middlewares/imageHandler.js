import multer from "multer";
import { drive } from "../app.js";
import sharp from "sharp";
import { Readable } from "stream";

const Storage = multer.memoryStorage();

export const upload = multer({ storage: Storage });

export const uploadLogoGdrive = async (file, next) => {
  try {
    const fileStream = new Readable();
    fileStream.push(file.buffer);
    fileStream.push(null);
    const response = await drive.files.create({
      requestBody: {
        name: file.filename,
        mimeType: "image/jpeg",
      },
      media: {
        mimeType: "image/jpeg",
        body: fileStream,
      },
    });

    return response.data.id;
  } catch (error) {
    // console.log(error);
    next(error);
  }
};

export const updateLogoGdrive = async (fileId, file, next) => {
  try {
    const fileStream = new Readable();
    fileStream.push(file.buffer);
    fileStream.push(null);
    const response = await drive.files.update({
      fileId: fileId,
      media: {
        mimeType: "image/jpeg",
        body: fileStream,
      },
    });

    return response.data.id;
  } catch (error) {
    next(error);
  }
};

export const getLogoGdrive = async (imgId, next) => {
  try {
    if (!imgId) {
      return next(new ErrorHandler("No Logo Image Found.", 400));
    }
    // Get file metadata
    const content = await drive.files.get({
      fileId: imgId,
      alt: "media",
    });

    const buffer = Buffer.from(await content.data.arrayBuffer());

    // Encode the buffer contents as a JPEG image
    const jpegBuffer = await sharp(buffer).toFormat("jpeg").toBuffer();

    return jpegBuffer;
  } catch (error) {
    next(error);
  }
};

export const deleteLogoGdrive = async (imgId, next) => {
  try {
    // Delete File directly
    const response = await drive.files.delete({
      fileId: imgId,
    });

    return response;
  } catch (error) {
    next(error);
  }
};

export const uploadMultipleImagesGdrive = async (files, next) => {
  try {
    const uploadedImageIds = [];

    await Promise.all(
      files.map(async (file) => {
        const fileStream = new Readable();
        fileStream.push(file.buffer);
        fileStream.push(null);
        const filePath = file.path;
        const response = await drive.files.create({
          requestBody: {
            name: file.filename,
            mimeType: "image/jpeg",
          },
          media: {
            mimeType: "image/jpeg",
            body: fileStream,
          },
        });

        // Save the uploaded image ID
        uploadedImageIds.push(response.data.id);
      })
    );

    return uploadedImageIds;
  } catch (error) {
    next(error);
  }
};

export const getGalleryFromGdrive = async (fileIds, next) => {
  try {
    const images = await Promise.all(
      fileIds.map(async (fileId) => {
        const content = await drive.files.get({
          fileId: fileId,
          alt: "media",
        });

        const buffer = Buffer.from(await content.data.arrayBuffer());

        const jpegBuffer = await sharp(buffer).toFormat("jpeg").toBuffer();

        return jpegBuffer;
      })
    );

    return images;
  } catch (error) {
    next(error);
  }
};

export const deleteImageGDrive = async (files, next) => {
  try {
    await Promise.all(
      files.map(async (file) => {
        await drive.files.delete({
          fileId: file,
        });
      })
    );

    return 201;
  } catch (error) {
    next(error);
  }
};
