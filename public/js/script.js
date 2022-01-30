var suffixSearchModule = (function() {

    function _suffixSearch(e) {

        const suffix = e.target.value;
        const url = 'http://localhost:3000/suggest?q=' + suffix;;
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                response = JSON.parse(this.responseText);
                _tableFiller(response);
            }
        }
        xhttp.open("GET", url, true);
        xhttp.send();

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