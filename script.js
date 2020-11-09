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
    //initialise map on webpage
    const map = new google.maps.Map(document.querySelector('#map'), {
        zoom: 4
    });
    console.log(map);
    console.log(data[0].lat);
    //loop to iterate through obtained data
    // for (const items in data) {
    //     let location = [data[items].lat, data[items].lng];
    //     let name = data[items].name;
    //     let marker = new google.maps.Marker({
    //         position: location,
    //         name: name,
    //         map: map
    //     });
    // }
    
    const marker2 = new google.maps.Marker({

    });
}