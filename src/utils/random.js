export function getRandomNumber(min, max) {
    min <= max || ([min, max] = [max, min]);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
export function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}
export function getRandomDate(minYear, maxYear) {
    minYear <= maxYear || ([minYear, maxYear] = [maxYear, minYear]);
    const year = getRandomNumber(minYear,maxYear);
    const month = getRandomNumber(0, 11);
    const day = getRandomNumber(1, 31);
    const date = new Date(year, month, day);
    return date;
}