const path = require('path');
const csv = require("csvtojson");
const csvFilePath = path.join(__dirname, '../../data_base/db.csv');
const TrieSearch = require('trie-search');
const trie = new TrieSearch();
var json = {};

module.exports = () => {

    async function _loadDbFromCsv() {

        const jsonFormCsv = await csv().fromFile(csvFilePath);

        for (let i = 0; i < jsonFormCsv.length; i++) {
            var searchTerm = jsonFormCsv[i]['Search Terms'];
            searchTerm = _checkForIllegalChars(searchTerm);

            var numOfSearches = parseInt(jsonFormCsv[i]['Num Searches']);
            json[searchTerm] = numOfSearches;
        }
        return json;
    }

    function _checkForIllegalChars(string) {
        if (string.indexOf(' ') > -1)
            string = string.replace(' ', '');

        if (string.indexOf('-') > -1)
            string = string.replace('-', '');


        return string;
    }

    async function _getTrie() {
        try {
            const json = await _loadDbFromCsv();
            trie.addFromObject(json);
        } catch (e) {
            console.log(e);
        }
        return trie;
    }




    return {
        getTrie: _getTrie
    }

}