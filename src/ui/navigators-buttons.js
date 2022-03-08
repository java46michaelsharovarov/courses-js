export default class NavigatorButtons {
    #buttonsElements
    constructor() {
        this.#buttonsElements = Array.from(document.querySelectorAll(`nav button`)).map(e => e = e.id);
    }
    setActive(index) {        
        this.#buttonsElements.forEach((e,i) => {
            if(i === index) {
                document.querySelector(`#${e}`).classList.add("bg-primary");
            } else {
                document.querySelector(`#${e}`).classList.remove("bg-primary");
            }
        });             
    }
}    