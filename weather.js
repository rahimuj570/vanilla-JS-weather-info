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
  console.log(data);
};

// ======= Search Handler ======
getElem("search-btn").addEventListener("click", searchBtnAction);

// ======= Search Handler By ENTER======
getElem("search-input").addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    searchBtnAction();
  }
});
