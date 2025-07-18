export class UtilsServices {
  public async sanitizeFilename(filename: string) {
    return filename.replace(/[^a-zA-Z0-9]/g, "-");
  }
}
export default new UtilsServices();
