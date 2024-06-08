// code for showing map on the show.ejs

mapboxgl.accessToken =mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: coordinates, // starting position [lng, lat]
    zoom: 7 // starting zoom
});


const marker=new mapboxgl.Marker({color:"red"})
    .setLngLat(coordinates)
    .addTo(map);
