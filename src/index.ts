/**
 * It allows treating the data that is stored and extracted in the browser's localStorage,
 * always as an object.
 *
 * @see https://developer.mozilla.org/es/docs/Web/API/Window/localStorage
 */
class LocalStorage {
  // Browser localStorage instance
  private static readonly storage = window.localStorage;
  // Values ​​that are not considered valid within the localStorage response
  private static readonly invalidation = [undefined, null];

  /**
   * Get the localStorage object, matching the value of '_key'. In case of an error,
   * an empty object is returned.
   * @param _key Value to search for in localStorage
   * @returns Object matching the value of '_key' or an empty object
   */
  private static getValueLocalStorage(_key: string): Record<string, any> {
    try {
      const localStorage = this.storage.getItem(_key);
      const dataLocalStorage = localStorage ? JSON.parse(localStorage) : {};
      return dataLocalStorage;
    } catch (error) {
      console.warn('LocalStorage getValueLocalStorage: >>>', error);
      return {};
    }
  }

  /**
   * Before storing a new value in localStorage, it is validated if the 'key' on which
   * will work, exists or not.
   *
   *  - If the 'key' already exists, it will extract from localStorage, the object that matches
   *    the 'key', and its values ​​will be merged with those of the new object, so that the new
   *    values ​​can overwrite one or several values ​​of the existing ones, in addition to add new
   *    values ​​to the object.
   *  - If the 'key' does not exist, it will simply be added with its respective value object.
   *
   * @param key Name on which the values ​​will be stored in localStorage
   * @param value Value or values ​​to store in localStorage
   */
  static setItem(key: string, value: Record<string, any>): void {
    try {
      const dataLocalStorage = this.getValueLocalStorage(key);

      // If there are already values ​​in dataLocalStorage, they are merged with the new ones.
      const newValue = { ...dataLocalStorage, ...value };
      const item = JSON.stringify(newValue);

      this.storage.setItem(key, item);
    } catch (error) {
      console.warn('LocalStorage setItem: >>>', error);
    }
  }

  /**
   * To get a value, look inside localStorage for the object that matches the value of 'key',
   * and return the entire object.
   *
   *  - If the value is not found, an empty object will be returned.
   *  - From the object returned from localStorage, a single value can be accessed instead of
   *    the entire object.
   *  - You can set a default value, in case you want to access an attribute of the object
   *    returned by localStorage, and it does not exist.
   *
   * @param key Name of values ​​stored in localStorage
   * @param value Value you want to access
   * @param _defaultValue Default value in case `value` does not exist
   * @returns Object matching the value of '_key' or an empty object
   */
  static getItem(key: string, value?: string, _defaultValue: any = '*'): any {
    const dataLocalStorage = this.getValueLocalStorage(key);

    // A specific value of the object returned by localStorage is accessed.
    if (value) {
      const result = dataLocalStorage[value];

      // If the value to search for does not match 'undefined' or 'null', that value is returned.
      if (!this.invalidation.includes(result)) {
        return result;
      }
      return _defaultValue;
    }

    return dataLocalStorage;
  }

  /**
   * You can completely clean localStorage or remove one or more 'keys'. Keep in mind that
   * when removing 'keys', their assigned objects will also be removed.
   *
   *  - If 'key' is passed as a string, the matching 'key' will be removed, as well as its
   *    assigned object.
   *  - If the 'key' is passed as an array, all matching 'keys' will be removed, as well as
   *    their assigned objects.
   *  - If the 'key' is not passed, the entire localStorage will be cleaned, regardless of
   *    whether there are values ​​that were added with this functionality or not.
   *
   * @param key Name(s) on which to delete the values ​​in localStorage.
   */
  static removeItem(key?: string | string[]): void {
    try {
      if (key) {
        // Remove all 'keys' and their assigned objects, matching each element of the array.
        if (Array.isArray(key)) {
          key.forEach((item) => {
            this.storage.removeItem(item);
          });
          return;
        }

        this.storage.removeItem(key);
        return;
      }

      this.storage.clear();
    } catch (error) {
      console.warn('LocalStorage removeItem: >>>', error);
    }
  }
}

export default LocalStorage;
