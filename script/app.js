// _ = helper functions

let _calculateTimeDistance = (startTime, endTime) => {
    // Bereken hoeveel tijd er tussen deze twee periodes is.
    // Tip: werk met minuten.
    let Starttimes= startTime.split(':');
    let Startminutes= parseInt(Starttimes[0])*60+parseInt(Starttimes[1]);
    let EndTimes= endTime.split(':');
    let EndMinutes= parseInt(EndTimes[0])*60+parseInt(EndTimes[1]);
	let totalMinutes = EndMinutes-Startminutes;
	return totalMinutes
	//console.log(totalMinutes);
};

// Deze functie kan een am/pm tijd omzetten naar een 24u tijdsnotatie, deze krijg je dus al. Alsjeblieft, veel plezier ermee.
let _convertTime = (t) => {
	/* Convert 12 ( am / pm ) naar 24HR */
	let time = new Date('0001-01-01 ' + t);
	let formatted = time.getHours() + ':' + ('0' + time.getMinutes()).slice(-2);
	return formatted;
}

// 5 TODO: maak updateSun functie

// 4 Zet de zon op de juiste plaats en zorg ervoor dat dit iedere minuut gebeurt.
let placeSunAndStartMoving = ( totalMinutes, sunrise ) => {
	// In de functie moeten we eerst wat zaken ophalen en berekenen.

	// Haal het DOM element van onze zon op en van onze aantal minuten resterend deze dag.
	let sun = document.getElementsByClassName('js-sun');
	sun.setAttribute('data-time', totalMinutes);
	sun.style.left = totalMinutes+"px"
	sun.style.bottom = totalMinutes+"px"
	// Bepaal het aantal minuten dat de zon al op is.

	// Nu zetten we de zon op de initiële goede positie ( met de functie updateSun ). Bereken hiervoor hoeveel procent er van de totale zon-tijd al voorbij is.

	function updateSun(){
		let passedTime = totalMinutes - _convertTime(sunrise)/100*totalMinutes
		// We voegen ook de 'is-loaded' class toe aan de body-tag.
		let body = document.getElementById("body");
		body.classList.add("is-loaded");

		// Vergeet niet om het resterende aantal minuten in te vullen.
	}

	// Nu maken we een functie die de zon elke minuut zal updaten
	setInterval(function sunIsUp() {
		// Bekijk of de zon niet nog onder of reeds onder is
		if(sun.getAttribute("date-time") == totalMinutes){
			//zon is op
			sun.setAttribute('data-time', passedTime+"%")
			sun.style.left = passedTime+"%"
			sun.style.bottom = passedTime+"%"
		}
		else{
			//zon is dood
			sun.value = "0"
			sun.style.left = "0"
			sun.style.bottom = "0"
		}
	}, 60 * 1000); // 60 * 1000 milisec


	// Anders kunnen we huidige waarden evalueren en de zon updaten via de updateSun functie.
	// PS.: vergeet weer niet om het resterend aantal minuten te updaten en verhoog het aantal verstreken minuten.
	updateSun();
	sunIsUp();
}

// 3 Met de data van de API kunnen we de app opvullen
let showResult = ( jsonResponse ) => {
	// We gaan eerst een paar onderdelen opvullen
	// Zorg dat de juiste locatie weergegeven wordt, volgens wat je uit de API terug krijgt.
	let location = jsonResponse.query.results.channel.location.city + ", " + jsonResponse.query.results.channel.location.country ;

	// Toon ook de juiste tijd voor de opkomst van de zon en de zonsondergang.
	let sunrise = jsonResponse.query.results.channel.astronomy.sunrise;
	let sunset = jsonResponse.query.results.channel.astronomy.sunset;


	// Hier gaan we een functie oproepen die de zon een bepaalde postie kan geven en dit kan updaten.
	// Geef deze functie de periode tussen sunrise en sunset mee en het tijdstip van sunrise.
	//console.log(sunrise, sunset);
	document.getElementById("sunrise").innerHTML = _convertTime(sunrise);
	document.getElementById('sunset').innerHTML = _convertTime(sunset);
	document.getElementById('location').innerHTML = location;

	let currentTime = new Date();
	let hours = currentTime.getHours()
	let minutes = currentTime.getMinutes()
	let timenow = hours + ":" + minutes
	document.getElementById('minutesleft').innerHTML = _calculateTimeDistance(  _convertTime(timenow), _convertTime(sunset) )
};

// 2 Aan de hand van een longitude en latitude gaan we de yahoo wheater API ophalen.
let getAPI = ( lat, lon ) => {
// function getAPI(){
	// Eerst bouwen we onze url op
	const endpoint = 'https://query.yahooapis.com/v1/public/yql?q=';
	// en doen we een query met de Yahoo query language
	let query = `select astronomy, location from weather.forecast where woeid in (select woeid from geo.places(1) where text="(${lat}, ${lon})")`;
	// Met de fetch API proberen we de data op te halen.
	fetch( `${endpoint}${query}&format=json` )
	.then(function(response){
		return response.json();
	})
	.then(function(jsonResponse){
		console.log(jsonResponse.query.results.channel);
		showResult(jsonResponse);
	})
	.catch(function(error){
		console.error("Error = ", error);
	});

	// Als dat gelukt is, gaan we naar onze showResult functie.


}

document.addEventListener( 'DOMContentLoaded', function () {
	// 1 We will query the API with longitude and latitude.
	console.log("loaded");
	getAPI( 50.8027841, 3.2097454 );
	showResult();
	placeSunAndStartMoving();
});
