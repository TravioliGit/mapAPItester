// function to fetch data from repository
async function initMap() {
  let mapData = {};
  // fetch data through a CORS proxy since apparently the json url is controlled by the Access-Control-Allow-Origin property
  const response = await fetch('https://cors-anywhere.herokuapp.com/' + 'http://jacek.soc.port.ac.uk/tmp/coords.json', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/JSON',
    },
  });
  if (response.ok) {
    mapData = await response.json();
    showMap(mapData);
  } else {
    const error = document.querySelector('h3');
    error.textContent = 'Error in fetching map data';
  }
}
// function to initialise map on form adapted from https://developers.google.com/maps/documentation/javascript/adding-a-google-map#maps_add_map-javascript
function showMap(data) {
  // maths to find the midpoint between the two given coordinates
  // adapted from and found at http://jsfiddle.net/kevinrignault/gzq64p56/
  // convert necessary figures to radians
  const lonDifference = (data[1].lon - data[0].lon) * Math.PI / 180;
  const lat1 = data[0].lat * Math.PI / 180;
  const lat2 = data[1].lat * Math.PI / 180;
  const lon1 = data[0].lon * Math.PI / 180;

  // midpoint calculation
  const diffLine1 = Math.cos(lat2) * Math.cos(lonDifference);
  const diffLine2 = Math.cos(lat2) * Math.sin(lonDifference);
  let latMidpoint = Math.atan2(Math.sin(lat1) + Math.sin(lat2), Math.sqrt((Math.cos(lat1) + diffLine1) * (Math.cos(lat1) + diffLine1) + diffLine2 * diffLine2));
  let lonMidpoint = lon1 + Math.atan2(diffLine2, Math.cos(lat1) + diffLine1);

  // reconversion to degrees
  latMidpoint = latMidpoint * 180 / Math.PI;
  lonMidpoint = lonMidpoint * 180 / Math.PI;

  // initialise map on webpage
  const location = new google.maps.LatLng(latMidpoint, lonMidpoint);
  const map = new google.maps.Map(document.getElementById('map'), {
    center: location,
    zoom: 14,
  });

  // loop to iterate through obtained data and place the markers on the map
  for (const items in data) {
    const location = new google.maps.LatLng(data[items].lat, data[items].lon);
    const marker = new google.maps.Marker({
      position: location,
      map: map,
    });
  }
}
