

let keys = ["id", "Dátum", "Érték"];
let darab = 0;
let szumma = 0;
let maximum = 0;
let minimum = 0;
{
    let bezarAlert = document.querySelectorAll(".close[data-dismiss='alert']");
    for (let i = 0; i < bezarAlert.length; i++) {
        bezarAlert[i].addEventListener("click", function (ev) {

            this.parentElement.style.display = "none";
        });
    }

}

function getServerData(url) {
    let fetchOption = {
        method: "GET",
        /*  headers: new Headers(), */
        mode: "cors",
        cache: "no-cache"
    };

    return fetch(url, fetchOption).then(
        response => response.json(),
        err => console.error(err)
    );
}

document.querySelector("#GetDataBtn").addEventListener("click", StartGetUsers);

function StartGetUsers() {

    getServerData("http://localhost:3000/StatAdat").then(
        data => FillDataTable(data, "DataTable")
    );

};

function FillDataTable(data, TableId) {

    let table = document.querySelector(`#${TableId}`);
    if (!table) {
        console.error(`Table "#${TableId}" is not found`)
        return
    }
    // add new user row to the table

    let tBody = table.querySelector("tbody");
    tBody.innerHTML = '';
    let newRow = newUserRow();
    tBody.appendChild(newRow);


    for (let row of data) {
        darab = darab + 1;
        let tr = createAnyElement("tr");
        for (let k of keys) {
            let td = createAnyElement("td");

            let input = createAnyElement("input", {
                class: "form-control",
                value: row[k],
                name: k

            });
            if (k == "Érték") {

                szumma = szumma + Number(row[k]);
                if (darab == 1) {
                    maximum = Number(row[k]);
                    minimum = Number(row[k]);
                } else {
                    if (maximum < Number(row[k])) {
                        maximum = Number(row[k]);
                    }
                    if (minimum > Number(row[k])) {
                        minimum = Number(row[k]);
                    }
                }

                if (k == "id") {
                    input.setAttribute("readonly", true);

                }
            }
            td.appendChild(input);
            tr.appendChild(td);

        }
        let btngroup = createBtnGroup();
        tr.appendChild(btngroup);

        tBody.appendChild(tr);

    }
}

function createAnyElement(name, attributes) {

    let element = document.createElement(name);
    for (let k in attributes) {
        element.setAttribute(k, attributes[k]);
    }
    return element;
}
function createBtnGroup() {
    let group = createAnyElement("div", { class: "btn btn-grup" });
    let infobtn = createAnyElement("button", { class: "btn-info", onclick: "setRow(this)" });
    infobtn.innerHTML = '<i class="fas fa-sync-alt" aria-hidden="true"></i>';
    let delbtn = createAnyElement("button", { class: "btn-danger", onclick: "delRow(this)" });
    delbtn.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
    group.appendChild(infobtn);
    group.appendChild(delbtn);
    let td = createAnyElement("td");
    td.appendChild(group);
    return td;
}

function delRow(btn) {
    let tr = btn.parentElement.parentElement.parentElement;

    let id = tr.querySelector("td:first-child").querySelector("input").value;


    let fetchOption = {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache"

    };

    if (confirm("Biztosan törli az adatot?")) {
        fetch(`http://localhost:3000/StatAdat/${id}`, fetchOption).then(


            resp => resp.json(),
            err => console.error(err)
        ).then(
            data => {
                StartGetUsers()
            }
        );
    };
}
function newUserRow(row) {
    let tr = createAnyElement("tr");
    for (let k of keys) {
        let td = createAnyElement("td");
        let input = createAnyElement("input", {
            class: "form-control",
            name: k
        });
        td.appendChild(input);
        tr.appendChild(td);
    }
    let newBtn = createAnyElement("button", {
        class: "btn btn-success",
        onclick: "createUser(this)"
    })
    newBtn.innerHTML = '<i class="fa fa-plus-circle" aria-hidden="true"></i>';
    let td = createAnyElement("td");
    td.appendChild(newBtn);
    tr.appendChild(td);
    return tr;
}

function createUser(btn) {
    let tr = btn.parentElement.parentElement;

    let data = getRowData(tr);

    delete data.id;
    let fetchOption = {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch('http://localhost:3000/StatAdat', fetchOption).then(
        resp => resp.json(),
        err => console.error(err)
    ).then(
        data => StartGetUsers()
    );
}

function getRowData(tr) {

    let inputs = tr.querySelectorAll("input");
    /*  let inputs = tr.querySelectorAll("input.tm-control"); */
    let data = {};
    for (let i = 0; i < inputs.length; i++) {
        data[inputs[i].name] = inputs[i].value;
    }
    return data;
}

function setRow(btn) {
    let tr = btn.parentElement.parentElement.parentElement;
    let data = getRowData(tr);
    let fetchOption = {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)

    };
    fetch(`http://localhost:3000/StatAdat/${data.id}`, fetchOption).then(
        resp => resp.json(),
        err => console.error(err)
    ).then(
        data => {
            StartGetUsers()
        }
    );
}

function osszead() {

    let atlag = (szumma / darab);


    document.getElementById("osszesen").value = atlag.toFixed();
}
function minkeres() {

    document.getElementById("szelsomin").value = minimum;
}
function maxkeres() {

    document.getElementById("szelsomax").value = maximum;
}


