//Store the API

let mapurl = "http://127.0.0.1:5000/map"
let pieurl = "http://127.0.0.1:5000/pie"


//perform a get request and load using d3

d3.json(mapurl).then(function(data){
  
    
    //to check the data structure
    console.log(data)
    console.log(data[0].properties.type)
    //console.log(datap)
    
    createFeatures(data);
 
});


// Defining the function for features
function createFeatures(crimeData){

    //Define a funciton to run for each features.
    // Giving each feature a popup,

    function onEachFeature(data, layer){
      
      layer.bindPopup(`<h3>Crime was against:${data.properties.type}</h3>`);
    }
    
// Create a GeoJson layer. Using On each and Point to Layer
// let markers = L.markerClusterGroup();
    let crimes = L.geoJSON(crimeData,{
    onEachFeature: onEachFeature,
    pointToLayer: createMarker
    // pointToLayer: markers.addLayer(createMarker)
      
});
    createMap(crimes);
    // map.addLayer(markers);
}


//marker style 
function createMarker(data, latlng){

  return L.circle(latlng,{
    radius :markersize(data.properties.total_offense),
    fillcolor:"Red",
    color:"Red",
    stroke: true,
    weight: 3,
    opacity: 0.5,
    fillOpacity: 0.7
  });

  
}




function createMap(crimes){

    // Create base layers.
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      });

    let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
      });
      
    // Create a baseMap object
    let baseMaps = {
        "Street Map": street,
        "Toto": topo,
         };

    
    // Crate overlay object to hold our overlay
    let overlayMaps = {
    Crime: crimes 
    };

    // Create the map, giving it the streetmap and earthquake layers to display on default.
    let Map = L.map("map", {
    center: [
      45.5152, -122.6784
    ],
    zoom: 10,
    layers: [street, crimes]
  });

//   // Create a layer control.
//   // Pass it our baseMaps and overlayMaps.
//   // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(Map);

 
}

// // Create a legend to display information about our map.
//     let info = L.control({
//         position: "bottomright"
//         });

// // When the layer control is added, insert a div with the class of "legend".
//     info.onAdd = function(Map) {
//         let div = L.DomUtil.create("div", "legend"),
//         labels = [],
//         catergory = ['Property','Person','Society'],
//         legendInfo = "<h1>Depth</h1>";


//     for (let i = 0; i < catergory.length; i++) {
//         div.innerHTML +=
//             '<i style="background:' + markerColor(catergory[i] + 1) + '"></i> ' +
//             catergory[i] + (catergory[i + 1] ? '&ndash;' + catergory[i + 1] + '<br>' : '+');
//     }   

//     return div;
   
//   };

//Market size

function markersize(totalnumber){
    return totalnumber * 1;
}


// //Adding
// function markerColor(total) {
//     return  total= "Property" ? '#1C0A00' :
//             total= "Society" ? '#8E3200' :
//             total= "Person" ? '#A64B2A' :
// }
