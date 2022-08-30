# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.4.0] - 2022-08-30

### Added

- Added support for nodejs, main

### Changed

--- The code is transpiled with rollup

## [1.3.1] - 2022-08-20

### Changed

- The name of the testing folder is modified by tests, as well as its references.

---

## [1.3.0] - 2022-08-20

### Added

- Data types are added to be able to extract when importing the module.
- gitHooks are added.

### Changed

- The links of the README.md that point to the tests are adjusted.
- The structure of src is modified.
- The dist folder, the repository is not sent.
- Changed 'commonjs' module build type to 'AMD'.

---

## [1.2.0] - 2022-08-17

### Changed

- Testing folder is moved from src/ to the root of the project.
- Move typescript from Dependencies to devDependencies.
- eslint and prettier configuration files are adjusted.
- The jest configuration is passed to a jest.config.js in the root of the project.

---

## [1.1.3] - 2022-08-16

### Added

- MIT license added.

---

## [1.1.2] - 2022-08-15

### Fixed

- With getItem or getItems, it allows returning a 'false' value as valid and not returning the default value.

---

## [1.1.1] - 2022-08-15

### Added

- README.md is updated and "Table of Contents" and "Resources" are added to it.

### Changed

- In getItems function, add default value for multi value inside each item.
- Tests are updated.

### Fixed

- Fixed bug in README.md anchors.

---

## [1.1.0] - 2022-08-14

### Added

- setItems function, allows to store multiple keys and their respective objects.
- getItems function, allows to obtain multiple keys and their respective objects.
- getKeyName function, returns the name of the nth stored key.
- getCapacity function, get the number of 'keys' stored in localStorage.

---

## [1.0.0] - 2022-08-14

### Added

- Package init
