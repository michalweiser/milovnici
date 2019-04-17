export const DEBUG = true;

export const PLACE_ZOOM_LEVEL = 12;
export const INITIAL_ZOOM_LEVEL = 8;
export const LOCAL_TOKEN = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
export const HEROKU_TOKEN = 'pk.eyJ1IjoibWlsb3ZuaWNpLXNrIiwiYSI6ImNqdTVsenB4aDE2NGwzeW5yaXdsNTRmcTgifQ.O9_dp1XXSmdHuUOTMLMUEQ';
export const MAPBOX_TOKEN = (location.origin === 'file://') ? LOCAL_TOKEN : HEROKU_TOKEN;
export const TERRAIN_TILES_URL = 'https://api.mapbox.com/styles/v1/milovnici-sk/cju5pct5b0yj31fo3qmkh6f6x/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWlsb3ZuaWNpLXNrIiwiYSI6ImNqdTVseGdvODBsb200ZW81Ym56anRwYzcifQ.YzSDUOwEaw9pCAZyXcbmvw';
export const BLACK_TILES_URL = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + MAPBOX_TOKEN;
export const MAP_BOUNDS = [
    [50.826427, 14.690681],
    [46.615731, 24.884142]
];
export const COUNTRY_ZOOM_BOUNDS = [
    [49.683271, 16.693153],
    [47.609430, 22.819023]
];
export const COUNTRY_CENTER = [48.791220, 19.679318];
export const ZOOM_SNAP = 0.2;
export const ZOOM_CONTROL = false;
export const FADE_ANIMATION = true;
export const ZOOM_ANIMATION = true;
export const DOUBLE_CLICK_ZOOM = false;

export const MAP_CONFIG = {
    center: COUNTRY_CENTER,
    zoom: INITIAL_ZOOM_LEVEL,
    fadeAnimation: FADE_ANIMATION,
    zoomAnimation: ZOOM_ANIMATION,
    maxBounds: MAP_BOUNDS,
    maxZoom: PLACE_ZOOM_LEVEL,
    minZoom: INITIAL_ZOOM_LEVEL,
    options: {
        zoomSnap: ZOOM_SNAP,
        zoomControl: ZOOM_CONTROL,
        doubleClickZoom: DOUBLE_CLICK_ZOOM
    }
}