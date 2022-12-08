'use strict';

// *********************** GLOBALS  *************************************************************
let hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', 'Daily Total'];

let hourTotals = [];
let cities = [];

let tableElem = document.getElementById('sales-table');

// *********************** DOM WINDOWS  ***********************

// *********************** HELPER FUNCTIONS UTILITIES   ***************************************

function randomCust(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// ************************* CONSTRUCTOR **********************
function Store(name, minCust, maxCust, averageCookie) {
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.averageCookie = averageCookie;
  this.cookiesSold = [];

}

// *********************** METHODS  ****************************

Store.prototype.getCookiesSold = function () {
  let cookiesTotal = 0;
  for (let i = 0; i < hours.length - 1; i++) {
    let cookies = Math.floor(randomCust(this.minCust, this.maxCust) * this.averageCookie);
    this.cookiesSold.push(cookies);
    cookiesTotal += cookies;
  }
  this.cookiesSold.push(cookiesTotal);
};

Store.prototype.render = function () {

  let trElem = document.createElement('tr');
  tableElem.appendChild(trElem);

  let tdElem = document.createElement('td');
  trElem.innerText = this.name;
  trElem.appendChild(tdElem);

  //  this.cookiesSold[i]
  for (let i = 0; i < this.cookiesSold.length; i++) {
    const tdElem = document.createElement('td');
    tdElem.innerText = this.cookiesSold[i];
    trElem.appendChild(tdElem);
  }
};

// *********************** EXECUTABLE CODE**************************

function tableHours() {
  let row1 = document.createElement('tr');
  tableElem.appendChild(row1);

  let emptyElem = document.createElement('th');
  row1.appendChild(emptyElem);

  for (let i = 0; i < hours.length; i++) {
    let headElem = document.createElement('th');
    headElem.innerText = hours[i];
    row1.appendChild(headElem);
  }
}

function tableTotals() {
  let row1 = document.createElement('tr');
  tableElem.appendChild(row1);

  let emptyElem = document.createElement('th');
  emptyElem.innerText = 'Totals';
  row1.appendChild(emptyElem);

  for (let i = 0; i < hours.length; i++) {
    let headElem = document.createElement('th');
    headElem.innerText = hourTotals[i];
    row1.appendChild(headElem);
  }

}

// Instantiate Store Locations
const seattle = new Store('Seattle', 23, 65, 6.3);
const tokyo = new Store('Tokyo', 3, 24, 1.2);
const dubai = new Store('Dubai', 11, 38, 3.7);
const paris = new Store('Paris', 20, 38, 2.3);
const lima = new Store('Lima', 2, 16, 4.6);

cities.push(seattle, tokyo, dubai, paris, lima);

function render() {
  for (let i = 0; i < cities.length; i++) {
    cities[i].getCookiesSold();
    cities[i].render();
  }
}

function hourlyTotalCookies() {
  for (let i = 0; i < hours.length; i++) {
    let hourlyCookies = 0;
    for (let j = 0; j < cities.length; j++) {
      hourlyCookies += cities[j]['cookiesSold'][i];
    }
    hourTotals.push(hourlyCookies);
  }
}

tableHours();

render();

hourlyTotalCookies();

tableTotals();
