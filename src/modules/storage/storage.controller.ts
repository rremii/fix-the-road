import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"
import { getMulterConfig } from "src/common/helpers/getMulterConfig"
import { AccessTokenGuard } from "src/guards/access-token.guard"
import { StorageService } from "./storage.service"
import { UploadResponse } from "./responses/UploadResponse"

@Controller("storage")
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post("")
  @UseInterceptors(FileInterceptor("file", getMulterConfig()))
  @UseGuards(AccessTokenGuard)
  uploadFile(@UploadedFile() file: Express.Multer.File): UploadResponse {
    return {
      fileName: file.filename,
      mimeType: file.mimetype,
    }
  }

  @Delete(":fileName")
  @UseGuards(AccessTokenGuard)
  removeFile(@Param("fileName") fileName: string) {
    return this.storageService.remove(fileName)
  }
}
