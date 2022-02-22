export function getRandomNumber(min, max) {
    min <= max || ([min, max] = [max, min]);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
export function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}
export function getRandomDate(minYear, maxYear) {
    const year = Math.floor(Math.random() * (maxYear - minYear + 1) + minYear);
    const month = Math.floor(Math.random() * 11);
    const day = Math.floor(Math.random() * 28 + 1);
    const date = new Date(year, month, day);
    return date;
}