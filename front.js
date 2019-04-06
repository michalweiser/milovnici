PLACE_ZOOM_LEVEL = 12;
INITIAL_ZOOM_LEVEL = 8;

var LOCAL_TOKEN = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
var HEROKU_TOKEN = 'pk.eyJ1IjoibWlsb3ZuaWNpLXNrIiwiYSI6ImNqdTVsenB4aDE2NGwzeW5yaXdsNTRmcTgifQ.O9_dp1XXSmdHuUOTMLMUEQ';

var MAPBOX_TOKEN = (location.origin === 'file://') ? LOCAL_TOKEN : HEROKU_TOKEN;

var MAP_BOUNDS = [
        [50.826427, 14.690681],//left top
        [46.615731, 24.884142]//bottomright
];

var zoom = [
        [49.683271, 16.693153],
        [47.579115, 22.561529]
]

var map = L.map('map', {
        center: [48.791220, 19.679318],
        zoom: INITIAL_ZOOM_LEVEL,
        zoomSnap: 0.25,
        zoomControl:false,
        fadeAnimation: true,
        zoomAnimation: true,
        maxBounds: MAP_BOUNDS,
        maxZoom: PLACE_ZOOM_LEVEL,
        minZoom: INITIAL_ZOOM_LEVEL
});

map.fitBounds(L.latLngBounds(zoom[0], zoom[1]));

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + MAPBOX_TOKEN, {
        maxZoom: 18,
        // attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap<\/a> contributors, ' +
        //         '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA<\/a>, ' +
        //         'Imagery © <a href="https://www.mapbox.com/">Mapbox<\/a>',
        id: 'mapbox.dark'
}).addTo(map);

function onEachFeature(feature, layer) {
        var popupContent = "";
        console.log(feature)
        if (feature.geometry.type === "Point") {
                popupContent = "<p>" + feature.properties.Name + "</p><button onclick='map.flyTo(L.latLng(" + feature.geometry.coordinates[1] + "," + feature.geometry.coordinates[0] + ")," + PLACE_ZOOM_LEVEL + ")'>center " + JSON.stringify(feature.geometry.coordinates) + "</button>";
                layer.bindPopup(popupContent);
        } else if (feature.geometry.type === "Polygon") {
                var polyline = L.polyline(feature.geometry.coordinates);
                var bounds = polyline.getBounds();
                var button = document.createElement("BUTTON");
                button.innerHTML = "click me"
                button.onclick = function () {
                        map.flyToBounds(bounds);
                }
                layer.bindPopup(button);
        } else {
                popupContent = "<p>" + feature.properties.Name + "</p>";
                layer.bindPopup(popupContent);
        }

        if (feature.properties && feature.properties.popupContent) {
                popupContent += feature.properties.popupContent;
        }

        //layer.bindPopup(popupContent);
}

var group = L.geoJSON([slovakia, kysuce, medzi_malymi_karpatami_a_vahom, myjavska_oblast, podunajsko, ponitrie, tekov, trencianske_povazie, turec, tekov], {

        style: function (feature) {
                return feature.properties && feature.properties.style;
        },

        onEachFeature: onEachFeature,

        pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, {
                        radius: 4,
                        fillColor: "#ff7800",
                        color: "#000",
                        weight: 1,
                        opacity: 1,
                        fillOpacity: 0.4
                });
        }
}).addTo(map);

//var bounds = L.latLngBounds(slovakia);
console.log(group.getBounds())
map.setView(group.getBounds().getCenter());