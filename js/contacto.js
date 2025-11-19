/*let map = L.map('map').setView([40.4506, -3.698603], 16);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Mi OpenStreetMap'
}).addTo(map);

let greenIcon = L.icon({
    iconUrl: '../imagenes/leaf-green.png',
    shadowUrl: '../imagenes/leaf-shadow.png',
    iconSize: [38, 95],
    shadowSize: [50, 64],
    iconAnchor: [22, 95],
    shadowAnchor: [4, 62],
    popupAnchor: [-3, -76]
});

let popup = L.popup().setLatLng([40.4506, -3.698603]).setContent('<a href="http://www.google.es">Popup</a>');

let marker = L.marker([40.4506, -3.698603], { icon: greenIcon })
    .bindPopup('<a href="http://www.google.es">Estoy aquí</a>')
    .openPopup()
    .addTo(map);
    */
let options = {
    enableHighAccurency: true,
    timeout: 5000,
    maximunAge: 0
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error, options)
}else{
    alert('los servicios de geoloacalizacion no estan disponibles')
}


function success(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let map = L.map('map', {
        center: [latitude, longitude],
        zoom: 14
    })

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Mi OpenStreetMap'
    }).addTo(map);

    let control = L.Routing.control({
        waypoints: [
            L.latLng(latitude, longitude), //inicio
            L.latLng(40.452363, -3.699824) //final (destino)
        ],
        language: 'es'
    }).addTo(map)


}

function error() {

}