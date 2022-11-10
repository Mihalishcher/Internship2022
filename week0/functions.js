/**
 * 1. Write a funcion that accepts your firstName and lastName
 * Should return 'I'm firstName lastName'
 */

function sayWho(firstName, lastName) {
  return `I'm ${firstName} ${lastName}`;
}

console.log(sayWho('Mihail', 'Shcherbakov'));

/**
 * 2. Write a function that accepts numbers and return their sum
 * No limits for arguments count
 */

function countSum(...numbers) {
  return numbers.filter((el) => typeof el === 'number')
    .reduce((prev, curr) => prev + curr);
}

console.log(countSum(4, 5, 23));
console.log(countSum(10, 50, 212, 300, 22));
console.log(countSum(1, 2, 'asdad', 'asdasd'));

/**
 * 3. Write a function that count number of letters in provided string
 */

function countLetters(string, letter) {
  let result = 0;
  Array.from(string).forEach((oneLetter) => {
    if (oneLetter === letter) {
      result += 1;
    }
  });

  return result;
}

console.log(countLetters('Node developer', 'd'));

/**
 *  4. Write function that will return random integer in range that you provided
 */

function getRandom(start, end) {
  return Math.floor(Math.random() * (end - start) + start);
}

console.log(getRandom(0, 10));
console.log(getRandom(90, 200));
