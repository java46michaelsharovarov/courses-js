export default class Alert {
    #alertElement
    constructor(idAlert) {
        this.#alertElement = document.getElementById(idAlert);
    }
    showAlert(res, type) {
        if(type === 'server') {
            this.#alertElement.innerHTML = `<div class="m-0 alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Error!<br></strong>The server ${res} is unavailable, repeat request later on.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;
        } else if(typeof res === 'string') {
            this.#alertElement.innerHTML = `<div class="m-0 alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Error!<br></strong>${res}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;
        } else if(typeof res === 'object' && Object.keys(res).length !== 0 && !res.length) {
            this.#alertElement.innerHTML = `<div class="m-0 text-center alert alert-success alert-dismissible fade show" role="alert">
            <strong>Successfully added!<br></strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;
        } 
    }
    hideAlert() {
        this.#alertElement.innerHTML = ``;
    }
}
