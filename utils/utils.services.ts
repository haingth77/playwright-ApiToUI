export class UtilsServices {
  public async sanitizeFilename(filename: string) {
    return filename.replace(/[^a-zA-Z0-9]/g, "-");
  }

  public delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public getDayMonthYear(date: string) {
    const day = date.split('-')[2]
    const month = date.split('-')[1]
    const year = date.split('-')[0]
    return {day, month, year}
  }
}
export default new UtilsServices();
