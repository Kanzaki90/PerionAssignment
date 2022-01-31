var suffixSearchModule = (function() {

    async function _suffixSearch(e) {

        const suffix = e.target.value;
        const url = 'http://localhost:3000/suggest?q=' + suffix;

        const response = await fetch(url);
        const responseData = await response.json();
        _tableFiller(responseData);
    };

    function _tableFiller(response) {

        const tbody = document.querySelector("#tbody");
        if (tbody.childElementCount > 0) {
            while (tbody.lastElementChild) {
                tbody.removeChild(tbody.lastElementChild);
            }
        }
        for (let i = 0; i < response.length; i++) {

            let tr = document.createElement("tr");

            td = _tdCreator();
            td.innerHTML = i + 1;
            tr.appendChild(td);

            td = _tdCreator();
            td.innerHTML = response[i]['_key_'];
            tr.appendChild(td);


            td = _tdCreator();
            td.innerHTML = response[i]['value'];
            tr.appendChild(td);

            tbody.appendChild(tr);
        }
    }

    function _tdCreator() {
        let td = document.createElement("td");
        return td;
    }

    return {
        suffixSearch: _suffixSearch
    };
})();