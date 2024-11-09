const fs = require('fs')
const axios = require('axios')
const {MarkovMachine} = require('./markov')

function generateText(text){
  let mm = new MarkovMachine(text)
  console.log(mm.makeText());
}

function readFromFile(filepath){
  fs.readFile(filepath,'utf-8',(err, data) => {
    if (err) {
      console.error(`Error reading file '${filepath}: ${err}`)
      process.exit(1)
    } else {
      generateText(data)
    }
  })
}

async function readFromURL(url){
  try {
    let res = await axios.get(url)
    generateText(res.data)
  } catch(err) {
    console.error(`Error fetching URL '${url}': ${err}`)
    process.exit(1)
  }
}

let [method, path] = process.argv.slice(2);

if (method === 'file') {
  readFromFile(path);
} else if (method === 'url') {
  readFromURL(path);
} else {
  console.error(`Unknown method: ${method}`);
  console.error('Usage: node makeText.js <method> <path>');
  console.error('Methods: file, url');
  process.exit(1);
}
