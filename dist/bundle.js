/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/models/course.js":
/*!******************************!*\
  !*** ./src/models/course.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createCourse": () => (/* binding */ createCourse)
/* harmony export */ });
function createCourse(id, name, lecturer, hours, cost, openingDate) {
    return {id, name, lecturer, hours, cost, openingDate};
}

/***/ }),

/***/ "./src/utils/random.js":
/*!*****************************!*\
  !*** ./src/utils/random.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRandomNumber": () => (/* binding */ getRandomNumber),
/* harmony export */   "getRandomElement": () => (/* binding */ getRandomElement),
/* harmony export */   "getRandomDate": () => (/* binding */ getRandomDate)
/* harmony export */ });
function getRandomNumber(min, max) {
    min <= max || ([min, max] = [max, min]);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}
function getRandomDate(minYear, maxYear) {
    const year = Math.floor(Math.random() * (maxYear - minYear + 1) + minYear);
    const month = Math.floor(Math.random() * 11);
    const day = Math.floor(Math.random() * 28 + 1);
    const date = new Date(year, month, day);
    return date;
}

/***/ }),

/***/ "./src/utils/randomCourse.js":
/*!***********************************!*\
  !*** ./src/utils/randomCourse.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRandomCourse": () => (/* binding */ getRandomCourse)
/* harmony export */ });
/* harmony import */ var _models_course__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/course */ "./src/models/course.js");
/* harmony import */ var _random__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./random */ "./src/utils/random.js");




function getRandomCourse(courseData) {
    return (0,_models_course__WEBPACK_IMPORTED_MODULE_0__.createCourse)((0,_random__WEBPACK_IMPORTED_MODULE_1__.getRandomNumber)(courseData.minId, courseData.maxId), 
    (0,_random__WEBPACK_IMPORTED_MODULE_1__.getRandomElement)(courseData.name), (0,_random__WEBPACK_IMPORTED_MODULE_1__.getRandomElement)(courseData.lecturers),
    (0,_random__WEBPACK_IMPORTED_MODULE_1__.getRandomNumber)(courseData.minHours, courseData.maxHours), 
    (0,_random__WEBPACK_IMPORTED_MODULE_1__.getRandomNumber)(courseData.minCost, courseData.maxCost), 
    (0,_random__WEBPACK_IMPORTED_MODULE_1__.getRandomDate)(courseData.minYear, courseData.maxYear));
}

/***/ }),

/***/ "./src/config/courseData.json":
/*!************************************!*\
  !*** ./src/config/courseData.json ***!
  \************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"courses":["Java","Java Technologies","QA","React","JavaScript","Html/CSS"],"lecturers":["Abraham","Yakob","Sara","Yosef","Itshak","Vasya","Moshe"],"name":["Jerry","Tom","Bob","Mary","Michael","Elena","Jane"],"minCost":5000,"maxCost":30000,"minHours":80,"maxHours":500,"minYear":2000,"maxYear":2022,"minId":100000,"maxId":999999}');

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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config_courseData_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config/courseData.json */ "./src/config/courseData.json");
/* harmony import */ var _utils_randomCourse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/randomCourse */ "./src/utils/randomCourse.js");


const COURSES_PARENT_ID = "courses"
const N_COURSES = 100;

class CoursesList {
    constructor(idParent) {
        this.parentElem = document.getElementById(idParent);
    }
    render() {
        this.parentElem.innerHTML = `${getList()}`;
    }
}

function getList() {
    return creatCourses().map(item => `<li>${JSON.stringify(item)}</li>`).join('');
}

function creatCourses() {
    const courses = [];
    for (let i = 0; i < N_COURSES; i++) {
        courses.push((0,_utils_randomCourse__WEBPACK_IMPORTED_MODULE_1__.getRandomCourse)(_config_courseData_json__WEBPACK_IMPORTED_MODULE_0__));
    }
    return courses;
}


const courses = new CoursesList(COURSES_PARENT_ID);
courses.render();

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map