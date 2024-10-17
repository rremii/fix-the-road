import { Injectable } from "@nestjs/common"
const path = require("path")
const fs = require("fs")

@Injectable()
export class StorageService {
  async remove(fileName: string) {
    const filePath = path.join(__dirname, "../../../static", fileName)

    return await fs.unlink(filePath, (err) => {
      if (err) throw err
    })
  }
}
