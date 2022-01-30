const dbService = require('../services/db')();

module.exports = app => {

    async function _searchSuggest(req, res) {
        const query = req.query.q;
        if (!query) {
            return res.send({ success: false, data: {}, message: 'missing search word' })
                .status(400);
        }
        const trie = app.locals.trie;
        const searchResult = trie.search(query);

        const result = searchResult.sort(function(a, b) {
            return b.value - a.value;
        }).slice(0, 10);

        // console.log(result);
        res.send(result);
    }


    return {
        searchSuggest: _searchSuggest
    }
}