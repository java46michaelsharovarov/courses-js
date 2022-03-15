export default class Alert {
    #alertElement
    constructor(idAlert) {
        this.#alertElement = document.getElementById(idAlert);
    }
    showAlert(message) {
        this.#alertElement.innerHTML = `<div class="m-0 alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Error!<br></strong>The server ${message} is unavailable, repeat request later on.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;;
    }
    hideAlert() {
        this.#alertElement.innerHTML = ``;
    }
}
