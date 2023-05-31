const input = document.querySelector("input");
const button = document.querySelector("button");
const img = document.querySelector("img");

const city = document.querySelector("#city");
const degree = document.querySelector("#degree");

const content = document.querySelector(".content");

button.addEventListener("click", () => {
  if (!input.value) return;
  getWeatherData();
});

async function getWeatherData() {
  let urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
    input.value
  )}&units=metric&appid=c8e5ea8fb31f46eda1c4d4f197cfecbc`;
  try {
    await fetch(urlApi)
      .then((res) => res.json())
      .then((data) => {
        if (data?.cod && data.cod === "404") {
          return alert("Cidade não encontrada");
        }
        loadWeatherInfo(data);
      });
  } catch (error) {
    alert(error);
  }
}

function loadWeatherInfo(data) {
  city.innerHTML = `${data.name}, ${data.sys.country}`;
  degree.innerHTML = `Temperatura: ${Math.floor(data.main.temp)}ºC`;
  img.src = `http://openweathermap.org/img/wn/${
    data.weather[0].icon
  }@2x.png`;
  content.style.display = "flex";
}