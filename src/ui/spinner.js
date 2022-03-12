export default class Spinner {
#spinnerElement
    constructor(idSpinner) {
        this.#spinnerElement = document.getElementById(idSpinner);
    }
    start() {
        this.#spinnerElement.innerHTML = `
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>`;
    }
    stop() {
        this.#spinnerElement.innerHTML = ``;
    }
}