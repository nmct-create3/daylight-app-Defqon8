// _ = helper functions
let _calculateTimeDistance = (startTime, endTime) => {
	// Bereken hoeveel tijd er tussen deze twee periodes is.
	// Tip: werk met minuten.
}

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
	// Bepaal het aantal minuten dat de zon al op is.

	// Nu zetten we de zon op de initiële goede positie ( met de functie updateSun ). Bereken hiervoor hoeveel procent er van de totale zon-tijd al voorbij is.
	// We voegen ook de 'is-loaded' class toe aan de body-tag.
	// Vergeet niet om het resterende aantal minuten in te vullen.


	// Nu maken we een functie die de zon elke minuut zal updaten
	// Bekijk of de zon niet nog onder of reeds onder is

	// Anders kunnen we huidige waarden evalueren en de zon updaten via de updateSun functie.
	// PS.: vergeet weer niet om het resterend aantal minuten te updaten en verhoog het aantal verstreken minuten.
}

// 3 Met de data van de API kunnen we de app opvullen
let showResult = ( queryResponse ) => {
	// We gaan eerst een paar onderdelen opvullen
	// Zorg dat de juiste locatie weergegeven wordt, volgens wat je uit de API terug krijgt.
	// Toon ook de juiste tijd voor de opkomst van de zon en de zonsondergang.


	// Hier gaan we een functie oproepen die de zon een bepaalde postie kan geven en dit kan updaten.
	// Geef deze functie de periode tussen sunrise en sunset mee en het tijdstip van sunrise.
};

// 2 Aan de hand van een longitude en latitude gaan we de yahoo wheater API ophalen.
let getAPI = ( lat, lon ) => {
	// Eerst bouwen we onze url op
	// en doen we een query met de Yahoo query language

	// Met de fetch API proberen we de data op te halen.
	// Als dat gelukt is, gaan we naar onze showResult functie.

	let username = message.content
        let osuToken = "4313a5fd8e7ea2cd59aa97eb91a2617e0f28816a"
        function xmlToJson(xmlResponse){
            let x2js = new X2JS();
            return x2js.xml_str2json(xmlResponse);
        }
        function getParkingSpots(endpoint){

            let xhttp = new XMLHttpRequest();
            xhttp.addEventListener('error', function(){
                console.error(error)
            });
            xhttp.addEventListener('readystatechange', function() {
            if (this.readyState == 4 && this.status == 200) {
                let  = this.responseText;
                let json = xmlToJson(xml);
                console.log(json);
                generateMessage(json);
            }
        });
            xhttp.open('GET', 'https://data.kortrijk.be/parko/shopandgo.xml', true);
            xhttp.send();
        }
        function generateMessage(json){
            const colors = {
                'Free': 'green',
                'Occupied': 'red',
                'Unknown': 'orange'
            }
            for (let i = 0; i < `${json.Sensoren.Sensor.length}`; i++) {
                let state = `${json.Sensoren.Sensor[i]._State}`
                let lati = `${json.Sensoren.Sensor[i]._Lat}`.replace(',', '.');
                let long = `${json.Sensoren.Sensor[i]._Long}`.replace(',', '.');
                let myLatLng = {lat: parseFloat(lati)  , lng: parseFloat(long) };
                markers[i] = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                    state: state,
                    icon: "http://maps.google.com/mapfiles/ms/micons/" + colors[state] + "-dot.png"
                });
            }
        }
}

document.addEventListener( 'DOMContentLoaded', function () {
	// 1 We will query the API with longitude and latitude.
	getAPI( 50.8027841, 3.2097454 );
});
