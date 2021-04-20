const api_RestCountries = `https://restcountries.eu/rest/v2/currency/`;

const api_Fixer = {
  key: "04fb41552e9d5d990f164335b5d231e5",
  base: "http://data.fixer.io/api/"

}


//Global variables
let fixerAPIdata;
const fromCurrency = document.querySelector('.fromCurrency')
const toCurrency = document.querySelector('.toCurrency')
const countries = document.querySelector('.countries')
const convert = document.querySelector('.convert')
convert.addEventListener('click', fromCurrencyTo);

//1. Get first list
function getList() {
  fetch(`${api_Fixer.base}latest?access_key=${api_Fixer.key}`)
    .then(fixerAPI => {
      return fixerAPI.json();
    }).then(fixerAPI => {
      fixerAPIdata = fixerAPI;
      for (const [key] of Object.entries(fixerAPI.rates)) {
        let newOption = document.createElement('option');
        newOption.innerText = key;
        fromCurrency.appendChild(newOption);
        fromCurrency.value = 'GBP'
      }
    }).then(getSecondList);
}

//2. Get second list
function getSecondList() {
  fetch(`${api_Fixer.base}latest?access_key=${api_Fixer.key}`)
    .then(fixerAPI => {
      return fixerAPI.json();
    }).then(fixerAPI => {
      for (const [key] of Object.entries(fixerAPI.rates)) {
        let newOption = document.createElement('option');
        newOption.innerText = key;
        toCurrency.appendChild(newOption);
        toCurrency.value = 'USD'
      }
    })
}
getList();

// 3. Convert & Display currencies
function fromCurrencyTo() {
  // Variables

  const resultFrom = document.querySelector('.resultFrom')
  const resultTo = document.querySelector('.resultTo')
  const hide = document.querySelector('.hide')
  const howMuch = document.querySelector('.howMuch')
  const rate = document.querySelector('.rate')

  hide.style.display = 'unset';
  fromCurrency.value = fromCurrency.value.toUpperCase();
  toCurrency.value = toCurrency.value.toUpperCase();

  // ExchangeRate & Conversion
  const euro = 1 / fixerAPIdata.rates[fromCurrency.value]
  const exchangeRate = euro * fixerAPIdata.rates[toCurrency.value]
  const convertedAmount = (howMuch.value * exchangeRate).toFixed(2);
  rate.innerText = exchangeRate.toFixed(2);
  resultFrom.innerText = `${howMuch.value} ${fromCurrency.value}`;
  resultTo.innerText = `${convertedAmount} ${toCurrency.value}`;

  // Clear the list of countries.
  while (countries.lastElementChild) {
    countries.removeChild(countries.lastElementChild);
  }
  getCountriesAPI(toCurrency.value);
}

// 4. Fetch data about countries
function getCountriesAPI(currencyCode) {
  fetch(`${api_RestCountries}${currencyCode}`)
    .then(countriesAPI => {
      return countriesAPI.json();
    }).then(displayCountries)
}

// 5. Display data about countries
function displayCountries(cAPI) {
  for (let i = 0; i < cAPI.length; i++) {
    let newCountry = document.createElement('li');
    newCountry.setAttribute('class', 'country');
    newCountry.innerText = `${cAPI[i].name}`;
    countries.appendChild(newCountry);
  }
}