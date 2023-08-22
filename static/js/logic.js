let mapurl = "http://127.0.0.1:5000/map"

let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
let googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
  maxZoom: 20,attribution: 'Google',
  subdomains:['mt0','mt1','mt2','mt3']
});

let googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
  maxZoom: 20, attribution: 'Google',
  subdomains:['mt0','mt1','mt2','mt3']
});

let baseMaps = {
  "Street Map": street,
  "Google Street": googleStreets,
  "Satellite": googleSat
};



let map = L.map("map", {
  center: [45.5152, -122.6784],
  zoom: 10,
  layers: [street]
});


//getting request and load
d3.json(mapurl).then(function(data) {
  //console.log(data);
  //console.log(data[0].properties.type);
  createFeatures(data);
});

// Start of Function
function createFeatures(data){
  

  var geojson = L.geoJson(data, {
  
    onEachFeature: function (feature, layer) {
      var popupText = `<h3>Crime Type:${feature.properties.type}<h3><hr>
                       <li>Neighborhood:${feature.properties.neighbourhood}</li>
                       <li>Year:${feature.properties.year}</li>
                       <li>Total Offense:${feature.properties.total_offense}</li>` ;
  
   
      layer.bindPopup(popupText);
    },
    pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {icon:mki = L.icon.mapkey({  
      icon:"avatar",
      color: markerColor(feature.properties.total_offense),
      background:'#102C57',
      size:30})});
    }
  });

// Adding Layer controll on top right
L.control.layers(baseMaps).addTo(map);
  
 
// Create a legend to display information about our map.
 let info = L.control({
  position: "bottomright"
  });

// When the layer control is added, insert a div with the class of "legend".
info.onAdd = function(map) {
  let div = L.DomUtil.create("div", "legend"),
  
  catergory = [1,10,50,90];


for (let i = 0; i < catergory.length; i++) {
  div.innerHTML +=
      '<i style="background:' + markerColor(catergory[i] + 1) + '"></i> ' +
      catergory[i] + (catergory[i + 1] ? '&ndash;' + catergory[i + 1] + '<br>' : '+');
}   

return div;

}; 
info.addTo(map);

  var markers = L.markerClusterGroup();
  markers.addLayer(geojson)
  
  map.addLayer(markers);

}
//End of Function


//Defining the filter
function markerColor(amount) {
  return  amount>= 90 ? 'Red' :
          amount >= 50 ? '#FD8D14' :
          amount >= 10 ? '#F8DE22' :
                        'White' ;          
  };

