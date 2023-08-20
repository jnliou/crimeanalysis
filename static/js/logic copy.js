let mapurl = "http://127.0.0.1:5000/map"

let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});
let baseMaps = {
  "Street Map": street,
  "Toto": topo
};


// Creating MapkeyIcon object
let mki = L.icon.mapkey({icon:"school",color:'#725139',background:'#f2c357',size:30});
// Append to marker:
L.marker([50,14.4],{icon:mki}).addTo(map);


let map = L.map("map", {
  center: [45.5152, -122.6784],
  zoom: 10,
  layers: [street]
});


//getting request and load
d3.json(mapurl).then(function(data) {
  console.log(data);
  console.log(data[0].properties.type);
  createFeatures(data);
});


function createFeatures(data){
  var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "F6635C",
    color: "#0C356A",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};
  // var mki = L.icon.mapkey({icon:"school",color:'#725139',background:'#f2c357',size:30}

  var geojson = L.geoJson(data, {

    style: function (feature) {
      return {'color': feature.properties.color};
    },
  
    onEachFeature: function (feature, layer) {
      var popupText = `<h3>Crime Type:${feature.properties.type}<h3><hr>
                       <li>Neighborhood:${feature.properties.neighbourhood}</li>
                       <li>Year:${feature.properties.year}</li>` ;
  
   
      layer.bindPopup(popupText);
    },
    pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, geojsonMarkerOptions);
    }
  });
   
  var markers = L.markerClusterGroup();
  markers.addLayer(geojson)
  
  map.addLayer(markers);

}


// Creating MapkeyIcon object
// Append to marker:
// L.marker([50,14.4],{icon:mki}).addTo(map);


// You need to define markerColor function for your legend to work correctly

// Creating MapkeyIcon object
// var mki = L.icon.mapkey({icon:"school",color:'#725139',background:'#f2c357',size:30}
// // Append to marker:
// L.marker([50,14.4],{icon:mki}).addTo(map);