"use strict";
/**
 * @jest-environment jsdom
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = __importDefault(require("../"));
describe('All testing LocalStorage', function () {
    describe('setItem()', function () {
        it('Success tests', function () {
            __1.default.setItem('keyLocalStorage', { isTesting: true });
            expect(__1.default.getItem('keyLocalStorage', 'isTesting', false)).toEqual(true);
        });
        it('Failed tests', function () {
            __1.default.setItem('keyLocalStorage', { isTesting: true });
            expect(__1.default.getItem('keyLocalStorage', 'isTestings', false)).toEqual(false);
        });
    });
    describe('getItem()', function () {
        it('Success tests - empty localStorage', function () {
            expect(__1.default.getItem('keyLocalStorage', 'test')).toEqual('*');
            expect(__1.default.getItem('keyLocalStorage', 'test', {})).toEqual({});
        });
        it('Success tests - with data in localStorage', function () {
            __1.default.setItem('keyLocalStorage', { isTesting: true });
            expect(__1.default.getItem('keyLocalStorage')).toEqual({
                isTesting: true
            });
        });
        it('Failed tests - with data in localStorage', function () {
            __1.default.setItem('keyLocalStorage', { isTesting: true });
            expect(__1.default.getItem('keyLocalStorage', 'isTesting.test', false)).toEqual(false);
        });
    });
    describe('removeItem()', function () {
        it('Success tests - call remove all', function () {
            __1.default.setItem('keyLocalStorage', { isTesting: true });
            expect(__1.default.getItem('keyLocalStorage', 'isTesting', false)).toEqual(true);
            __1.default.removeItem();
            expect(__1.default.getItem('keyLocalStorage', 'isTesting', false)).toEqual(false);
        });
        it('Success tests - call removeItem', function () {
            __1.default.setItem('keyLocalStorage', { isTesting: true });
            expect(__1.default.getItem('keyLocalStorage', 'isTesting', false)).toEqual(true);
            __1.default.removeItem('keyLocalStorage');
            expect(__1.default.getItem('keyLocalStorage', 'isTesting', false)).toEqual(false);
        });
        it('Success tests - call multi removeItem', function () {
            __1.default.setItem('keyLocalStorage', { isTesting: true });
            __1.default.setItem('keyExample', { isExample: 1 });
            expect(__1.default.getItem('keyLocalStorage', 'isTesting', false)).toEqual(true);
            expect(__1.default.getItem('keyExample', 'isExample', 0)).toEqual(1);
            __1.default.removeItem(['keyLocalStorage', 'keyExample']);
            expect(__1.default.getItem('keyLocalStorage', 'isTesting', false)).toEqual(false);
            expect(__1.default.getItem('keyExample', 'isExample', 0)).toEqual(0);
        });
    });
});
//# sourceMappingURL=indexs.spec.js.map