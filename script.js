// votre code JS
var mymap = L.map('mapid').setView([48.8534, 2.3488], 12);
var layerGroup = L.layerGroup().addTo(mymap);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoianVsaWVua29tcCIsImEiOiJjanR1NGFuYjkxMmNvNDBucGI1aXZ4Y285In0.hiSplFD5CODUd9yxRO_qkg'
}).addTo(mymap);



async function getData(query) {
	let url = "https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&q=date_start+%3E%3D+%23now()+AND+date_start+%3C+%23now(months%3D1) " + query + "&rows=150&facet=category&facet=tags&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=access_type&facet=price_type"
	let response = await fetch(url)
    
  let data = await response.json()

  layerGroup.clearLayers();

  data.records.forEach(function(event) {

        if (!event.fields.lat_lon) {
        return;
        }       
    
        // le titre de l'événement
        let title = event.fields.title

		// la latitude
		let latitude = event.fields.lat_lon[0]

		// la longitude
	    let longitude = event.fields.lat_lon[1]
		// on pourrait récupérer d'autres infos..

		// pour tester, on les affiche dans la console
        console.log(title + " " + latitude + " " + longitude)
        
        var marker = L.marker([latitude, longitude]).addTo(layerGroup);

        marker.bindPopup("<strong>" + event.fields.title + "</strong>" + "<br><div class='description'>" + event.fields.address_street + "</div>");

		// .. mais ce serait mieux de les afficher sur la carte !
    })
}

getData()
let inputUser = searchInput.value

function onFormSubmit(event) {
    event.preventDefault();
    console.log("Le formulaire a bien été envoyé");
    console.log(searchInput.value);

    getData(inputUser);
}