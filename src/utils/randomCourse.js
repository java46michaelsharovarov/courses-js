import { createCourse } from "../models/course";
import { getRandomNumber } from "./random";
import { getRandomElement } from "./random";
import { getRandomDate } from "./random";
export function getRandomCourse(courseData) {
    return createCourse(getRandomNumber(courseData.minId, courseData.maxId), 
    getRandomElement(courseData.name), getRandomElement(courseData.lecturers),
    getRandomNumber(courseData.minHours, courseData.maxHours), 
    getRandomNumber(courseData.minCost, courseData.maxCost), 
    getRandomDate(courseData.minYear, courseData.maxYear));
}