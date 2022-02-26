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