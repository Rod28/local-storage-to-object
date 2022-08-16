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
     *
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
            console.warn('LocalStorage getItem: >>>', error);
            return {};
        }
    };
    /**
     * Merge new and existing values ​​in localStorage, under the same 'key'.
     *
     * @param key Name on which the values ​​will be stored in localStorage
     * @param _oldValues Value or values ​​a stored in localStorage
     * @param _newValues Value or values ​​to store in localStorage
     */
    LocalStorage.saveDataLocalStorage = function (_key, _oldValues, _newValues) {
        try {
            var newValue = __assign(__assign({}, _oldValues), _newValues);
            var dataSave = JSON.stringify(newValue);
            this.storage.setItem(_key, dataSave);
        }
        catch (error) {
            console.warn('LocalStorage setItem: >>>', error);
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
        var dataLocalStorage = this.getValueLocalStorage(key);
        this.saveDataLocalStorage(key, dataLocalStorage || {}, value);
    };
    /**
     * It allows to store several keys with their respective objects, at the same time.
     *
     *  - For each element that exists in the array, first get the localStorage object that matches the
     *    'key' of the current element and combine the existing values ​​with the new values. This new value
     *    is stored under the current 'key'.
     *
     * @param items Array of objects to store in localStorage
     */
    LocalStorage.setItems = function (items) {
        var _this = this;
        if (items.length > 0) {
            items.forEach(function (item) {
                var dataLocalStorage = _this.getValueLocalStorage(item.key);
                _this.saveDataLocalStorage(item.key, dataLocalStorage || {}, item.value);
            });
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
     *  - If the second argument is passed as an array, multiple objects can be requested, and
     *    those that are not found will be returned with the default value assigned.
     *
     * @param key Name of values ​​stored in localStorage
     * @param value Value or values ​​that you want to access
     * @param defaultValue Default value in case `value` does not exist
     * @returns Object matching the value of 'key' or an empty object
     */
    LocalStorage.getItem = function (key, value, defaultValue) {
        var _this = this;
        if (defaultValue === void 0) { defaultValue = '*'; }
        var dataLocalStorage = this.getValueLocalStorage(key);
        // A specific value of the object returned by localStorage is accessed.
        if (value) {
            // We can return more than one attribute of the object returned by localStorage
            if (Array.isArray(value)) {
                var newData_1 = {};
                value.forEach(function (v) {
                    var result = dataLocalStorage[v];
                    if (result && !_this.invalidation.includes(result)) {
                        newData_1[v] = result;
                        return;
                    }
                    newData_1[v] = defaultValue;
                });
                return newData_1;
            }
            // Flow to access a single value of the object returned by localStorage
            var result = dataLocalStorage[value];
            if (result && !this.invalidation.includes(result)) {
                return result;
            }
            return defaultValue;
        }
        return dataLocalStorage;
    };
    /**
     * Allows you to get multiple keys from localStorage, as well as the object assigned to
     * each key.
     *
     *  - For each element that exists in the array, it allows obtaining the value corresponding
     *    to that 'key', a single element of that 'key' or multiple elements existing in the
     *    current 'key'.
     *
     * @param items Array of objects to get from localStorage
     * @returns Array of objects matching each of the 'key' or an empty array
     */
    LocalStorage.getItems = function (items) {
        var _this = this;
        var data = [];
        if (items.length > 0) {
            items.forEach(function (item) {
                var dataLocalStorage = _this.getValueLocalStorage((item === null || item === void 0 ? void 0 : item.key) || '');
                // A specific value of the object returned by localStorage is accessed.
                if (item === null || item === void 0 ? void 0 : item.value) {
                    // We can return more than one attribute of the object returned by localStorage
                    if (Array.isArray(item.value)) {
                        var newData_2 = {};
                        item.value.forEach(function (v) {
                            var result = dataLocalStorage[v];
                            if (result && !_this.invalidation.includes(result)) {
                                newData_2[v] = result;
                                return;
                            }
                            newData_2[v] = (item === null || item === void 0 ? void 0 : item.defaultValue) || '*';
                        });
                        data.push({ key: (item === null || item === void 0 ? void 0 : item.key) || '', localStorageData: newData_2 });
                        return;
                    }
                    // Flow to access a single value of the object returned by localStorage
                    var result = dataLocalStorage[item.value];
                    if (result && !_this.invalidation.includes(result)) {
                        data.push({ key: (item === null || item === void 0 ? void 0 : item.key) || '', localStorageData: result });
                        return;
                    }
                    data.push({
                        key: (item === null || item === void 0 ? void 0 : item.key) || '',
                        localStorageData: (item === null || item === void 0 ? void 0 : item.defaultValue) || '*'
                    });
                    return;
                }
                data.push({
                    key: (item === null || item === void 0 ? void 0 : item.key) || '',
                    localStorageData: dataLocalStorage
                });
            });
        }
        return data;
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
                    // Passing an empty array removes localStorge entirely
                    if (key.length === 0) {
                        this.storage.clear();
                    }
                    // If an array element does not exist, remove localStorge entirely
                    key.forEach(function (item) {
                        if (!item) {
                            _this.storage.clear();
                        }
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
    /**
     * When passed a number 'n', this method returns the name of the nth key in storage.
     *
     * @param index Index number to search within the keys stored in localStorage
     * @returns Name of the index found, if it does not exist it returns an empty string
     */
    LocalStorage.getKeyName = function (index) {
        try {
            return this.storage.key(index) || '';
        }
        catch (error) {
            console.warn('LocalStorage getKeyName: >>>', error);
            return '';
        }
    };
    /**
     * Get the number of 'keys' stored in localStorage
     *
     * @returns The number of 'keys' stored in localStorage
     */
    LocalStorage.getCapacity = function () {
        try {
            return this.storage.length;
        }
        catch (error) {
            console.warn('LocalStorage getCapacity: >>>', error);
            return 0;
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