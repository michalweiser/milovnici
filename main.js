(async function(L) {

    const DEBUG = true;

    const PLACE_ZOOM_LEVEL = 12;
    const INITIAL_ZOOM_LEVEL = 8;
    const LOCAL_TOKEN = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
    const HEROKU_TOKEN = 'pk.eyJ1IjoibWlsb3ZuaWNpLXNrIiwiYSI6ImNqdTVsenB4aDE2NGwzeW5yaXdsNTRmcTgifQ.O9_dp1XXSmdHuUOTMLMUEQ';
    const MAPBOX_TOKEN = (location.origin === 'file://') ? LOCAL_TOKEN : HEROKU_TOKEN;
    const TERRAIN_TILES_URL = 'https://api.mapbox.com/styles/v1/milovnici-sk/cju5pct5b0yj31fo3qmkh6f6x/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWlsb3ZuaWNpLXNrIiwiYSI6ImNqdTVseGdvODBsb200ZW81Ym56anRwYzcifQ.YzSDUOwEaw9pCAZyXcbmvw';
    const BLACK_TILES_URL = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + MAPBOX_TOKEN;
    const MAP_BOUNDS = [
        [50.826427, 14.690681],
        [46.615731, 24.884142]
    ];
    const COUNTRY_ZOOM_BOUNDS = [
        [49.683271, 16.693153],
        [47.609430, 22.819023]
    ];
    const COUNTRY_CENTER = [48.791220, 19.679318];
    const ZOOM_SNAP = 0.2;

    const map = L.map('map', {
        center: COUNTRY_CENTER,
        zoom: INITIAL_ZOOM_LEVEL,
        zoomSnap: ZOOM_SNAP,
        zoomControl: false,
        fadeAnimation: true,
        zoomAnimation: true,
        maxBounds: MAP_BOUNDS,
        maxZoom: PLACE_ZOOM_LEVEL,
        minZoom: INITIAL_ZOOM_LEVEL
    });

    map.fitBounds(L.latLngBounds(COUNTRY_ZOOM_BOUNDS[0], COUNTRY_ZOOM_BOUNDS[1]));

    L.tileLayer(TERRAIN_TILES_URL, {
        maxZoom: 18,
        id: 'mapbox.dark'
    }).addTo(map);

    const region_postproc = {
        style: function (feature) {
            return { color: feature.properties.fill };
        }
    };

    const data = await fetch('data/state.json').then(res => res.json());

    if (DEBUG) {
        window.data = data;
        window.lmap = map;
    }

    const loadGeoJsonLayer = async function(L, item, postprocess) {
        item.geoJSON = await fetch(item.fetchURL).then(res => res.json());
        item.layer = (postprocess) ? await L.geoJSON(item.geoJSON, postprocess) : await L.geoJSON(item.geoJSON);
    }

    const loadRegionLayers = async function(L, region) {
        await loadGeoJsonLayer(L, region.border, region_postproc);
        await loadGeoJsonLayer(L, region.places);
    }

    const loadCountryLayers = async function(L, country) {
        await loadGeoJsonLayer(L, country.border);
        await loadGeoJsonLayer(L, country.extrenal_borders);
    }

    const country_load = loadCountryLayers(L, data.country);
    const regions_load = data.regions.map(region => loadRegionLayers(L, region));

    const initialLoads = [
        country_load,
        ...regions_load
    ];

    await Promise.all(initialLoads);

    const onRegionSelected = function(e, previous_region, next_region) {
        if (previous_region) {
            previous_region.places.layer.remove();
        }

        next_region.places.layer.addTo(map);
    }

    const selectCurrentRegion = function(e, next_region) {
        const previous_region = data.current.region;

        const fit = map.fitBounds(next_region.border.layer.getBounds());
        fit.on('moveend', (e) => onRegionSelected(e, previous_region, next_region));

        data.current.region = next_region;
    }

    data.country.extrenal_borders.layer.addTo(map);
    data.country.border.layer.addTo(map);
    data.regions.forEach(region => {
        region.border.layer.addTo(map);
        region.border.layer.on('click', (e) => selectCurrentRegion(e, region));
    });

})(L);