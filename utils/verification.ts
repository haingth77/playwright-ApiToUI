import { expect } from "@playwright/test";

import { Validator } from "jsonschema";

export class Verification {
  public async verifyStatusCode(response: any, expectedCode: number) {
    console.log("Verify status code is: " + expectedCode);
    expect(await response.status()).toEqual(expectedCode);
  }

  public async verifyJsonSchema(response: any, schema: any) {
    console.log("Verify JsonSchema");
    let v = new Validator();
    let result = v.validate(response, schema).valid;

    if (!result) {
      console.log(v.validate(response, schema).errors);
    }

    expect(await result).toEqual(true);
  }

  public async verifyEqualItem(actual: any, expected: any) {
    console.log("Verify Item is equal: " + expected);
    expect(await actual).toEqual(await expected);
  }

  public async verifyNotEqualItem(actual: any, expected: any) {
    console.log("Verify Item is not equal: " + expected);
    expect((await actual) !== (await expected)).toBeTruthy();
  }

  public async verifyContainItem(actual: any, expected: any) {
    console.log("Verify Item contains: " + expected);
    expect(await actual).toContain(await expected);
  }

  public async verifyNotContainItem(actual: any, expected: any) {
    console.log("Verify Item not contains: " + expected);
    expect(await actual).not.toContain(await expected);
  }

  public async verifyItemIsExist(actual: any, expected: any) {
    console.log("Verify item is exist: " + expected);
    expect(await actual).toHaveProperty(await expected);
  }

  public async verifyItemIsNotExist(actual: any, expected: any) {
    console.log("Verify item is not exist: " + expected);
    expect(await actual).not.toHaveProperty(await expected);
  }

  public async verifyItemToBeNotDefined(actual: any) {
    console.log("Verify item is not exist");
    expect(await actual).toBeUndefined();
  }

  public async verifyItemToBeDefined(actual: any) {
    console.log("Verify item to be defined: " + actual);
    expect(await actual).toBeDefined();
  }

  public async VerifyItemsOfArrayAreEqual(arrItem: string[], expected: any) {
    console.log("Verify items of array are equal: " + expected);
    let result = arrItem.filter((item) => {
      return item && item === expected;
    });
    expect(await result.length).toBeGreaterThan(0);
  }

  public async VerifyItemsOfArrayAreNotEqual(arrItem: string[], expected: any) {
    console.log("Verify items of array are not equal: " + expected);
    let result = arrItem.filter((item) => {
      return item && item === expected;
    });
    expect(await result.length).toEqual(0);
  }

  public async verifyItemGreaterThan(actual: any, expected: any) {
    console.log("Verify Item is greater than: " + expected);
    expect(await actual).toBeGreaterThan(await expected);
  }

  public async verifyItemGreaterThanOrEqual(actual: any, expected: any) {
    console.log("Verify Item is greater than or equal: " + expected);
    expect(await actual).toBeGreaterThanOrEqual(await expected);
  }

  public async verifyItemLessThan(actual: any, expected: any) {
    console.log("Verify Item is less than: " + expected);
    expect(await actual).toBeLessThan(await expected);
  }

  public async verifyItemLessThanOrEqual(actual: any, expected: any) {
    console.log("Verify Item is less than: " + expected);
    expect(await actual).toBeLessThanOrEqual(await expected);
  }

  public async verifyItemInRange(actual: any, expectedLowerBound: any, expectedUpperBound: any) {
    console.log(
      `Verify Item is greater than or equal: ${expectedLowerBound} and less than or equal: ${expectedUpperBound}`
    );
    expect(await actual).toBeGreaterThanOrEqual(await expectedLowerBound);
    expect(await actual).toBeLessThanOrEqual(await expectedUpperBound);
  }

  public async verifyItemOfArray_IsSorted(array: number[]) {
    console.log(`Verify Item of array is sorted: ${array}`);
    let result: boolean = true;
    for (let index = 1; index < array.length; index++) {
      if (array[index] < array[index - 1]) {
        result = false;
      }
    }
    expect(result).toEqual(true);
  }

  public async verifyArrayContainItems(actual: any, expected: any) {
    console.log("Verify array contains all expected items: " + expected);

    if (!Array.isArray(actual) || !Array.isArray(expected)) {
      throw new Error("Both arguments must be arrays");
    }

    const missing = expected.filter((item) => !actual.includes(item));

    if (missing.length > 0) {
      throw new Error(`Array is missing expected items: ${JSON.stringify(missing)}`);
    }

    return true;
  }

  public async verifyArrayNotContainItems(actual: any, notExpected: any) {
    console.log("Verify array does not contain specified items: " + notExpected);

    if (!Array.isArray(actual) || !Array.isArray(notExpected)) {
      throw new Error("Both arguments must be arrays");
    }

    const found = notExpected.filter((item) => actual.includes(item));

    if (found.length > 0) {
      throw new Error(`Array contains unwanted items: ${JSON.stringify(found)}`);
    }

    return true;
  }
}

export default new Verification();
