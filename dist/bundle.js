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

/***/ "./src/services/college.js":
/*!*********************************!*\
  !*** ./src/services/college.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ College)
/* harmony export */ });
class College {
    #courseData
    #courses
    constructor(courses, courseData) {
        this.#courses = courses;
        this.#courseData = courseData;
    }
    addCourse(course) {
        course.cost = +course.cost;
        course.hours = +course.hours;
        course.openingDate = new Date(course.openingDate);
        const validationMessage = this.#getValidationMessage(course);        
        course.openingDate = course.openingDate.toDateString()
        if(!validationMessage) {
           return this.#courses.add(course);
        } 
        return validationMessage;
    }
    #getValidationMessage(course) {
        let message = "";
        const {courses, lecturers, minCost, maxCost, minHours, maxHours, minYear, maxYear} = this.#courseData;
        const {name, lecturer, hours, cost, openingDate} = course;
        if(!(courses.reduce((res,item) => res || item.toUpperCase() == name.toUpperCase(), false))){
            message += "Name should be in the list; ";
        }
        if(!(lecturers.includes(lecturer))){
            message += "Lecturer should be in the list; ";
        }
        if(hours < minHours || hours > maxHours){
            message += "Hours should be in the range [80-500]; ";
        }
        if(cost < minCost || cost > maxCost){
            message += "Cost should be in the range [5000-30000]; ";
        }
        if(openingDate < new Date(minYear, 0, 1) || openingDate > new Date(maxYear, 11, 31)){
            message += "Year should be in the range [2000-2022]; ";
        }
        return message;
    }
} 

/***/ }),

/***/ "./src/services/courses.js":
/*!*********************************!*\
  !*** ./src/services/courses.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Courses)
/* harmony export */ });
/* harmony import */ var _utils_random__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/random */ "./src/utils/random.js");


class Courses {
    #courses
    #minId
    #maxId
    constructor(minId, maxId, courses) {
        this.#courses = courses ?? [];
        this.#minId = minId ?? 1;
        this.#maxId = maxId ?? 1000000;
    }
    add(course) {
        course.id = this.#getId();
        this.#courses.push(course);
        return course;
    }
    #getId() {
        let id;
        do {
            id = (0,_utils_random__WEBPACK_IMPORTED_MODULE_0__.getRandomNumber)(this.#minId, this.#maxId);            
        } while (this.exist(id));
        return id;
    }
    exist(id) {
        return this.#courses.reduce((res,item) => item.id == id || res, false);        
    }
}


/***/ }),

/***/ "./src/ui/form_handler.js":
/*!********************************!*\
  !*** ./src/ui/form_handler.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FormHandler)
/* harmony export */ });
class FormHandler {
    #formElement
    #alertElement
    #inputElements
    constructor(idForm, idAlert) {
        this.#formElement = document.getElementById(idForm);
        this.#alertElement = document.getElementById(idAlert);
        this.#inputElements = document.querySelectorAll(`#${idForm} [name]`);
    }
    addHandler(fnProcessor) {
        this.#formElement.addEventListener('submit', event => {
            event.preventDefault();
            const data = Array.from(this.#inputElements).reduce((obj, element) => {
                obj[element.name] = element.value;
                return obj;
            }, {})
            const message = fnProcessor(data);
            if (!message) {
                this.#formElement.requestFullscreen();
                this.#alertElement.firstChild.remove();
            } else {
                this.#alertElement.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                ${message}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;
            }
        });
    }
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
    minYear <= maxYear || ([minYear, maxYear] = [maxYear, minYear]);
    const year = getRandomNumber(minYear,maxYear);
    const month = getRandomNumber(0, 11);
    const day = getRandomNumber(1, 31);
    const date = new Date(year, month, day);
    return date.toDateString();
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
    const {courses, lecturers, minCost, maxCost, minHours, maxHours, minYear, maxYear, minId, maxId} = courseData;
    return (0,_models_course__WEBPACK_IMPORTED_MODULE_0__.createCourse)((0,_random__WEBPACK_IMPORTED_MODULE_1__.getRandomNumber)(minId, maxId), 
    (0,_random__WEBPACK_IMPORTED_MODULE_1__.getRandomElement)(courses), (0,_random__WEBPACK_IMPORTED_MODULE_1__.getRandomElement)(lecturers),
    (0,_random__WEBPACK_IMPORTED_MODULE_1__.getRandomNumber)(minHours, maxHours), 
    (0,_random__WEBPACK_IMPORTED_MODULE_1__.getRandomNumber)(minCost, maxCost), 
    (0,_random__WEBPACK_IMPORTED_MODULE_1__.getRandomDate)(minYear, maxYear));
}

/***/ }),

/***/ "./src/config/courseData.json":
/*!************************************!*\
  !*** ./src/config/courseData.json ***!
  \************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"courses":["Java","Java Technologies","QA","React","JavaScript","Html/CSS"],"lecturers":["Abraham","Yakob","Sara","Yosef","Itshak","Vasya","Moshe"],"minCost":5000,"maxCost":30000,"minHours":80,"maxHours":500,"minYear":2000,"maxYear":2022,"minId":100000,"maxId":999999}');

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
/* harmony import */ var _services_college__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/college */ "./src/services/college.js");
/* harmony import */ var _services_courses__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/courses */ "./src/services/courses.js");
/* harmony import */ var _ui_form_handler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ui/form_handler */ "./src/ui/form_handler.js");
/* harmony import */ var _utils_randomCourse__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/randomCourse */ "./src/utils/randomCourse.js");





const N_COURSES = 5;

function creatCourses() {
    const courses = [];
    for (let i = 0; i < N_COURSES; i++) {
        courses.push((0,_utils_randomCourse__WEBPACK_IMPORTED_MODULE_4__.getRandomCourse)(_config_courseData_json__WEBPACK_IMPORTED_MODULE_0__));
    }
    return courses;
}
function getList(courses) {
    return courses.map(item => `<li>${JSON.stringify(item).replaceAll(",", ", ")}</li>`).join('');
}

const parentElem = document.getElementById("courses");
const courses = creatCourses();
parentElem.innerHTML = `${getList(courses)}`;
const dataProvider = new _services_courses__WEBPACK_IMPORTED_MODULE_2__["default"](_config_courseData_json__WEBPACK_IMPORTED_MODULE_0__.minId, _config_courseData_json__WEBPACK_IMPORTED_MODULE_0__.maxId, courses);
const dataProcessor = new _services_college__WEBPACK_IMPORTED_MODULE_1__["default"](dataProvider, _config_courseData_json__WEBPACK_IMPORTED_MODULE_0__);
const formHandler = new _ui_form_handler__WEBPACK_IMPORTED_MODULE_3__["default"]("courses-form","alert");
formHandler.addHandler(course => {
    const message = dataProcessor.addCourse(course);
    if (typeof message != 'string') {
        parentElem.innerHTML += `<li>${JSON.stringify(course).replaceAll(",", ", ")}</li>`        
    } else {
        return message;
    }    
})
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map