//Store the API

let url = "./static/dataj/crimedata.json"

//perform a get request and load using d3

d3.json(url).then(function(data){
    
    //to check the data structure
    console.log(data)
    
    createFeatures(data);
});


// Defining the function for features
function createFeatures(crimeData){

    //Define a funciton to run for each features.
    // Giving each feature a popup,

    function onEachFeature(feature){
      
      layer.bindPopup(`<h3>Crime was against:${feature.CrimeAgainst}' Offense Category:'${feature.OffenseCategory}</h3><hr><p>${new Date(feature.OccurDate)}</p> This Happening during ${feature.TimePeriod}`);
    }
    
// Create a GeoJson layer. Using On each and Point to Layer

    let crimedata = L.geoJSON(crimeData,{
    onEachFeature: onEachFeature,
    pointToLayer: createMarker
});
}

// // Create GeoJson for plate
// let plates = L.geoJSON(data,{
//     style: function(){
//         return{
//             color: "black",
//             weight:2.5
//         }
//     }
// });

//     createMap(earthquakes);
// }

//marker style

function createMarker(feature, style){

    return L.circle(style,{

        radius :markersize(feature.properties.mag),
        fillcolor:markerColor(feature.geometry.coordinates[2]),
        color:markerColor(feature.geometry.coordinates[2]),
        stroke: true,
        weight: 3,
        opacity: 0.5,
        fillOpacity: 0.7

    });
}


function createMap(crime){

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
    Earthquakes: crime 
    
    };

    // Create the map, giving it the streetmap and earthquake layers to display on default.
    let Map = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [street, earthquakes]
  });

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(Map);

// Create a legend to display information about our map.
    let info = L.control({
        position: "bottomright"
        });

// When the layer control is added, insert a div with the class of "legend".
    info.onAdd = function(Map) {
        let div = L.DomUtil.create("div", "legend"),
        labels = [],
        catergory = ['Property','Person','Society'],
        legendInfo = "<h1>Depth</h1>";


    for (let i = 0; i < catergory.length; i++) {
        div.innerHTML +=
            '<i style="background:' + markerColor(catergory[i] + 1) + '"></i> ' +
            catergory[i] + (catergory[i + 1] ? '&ndash;' + catergory[i + 1] + '<br>' : '+');
    }   

    return div;
   
  };

  info.addTo(Map);

}

//Market size

function markersize(totalnumber){
    return totalcrime * 5;
}


// //Adding
// function markerColor(crimeagainst) {
//     return  crimeagainst= "Property" ? '#1C0A00' :
//             crimeagainst= "Society" ? '#8E3200' :
//             crimeagainst= "Person" ? '#A64B2A' :
// }


  

