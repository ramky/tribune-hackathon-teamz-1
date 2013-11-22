var items = [{
  lat: "34.12478",
  lon: "-118.26554"
}, {
  lat: "34.12136",
  lon: "-118.2627"
}, {
  lat: "34.14671",
  lon: "-118.25966"
}, {
  lat: "34.1514799",
  lon: "-118.2345"
}, {
  lat: "34.1469699",
  lon: "-118.25821"
}, {
  lat: "34.0828099",
  lon: "-118.27355"
}, {
  lat: "34.13115",
  lon: "-118.27355"
}, {
  lat: "34.12703",
  lon: "-118.26709"
}, {        
  lat: "34.12488",
  lon: "-118.26542"
}];
function draw() {
  var lat = 34.12478;
  var long = -118.26554;
  console.log('Your latitude is :'+lat+' and longitude is '+long);
  var map = L.map('map').setView([lat, long], 13);
  L.tileLayer('http://tile.cloudmade.com/240f377fba63449fabfc11cc6cecd533/997/256/{z}/{x}/{y}.png', {
    attribution: '',
    maxZoom: 18
  }).addTo(map);
  var marker = L.marker([lat, long]).addTo(map);
  marker.bindPopup("<b>Route starts here.").openPopup();

  var firstpolyline = new L.Polyline(items, {
  color: '#cc6600',
  weight: 5,
  opacity: 0.5,
  smoothFactor: 1
  });
  map.addLayer(firstpolyline);
}

function show_legends(){

}

$(function() {

  var width = $( window ).width();
  var height = $( window ).height();
  var map_width = ((width * 2 ) / 3 ) - 100;
  var incidents_width = width / 3;
  $('#legend_box').css('top',height-100);
  $('#legend_box').hide();
  $('#incidents').hide();
  setTimeout(function(){
    $('#wait').hide();
    $('#legend_box').show();
    $('#incidents').show();
    $('#container').css('width', width);
    $('#container').css('height', height);
    $('#map').css('width', map_width - 100);
    $('#map').css('height', height - 200);
    $('#incidents').css('width', incidents_width - 50);
    $('#incidents').css('height', height - 200);
    $('#legend_box').css('left', (width - 500) / 2);
    draw();
  }, 3000);

}); 
