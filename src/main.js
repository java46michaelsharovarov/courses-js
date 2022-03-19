import courseData from './config/courseData.json'
import College from './services/college';
import { dataProvider, URL } from './config/services-config';
import FormHandler from './ui/form_handler';
import TableHandler from './ui/table_handler';
import { getRandomCourse } from './utils/randomCourse';
import _, { reject } from 'lodash';
import NavigatorButtons from './ui/navigators-buttons';
import Spinner from './ui/spinner';
import Alert from './ui/alert';

const dataProcessor = new College(dataProvider, courseData);
const tableHandler = new TableHandler([
    {key : 'id', displayName : 'ID'},
    {key : 'name', displayName : 'Course'},
    {key : 'lecturer', displayName : 'Lecturer'},
    {key : 'cost', displayName : 'Cost (ILS)'},
    {key : 'hours', displayName : 'Duration (h)'},
    {key : 'openingDate', displayName : 'Date'}
], "courses-table", _, "sortCourses", "removeCourse");
const statisticsColumnDefinition = [
    {key : 'minInterval', displayName : 'From'},
    {key : 'maxInterval', displayName : 'To'},
    {key : 'amount', displayName : 'Amount'}
];
const hoursStatisticsTable = new TableHandler(statisticsColumnDefinition, "courses-table", "Hours Statistics");
const costStatisticsTable = new TableHandler(statisticsColumnDefinition, "courses-table", "Cost Statistics");
const formHandler = new FormHandler("courses-form","alert");
const formGenerationHandler = new FormHandler("generation-courses-form","alert");
const navButtons = new NavigatorButtons();
const spinner = new Spinner("spinner");
const alertMessage = new Alert("alert");
formHandler.addHandler(async course => {
    const res = await handlerWithSpinner(dataProcessor.addCourse(course));
        return res;    
})
formHandler.fillOptions("name-options", courseData.courses);
formHandler.fillOptions("lecturer-options", courseData.lecturers);
formGenerationHandler.addHandler(async obj => {
    const inputValue = +_.values(obj)[0];
    let res;
    if(inputValue > 0) {
        await handlerWithSpinner(
            (async () => {
                for (let i = 0; i < inputValue; i++) {
                    res = await dataProcessor.addCourse(getRandomCourse(courseData));
                 }
            })()            
        )} else {
            res = 'The value must be greater than zero!';
        }        
    alertMessage.showAlert(res, 'errorOrSuccess');
    return res;
})
async function handlerWithSpinner(promise) {
    let res;
    alertMessage.hideAlert();
    spinner.start();
    try {
        res = await promise;
        alertMessage.showAlert(res, 'errorOrSuccess');
    } catch (err) {
        alertMessage.showAlert(`${URL}`, 'server');
    }  
    spinner.stop();    
    return res;  
}
window.hideAlertMessage = () => alertMessage.hideAlert();
window.hide = () => {
    alertMessage.hideAlert();
    formHandler.hide();
    formGenerationHandler.hide();
    tableHandler.hideTable();
}
window.showForm = () => {
    navButtons.setActive(0);
    hide();
    formHandler.show();
}
window.showFormGeneration = () => {
    navButtons.setActive(4);
    hide();
    formGenerationHandler.show();
}
window.sortCourses = async (key) => {
    tableHandler.showTable(await handlerWithSpinner(dataProcessor.sortCourses(key)));
}
window.showCourses = async () => {
    navButtons.setActive(1);
    hide();
    tableHandler.showTable(await handlerWithSpinner(dataProcessor.getAllCourses()));
}
window.showHoursStatistics = async () => {
    navButtons.setActive(2);
    hide();
    hoursStatisticsTable.showTable(await handlerWithSpinner(dataProcessor.getStatistics('hours', courseData.hoursLengthInterval)));
}
window.showCostStatistics = async () => {
    navButtons.setActive(3);
    hide();
    costStatisticsTable.showTable(await handlerWithSpinner(dataProcessor.getStatistics('cost', courseData.costLengthInterval)));
}
window.removeCourse = async (id) => {
    if(window.confirm(`you are going to remove course id: ${id}`)) {
        await dataProcessor.removeCourse(+id);
        tableHandler.showTable(await handlerWithSpinner(dataProcessor.getAllCourses())); 
    }
}