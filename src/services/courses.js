import { getRandomNumber } from "../utils/random";

export default class Courses {
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
            id = getRandomNumber(this.#minId, this.#maxId);            
        } while (this.exist(id));
        return id;
    }
    exist(id) {
        return !!this.#courses.find(i => i.id === id);        
    }
    get() {
        return this.#courses;
    }
}
