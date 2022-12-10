'use strict';

// *********************** GLOBALS  *************************************************************
let hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

let tableSelector = document.getElementById('stores');

// *********************** Rendering ***************************

function header() {

  let row1 = document.createElement('tr');
  tableSelector.appendChild(row1);

  let thElem = document.createElement('th');
  thElem.textContent = 'Stores';
  row1.appendChild(thElem);

  for (let j = 0; j < hours.length; j++) {
    thElem = document.createElement('th');
    thElem.textContent = hours[j];
    row1.appendChild(thElem);
  }
  thElem = document.createElement('th');
  thElem.textContent = 'Total';
  row1.appendChild(thElem);
}

// Call header prior to render method
header();

Store.prototype.render = function () {

  let row2 = document.createElement('tr');
  tableSelector.appendChild(row2);

  let tdElem = document.createElement('td');
  tdElem.textContent = this.name;
  row2.appendChild(tdElem);

  for (let i = 0; i < hours.length; i++) {
    let tableData = document.createElement('td');
    tableData.textContent = this.cookiesSold[i];

    row2.appendChild(tableData);

  }
  let totalTableData = document.createElement('td');
  totalTableData.textContent = this.total;
  row2.appendChild(totalTableData);
};


//************** FOOTER **************/
function footer() {
  let row3 = document.createElement('tr');
  tableSelector.appendChild(row3);

  let thElem = document.createElement('th');
  thElem.textContent = 'Total';
  row3.appendChild(thElem);

  // for (let i = 0; i < hours.length; i++) {
  //   for (let j = 0; j < cookiesSold.length; j++) {
  //     thElem = document.createElement('th');
  //     total =+ cookiesSold[i] + hours[i];
  //   }
  // }
}


function grandTotals() {
  let grandTotals = document.createElement('th');
  tableSelector.appendChild(grandTotals);

}

// *************** Form to add new Store Locations ************************

let myForm = document.getElementById('form');

// ************************* CONSTRUCTOR **********************

function Store(name, minCust, maxCust, averageCookie) {
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.averageCookie = averageCookie;
  this.cookiesSold = [];
  this.total = 0;

}

let Seattle = new Store('Seattle', 23, 65, 6.3);
let Tokyo = new Store('Tokyo', 3, 24, 1.2);
let Dubai = new Store('Dubai', 11, 38, 3.7);
let Paris = new Store('Paris', 20, 38, 2.3);
let Lima = new Store('Lima', 2, 16, 4.6);

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


// Calling cookieSales Method to get Table Data
Seattle.cookieSales();
Tokyo.cookieSales();
Dubai.cookieSales();
Paris.cookieSales();
Lima.cookieSales();


// Calling render Method to render Table Data
Seattle.render();
Tokyo.render();
Dubai.render();
Paris.render();
Lima.render();
footer();
// console.log(Seattle);
// console.log(Tokyo);
// console.log(Dubai);
// console.log(Paris);
// console.log(Lima);

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
