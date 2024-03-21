const apiFull =
	"https://api.openweathermap.org/data/2.5/weather?q=paris&appid=d0ce5e34dce3967a489d4377d7c9618d&units=metric";

const cityName = "bayonne";
const apiKey = "d0ce5e34dce3967a489d4377d7c9618d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
	const response = await fetch(apiUrl + `&appid=${apiKey}` + `&q=${city}`);

	// checking for correct city name
	if (response.status === 404) {
		document.querySelector(".error").style.display = "block";
		document.querySelector(".weather").style.display = "none";
	} else {
		const data = await response.json();
		console.log(data);
		console.log(data.sys.country);

		// removing unnecessary 'Arrondissement' from city name if present
		document.querySelector(".city").innerText = data.name.includes(
			"Arrondissement de "
		)
			? data.name.replace("Arrondissement de ", "")
			: data.name;

		document.querySelector(".temp").innerText =
			Math.round(data.main.temp) + "°c";
		document.querySelector(".humidity").innerText = data.main.humidity + "%";
		document.querySelector(".wind").innerText =
			data.wind.speed.toFixed(1) + " km/h";

		//  get weather icons from website
		// console.log(data.weather[0].main);
		// console.log(data.weather[0].description);
		// console.log(data.weather[0].icon);
		const iconCode = data.weather[0].icon;
		const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
		weatherIcon.src = iconUrl;

		// get weather icons from local files
		// if (data.weather[0].main === "Clouds") {
		// 	weatherIcon.src = "./graphics/img/clouds.png";
		// } else if (data.weather[0].main === "Clear") {
		// 	weatherIcon.src = "./graphics/img/clear.png";
		// } else if (data.weather[0].main === "Rain") {
		// 	weatherIcon.src = "./graphics/img/rain.png";
		// } else if (data.weather[0].main === "Drizzle") {
		// 	weatherIcon.src = "./graphics/img/drizzle.png";
		// } else if (data.weather[0].main === "Mist") {
		// 	weatherIcon.src = "./graphics/img/mist.png";
		// } else if (data.weather[0].main === "Snow") {
		// 	weatherIcon.src = "./graphics/img/snow.png";
		// } else {
		// 	weatherIcon.src = "./graphics/img/mist.png";
		// }

		document.querySelector(".weather").style.display = "block";
		document.querySelector(".error").style.display = "none";
	}
}

searchBtn.addEventListener("click", () => {
	let city = searchBox.value;
	// let city = searchBox.value.replace(/\s+/g, "_"); // Replace spaces with underscores
	city = city.replace(/ /g, "+"); // Replace spaces with dashes, but keep existing dashes
	// Ensure the city name is in the correct format for the API request
	checkWeather(city);
});

checkWeather(cityName);

// try catch example
// async function getWeatherData(city) {
// 	const apiKey = "your_api_key_here";
// 	const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

// 	try {
// 			const response = await fetch(apiUrl);
// 			const data = await response.json();
// 			const iconCode = data.weather[0].icon;
// 			const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

// 			// Assuming you have an img element with id="weatherIcon"
// 			document.getElementById("weatherIcon").src = iconUrl;
// 	} catch (error) {
// 			console.error("Error fetching weather data:", error);
// 	}
// }

// // Example usage
// getWeatherData("London");
