// storing API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
    // sending the data.features object to the createFeatures function
        createFeatures(data.features);
    }
);

// function to create features
function createFeatures(earthquakeData) {
    
        // function to run once for each feature in the features array
        // giving each feature a popup describing the place and time of the earthquake
        function onEachFeature(feature, layer) {
            layer.bindPopup("<h3>" + feature.properties.place + 
            "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
        }
    
        // function to create the circle radius based on the magnitude
        function radiusSize(magnitude) {
            return magnitude * 20000;
        }
    
        // function to set the circle color based on the magnitude
        function circleColor(magnitude) {
            if (magnitude < 1) {
                return "#ccff33"
            }
            else if (magnitude < 2) {
                return "#ffff33"
            }
            else if (magnitude < 3) {
                return "#ffcc33"
            }
            else if (magnitude < 4) {
                return "#ff9933"
            }
            else if (magnitude < 5) {
                return "#ff6633"
            }
            else {
                return "#ff3333"
            }
        }
    
        // creating a GeoJSON layer containing the features array on the earthquakeData object
        // running the onEachFeature function once for each piece of data in the array
        var earthquakes = L.geoJSON(earthquakeData, {
            pointToLayer: function(earthquakeData, latlng) {
                return L.circle(latlng, {
                    radius: radiusSize(earthquakeData.properties.mag),
                    color: circleColor(earthquakeData.properties.mag),
                    fillOpacity: 1
                });
            },
            onEachFeature: onEachFeature
        });
    
        // sending earthquakes layer to the createMap function
        createMap(earthquakes);
    }

