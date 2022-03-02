import courseData from './config/courseData.json'
import College from './services/college';
import Courses from './services/courses';
import FormHandler from './ui/form_handler';
import TableHandler from './ui/table_handler';
import { getRandomCourse } from './utils/randomCourse';
const N_COURSES = 5;

function creatCourses() {
    const courses = [];
    for (let i = 0; i < N_COURSES; i++) {
        courses.push(getRandomCourse(courseData));
    }
    return courses;
}

const courses = creatCourses();
const dataProvider = new Courses(courseData.minId, courseData.maxId, courses);
const dataProcessor = new College(dataProvider, courseData);
const tableHandler = new TableHandler([
    {key : 'id', displayName : 'ID'},
    {key : 'name', displayName : 'Course Name'},
    {key : 'lecturer', displayName : 'Lecturer Name'},
    {key : 'cost', displayName : 'Cost (ILS)'},
    {key : 'hours', displayName : 'Course Duration (h)'},
    {key : 'openingDate', displayName : 'Open Date'}
], "courses-table");
const formHandler = new FormHandler("courses-form","alert");
formHandler.addHandler(course => {
    const res = dataProcessor.addCourse(course);
        return res;    
})
formHandler.fillOptions("name-options", courseData.courses);
formHandler.fillOptions("lecturer-options", courseData.lecturers);
window.showForm = () => {
    formHandler.show();
    tableHandler.hideTable();
}
window.showCourses = () => {
    formHandler.removeMessage();
    formHandler.hide();
    tableHandler.showTable(dataProcessor.getAllCourses());
}