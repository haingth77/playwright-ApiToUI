import util from "util";

export class LogUtils {
  static logStep(content: string) {
    console.log(util.inspect(content, { showHidden: false, depth: null, colors: true }));
  }
}

export default new LogUtils();
