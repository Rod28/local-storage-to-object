// Types
import type {
  LocalStorageType,
  SetItemsType,
  GetItemsType,
  GetItemsResponseType
} from "./types";

/**
 * It allows treating the data that is stored and extracted in the browser's localStorage,
 * always as an object.
 *
 * @see https://developer.mozilla.org/es/docs/Web/API/Window/localStorage
 */
class LocalStorage implements LocalStorageType  {
  // Values that are not considered valid within the localStorage response
  private static readonly invalidation = [undefined, null];

  /**
   * Get the localStorage object, matching the value of '_key'. In case of an error,
   * an empty object is returned.
   *
   * @param _key Value to search for in localStorage
   * @returns Object matching the value of '_key' or an empty object
   */
  private static getValueLocalStorage(_key: string): Record<string, any> {
    try {
      // Prevents localStorage from being used if it is not available in node.js
      if (typeof localStorage === "undefined") {
        return {};
      }

      const storage = localStorage.getItem(_key);
      const dataLocalStorage = storage ? JSON.parse(storage) : {};
      return dataLocalStorage;
    } catch (error) {
      console.warn("LocalStorage getItem: >>>", error);
      return {};
    }
  }

  /**
   * Merge new and existing values in localStorage, under the same 'key'.
   *
   * @param key Name on which the values will be stored in localStorage
   * @param _oldValues Value or values a stored in localStorage
   * @param _newValues Value or values to store in localStorage
   */
  private static saveDataLocalStorage(
    _key: string,
    _oldValues: Record<string, any>,
    _newValues: Record<string, any>
  ): void {
    try {
      const newValue = { ..._oldValues, ..._newValues };
      const dataSave = JSON.stringify(newValue);
      localStorage.setItem(_key, dataSave);
    } catch (error) {
      console.warn("LocalStorage setItem: >>>", error);
    }
  }

  /**
   * Before storing a new value in localStorage, it is validated if the 'key' exists
   * inside localStorage, in order to be able to merge the new values under the same object.
   *
   * @param key Name on which the values will be stored in localStorage
   * @param value Value or values to store in localStorage
   */
  static setItem(key: string, value: Record<string, any>): void {
    const dataLocalStorage = this.getValueLocalStorage(key);
    this.saveDataLocalStorage(key, dataLocalStorage || {}, value);
  }

  /**
   * It allows to store several keys with their respective objects, at the same time.
   *
   * @param items Array of objects to store in localStorage
   */
  static setItems(items: SetItemsType): void {
    if (items.length > 0) {
      items.forEach((item) => {
        const dataLocalStorage = this.getValueLocalStorage(item.key);
        this.saveDataLocalStorage(item.key, dataLocalStorage || {}, item.value);
      });
    }
  }

  /**
   * To get a value, look inside localStorage for the object that matches the value of 'key',
   * and return the entire object.
   *
   * @param key Name of values stored in localStorage
   * @param value Value or values that you want to access
   * @param defaultValue Default value in case `value` does not exist
   * @returns Object matching the value of 'key' or an empty object
   */
  static getItem(
    key: string,
    value?: string | string[],
    defaultValue: any = "*"
  ): any {
    const dataLocalStorage = this.getValueLocalStorage(key);

    // A specific value of the object returned by localStorage is accessed.
    if (value) {
      // We can return more than one attribute of the object returned by localStorage
      if (Array.isArray(value)) {
        const newData: any = {};
        value.forEach((v) => {
          const result = dataLocalStorage[v];

          if (!this.invalidation.includes(result)) {
            newData[v] = result;
            return;
          }
          newData[v] = defaultValue;
        });

        return newData;
      }

      // Flow to access a single value of the object returned by localStorage
      const result = dataLocalStorage[value];

      if (!this.invalidation.includes(result)) {
        return result;
      }
      return defaultValue;
    }

    return dataLocalStorage;
  }

  /**
   * Allows you to get multiple keys from localStorage, as well as the object assigned to
   * each key.
   *
   * @param items Array of objects to get from localStorage
   * @returns Array of objects matching each of the 'key' or an empty array
   */
  static getItems(items: GetItemsType): GetItemsResponseType {
    const data: GetItemsResponseType = [];

    if (items.length > 0) {
      items.forEach((item) => {
        const dataLocalStorage = this.getValueLocalStorage(item?.key || "");

        // A specific value of the object returned by localStorage is accessed.
        if (item?.value) {
          // We can return more than one attribute of the object returned by localStorage
          if (Array.isArray(item.value)) {
            const newData: any = {};
            item.value.forEach((v) => {
              const result = dataLocalStorage[v];

              if (!this.invalidation.includes(result)) {
                newData[v] = result;
                return;
              }
              newData[v] = item?.defaultValue || "*";
            });

            data.push({ key: item?.key || "", localStorageData: newData });
            return;
          }

          // Flow to access a single value of the object returned by localStorage
          const result = dataLocalStorage[item.value];

          if (!this.invalidation.includes(result)) {
            data.push({ key: item?.key || "", localStorageData: result });
            return;
          }
          data.push({
            key: item?.key || "",
            localStorageData: item?.defaultValue || "*"
          });
          return;
        }

        data.push({
          key: item?.key || "",
          localStorageData: dataLocalStorage
        });
      });
    }

    return data;
  }

  /**
   * You can completely clean localStorage or remove one or more 'keys'. Keep in mind that
   * when removing 'keys', their assigned objects will also be removed.
   *
   * @param key Name(s) on which to delete the values in localStorage.
   */
  static removeItem(key?: string | string[]): void {
    try {
      // Prevents localStorage from being used if it is not available in node.js
      if (typeof localStorage === "undefined") {
        return;
      }

      if (key) {
        // Remove all 'keys' and their assigned objects, matching each element of the array.
        if (Array.isArray(key)) {
          // Passing an empty array removes localStorge entirely
          if (key.length === 0) {
            localStorage.clear();
          }

          // If an array element does not exist, remove localStorge entirely
          key.forEach((item) => {
            if (!item) {
              localStorage.clear();
            }

            localStorage.removeItem(item);
          });
          return;
        }

        localStorage.removeItem(key);
        return;
      }

      localStorage.clear();
    } catch (error) {
      console.warn("LocalStorage removeItem: >>>", error);
    }
  }

  /**
   * When passed a number 'n', this method returns the name of the nth key in storage.
   *
   * @param index Index number to search within the keys stored in localStorage
   * @returns Name of the index found, if it does not exist it returns an empty string
   */
  static getKeyName(index: number): string {
    try {
      // Prevents localStorage from being used if it is not available in node.js
      if (typeof localStorage === "undefined") {
        return "";
      }

      return localStorage.key(index) || "";
    } catch (error) {
      console.warn("LocalStorage getKeyName: >>>", error);
      return "";
    }
  }

  /**
   * Get the number of 'keys' stored in localStorage
   *
   * @returns The number of 'keys' stored in localStorage
   */
  static getCapacity(): number {
    try {
      // Prevents localStorage from being used if it is not available in node.js
      if (typeof localStorage === "undefined") {
        return 0;
      }

      return localStorage.length;
    } catch (error) {
      console.warn("LocalStorage getCapacity: >>>", error);
      return 0;
    }
  }
}

export default LocalStorage;
