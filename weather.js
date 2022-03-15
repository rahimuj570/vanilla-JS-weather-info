const API_Key = "616b8c33560dedc066c91582334a30c2";
// ====== Get HTML Element ======
const getElem = (idClass) => document.getElementById(idClass);

// ======== Fetch City ======
const fetchCity = (search) => {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${search}&appid=${API_Key}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => fetchData(data))
    .catch((err) => alert("Something Went Wrong. Please Search A Valid Input"));
};

// ===== Fetch DATA ======
const fetchData = (data) => {
  const lat = data[0].lat;
  const lon = data[0].lon;
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_Key}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => searchUiAction(data));
};

// ====== Search Button Action =======
const searchBtnAction = () => {
  const inputVal = getElem("search-input").value;
  fetchCity(inputVal);
};

// ====== Search UI Action ======
const searchUiAction = (data) => {
  const { weather, main, visibility, wind, clouds, sys, name, timezone } = data;
  const mainCardContainer = getElem("main-card");
  mainCardContainer?.childNodes[3]?.remove();
  const mainCard = document.createElement("div");
  mainCard.classList.add("mx-auto");
  mainCard.classList.add("card");
  mainCard.setAttribute("style", "width:18rem");
  mainCard.innerHTML = `<div class="bg-light">
  <img
    src="http://openweathermap.org/img/w/${weather[0].icon}.png"
    class="card-img-top w-25 mx-auto"
    alt="..."
  />
</div>
<div class="card-body">
  <h4 class="fw-bold">${name}</h4>
  <p class="text-capitalize card-text">
  ${weather[0].description}
  </p>
</div>`;
  mainCardContainer.appendChild(mainCard);
};

// ======= Search Handler ======
getElem("search-btn").addEventListener("click", searchBtnAction);

// ======= Search Handler By ENTER======
getElem("search-input").addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    searchBtnAction();
  }
});
