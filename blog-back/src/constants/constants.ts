import { createWriteStream, existsSync, mkdirSync } from "fs";
import { networkInterfaces } from "os";
import { join } from "path";

export const getIPAdress = () => {
    var interfaces = networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}
export const writeFileToPublic = (path: string, file: Express.Multer.File): string => {
    const writePath = join(__dirname, '..', '../public', path);
    if (!existsSync(writePath)) mkdirSync(writePath)
    const finalPath = writePath + `/${file.originalname}`
    const writeImage = createWriteStream(
        finalPath
    );

    try {
        writeImage.write(file.buffer);
        return path+`/${file.originalname}`;
    } catch (error) {
        return 'error';
    }
}

export const convertUrl = (path: string): string => `http://${getIPAdress()}:${Port}/public${path}`



export const Port = 3300;