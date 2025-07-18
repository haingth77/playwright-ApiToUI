import { BASE_URL_STAG, BASE_URL_QA, BASE_URL_PRO } from "@utils/constant";

export function getENV() {
  let env = process.env.ENV;
  if (!env) env = "QA";
  return env;
}

export function getUrl() {
  let env = getENV();
  switch (env) {
    case "QA":
      return BASE_URL_QA;

    case "STAG":
      return BASE_URL_STAG;

    case "PROD":
      return BASE_URL_PRO;

    default:
      return BASE_URL_QA;
  }
}
