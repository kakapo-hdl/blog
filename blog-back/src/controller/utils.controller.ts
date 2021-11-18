import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { networkInterfaces } from 'os';

import { resolve } from 'path';

import { join } from 'path/posix';
import { Response } from 'express';
import { getIPAdress, Port, writeFileToPublic } from 'src/constants/constants';

// import { ProductsService } from 'src/service/product.sercvice';

@Controller('utils')
export class UtilsController {
  // constructor(private readonly productService: ProductsService) {}

  @Post('insert')
  addProduct(
    @Body('title') proTitle: string,
    @Body('description') proDesc: string,
    @Body('price') proPpice: number,
    @Res() res: Response,
  ): any {
    return res.status(HttpStatus.OK);
    // this.productService.insertProduct(proTitle, proDesc, proPpice);
  }
  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ): any {
    const path = writeFileToPublic('/ckeditor', file);
    if (path === 'error') {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ uploaded: false, msg: '文件写入错误' });
    } else {

      return res.status(HttpStatus.OK).send({
        url: `http://localhost:${Port}/public` + path,
        uploaded: true,
      });
    }
  }

}
// ${getIPAdress()}
