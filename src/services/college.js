import _ from "lodash";

export default class College {
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
    getAllCourses() {
        return this.#courses.get();
    }
    sortCourses(key) {
        return _.sortBy(this.getAllCourses(), key);
    }
    // getHoursStatistics(lengthInterval) {
    //     return this.getStatistics('hours', lengthInterval);
    // }
    // getCostStatistics(lengthInterval) {
    //     return this.getStatistics('cost', lengthInterval);
    // }
    getStatistics(key, interval) {
        const res =_.countBy(this.getAllCourses(), (course) => Math.floor(course[key]/interval));
        return Object.entries(res).map(e => ({minInterval : e[0]*interval, 
            maxInterval : (e[0]*interval)+(interval-1),
            amount : e[1]}));
    }
    
} 