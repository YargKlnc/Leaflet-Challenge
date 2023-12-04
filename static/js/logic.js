// storing API endpoint inside queryUrl from the USGS website, taking all month data
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

// performing a GET request to the query URL
d3.json(queryUrl, function(data) {
    // sending the data.features object to the createFeatures function
        createFeatures(data.features);
    }
);

// function to create features
function createFeatures(earthquakeData) {
    
        // function to run once for each feature in the features array
        // giving each feature a popup with the place and time of the earthquake
        function onEachFeature(feature, layer) {
            layer.bindPopup(`<h3>Location of Earthquake: ${feature.properties.place}
            </h3><hr><p>Date and Time: ${new Date(feature.properties.time)}</p><hr><p>Magnitude: ${feature.properties.mag}</p>`);
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

// creating function for circle colors where data markers reflecting the magnitude of the earthquake by their size and the depth of the earthquake by color
function getColor(mag){
    switch(true){
        case mag > 5:
            return "#ea2c2c";
        case mag > 4:
            return "#ea822c";
        case mag > 3:
            return "#ee9c00";
        case mag > 2:
            return "#eecc00";
        case mag > 1:
            return "#d4ee00";
        default:
            return "#98ee00";
    }
}


// creating a map legend to upper right corner
let legend = L.control({position: 'topright'});

legend.onAdd = function() {
    var div = L.DomUtil.create('div', 'info legend'),
    var grades = [0, 1, 2, 3, 4, 5],
    var mag = ["0-1", "1-2", "2-3", "3-4", "4-5", "5+"];
    var labels = [];
    var legendInfo = "<h3>Magnitude</h3>";

    div.innerHTML = legendInfo;

    // loop through each magnitude and generate a label and color the legend
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<li style="background-color:' + getColor(grades[i] + 1) + '">' +
            mag[i] + '</li>';
    }
    return div;
};

// function to create map
function createMap(earthquakes) {

    // defining streetmap and darkmap layers
    let streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}", { 
        accessToken: API_KEY
    });

    let darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}", { 
        accessToken: API_KEY
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

    // adding legend to map
    legend.addTo(myMap);
}