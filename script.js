//function to fetch data from repository
async function initMap() {
    let mapData = {};
    //fetch data through a CORS proxy since apparently the json url is controlled by the Access-Control-Allow-Origin property
    const response = await fetch('https://cors-anywhere.herokuapp.com/'+'http://jacek.soc.port.ac.uk/tmp/coords.json', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/JSON'
        }
    });
    if (response.ok) {
        mapData = await response.json();
        showMap(mapData);
    } else {
        const error = document.querySelector('h3');
        error.textContent = 'Error in fetching map data';
        return;
    }
}


//function to initialise map on form adapted from https://developers.google.com/maps/documentation/javascript/adding-a-google-map#maps_add_map-javascript
function showMap(data) {
    //maths to find the midpoint between the two given coordinates
    //adapted from and found at http://jsfiddle.net/kevinrignault/gzq64p56/
    const dLng = (data[1].lon - data[0].lon) *Math.PI/180;

    let lat1 = data[0].lat *Math.PI/180;
    let lat2 = data[1].lat *Math.PI/180;
    let lng1 = data[0].lon *Math.PI/180;

    let bX = Math.cos(lat2) * Math.cos(dLng);
    let bY = Math.cos(lat2) * Math.sin(dLng);
    let lat3 = Math.atan2(Math.sin(lat1) + Math.sin(lat2), Math.sqrt((Math.cos(lat1) + bX) * (Math.cos(lat1) + bX) + bY * bY));
    let lng3 = lng1 + Math.atan2(bY, Math.cos(lat1) + bX);

    //initialise map on webpage
    let location = new google.maps.LatLng(data[0].lat, data[0].lon);
    let map = new google.maps.Map(document.getElementById('map'), {
        center: location,
        zoom: 14
    });
    
    //loop to iterate through obtained data and place the markers on the map
    for (const items in data) {
        let location = new google.maps.LatLng(data[items].lat, data[items].lon);
        let marker = new google.maps.Marker({
            position: location,
            map: map
        });
    }
}