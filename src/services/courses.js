import { getRandomNumber } from "../utils/random";
function getPromise(timeout, value) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(value);
        }, timeout);
    })
}
export default class Courses {
    #coursesArray
    #minId
    #maxId
    constructor(minId, maxId, courses) {
        this.#coursesArray = courses ?? [];
        this.#minId = minId ?? 1;
        this.#maxId = maxId ?? 1000000;
    }
    add(course) {
        course.id = this.#getId();
        this.#coursesArray.push(course);
        return getPromise(1000, course);
    }
    #getId() {
        let id;
        do {
            id = getRandomNumber(this.#minId, this.#maxId);            
        } while (this.exist(id));
        return id;
    }
    exist(id) {
        return !!this.#coursesArray.find(i => i.id === id);        
    }
    get() {
        return getPromise(2000, this.#coursesArray);
    }
    remove(id) {
        const index = this.#coursesArray.findIndex(c => c.id === id);
        const res = this.#coursesArray[index];
        this.#coursesArray.splice(index, 1);
        return getPromise(1000, res);
    }
}
