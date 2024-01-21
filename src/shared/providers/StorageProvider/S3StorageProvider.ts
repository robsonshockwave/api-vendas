import fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk';
import mime from 'mime';
import uploadConfig from '@config/upload';

export default class S3StorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-1',
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    // S3 pede o ContentType do arquivo
    const ContentType = mime.getType(originalPath);

    if (!ContentType) {
      throw new Error('File not found.');
    }

    const fileContent = await fs.promises.readFile(originalPath);

    await this.client
      .putObject({
        // Bucket é o nome do repositório no S3
        Bucket: uploadConfig.config.s3.bucket,
        // Key é o nome do arquivo
        Key: file,
        ACL: 'public-read', // Permissão de leitura
        Body: fileContent, // Conteúdo do arquivo
        ContentType,
      })
      .promise();

    // Após salvar o arquivo no S3, deleta o arquivo temporário
    await fs.promises.unlink(originalPath);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        // Bucket é o nome do repositório no S3
        Bucket: uploadConfig.config.s3.bucket,
        // Key é o nome do arquivo
        Key: file,
      })
      .promise();
  }
}
