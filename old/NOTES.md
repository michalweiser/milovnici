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



// var group = L.geoJSON([slovakia, kysuce, medzi_malymi_karpatami_a_vahom, myjavska_oblast, podunajsko, ponitrie, tekov, trencianske_povazie, turec, tekov], {

//     style: function (feature) {
//         return feature.properties && feature.properties.style;
//     },

//     onEachFeature: onEachFeature,

//     pointToLayer: function (feature, latlng) {
//         return L.circleMarker(latlng, {
//             radius: 4,
//             fillColor: "#ff7800",
//             color: "#000",
//             weight: 1,
//             opacity: 1,
//             fillOpacity: 0.4
//         });
//     }
// }).addTo(map);

// var runLayer = omnivore.kml('/mapbox.js/assets/data/line.kml')
//     .on('ready', function() {
//         map.fitBounds(runLayer.getBounds());
//     })
//     .addTo(map);

//var mapa2 = omnivore.kml('data/kml/mapa2.kml').addTo(map);
//var mapa3 = omnivore.kml('data/kml/mapa3.kml').addTo(map);

//var bounds = L.latLngBounds(slovakia);
// console.log(group.getBounds())
// map.setView(group.getBounds().getCenter());