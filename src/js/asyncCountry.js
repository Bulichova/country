import refs from "./refs.js";
const { countriesList, modal, modalContent, searchForm, searchResults } = refs;
console.log(countriesList, modal, modalContent, searchForm, searchResults);
import countriesListItem from "../template/countriesListItem.hbs";
import modalCountryItem from "../template/modalCountryItem.hbs";
import countrySearchItem from "../template/countrySearchItem.hbs";
console.dir(countrySearchItem);
console.dir(modalCountryItem);
console.dir(countriesListItem);

window.addEventListener("DOMContentLoaded", getAllCountries);

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let searchName = event.target.elements.search.value;
  searchCountry(searchName);
  searchForm.requestFullscreen();
});

window.addEventListener("keydown", (e) => {
  if (e.code === "Escape") {
    modal.classList.add("is-hidden");
    modalContent.innerHTML = "";
  }
});

modal.addEventListener("click", (e) => {
  if (e.target.id != "modal-content") {
    modal.classList.add("is-hidden");
    modalContent.innerHTML = "";
  }
});

async function getAllCountries() {
  let url = `https://restcountries.eu/rest/v2/all`;
  let response = await fetch(url);
  let data = await response.json();
  let items = countriesListItem(data);
  countriesList.insertAdjacentHTML("afterbegin", items);
  const countries = [...countriesList.children];
  console.log(countries);
  countries.forEach((country) => {
    country.addEventListener("click", async (event) => {
        // HERE IS A BUG
      let name = event.target.textContent.trim();
      console.log(name);
      let url = `https://restcountries.eu/rest/v2/name/${name}`;
      let response = await fetch(url);
      let data = await response.json();
      let item = modalCountryItem(data);
      modalContent.insertAdjacentHTML("afterbegin", item);
      modal.classList.remove("is-hidden");
    });
  });
}

async function searchCountry(searchName) {
  let url = `https://restcountries.eu/rest/v2/name/${searchName}`;
  let response = await fetch(url);
  let data = await response.json();
  let item = countrySearchItem(data);
  searchResults.insertAdjacentHTML("afterbegin", item);
  const countries = [...searchResults.children];
  console.log(`63`, countries);
  countries.forEach((coutry) => {
    coutry.addEventListener("click", async (event) => {
      let name = event.target.textContent.trim();
      let url = `https://restcountries.eu/rest/v2/name/${name}`;
      let response = await fetch(url);
      let data = await response.json();
      let item = modalCountryItem(data);
      modalContent.insertAdjacentHTML("afterbegin", item);
      modal.classList.remove("is-hidden");
    });
  });
}
