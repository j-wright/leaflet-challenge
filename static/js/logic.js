// Create the 'basemap' tile layer that will be the background of our map.
let basemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// OPTIONAL: Step 2
// Create the 'street' tile layer as a second background of the map
// let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//   });

// Create the map object with center and zoom options.
let myMap = L.map("map", {
  center: [0, 0],
  zoom: 2
});

// Then add the 'basemap' tile layer to the map.
basemap.addTo(myMap)

// OPTIONAL: Step 2
// Create the layer groups, base maps, and overlays for our two sets of data, earthquakes and tectonic_plates.
// Add a control to the map that will allow the user to change which layers are visible.


// Make a request that retrieves the earthquake geoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function (data) {

  // console.log("data: ", data)

  // This function returns the style data for each of the earthquakes we plot on
  // the map. Pass the magnitude and depth of the earthquake into two separate functions
  // to calculate the color and radius.
  function styleInfo(feature) {
      // console.log("styleInfo called.")
      // console.log("with feature: ", feature)
  }

  // This function determines the color of the marker based on the depth of the earthquake.
  function getColor(depth) {
      // console.log("getColor called.")
      // console.log("with depth: ", depth)
      if (depth < 10){
        return "green"
      }else if (depth < 30){
        return "yellow"
      }else if (depth < 50) {
        return "orange"
      }else if (depth < 70) {
        return "purple"
      }else if (depth < 90) {
        return "blue"
      }else {
        return "red"
      }
  }

  // This function determines the radius of the earthquake marker based on its magnitude.
  function getRadius(magnitude) {
      // console.log("getRadius called.")
      // console.log("with magnitude: ", magnitude)
      return magnitude * 12000
  }

  // Add a GeoJSON layer to the map once the file is loaded.
  L.geoJson(data, {
    // Turn each feature into a circleMarker on the map.
    pointToLayer: function (feature, latlng) {
        // console.log("pointToLayer called.")
        // styleInfo(feature)
        // getColor(latlng.alt)
        // getRadius(feature.properties.mag)

        L.circle([latlng.lat,latlng.lng], {
          color: getColor(latlng.alt),
          fillColor: getColor(latlng.alt),
          fillOpacity: 0.75,
          radius: getRadius(feature.properties.mag)
        }).bindPopup(`Magnitude: ${feature.properties.mag}<br>Location: ${feature.properties.place}<br>Depth: ${latlng.alt}`).addTo(myMap)
    },
    // Set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
    // Create a popup for each marker to display the magnitude and location of the earthquake after the marker has been created and styled
    onEachFeature: function (feature, layer) {
        // console.log("onEachFeature called.")
    }
  // OPTIONAL: Step 2
  // Add the data to the earthquake layer instead of directly to the map.
  }).addTo(map);

  // Create a legend control object.
  let legend = L.control({
    position: "bottomright"
  });

  // Then add all the details for the legend
  legend.onAdd = function () {
    let div = L.DomUtil.create("div", "info legend");

    // Initialize depth intervals and colors for the legend
    // let grades = [0,10,30,50,70,90];
    // let color = getColor(grades)
    // let labels = [];

    // Loop through our depth intervals to generate a label with a colored square for each interval.
    // labels.push('<i style="background: ' + color + '"></i>')

    return div;
  };

  // Finally, add the legend to the map.
  // legend.addTo(myMap)

  // OPTIONAL: Step 2
  // Make a request to get our Tectonic Plate geoJSON data.
  d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function (plate_data) {
    // Save the geoJSON data, along with style information, to the tectonic_plates layer.


    // Then add the tectonic_plates layer to the map.

  });
});
