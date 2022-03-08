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
        const columns = this.#columnsDefinition.map(c => `<th onclick="${this.#getSortFn(c)}">${c.displayName}</th>`);
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
            record.push(`<td><div onclick="${this.#removeFnName}('${object.id}')" style="cursor:pointer"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
          </svg></i></div></td>`);
        }
        return record.join('');
    }
}