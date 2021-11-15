import { Controller, Get, Render, Post,UseInterceptors,UploadedFile, Body, Res, HttpStatus} from '@nestjs/common';
import { FileInterceptor,FilesInterceptor } from '@nestjs/platform-express';
import { createWriteStream } from 'fs';
import { networkInterfaces } from 'os';
import { join } from 'path/posix';
import  {Response} from 'express';

// import { ProductsService } from 'src/service/product.sercvice';


@Controller('utils')
export class UtilsController {
  // constructor(private readonly productService: ProductsService) {}

  @Post('insert')
  addProduct(
    @Body ('title') proTitle: string,
    @Body('description') proDesc: string,
    @Body('price') proPpice: number,
    @Res() res: Response
  ): any {
    return res.status(HttpStatus.OK)
    // this.productService.insertProduct(proTitle, proDesc, proPpice);
  }
  @Post('upload')
  @UseInterceptors(
  FileInterceptor('image'))
  uploadFile(@Body('title') proTitle: string,@UploadedFile() file: Express.Multer.File,@Res() res: Response): any {
    const writeImage = createWriteStream(join(__dirname, '..','../blog-back/public', `${file.originalname}`))    
    try {
      writeImage.write(file.buffer);
      return res.status(HttpStatus.OK).send({url:'http://192.168.3.3:3300/public/'+ `${file.originalname}`,"uploaded":true});
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({"uploaded":false,msg:'文件写入错误'}); 
    } 
  }
}