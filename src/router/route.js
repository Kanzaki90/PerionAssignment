const express = require('express');
const router = express.Router();

module.exports = app => {
    const searchSuggestCtrl = require('../controller/controller')(app);
    router.get('/suggest', searchSuggestCtrl.searchSuggest);
    app.use('/', router);
}