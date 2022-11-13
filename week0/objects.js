const invoice = {
    firstName: 'Node',
    lastName: 'Developer',
    createdAt: '2022-10-31T22:50:59.305Z',
    amount: 150,
    currency: 'USD',
};

/**
 * 1. Log firstName and lastName in dot notation and bracket notation
 */

console.log(`First name: ${invoice.firstName}`);
console.log(`Last name: ${invoice.lastName}`);

/**
 * 2. Log Object Keys
 */

// Object.prototype.getKeys = function () {
//     return Object.keys(this);
// }
// const keys = invoice.getKeys();

const keys = Object.keys(invoice);

console.log({
    keys,
});

/**
 * 3. Log Object values
 */

// Object.prototype.getValues = function () {
//     return Object.values(this);
// }
// const values = invoice.getValues();

const values = Object.values(invoice);

console.log({
    values,
});

/**
 * 4. Log Object entries
 */

// Object.prototype.getEntries = function () {
//     return Object.entries(this);
// }
// const entries = invoice.getEntries();

const entries = Object.entries(invoice);

console.log({
    entries,
});

/**
 * 5. Create second variable invoce from original
 * Please, use more than one solution
 */

// // first solution (good when we don`t have nested objects)
// const copiedInvoice = Object.assign({}, invoice);

// // second solution (good when we don`t have nested objects)
// const copyObj = function (obj) {
//     let newObj = {};
//     for (let key in obj) {
//         newObj[key] = obj[key];
//     }
//     return newObj;
// }
// const copiedInvoice = copyObj(invoice);

// third solution (nested copy)
const copiedInvoice = JSON.parse(JSON.stringify(invoice));

console.log({
    copiedInvoice,
    invoice,
});

/**
 * 6. Modify copiedInvoice amount value
 * Important: original invoice amount shouldnt be modified
 */

copiedInvoice.amount = 300;

console.log({
    invoice,
    copiedInvoice,
});

/**
 * 7. Loop through object and log key-values
 */

Object.keys(invoice).forEach((key) => {
    console.log(`${key} : ${invoice[key]}`);
});
