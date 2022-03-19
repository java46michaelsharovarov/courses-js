import _ from "lodash";

export default class College {
    #courseData
    #coursesDataProvider
    constructor(courses, courseData) {
        this.#coursesDataProvider = courses;
        this.#courseData = courseData;
    }
    async addCourse(course) {
        course.cost = +course.cost;
        course.hours = +course.hours;
        course.openingDate = new Date(course.openingDate);
        const validationMessage = this.#getValidationMessage(course);
        if(!validationMessage) {
           return await this.#coursesDataProvider.add(course);
        } 
        return validationMessage;
    }
    #getValidationMessage(course) {
        let message = "";
        const {minCost, maxCost, minHours, maxHours, minYear, maxYear} = this.#courseData;
        const {hours, cost, openingDate} = course;
        if(hours < minHours || hours > maxHours){
            message += `Hours should be in the range [${minHours}-${maxHours}] <br> `;
        }
        if(cost < minCost || cost > maxCost){
            message += `Cost should be in the range [${minCost}-${maxCost}] <br> `;
        }
        if(openingDate < new Date(minYear, 0, 1) || openingDate > new Date(maxYear, 11, 31)){
            message += `Year should be in the range [${minYear}-${maxYear}] <br> `;
        }
        return message;
    }
    async getAllCourses() {
        return await this.#coursesDataProvider.get();
    }
    async sortCourses(key) {
        return _.sortBy(await this.getAllCourses(), key);
    }
    async getStatistics(key, interval) {
        const res =_.countBy(await this.getAllCourses(), (course) => Math.floor(course[key]/interval));
        return Object.entries(res).map(e => ({minInterval : e[0]*interval, 
            maxInterval : (e[0]*interval)+(interval-1),
            amount : e[1]}));
    }
    async removeCourse(id) {
        if (!await this.#coursesDataProvider.exist(id)) {
            throw `course with id ${id} not found`;
        }
        return await this.#coursesDataProvider.remove(id);
    }
    
} 