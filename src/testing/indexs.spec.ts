/**
 * @jest-environment jsdom
 */

import LocalStorage from '../';

describe('All testing LocalStorage', () => {
  describe('setItem()', () => {
    it('Success tests', () => {
      LocalStorage.setItem('keyLocalStorage', { isTesting: true });
      expect(
        LocalStorage.getItem('keyLocalStorage', 'isTesting', false)
      ).toEqual(true);
    });

    it('Failed tests', () => {
      LocalStorage.setItem('keyLocalStorage', { isTesting: true });
      expect(
        LocalStorage.getItem('keyLocalStorage', 'isTestings', false)
      ).toEqual(false);
    });
  });

  describe('getItem()', () => {
    it('Success tests - empty localStorage', () => {
      expect(LocalStorage.getItem('keyLocalStorage', 'test')).toEqual('*');
      expect(LocalStorage.getItem('keyLocalStorage', 'test', {})).toEqual({});
    });

    it('Success tests - with data in localStorage', () => {
      LocalStorage.setItem('keyLocalStorage', { isTesting: true });
      expect(LocalStorage.getItem('keyLocalStorage')).toEqual({
        isTesting: true
      });
    });

    it('Failed tests - with data in localStorage', () => {
      LocalStorage.setItem('keyLocalStorage', { isTesting: true });
      expect(
        LocalStorage.getItem('keyLocalStorage', 'isTesting.test', false)
      ).toEqual(false);
    });
  });

  describe('removeItem()', () => {
    it('Success tests - call remove all', () => {
      LocalStorage.setItem('keyLocalStorage', { isTesting: true });

      expect(
        LocalStorage.getItem('keyLocalStorage', 'isTesting', false)
      ).toEqual(true);

      LocalStorage.removeItem();

      expect(
        LocalStorage.getItem('keyLocalStorage', 'isTesting', false)
      ).toEqual(false);
    });

    it('Success tests - call removeItem', () => {
      LocalStorage.setItem('keyLocalStorage', { isTesting: true });

      expect(
        LocalStorage.getItem('keyLocalStorage', 'isTesting', false)
      ).toEqual(true);

      LocalStorage.removeItem('keyLocalStorage');

      expect(
        LocalStorage.getItem('keyLocalStorage', 'isTesting', false)
      ).toEqual(false);
    });

    it('Success tests - call multi removeItem', () => {
      LocalStorage.setItem('keyLocalStorage', { isTesting: true });
      LocalStorage.setItem('keyExample', { isExample: 1 });

      expect(
        LocalStorage.getItem('keyLocalStorage', 'isTesting', false)
      ).toEqual(true);
      expect(LocalStorage.getItem('keyExample', 'isExample', 0)).toEqual(1);

      LocalStorage.removeItem(['keyLocalStorage', 'keyExample']);

      expect(
        LocalStorage.getItem('keyLocalStorage', 'isTesting', false)
      ).toEqual(false);
      expect(LocalStorage.getItem('keyExample', 'isExample', 0)).toEqual(0);
    });
  });
});
