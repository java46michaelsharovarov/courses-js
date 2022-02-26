import courseData from './config/courseData.json'
import College from './services/college';
import Courses from './services/courses';
import FormHandler from './ui/form_handler';
import { getRandomCourse } from './utils/randomCourse';
const N_COURSES = 5;

function creatCourses() {
    const courses = [];
    for (let i = 0; i < N_COURSES; i++) {
        courses.push(getRandomCourse(courseData));
    }
    return courses;
}
function getList(courses) {
    return courses.map(item => `<li>${JSON.stringify(item).replaceAll(",", ", ")}</li>`).join('');
}

const parentElem = document.getElementById("courses");
const courses = creatCourses();
parentElem.innerHTML = `${getList(courses)}`;
const dataProvider = new Courses(courseData.minId, courseData.maxId, courses);
const dataProcessor = new College(dataProvider, courseData);
const formHandler = new FormHandler("courses-form","alert");
formHandler.addHandler(course => {
    const message = dataProcessor.addCourse(course);
    if (typeof message != 'string') {
        parentElem.innerHTML += `<li>${JSON.stringify(course).replaceAll(",", ", ")}</li>`        
    } else {
        return message;
    }    
})