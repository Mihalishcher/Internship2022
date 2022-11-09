const myArray = [1, 10, 3, 6, 'ArrayElement'];

/**
 * 1. Log 3 and 6 elements from myArray to console
 * Please, use more than on solution
 */

// console.log(`3: ${}`);
// console.log(`6: ${}`);
console.log(`The third element of array is: ${myArray.at(2)}`);
console.log(`The fourth element of array is: ${myArray.at(-2)}`);

/**
 *  2. Log type of each element
 */

myArray.forEach((elem) => {
    console.log(typeof elem);
});

/**
 *  3. Check if all elements in array is Number
 *  Should return Boolean
 */

const isNumber = myArray.every(Number);

console.log({
    isNumber,
});

/**
 * 4. Check if at least one element is bigger than 5
 * Should return Boolean
 */

const isBiggerThanFive = myArray.some(elem => elem > 5);

console.log({
    isBiggerThanFive,
});

/**
 * 5. Create another variable that will include only elements that bigger than 5
 * Should return another Array
 */

const elementsBiggerThanFive = myArray.filter(elem => elem > 5);

console.log({
    elementsBiggerThanFive,
});

/**
 * 6. Multiply numbers of Array by 2
 * Should return another Array
 */

const multiplied = myArray.map(elem => {
    if (typeof elem === 'number') {
        return elem * 2;
    }
    return elem;
});

console.log({
    multiplied,
});

/**
 * 7. Calculate array sum
 */

const sum = myArray.reduce((prev, curr) => {
    if (typeof curr === 'number') {
        return prev + curr;
    }
    return prev;
});

console.log({
    sum,
});

/**
 * 8. Sort array in ascending and descending order
 */

const asc = myArray.filter(el => typeof el === 'number').sort((a, b) => a - b);
// const desc = asc.reverse();
const desc = myArray.filter(el => typeof el === 'number').sort((a, b) => b - a);

console.log({
    asc,
    desc,
});
