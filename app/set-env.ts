// Guide:
// https://medium.com/@ferie/how-to-pass-environment-variables-at-building-time-in-an-angular-application-using-env-files-4ae1a80383c
// import { writeFile } from 'fs';
const fs = require('fs');
const writeFile = fs.writeFile;

// Configure Angular `.env` file path
const targetPath = './app/env.js';

// Load node modules
const colors = require('colors');
require('dotenv').load();

// `.env` file structure
const envConfigFile = `(function (window) {
    window.__env = window.__env || {};

    // API urls
    window.__env.apiUrl = '${process.env.BACKEND_ENDPOINT}';
    window.__env.chatWebsocketUrl = '${process.env.BACKEND_WEBSOCKET}';
    
}(this));`;
console.log(colors.magenta('The file `.env` will be written with the following content: \n'));
console.log(colors.grey(envConfigFile));
writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    throw console.error(err);
  } else {
    console.log(colors.magenta(`Angular environment.ts file generated correctly at ${targetPath} \n`));
  }
});