export default class TableHandler {
    #tableName
    #tableNameElem 
    #tableElem
    #columnsDefinition
    #sortFnName
    #removeFnName
    constructor(columnsDefinition, idTable, idTableName, tableName, sortFnName, removeFnName) {
        this.#tableName = tableName ?? '';
        this.#columnsDefinition = columnsDefinition;
        this.#tableElem = document.getElementById(idTable);
        this.#tableNameElem = document.getElementById(idTableName);
        this.#sortFnName = sortFnName ?? '';
        this.#removeFnName = removeFnName ?? '';
        if (!this.#tableElem) {
            throw "Table element is not defined";
        }
    }
    showTable(objects) {
        this.#tableNameElem.innerHTML = `${this.#tableName}`;
        this.#tableElem.innerHTML = `${this.#getHeader()}${this.#getBody(objects)}`;
    }
    hideTable() {
        this.#tableNameElem.innerHTML = '';
        this.#tableElem.innerHTML = '';
    }
    #getHeader() {
        return `<thead><tr>${this.#getColumns()}</tr></thead>`;
    }
    #getColumns() {
        const columns = this.#columnsDefinition.map(c => `<th onclick="${this.#getSortFn(c)}" style="cursor : pointer">${c.displayName}</th>`);
        if (this.#removeFnName) {
            columns.push("<th></th>");
        }
        return columns.join('');
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