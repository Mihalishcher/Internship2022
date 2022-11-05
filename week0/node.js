/**
 * 1. call https://jsonplaceholder.typicode.com/users and write it to file users.json
 * todo: install module to call this API, and use node FS module
 */



const axios = require('axios');
const fs = require('fs')

const getData = function (path) {
  axios.get(`https://jsonplaceholder.typicode.com/${path}`)
    .then(res => fs.writeFile(`${path}.json`, JSON.stringify(res.data), (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`File wrote succesfully: ${path}.json`);
      }
    }));
}

try {
  getData('users')
} catch (err) {
  console.log(err)
}

/**
 * 2. Let's work with running node script with some environment variables
 * todo: Pass parameter ENV when you run this script. 
 * If param is PRODUCTION  get data from https://jsonplaceholder.typicode.com/todos and write it to file todos.json
 * If param is DEV get data from https://jsonplaceholder.typicode.com/albums and write if to file albums.json
 */

try {
  if (process.env.ENV === 'PRODUCTION') {
    getData('todos')
  } else if (process.env.ENV === 'DEV')
    getData('albums')
} catch (error) {
  console.log(error)
}
