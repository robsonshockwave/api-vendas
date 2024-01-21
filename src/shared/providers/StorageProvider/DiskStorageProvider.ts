import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';

export default class DiskStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.directory, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.directory, file);

    try {
      // Check if file exists
      await fs.promises.stat(filePath);
    } catch {
      // If file does not exist, return
      return;
    }

    // If file exists, delete it
    await fs.promises.unlink(filePath);
  }
}
