const api_RestCountries = `https://restcountries.eu/rest/v2/currency/`;

const api_Fixer = {
  key: "04fb41552e9d5d990f164335b5d231e5",
  base: "http://data.fixer.io/api/"
  // latest?access_key=
}


//global variables
const convert = document.querySelector('.convert')
const fromCurrency = document.querySelector('.fromCurrency')
const toCurrency = document.querySelector('.toCurrency')
const result = document.querySelector('.result')
const howMuch = document.querySelector('.howMuch')
const rate = document.querySelector('.rate')
const countries = document.querySelector('.countries')
const country = document.querySelector('.country')
convert.addEventListener('click', getCurrencyAPI);

// 1. Fetch data about currencies
function getCurrencyAPI() {
  fetch(`${api_Fixer.base}latest?access_key=${api_Fixer.key}`)
    .then(fixerAPI => {
      return fixerAPI.json();
    }).then(fromCurrencyTo)
}


// 2. Convert & Display currencies
function fromCurrencyTo(fAPI) {

  const euro = 1 / fAPI.rates[fromCurrency.value]
  const exchangeRate = euro * fAPI.rates[toCurrency.value]
  const convertedAmount = (howMuch.value * exchangeRate).toFixed(2);
  rate.innerText = exchangeRate.toFixed(2);
  result.innerText = `For ${howMuch.value} ${fromCurrency.value} you will get ${convertedAmount} ${toCurrency.value}`;


  // Clear the list of countries.
  while (countries.lastElementChild) {
    countries.removeChild(countries.lastElementChild);
  }
  // interesting: https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript

  // HOW TO MAKE A LIST INSTEAD OF AN INPUT USING API?
  getCountriesAPI(toCurrency.value);
}

// 3. Fetch data about countries
function getCountriesAPI(currencyCode) {
  // https://restcountries.eu/rest/v2/name/{name}
  fetch(`${api_RestCountries}${currencyCode}`)
    .then(countriesAPI => {
      return countriesAPI.json();
    }).then(displayCountries)
}



// 4. Fetch data about cost of living 




// 5. Display data about countries

function displayCountries(cAPI) {
  for (let i = 0; i < cAPI.length; i++) {
    let newCountry = document.createElement('li');
    newCountry.setAttribute('class', 'country');
    newCountry.innerText = `${cAPI[i].name}`;
    countries.appendChild(newCountry);

  }

  console.log(cAPI)

  // const euro = 1 / fAPI.rates.GBP
  // const exchangeRate = euro * fAPI.rates.PLN
  // console.log(exchangeRate.toFixed(2))

  // let fromCurrency = document.querySelector('.fromCurrency')
  // fromCurrency.innerText = 'GBP'
  // let toCurrency = document.querySelector('.toCurrency')
  // toCurrency.innerText = 'PLN'
  // let exRate = document.querySelector('.exRate')
  // exRate.innerText = exchangeRate.toFixed(2);




}