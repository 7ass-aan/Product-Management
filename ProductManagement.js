let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let categroy = document.getElementById("categroy");
let pttn = document.getElementById("pttn");
let tbody = document.getElementById("tbody");
let deleteAll = document.getElementById("deleteAll");
let moode = "cr";
let ttt;
let serchmoodd = "title";
let search8 = document.getElementById("search8");

function gettotal() {
  if (price.value != "") {
    let resulet = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = resulet;
    total.style.backgroundColor = "green";
  } else {
    total.style.backgroundColor = "#b00020";
    total.innerHTML = "";
  }
}

let araaay;
if (localStorage.prod != null) {
  araaay = JSON.parse(localStorage.prod);
} else {
  araaay = [];
}
pttn.onclick = function () {
  let opj = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    categroy: categroy.value,
  };
  if (
    title.value != "" &&
    price.value != "" &&
    categroy.value != "" &&
    count.value < 100
  ) {
    if (moode === "cr") {
      if (opj.count > 1) {
        for (let i = 0; i < opj.count; i++) {
          araaay.push(opj);
        }
      } else {
        araaay.push(opj);
      }
    } else {
      araaay[ttt] = opj;
      moode = "cr";
      pttn.innerHTML = "Creat";
      count.style.display = "block";
    }
    delet();
    gettotal();
  }

  localStorage.prod = JSON.stringify(araaay);

  read();
};
read();
function delet() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  categroy.value = "";
}

function read() {
  let montag = "";
  for (let i = 0; i < araaay.length; i++) {
    montag += `
                <tr>
              <td>${i + 1}</td>
              <td>${araaay[i].title}</td>
              <td>${araaay[i].price}</td>
              <td>${araaay[i].taxes}</td>
              <td>${araaay[i].ads}</td>
              <td>${araaay[i].discount}</td>
              <td>${araaay[i].categroy}</td>
              <td><button id="update"onclick="UpdatetData(${i})">update</button></td>
              <td><button id="delete" onclick="deletData(${i})">delete</button></td>
            </tr>
    `;
  }
  tbody.innerHTML = montag;

  if (araaay.length > 0) {
    deleteAll.innerHTML = `
    <button  onclick="deletDataall()">Delete All (${araaay.length})</button>
    `;
  } else {
    deleteAll.innerHTML = ``;
  }
}
function deletData(i) {
  araaay.splice(i, 1);
  localStorage.prod = JSON.stringify(araaay);
  read();
}
function deletDataall() {
  araaay.splice(0);
  localStorage.clear();
  read();
}
function UpdatetData(i) {
  title.value = araaay[i].title;
  price.value = araaay[i].price;
  taxes.value = araaay[i].taxes;
  ads.value = araaay[i].ads;
  discount.value = araaay[i].discount;
  categroy.value = araaay[i].categroy;
  count.style.display = "none";
  pttn.innerHTML = "Update";
  gettotal();
  moode = "upp";
  ttt = i;
}
function serchmood(id) {
  if (id == "serc1") {
    serchmoodd = "title";
  } else {
    serchmoodd = "catogery";
  }
  search8.placeholder = "Search By " + serchmoodd;

  search8.focus();
  search8.value = "";
  read();
}
function serchData(value) {
  let montag = "";
  for (let i = 0; i < araaay.length; i++) {
    if (serchmoodd == "title") {
      if (araaay[i].title.includes(value)) {
        montag += `
                <tr>
              <td>${i + 1}</td>
              <td>${araaay[i].title}</td>
              <td>${araaay[i].price}</td>
              <td>${araaay[i].taxes}</td>
              <td>${araaay[i].ads}</td>
              <td>${araaay[i].discount}</td>
              <td>${araaay[i].categroy}</td>
              <td><button id="update"onclick="UpdatetData(${i})">update</button></td>
              <td><button id="delete" onclick="deletData(${i})">delete</button></td>
            </tr>
    `;
      }
    } else {
      if (araaay[i].categroy.includes(value)) {
        montag += `
                <tr>
              <td>${i + 1}</td>
              <td>${araaay[i].title}</td>
              <td>${araaay[i].price}</td>
              <td>${araaay[i].taxes}</td>
              <td>${araaay[i].ads}</td>
              <td>${araaay[i].discount}</td>
              <td>${araaay[i].categroy}</td>
              <td><button id="update"onclick="UpdatetData(${i})">update</button></td>
              <td><button id="delete" onclick="deletData(${i})">delete</button></td>
            </tr>
    `;
      }
    }
  }
  tbody.innerHTML = montag;
}
