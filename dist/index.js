"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * It allows treating the data that is stored and extracted in the browser's localStorage,
 * always as an object.
 *
 * @see https://developer.mozilla.org/es/docs/Web/API/Window/localStorage
 */
var LocalStorage = /** @class */ (function () {
    function LocalStorage() {
    }
    /**
     * Get the localStorage object, matching the value of '_key'. In case of an error,
     * an empty object is returned.
     * @param _key Value to search for in localStorage
     * @returns Object matching the value of '_key' or an empty object
     */
    LocalStorage.getValueLocalStorage = function (_key) {
        try {
            var localStorage_1 = this.storage.getItem(_key);
            var dataLocalStorage = localStorage_1 ? JSON.parse(localStorage_1) : {};
            return dataLocalStorage;
        }
        catch (error) {
            console.warn('LocalStorage getValueLocalStorage: >>>', error);
            return {};
        }
    };
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
    LocalStorage.setItem = function (key, value) {
        try {
            var dataLocalStorage = this.getValueLocalStorage(key);
            // If there are already values ​​in dataLocalStorage, they are merged with the new ones.
            var newValue = __assign(__assign({}, dataLocalStorage), value);
            var item = JSON.stringify(newValue);
            this.storage.setItem(key, item);
        }
        catch (error) {
            console.warn('LocalStorage setItem: >>>', error);
        }
    };
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
    LocalStorage.getItem = function (key, value, _defaultValue) {
        if (_defaultValue === void 0) { _defaultValue = '*'; }
        var dataLocalStorage = this.getValueLocalStorage(key);
        // A specific value of the object returned by localStorage is accessed.
        if (value) {
            var result = dataLocalStorage[value];
            // If the value to search for does not match 'undefined' or 'null', that value is returned.
            if (!this.invalidation.includes(result)) {
                return result;
            }
            return _defaultValue;
        }
        return dataLocalStorage;
    };
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
    LocalStorage.removeItem = function (key) {
        var _this = this;
        try {
            if (key) {
                // Remove all 'keys' and their assigned objects, matching each element of the array.
                if (Array.isArray(key)) {
                    key.forEach(function (item) {
                        _this.storage.removeItem(item);
                    });
                    return;
                }
                this.storage.removeItem(key);
                return;
            }
            this.storage.clear();
        }
        catch (error) {
            console.warn('LocalStorage removeItem: >>>', error);
        }
    };
    // Browser localStorage instance
    LocalStorage.storage = window.localStorage;
    // Values ​​that are not considered valid within the localStorage response
    LocalStorage.invalidation = [undefined, null];
    return LocalStorage;
}());
exports.default = LocalStorage;
//# sourceMappingURL=index.js.map