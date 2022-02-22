import courseData from './config/courseData.json'
import { getRandomCourse } from './utils/randomCourse';
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
        courses.push(getRandomCourse(courseData));
    }
    return courses;
}


const courses = new CoursesList(COURSES_PARENT_ID);
courses.render();
