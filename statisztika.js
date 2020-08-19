
{
    let bezarAlert = document.querySelectorAll(".close[data-dismiss='alert']");
    for (let i = 0; i < bezarAlert.length; i++) {
        bezarAlert[i].addEventListener("click", function (ev) {

            this.parentElement.style.display = "none";
        });
    }

}

let AdatObj = [
    { Dátum: "2020-07-01", Érték: "100" },
    { Dátum: "2020-07-02", Érték: "200" },
    { Dátum: "2020-07-03", Érték: "300" },
];
let tableBody = document.querySelector("#DataTable tbody");
for (let k in AdatObj) {
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    td.innerHTML = parseInt(k) + 1;
    tr.appendChild(td);
    for (let index of Object.values(AdatObj[k])) {
        let td = document.createElement("td");

        td.innerHTML = index;
        tr.appendChild(td);
    }
    tableBody.appendChild(tr);
}

function tombbeir() {
    let adat = document.getElementById("inputAdat");
    let datum = document.getElementById("inputDatum");



    alert(adat.value);
    alert(datum.value);
}

function osszead() {


    var kiiras;
    var osszeg = 0;
    var db = 0;

    for (let index of Object.values(AdatObj)) {

        osszeg = osszeg + Number(index.Érték);

        db++;

    }
    let atlag = (osszeg / db);

    kiiras = atlag.toString();

    document.getElementById("osszesen").value = atlag;
}

function minkeres() {
    var kiiras;
    var szam1;
    var min = undefined;
    

    for (let index of Object.values(AdatObj)) {

        szam1 = Number(index.Érték);
       
        if (typeof min === "undefined") { min = szam1; }
        else if (min > szam1) { min = szam1; }
    }
    kiiras = min.toString();
    document.getElementById("szelsomin").value = min;


}
function maxkeres() {
    var kiiras;
    var szam1;
    var max = undefined;
    

    for (let index of Object.values(AdatObj)) {

        szam1 = Number(index.Érték);
       
        if (typeof max === "undefined") { max = szam1; }
        else if (max < szam1) { max = szam1; }
    }
    kiiras = max.toString();
    document.getElementById("szelsomax").value = max;


}