'use strict';

// *********************** GLOBALS  *************************************************************
let hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

let tableSelector = document.getElementById('stores');

// *********************** Rendering ***************************

function header() {

  let trElem = document.createElement('tr');
  tableSelector.appendChild(trElem);

  let thElem = document.createElement('th');
  thElem.textContent = 'Stores';
  trElem.appendChild(thElem);

  for (let j = 0; j < hours.length; j++) {
    thElem = document.createElement('th');
    thElem.textContent = hours[j];
    trElem.appendChild(thElem);
  }
  thElem = document.createElement('th');
  thElem.textContent = 'Total';
  trElem.appendChild(thElem);
}

header();

Store.prototype.render = function () {

  let trElem = document.createElement('tr');
  tableSelector.appendChild(trElem);

  let tdElem = document.createElement('td');
  tdElem.textContent = this.name;
  trElem.appendChild(tdElem);

  for (let i = 0; i < hours.length; i++) {
    let tableData = document.createElement('td');
    tableData.textContent = this.cookiesSold[i];

    trElem.appendChild(tableData);

  }
  let totalTableData = document.createElement('td');
  totalTableData.textContent = this.total;
  trElem.appendChild(totalTableData);
};

function grandTotals() {
  let grandTotals = document.createElement('tr');
  tableSelector.appendChild(grandTotals);

}

// *************** New Table event ************************

let myForm = document.getElementById('form');


// *********************** HELPER FUNCTIONS UTILITIES   ***************************************

// ************************* CONSTRUCTOR **********************
function Store(name, minCust, maxCust, averageCookie) {
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.averageCookie = averageCookie;
  this.cookiesSold = [];
  this.total = 0;

}

let Seattle = new Store('Seattle', 23, 65, 6.3, [], 0);
let Tokyo = new Store('Tokyo', 3, 24, 1.2, [], 0);
let Dubai = new Store('Dubai', 11, 38, 3.7, [], 0);
let Paris = new Store('Paris', 20, 38, 2.3, [], 0);
let Lima = new Store('Lima', 2, 16, 4.6, [], 0);

let cities = [Seattle, Tokyo, Dubai, Paris, Lima];

// *********************** METHODS  ****************************

Store.prototype.randomCust = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

Store.prototype.cookieSales = function () {
  for (let i = 0; i < hours.length; i++) {
    let avCookie = Math.floor(this.randomCust(this.minCust, this.maxCust) * this.averageCookie);
    this.cookiesSold.push(avCookie);
    this.total = this.total + this.cookiesSold[i];
  }
};

Seattle.cookieSales();
Tokyo.cookieSales();
Dubai.cookieSales();
Paris.cookieSales();
Lima.cookieSales();

Seattle.render();
Tokyo.render();
Dubai.render();
Paris.render();
Lima.render();

console.log(Seattle);
console.log(Tokyo);
console.log(Dubai);
console.log(Paris);
console.log(Lima);

function handleSubmit(event) {
  event.preventDefault();
  console.log('form submitted');

  let storeName = event.target.storeName.value;
  let minCustomers = +event.target.minCustomers.value;
  let maxCustomers = +event.target.maxCustomers.value;
  let averageSale = +event.target.averageSale.value;

  let NewStore = new Store(storeName, minCustomers, maxCustomers, averageSale);

  NewStore.cookieSales();
  NewStore.render();
  console.log(NewStore);
}


myForm.addEventListener('submit', handleSubmit);
