import courseData from './config/courseData.json'
import College from './services/college';
import Courses from './services/courses';
import FormHandler from './ui/form_handler';
import TableHandler from './ui/table_handler';
import { getRandomCourse } from './utils/randomCourse';
import _ from 'lodash';
import NavigatorButtons from './ui/navigators-buttons';
import Spinner from './ui/spinner';
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
const spinner = new Spinner("spinner");
formHandler.addHandler(async course => {
    spinner.start();
    const res = await dataProcessor.addCourse(course);
    spinner.stop();
        return res;    
})
formHandler.fillOptions("name-options", courseData.courses);
formHandler.fillOptions("lecturer-options", courseData.lecturers);
formGenerationHandler.addHandler(async obj => {
    spinner.start();
    const inputValue = +_.values(obj)[0];
    let res = 'The value must be greater than zero!';
    if(inputValue > 0) {
        for (let i = 0; i < inputValue; i++) {
            await dataProcessor.addCourse(getRandomCourse(courseData));
        } 
        res = obj;
    }      
    spinner.stop();    
    return res;
})
window.hide = () => {
    formHandler.removeMessage();
    formHandler.hide();
    formGenerationHandler.hide();
    tableHandler.hideTable();
}
window.sortCourses = async (key) => {
    spinner.start();
    tableHandler.showTable(await dataProcessor.sortCourses(key));
    spinner.stop();
}
window.showForm = () => {
    navButtons.setActive(0);
    hide();
    formHandler.show();
}
window.showCourses = async () => {
    navButtons.setActive(1);
    hide();
    spinner.start();
    tableHandler.showTable(await dataProcessor.getAllCourses());
    spinner.stop();
}
window.showHoursStatistics = async () => {
    navButtons.setActive(2);
    hide();
    spinner.start();
    hoursStatisticsTable.showTable(await dataProcessor.getStatistics('hours', courseData.hoursLengthInterval));
    spinner.stop();

}
window.showCostStatistics = async () => {
    navButtons.setActive(3);
    hide();
    spinner.start();
    costStatisticsTable.showTable(await dataProcessor.getStatistics('cost', courseData.costLengthInterval));
    spinner.stop();
    
}
window.showFormGeneration = () => {
    navButtons.setActive(4);
    hide();
    formGenerationHandler.show();
}
window.removeCourse = async (id) => {
    spinner.start();
    if(window.confirm(`you are going to remove course id: ${id}`)) {
        await dataProcessor.removeCourse(+id);
        tableHandler.showTable(await dataProcessor.getAllCourses()); 
    }
    spinner.stop();
}