var map = L.map('map').setView([48.791220, 19.679318], 8);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        // attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap<\/a> contributors, ' +
        //         '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA<\/a>, ' +
        //         'Imagery © <a href="https://www.mapbox.com/">Mapbox<\/a>',
        id: 'mapbox.light'
}).addTo(map);

function onEachFeature(feature, layer) {
        var popupContent = "<p>I started out as a GeoJSON " +
                        feature.geometry.type + ", but now I'm a Leaflet vector!<\/p>";

        if (feature.properties && feature.properties.popupContent) {
                popupContent += feature.properties.popupContent;
        }

        layer.bindPopup(popupContent);
}

var group = L.geoJSON([slovakia, kysuce, medzi_malymi_karpatami_a_vahom, myjavska_oblast, podunajsko, ponitrie, tekov, trencianske_povazie, turec, tekov], {

        style: function (feature) {
                return feature.properties && feature.properties.style;
        },

        onEachFeature: onEachFeature,

        pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, {
                        radius: 8,
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