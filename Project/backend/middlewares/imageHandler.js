import multer from "multer";
import fs from "fs";
import { drive } from "../app.js";
import path from "path";
import sharp from "sharp";

const uploadsDir = path.join(path.resolve(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination folder to the user's subdirectory
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // Set the file name
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const upload = multer({ storage: Storage });

export const uploadLogoGdrive = async (file, next) => {
  try {
    const filePath = file.path;
    const response = await drive.files.create({
      requestBody: {
        name: file.filename,
        parents: [process.env.FOLDER_ID],
        mimeType: "image/jpeg",
      },
      media: {
        mimeType: "image/jpeg",
        body: fs.createReadStream(filePath),
      },
    });

    await fs.promises.unlink(filePath);

    return response.data.id;
  } catch (error) {
    // console.log(error);
    next(error);
  }
};

export const updateLogoGdrive = async (fileId, file, next) => {
  try {
    const filePath = file.path;
    const response = await drive.files.update({
      fileId: fileId,
      media: {
        mimeType: "image/jpeg",
        body: fs.createReadStream(filePath),
      },
    });

    await fs.promises.unlink(filePath);

    return response.data.id;
  } catch (error) {
    next(error);
  }
};

export const getLogoGdrive = async (imgId) => {
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
    const fileName = path.join(path.resolve(), "uploads", `${imgId}.jpg`);

    // Encode the buffer contents as a JPEG image
    const jpegBuffer = await sharp(buffer).toFormat("jpeg").toBuffer();

    // Write the JPEG buffer to a file
    fs.writeFileSync(fileName, jpegBuffer);

    return fileName;
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
        const filePath = file.path;
        const response = await drive.files.create({
          requestBody: {
            name: file.filename,
            parents: [process.env.FOLDER_ID],
            mimeType: "image/jpeg",
          },
          media: {
            mimeType: "image/jpeg",
            body: fs.createReadStream(filePath),
          },
        });

        // Save the uploaded image ID
        uploadedImageIds.push(response.data.id);

        // Delete the temporary file
        await fs.promises.unlink(filePath);
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
