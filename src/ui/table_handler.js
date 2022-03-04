export default class TableHandler {
    #tableName
    #tableNameElem 
    #tableElem
    #columnsDefinition
    #sortFnName
    constructor(columnsDefinition, idTable, idTableName, tableName, sortFnName) {
        this.#tableName = tableName ?? '';
        this.#columnsDefinition = columnsDefinition;
        this.#tableElem = document.getElementById(idTable);
        this.#tableNameElem = document.getElementById(idTableName);
        this.#sortFnName = sortFnName ?? '';
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
        return this.#columnsDefinition.map(c => `<th onclick="${this.#getSortFn(c)}">${c.displayName}</th>`).join('');
    }
    #getSortFn(columnsDefinition) {
        return this.#sortFnName ? `${(this.#sortFnName)}('${columnsDefinition.key}')`: '';
    }
    #getBody(objects) {
        return objects.map(o => `<tr>${this.#getRecord(o)}</tr>`).join('');
    }
    #getRecord(object) {
        return this.#columnsDefinition.map(c => `<td>${object[c.key]}</td>`).join('');
    }
}