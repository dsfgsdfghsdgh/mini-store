import { imageSchema } from "../common/schema/auth.schema";

export const validateFileImage = (file: Express.Multer.File) => {
  const image = imageSchema.parse({
    mimetype: file.mimetype,
    size: file.size,
    fieldname: file.fieldname,
    originalname: file.originalname,
    destination: file.destination,
    filename: file.filename,
    path: file.path,
  });
  return { path: image.path, filename: image.filename };
};