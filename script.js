
const countryList = document.getElementById('countryList');
const themeToggle = document.getElementById('themeToggle');
let darkMode = false;

themeToggle.addEventListener('click', toggleTheme);


function toggleTheme() {
  darkMode = !darkMode;
  document.body.classList.toggle('dark-theme', darkMode);
}

async function fetchCountries() {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
}


const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', performSearch);


function performSearch() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm)
  );
  renderCountries(filteredCountries);
}


(async function () {
  countries = await fetchCountries(); 
  renderCountries(countries);
})();


  
  function renderCountries(countries) {
    countryList.innerHTML = '';
    countries.forEach(country => {
      const countryCard = document.createElement('div');
      countryCard.classList.add('country-card');
      
      const languages = Object.values(country.languages).join(', ');
      const currencies = Object.values(country.currencies).map(currency => `${currency.name} (${currency.symbol})`).join(', ');
      
      countryCard.innerHTML = `
        <img class="country-flag" src="${country.flags.png}" alt="${country.name.common} Flag">
        <h2 class="country-name">${country.name.common}</h2>
        <p class="country-info"><span class="info-label">Capital:</span> <span class="capital">${country.capital[0]}</span></p>
        <p class="country-info"><span class="info-label">Region:</span> <span class="region">${country.region}</span></p>
        <p class="country-stat">Population: <span class="population">${country.population}</span></p>
        <p class="country-info"><span class="info-label">Currency:</span> <span class="currency">${currencies}</span></p>
        <p class="country-info"><span class="info-label">Language:</span> <span class="language">${languages}</span></p>
        
      `;
      countryList.appendChild(countryCard);
    });
  }
  

  function toggleTheme() {
    darkMode = !darkMode;
    document.body.classList.toggle('dark-theme', darkMode);
  }
  

  (async function () {
    const countries = await fetchCountries();
    renderCountries(countries);
  })();
  

(async function () {
  const countries = await fetchCountries();
  renderCountries(countries);
})();
