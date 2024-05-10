var map = L.map('mapid').setView([52.4814, -3.9797], 8);




// Base Map Layer: OpenStreetMap
var openStreetMap = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


// Bing Maps Satellite Layer
var bingSatellite = new L.BingLayer('AijylEokpVtrqizDDsnkC0MjYi0bCpwSDHLHCeExE8aN965nj6fIcQFv33C1wisv', {
    type: 'Aerial'  // Use 'AerialWithLabels' if you want satellite images with labels
});



// Adding the WMS layer for LiDAR DSM (hillshade) data
var wmsLayer = L.tileLayer.wms("https://datamap.gov.wales/geoserver/ows", { // Base URL to the OWS endpoint
layers: 'geonode:wales_lidar_dsm_1m_hillshade_cog',
});

 // Marker at Swansea
 var markerSwansea = L.marker([51.62144, -3.943645]).addTo(map);
 markerSwansea.bindPopup("<b>Hello Swansea!</b>").openPopup();

  // Example sites
  var marker1 = L.marker([52.075744 , -4.7382202]).addTo(map);
  marker1.bindPopup("<b>Example</b>").openPopup();
 
  var marker2 = L.marker([51.819996, -4.76665]).addTo(map);
  marker2.bindPopup("<b>Example</b>").openPopup();
 
  var marker3 = L.marker([51.831249, -4.800618]).addTo(map);
  marker3.bindPopup("<b>Example</b>").openPopup();
 
  var marker4 = L.marker([51.85926, -4.849777]).addTo(map);
  marker4.bindPopup("<b>Example</b>").openPopup();

  // Define the EPSG:27700 projection for the British National Grid using Proj4js
  proj4.defs("EPSG:27700",
  "+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=371,-112,434,0,0,0,0 +units=m +no_defs +type=crs");

 // Function to show location map clicked and display in BGS
 function onMapClick(e) {
    var coords = [e.latlng.lng, e.latlng.lat]; // Create an array with longitude and latitude
    var projectedCoords = proj4(proj4.defs('EPSG:4326'), proj4.defs('EPSG:27700'), coords); // Transform to EPSG:27700
    alert("You clicked the map at Easting: " + projectedCoords[0].toFixed(0) + ", Northing: " + projectedCoords[1].toFixed(0));
}

map.on('click', onMapClick);


    // Layer control to toggle between layers
    var baseMaps = {
        "OpenStreetMap": openStreetMap,
        "Bing Satellite": bingSatellite
    };

    var overlayMaps = {
        "LiDAR Data": wmsLayer
    };

    L.control.layers(baseMaps, overlayMaps).addTo(map);


 
