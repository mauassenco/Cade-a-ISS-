const mymap = L.map('leafletMap').setView([0,0], 1);
const attribution = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

const issMarker = L.icon({
    iconUrl: 'ISS_01b.png',
    iconSize: [50, 32],
    iconAnchor: [25, 26],
});
const marker =  L.marker([0, 0], {icon: issMarker}).addTo(mymap);

const apiUrl = 'https://api.wheretheiss.at/v1/satellites/25544';

let firstRender = true;
async function getISS(){
    const response = await fetch(apiUrl);
    const data = await response.json();
    const { latitude, longitude } = data;

    marker.setLatLng([latitude, longitude]);
    if(firstRender){
        mymap.setView([latitude, longitude], 3);
        firstRender = false;
    }
    
    document.getElementById('latitude').textContent = latitude.toFixed(2);
    document.getElementById('longitude').textContent = longitude.toFixed(2);
}
getISS();
setInterval(getISS, 1000);
