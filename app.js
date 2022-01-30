const path = require('path');
const express = require('express');
const publicDirectory = path.join(__dirname, './public/');
const app = express();
const dbService = require('./src/services/db')();


function loadServer() {
    app.use('/', express.static(publicDirectory));
    require('./src/router/route')(app);
}

// data initialization
async function loadData() {
    const trie = await dbService.getTrie();
    app.locals.trie = trie;
}

(async() => {
    loadServer();
    await loadData();
    app.listen(3000, () => console.log('application listening in port 3000'));
})()