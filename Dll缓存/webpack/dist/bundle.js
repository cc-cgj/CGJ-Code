/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm-bundler.js\");\n/* harmony import */ var pinia__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! pinia */ \"./node_modules/pinia/dist/pinia.mjs\");\n/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-router */ \"./node_modules/vue-router/dist/vue-router.mjs\");\n\r\n\r\n\r\n\r\nvar a = 1;\r\n\r\nconsole.log(a,vue__WEBPACK_IMPORTED_MODULE_0__.createApp,pinia__WEBPACK_IMPORTED_MODULE_1__.createPinia,vue_router__WEBPACK_IMPORTED_MODULE_2__.createRouter)\n\n//# sourceURL=webpack://webpack-dll/./main.js?");

/***/ }),

/***/ "./node_modules/pinia/dist/pinia.mjs":
/*!****************************************************************************!*\
  !*** delegated ./node_modules/pinia/dist/pinia.mjs from dll-reference vue ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = (__webpack_require__(/*! dll-reference vue */ \"dll-reference vue\"))(\"./node_modules/pinia/dist/pinia.mjs\");\n\n//# sourceURL=webpack://webpack-dll/delegated_./node_modules/pinia/dist/pinia.mjs_from_dll-reference_vue?");

/***/ }),

/***/ "./node_modules/vue-router/dist/vue-router.mjs":
/*!**************************************************************************************!*\
  !*** delegated ./node_modules/vue-router/dist/vue-router.mjs from dll-reference vue ***!
  \**************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = (__webpack_require__(/*! dll-reference vue */ \"dll-reference vue\"))(\"./node_modules/vue-router/dist/vue-router.mjs\");\n\n//# sourceURL=webpack://webpack-dll/delegated_./node_modules/vue-router/dist/vue-router.mjs_from_dll-reference_vue?");

/***/ }),

/***/ "./node_modules/vue/dist/vue.runtime.esm-bundler.js":
/*!*******************************************************************************************!*\
  !*** delegated ./node_modules/vue/dist/vue.runtime.esm-bundler.js from dll-reference vue ***!
  \*******************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = (__webpack_require__(/*! dll-reference vue */ \"dll-reference vue\"))(\"./node_modules/vue/dist/vue.runtime.esm-bundler.js\");\n\n//# sourceURL=webpack://webpack-dll/delegated_./node_modules/vue/dist/vue.runtime.esm-bundler.js_from_dll-reference_vue?");

/***/ }),

/***/ "dll-reference vue":
/*!**********************!*\
  !*** external "vue" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = vue;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./main.js");
/******/ 	
/******/ })()
;