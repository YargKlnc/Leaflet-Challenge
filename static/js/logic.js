// storing API endpoint inside queryUrl from the USGS website, taking all month data
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// performing a GET request to the query URL
d3.json(queryUrl).then(function(data) {
    // sending the data.features object to the createFeatures function
        createFeatures(data.features);
    console.log(data.features)
    }
    
);

// function to create features
function createFeatures(earthquakeData) {
    
        // function to run once for each feature in the features array
        // giving each feature a popup with the place, time, coordinates, geometry and tsunami risk of the earthquake
        function onEachFeature(feature, layer) {
            layer.bindPopup(`<h3>Location of Earthquake: ${feature.properties.place}
            </h3><hr><p>Date and Time: ${new Date(feature.properties.time)}</p><hr><p>Magnitude: ${feature.properties.mag}</p>
            <hr><p>Tsunami Risk: ${feature.properties.tsunami}</p>
            <hr><p>Depth to Surface: ${feature.geometry.coordinates[2]}</p>
            <hr><p>X and Y Coordinates: ${feature.geometry.coordinates[1]}, 
            ${feature.geometry.coordinates[0]}</p>`);
        }
        
        // creating a GeoJSON layer containing the features array on the earthquakeData object
        function pointToLayer(feature, latlng) {
            let options = {
                radius: feature.properties.mag * 5,
                fillColor: getColor(feature.properties.mag),
                color: getColor(feature.properties.mag),
                weight: 1,
                opacity: 1,
                fillOpacity: 0.6
            }
            return L.circleMarker(latlng, options);
        }

        // creating a variable for the earthquakes to receive latlng, onEachFeature, and pointToLayer
        let earthquakes = L.geoJSON(earthquakeData, {
            onEachFeature: onEachFeature,
            pointToLayer: pointToLayer
        });

        // creating map with createMap function
        createMap(earthquakes);
}

// creating function for circle colors 
// data markers reflecting the magnitude of the earthquake by their size and the depth of the earthquake by color
// earthquakes with higher magnitudes will appear larger and earthquakes with greater depth will appear darker in color
function getColor(mag) {
    switch (true) {
        case mag > 8:
            return "#ea2c2c";
        case mag > 7:
            return "#ea822c";
        case mag > 6:
            return "#ee9c00";
        case mag > 5:
            return "#eecc00";
        case mag > 4:
            return "#d4ee00";
        case mag > 3:
            return "#98ee00";
        default:
            return "#98ee00";
    }
}

// creating a map legend to bottom left
let legend = L.control({position: "bottomleft"});

// creating legend details with colors and magnitude and adding to map
// adding a white color frame to legend
legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var grades = [1.0, 3.0, 5.0, 6.0, 7.0, 8.0];
    var labels = [];
    var legendInfo = "<h4>Earthquake<br>Magnitude</h4>";
    
    div.innerHTML = legendInfo;

    // loop through each magnitude and generate a label and color the legend
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '">&nbsp&nbsp&nbsp&nbsp</i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }
 
    return div;
};

// function to create map
function createMap(earthquakes) {

    // defining streetmap and darkmap layers
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    let darkmap = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: 'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
    });

    // defining a baseMaps object to hold base layers
    let baseMaps = {
        "Street Map": streetmap,
        "Dark Map": darkmap
    };

    // creating overlay object to hold overlay layer
    let overlayMaps = {
        Earthquakes: earthquakes
    };

    // creating map, giving it streetmap and earthquakes layers to display on load
    let myMap = L.map("map", {
        center: [
            37.09, -95.71
        ],
        zoom: 3,
        layers: [streetmap, earthquakes]
    });

    // creating a layer control
    // passing in baseMaps and overlayMaps
    // adding the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

    // adding legend to the map
    legend.addTo(myMap);

}

console.log("logic.js loaded")
 