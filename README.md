# local-storage-to-object

It allows treating the data that is stored and extracted in the browser's **localStorage**, always as an object.

&nbsp;

## Instructions for use

It can only be used on the client side, since it is necessary to use the **window** property of the browser.

### setItem

Before storing a new value in **localStorage**, it is validated if the 'key' on which will work, exists or not.

- If the 'key' already exists, it will extract from **localStorage**, the object that matches the 'key', and its values ​​will be merged with those of the new object, so that the new values ​​can overwrite one or several values ​​of the existing ones, in addition to add new values ​​to the object.

- If the 'key' does not exist, it will simply be added with its respective value object.

### getItem

To get a value, look inside **localStorage** for the object that matches the value of 'key', and return the entire object.

- If the value is not found, an empty object will be returned.

- From the object returned from **localStorage**, a single value can be accessed instead of the entire object.

- You can set a default value, in case you want to access an attribute of the object returned by **localStorage**, and it does not exist.

### removeItem

You can completely clean localStorage or remove one or more 'keys'. Keep in mind that when removing 'keys', their assigned objects will also be removed.

- If 'key' is passed as a string, the matching 'key' will be removed, as well as its assigned object.

- If the 'key' is passed as an array, all matching 'keys' will be removed, as well as their assigned objects.

- If the 'key' is not passed, the entire localStorage will be cleaned, regardless of whether there are values ​​that were added with this functionality or not.

## Install

Using npm:

```bash
npm install --save local-storage-to-object
npm i -S local-storage-to-object
```

## Usage

For this example we will name it **LocalStorage**, but you can use anything else.

Example:

``` javascript
import LocalStorage from 'local-storage-to-object';

// Add values
LocalStorage.setItem('keyLocalStorage', { isTesting: true });
LocalStorage.setItem('keyLocalStorageTwo', { id: '51xdsf1sfd', value: 10 });

// Obtener un valor almacenado en localStorage
const valueLS = LocalStorage.getItem('keyLocalStorage');

// Access a specific value of the object stored in localStorage, with default value
const _valueLS = LocalStorage.getItem('keyLocalStorage', 'isTesting', false);

// To delete a key and its value
LocalStorage.removeItem('keyLocalStorage');

// Multiple keys can also be deleted
LocalStorage.removeItem(['keyLocalStorage', 'keyExample']);

// To completely clean the localStorage
LocalStorage.removeItem();

```
