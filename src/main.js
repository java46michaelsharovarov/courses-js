import courseData from './config/courseData.json'
import College from './services/college';
import Courses from './services/courses';
import FormHandler from './ui/form_handler';
import TableHandler from './ui/table_handler';
import { getRandomCourse } from './utils/randomCourse';
import _ from 'lodash';
import NavigatorButtons from './ui/navigators-buttons';
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
], "courses-table", "tableName", _, "sortCourses", "removeCourse");
const statisticsColumnDefinition = [
    {key : 'minInterval', displayName : 'From'},
    {key : 'maxInterval', displayName : 'To'},
    {key : 'amount', displayName : 'Amount'}
];
const hoursStatisticsTable = new TableHandler(statisticsColumnDefinition, "courses-table", "tableName", "Hours Statistics");
const costStatisticsTable = new TableHandler(statisticsColumnDefinition, "courses-table", "tableName", "Cost Statistics");
const formHandler = new FormHandler("courses-form","alert");
const formGenerationHandler = new FormHandler("generation-courses-form","alert");
const navButtons = new NavigatorButtons();
formHandler.addHandler(course => {
    const res = dataProcessor.addCourse(course);
        return res;    
})
formHandler.fillOptions("name-options", courseData.courses);
formHandler.fillOptions("lecturer-options", courseData.lecturers);
formGenerationHandler.addHandler(obj => {
    const res = +_.values(obj)[0];
    let message = 'The value must be greater than zero!';
    for (let i = 0; i < res; i++) {
        message =  dataProcessor.addCourse(getRandomCourse(courseData));
    }   
    return message;
})
window.hide = () => {
    formHandler.removeMessage();
    formHandler.hide();
    formGenerationHandler.hide();
}
window.sortCourses = (key) => {
    tableHandler.showTable(dataProcessor.sortCourses(key));
}
window.showForm = () => {
    navButtons.setActive(0);
    hide();
    formHandler.show();
    tableHandler.hideTable();
}
window.showCourses = () => {
    navButtons.setActive(1);
    hide();
    tableHandler.showTable(dataProcessor.getAllCourses());
}
window.showHoursStatistics = () => {
    navButtons.setActive(2);
    hide();
    hoursStatisticsTable.showTable(dataProcessor.getStatistics('hours', courseData.hoursLengthInterval));

}
window.showCostStatistics = () => {
    navButtons.setActive(3);
    hide();
    costStatisticsTable.showTable(dataProcessor.getStatistics('cost', courseData.costLengthInterval));
    
}
window.showFormGeneration = () => {
    navButtons.setActive(4);
    hide();
    formGenerationHandler.show();
    tableHandler.hideTable();
}
window.removeCourse = (id) => {
    if(window.confirm(`you are going to remove course id: ${id}`)) {
        dataProcessor.removeCourse(+id);
        tableHandler.showTable(dataProcessor.getAllCourses()); 
    }
}