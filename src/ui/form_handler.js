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
        this.#formElement.addEventListener('submit', async event => {
            event.preventDefault();
            const data = Array.from(this.#inputElements).reduce((obj, element) => {
                obj[element.name] = element.value;
                return obj;
            }, {})
            const res = await fnProcessor(data);
            typeof res === 'string' || this.#formElement.reset();
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
}
function getOptions(options) {
    return options.map(o => `<option value="${o}">${o}</option>`).join('');
}