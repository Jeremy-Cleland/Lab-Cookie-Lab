'use strict';

// *********************** GLOBALS  *************************************************************
let hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

let storeCookieSales = document.getElementById('stores');
let myForm = document.getElementById('form');

function Store(name, minCust, maxCust, averageCookie) {
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.averageCookie = averageCookie;

}

// *********************** METHODS  ****************************

Store.prototype.randomCust = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

Store.prototype.cookieSales = function () {
  const cookiesPerHour = [];
  for (let i = 0; i < hours.length; i++) {
    let avCookie = Math.floor(this.randomCust(this.minCust, this.maxCust) * this.averageCookie);
    cookiesPerHour.push(avCookie);
  }
  this.hourlySales = cookiesPerHour;
  let cookies = 0;
  for (let hour of cookiesPerHour) {
    cookies += hour;
  }
  this.totalSales = cookies;
};

// *********************** RENDER  ****************************
Store.prototype.render = function () {

  let row2 = document.createElement('tr');
  storeCookieSales.appendChild(row2);
  row2.innerText = this.name;

  for (let i = 0; i < hours.length; i++) {
    let tableData = document.createElement('td');
    row2.appendChild(tableData);
    tableData.innerText = this.hourlySales[i];
  }
  let totalTableData = document.createElement('td');
  row2.appendChild(totalTableData);
  totalTableData.textContent = this.totalSales;

};

// *********************** HEADER  ****************************
function header() {

  let row1 = document.createElement('tr');
  storeCookieSales.appendChild(row1);

  let thElem = document.createElement('th');
  thElem.textContent = 'Stores';
  row1.appendChild(thElem);

  for (let j = 0; j < hours.length; j++) {
    thElem = document.createElement('th');
    thElem.textContent = hours[j];
    row1.appendChild(thElem);
  }
  thElem = document.createElement('th');
  thElem.textContent = 'TotalS';
  row1.appendChild(thElem);
}

header();


// *********************** FOOTER ***************************
function footer() {
  let row3 = document.createElement('tr');
  storeCookieSales.appendChild(row3);

  let thElem = document.createElement('th');
  row3.appendChild(thElem);
  thElem.textContent = 'Hourly Totals';


  const hourlyTotals = [];
  let grandTotal = 0;


  for (let i = 0; i < hours.length; i++) {
    let hourTotal = 0;
    for (let j = 0; j < cities.length; j++) {
      hourTotal += cities[j].hourlySales[i];
    }
    hourlyTotals.push(hourTotal);
    grandTotal += hourTotal;
  }
  for (let i = 0; i < hourlyTotals.length; i++) {
    let hourTotalRow = document.createElement('th');
    row3.appendChild(hourTotalRow);
    hourTotalRow.innerText = hourlyTotals[i];
  }

  let grandTotalCell = document.createElement('th');
  row3.appendChild(grandTotalCell);
  grandTotalCell.innerText = grandTotal;
}

// ************************* EXECUTEABLE CODE **********************

let Seattle = new Store('Seattle', 23, 65, 6.3);
let Tokyo = new Store('Tokyo', 3, 24, 1.2);
let Dubai = new Store('Dubai', 11, 38, 3.7);
let Paris = new Store('Paris', 20, 38, 2.3);
let Lima = new Store('Lima', 2, 16, 4.6);

let cities = [Seattle, Tokyo, Dubai, Paris, Lima];

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

// ************************* ADD EVENT LISTENER **********************

function handleSubmit(e) {
  e.preventDefault();
  let storeName = e.target.storeName.value;
  let minCustomers = +e.target.minCustomers.value;
  let maxCustomers = +e.target.maxCustomers.value;
  let averageSale = +e.target.averageSale.value;

  let NewStore = new Store(storeName, minCustomers, maxCustomers, averageSale);
  cities.push(NewStore);
  storeCookieSales.deleteRow(-1);
  NewStore.cookieSales();
  NewStore.render();
  footer();
}

myForm.addEventListener('submit', handleSubmit);


