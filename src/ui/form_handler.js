export default class FormHandler {
    #formElement
    #alertElement
    #inputElements
    constructor(idForm, idAlert) {
        this.#formElement = document.getElementById(idForm);
        this.#alertElement = document.getElementById(idAlert);
        this.#inputElements = document.querySelectorAll(`#${idForm} [name]`);
    }
    addHandler(fnProcessor) {
        this.#formElement.addEventListener('submit', event => {
            event.preventDefault();
            const data = Array.from(this.#inputElements).reduce((obj, element) => {
                obj[element.name] = element.value;
                return obj;
            }, {})
            const message = fnProcessor(data);
            if (typeof message === 'string') {
                this.#alertElement.innerHTML = `<div class="m-0 alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Error!<br></strong>${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;
            } else if(typeof message === 'object'){
                this.#formElement.reset();
                this.#alertElement.innerHTML = `<div class="m-0 alert alert-success alert-dismissible fade show" role="alert">
                <strong>The course has been successfully added!<br></strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;
            } else {
                this.#formElement.reset();
                removeMessage();
            }
        });
    }
    fillOptions(idOptions, options) {
        document.getElementById(idOptions).innerHTML += `${getOptions(options)}`;
    }
    show() {
        this.#formElement.hidden = false;
    }
    hide() {
        this.#formElement.hidden = true;
    }
    removeMessage() {
        this.#alertElement.innerHTML = '';
    }
}
function getOptions(options) {
    return options.map(o => `<option value="${o}">${o}</option>`).join('');
}