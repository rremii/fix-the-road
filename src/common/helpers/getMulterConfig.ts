import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface"
import { diskStorage } from "multer"

export const getMulterConfig = (): MulterOptions => {
  return {
    storage: diskStorage({
      destination: "./static",
      filename(req, file, callback) {
        callback(null, Date.now() + "_" + file.originalname)
      },
    }),
    fileFilter(req, file, callback) {
      callback(null, true)
    },
  }
}
