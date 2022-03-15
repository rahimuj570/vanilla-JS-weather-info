const API_Key = "616b8c33560dedc066c91582334a30c2";
// ====== Get HTML Element ======
const getElem = (idClass) => document.getElementById(idClass);

// ======== Fetch City ======
const fetchCity = (search) => {
  getElem("default").style.display = "none";
  getElem("loader").style.display = "inline-block";
  getElem("loader2").style.display = "inline-block";
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${search}&appid=${API_Key}&units=metric`;
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

  //   ----- Details Section ----
  const moreDetailsContainer = getElem("moreDetails");
  moreDetailsContainer?.childNodes[3]?.remove();
  const moreDetails = document.createElement("tbody");
  moreDetails.innerHTML = `
  <tr>
  <th scope="row">01</th>
  <td class="table-active text-start" colspan="2">
    Temperature:
  </td>
  <td>${main.temp}℃</td>
</tr>
  <tr>
  <th scope="row">02</th>
  <td class="table-active text-start" colspan="2">
    Feels:
  </td>
  <td>${main.feels_like}℃</td>
</tr>
  <tr>
  <th scope="row">03</th>
  <td class="table-active text-start" colspan="2">
    Minimum Temperature:
  </td>
  <td>${main.temp_min}℃</td>
</tr>
  <tr>
  <th scope="row">04</th>
  <td class="table-active text-start" colspan="2">
    Maximum Temperature:
  </td>
  <td>${main.temp_max}℃</td>
</tr>
  <tr>
  <th scope="row">05</th>
  <td class="table-active text-start" colspan="2">
    Pressure:
  </td>
  <td>${main.pressure}mbar</td>
</tr>
  <tr>
  <th scope="row">06</th>
  <td class="table-active text-start" colspan="2">
    Humidity:
  </td>
  <td>${main.humidity}%</td>
</tr>
  <tr>
  <th scope="row">07</th>
  <td class="table-active text-start" colspan="2">
    Visibility:
  </td>
  <td>${visibility}m</td>
</tr>
  <tr>
  <th scope="row">08</th>
  <td class="table-active text-start" colspan="2">
    Sunrise:
  </td>
  <td>${new Date(sys.sunrise * 1000)}</td>
</tr>
  <tr>
  <th scope="row">09</th>
  <td class="table-active text-start" colspan="2">
    Sunset:
  </td>
  <td>${new Date(sys.sunset * 1000)}</td>
</tr>
  <tr>
  <th scope="row">10</th>
  <td class="table-active text-start" colspan="2">
    Wind Speed:
  </td>
  <td>${wind.speed}km/h</td>
</tr>
  <tr>
  <th scope="row">11</th>
  <td class="table-active text-start" colspan="2">
    Wind Direction:
  </td>
  <td>${wind.deg}degree</td>
</tr>
`;
  moreDetailsContainer.appendChild(moreDetails);
  getElem("loader2").style.display = "none";
  getElem("loader").style.display = "none";
};

// ======= Search Handler ======
getElem("search-btn").addEventListener("click", searchBtnAction);

// ======= Search Handler By ENTER======
getElem("search-input").addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    getElem("search-input").blur();
    searchBtnAction();
  }
});
