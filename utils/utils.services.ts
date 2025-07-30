export class UtilsServices {
  public async sanitizeFilename(filename: string) {
    return filename.replace(/[^a-zA-Z0-9]/g, "-");
  }

  public delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
export default new UtilsServices();
