export default class CoursesRest {
    #url
    constructor(url) {
        this.#url = url;
    }
    async add(course) {
        const response = await fetch(this.#url, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(course)
        })
        return await response.json();
    }
    async get() {
        const response = await fetch(this.#url);
        return await response.json();
    }
    async remove(id) {
        const res = this.getCourse(id);
        await fetch(this.#getUrlById(id), {
            method: 'DELETE'
        })
        return res;
    }
    async getCourse(id) {
        const response = await fetch(this.#getUrlById(id));
        return await response.json();
    }
    async exist(id) {
        let res;
        try {
            await fetch(this.#getUrlById(id));
            res = true;
        } catch (err) {
            console.log(err);
            res = false;
        }
        return res;
    }
    #getUrlById(id) {
        return `${this.#url}/${id}`;
    }
    getUrl() {
        return this.#url;
    }
}