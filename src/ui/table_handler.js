export default class TableHandler {
    #tableName
    #tableElem
    #columnsDefinition
    #sortFnName
    #removeFnName
    constructor(columnsDefinition, idTable, tableName, sortFnName, removeFnName) {
        this.#tableName = tableName ?? '';
        this.#columnsDefinition = columnsDefinition;
        this.#tableElem = document.getElementById(idTable);
        this.#sortFnName = sortFnName ?? '';
        this.#removeFnName = removeFnName ?? '';
        if (!this.#tableElem) {
            throw "Table element is not defined";
        }
    }
    showTable(objects) {
        this.#tableElem.innerHTML = `${this.#getHeader()}${this.#getBody(objects)}${this.#getTableName()}`;
    }
    hideTable() {
        this.#tableElem.innerHTML = '';
    }
    #getTableName() {
        return `<caption class="h3 text-dark caption-top border-0 text-center mt-3">${this.#tableName}</caption>`
    }
    #getHeader() {
        return `<thead><tr>${this.#getColumns()}</tr></thead>`;
    }
    #getColumns() {
        const columns = this.#columnsDefinition.map(c => `<th onclick="${this.#getSortFn(c)}" style="cursor: pointer; vertical-align: middle;">${c.displayName}</th>`);
        if (this.#removeFnName) {
            columns.push("<th></th>");
        }
        let res = columns.join('');   
        if (!this.#sortFnName) {
            res = res.replaceAll('cursor: pointer;', '');
        }
        return res;
    }
    #getSortFn(columnsDefinition) {
        return this.#sortFnName ? `${(this.#sortFnName)}('${columnsDefinition.key}');`: '';
    }
    #getBody(objects) {
        return objects.map(o => `<tr>${this.#getRecord(o)}</tr>`).join('');
    }
    #getRecord(object) {
        const record = this.#columnsDefinition.map(c => `<td>${object[c.key]}</td>`);
        if (this.#removeFnName) {            
            record.push(`<td onclick="${this.#removeFnName}('${object.id}')" style="cursor:pointer"><i class="bi bi-trash"></i></td>`);
        }
        return record.join('');
    }
}