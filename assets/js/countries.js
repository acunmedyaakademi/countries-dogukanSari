let countries = [
  {
      countryName: "Turkey",
      population: 84200000,
      flag: "🇹🇷",
      famousFood: "Kebab",
      capitalCity: "Ankara",
  },
  {
      countryName: "Italy",
      population: 60480000,
      flag: "🇮🇹",
      famousFood: "Pizza",
      capitalCity: "Rome",
  },
  {
      countryName: "Japan",
      population: 125800000,
      flag: "🇯🇵",
      famousFood: "Sushi",
      capitalCity: "Tokyo",
  },
  {
      countryName: "Brazil",
      population: 212600000,
      flag: "🇧🇷",
      famousFood: "Feijoada",
      capitalCity: "Brasilia",
  },
  {
      countryName: "India",
      population: 1393000000,
      flag: "🇮🇳",
      famousFood: "Curry",
      capitalCity: "New Delhi",
  },
  {
      countryName: "France",
      population: 65270000,
      flag: "🇫🇷",
      famousFood: "Baguette",
      capitalCity: "Paris",
  },
  {
      countryName: "Mexico",
      population: 126000000,
      flag: "🇲🇽",
      famousFood: "Tacos",
      capitalCity: "Mexico City",
  },
  {
      countryName: "China",
      population: 1441000000,
      flag: "🇨🇳",
      famousFood: "Peking Duck",
      capitalCity: "Beijing",
  },
  {
      countryName: "Greece",
      population: 10420000,
      flag: "🇬🇷",
      famousFood: "Moussaka",
      capitalCity: "Athens",
  },
  {
      countryName: "Spain",
      population: 47350000,
      flag: "🇪🇸",
      famousFood: "Paella",
      capitalCity: "Madrid",
  },
  {
      countryName: "Germany",
      population: 83100000,
      flag: "🇩🇪",
      famousFood: "Bratwurst",
      capitalCity: "Berlin",
  },
  {
      countryName: "United States",
      population: 331900000,
      flag: "🇺🇸",
      famousFood: "Burger",
      capitalCity: "Washington, D.C.",
  },
  {
      countryName: "South Korea",
      population: 51840000,
      flag: "🇰🇷",
      famousFood: "Kimchi",
      capitalCity: "Seoul",
  },
  {
      countryName: "Egypt",
      population: 104100000,
      flag: "🇪🇬",
      famousFood: "Koshary",
      capitalCity: "Cairo",
  },
  {
      countryName: "Russia",
      population: 145900000,
      flag: "🇷🇺",
      famousFood: "Borscht",
      capitalCity: "Moscow",
  },
  {
      countryName: "Australia",
      population: 25690000,
      flag: "🇦🇺",
      famousFood: "Vegemite",
      capitalCity: "Canberra",
  },
  {
      countryName: "Thailand",
      population: 69790000,
      flag: "🇹🇭",
      famousFood: "Pad Thai",
      capitalCity: "Bangkok",
  },
  {
      countryName: "Argentina",
      population: 45380000,
      flag: "🇦🇷",
      famousFood: "Asado",
      capitalCity: "Buenos Aires",
  },
  {
      countryName: "Canada",
      population: 38000000,
      flag: "🇨🇦",
      famousFood: "Poutine",
      capitalCity: "Ottawa",
  },
  {
      countryName: "South Africa",
      population: 59310000,
      flag: "🇿🇦",
      famousFood: "Biltong",
      capitalCity: "Pretoria",
  }
];

let id = 0;

if (localStorage.countries) {
  countries = JSON.parse(localStorage.countries);
  renderCountries();
}

if (localStorage.id) {
  id = Number(localStorage.id);
}

function idGenerator() {
  id++;
  localStorage.id = id;
  return id;
}

function handleCountries(e) {
  e.preventDefault();
  let formData = new FormData(addCountry);
  let formObj = Object.fromEntries(formData);
  addCountry.reset();

  if (formObj.id !== '') {
    let countriesList = countries.find(x => x.id === Number(formObj.id));
    countriesList.countryName = formObj.countryName;
    countriesList.population = formObj.population;
    countriesList.flag = formObj.flag;
    countriesList.famousFood = formObj.famousFood;
    countriesList.capitalCity = formObj.capitalCity;
  } else {
    formObj.id = idGenerator();
    countries.push(formObj);
  }
  save();
  renderCountries();
}

addCountry.addEventListener('submit', handleCountries);

addNewCountry.addEventListener('click', () => {
  modal.classList.remove('editModal');
  document.querySelector('input[name="id"]').value = "";
  modal.showModal();
});

function save() {
  localStorage.countries = JSON.stringify(countries);
}

function createCountriesHTML(countriesList) {
  return `       
      <div class="country">
        <div class="countryEditControls">
          <a class="countryEditBtn" href="#" data-countriesid="${countriesList.id}">✍️</a>
          <a class="countryDeleteBtn" href="#" data-countriesid="${countriesList.id}">🗑️</a>
        </div>
        <h4>Country Name: ${countriesList.countryName}</h4>
        <p>Population: ${countriesList.population}</p>
        <p>Flag: ${countriesList.flag}</p>
        <p>Famous Food: ${countriesList.famousFood}</p>
        <p>Capital City: ${countriesList.capitalCity}</p>
      </div>
  `;
}

function handleEditBtn(e) {
  e.preventDefault();

  modal.classList.add('editModal');

  let countriesId = Number(this.dataset.countriesid);
  let countriesList = countries.find(x => x.id === countriesId);
  document.querySelector('input[name="id"]').value = countries.id;
  document.querySelector('input[name="countryName"]').value = countries.countryName;
  document.querySelector('input[name="population"]').value = countries.population;
  document.querySelector('input[name="flag"]').value = countries.flag;
  document.querySelector('input[name="famousFood"]').value = countries.famousFood;
  document.querySelector('input[name="capitalCity"]').value = countries.capitalCity;
  modal.showModal();
}

function handleDeleteBtn(e) {
  e.preventDefault();

  if (!confirm('Emin Misiniz?')) {
    return;
  }

  let countriesId = Number(this.dataset.countriesid);
  countries = countries.filter(x => x.id !== countriesId);
  save();
  renderCountries();
}

function renderCountries() {
  countriesContainer.innerHTML = countries.map(x => createCountriesHTML(x)).join('');
  document.querySelectorAll('.countryEditBtn').forEach(x => x.addEventListener('click', handleEditBtn));
  document.querySelectorAll('.countryDeleteBtn').forEach(x => x.addEventListener('click', handleDeleteBtn));
}

