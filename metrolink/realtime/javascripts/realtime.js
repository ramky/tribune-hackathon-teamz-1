var stations = [];
var station_coordinates = [];

function draw() {
  count = 0;
  $.each(stations, function(i, item) {
    count += 1;
    //console.log(item.name);

    if(count == 1){
      map = L.map('map').setView([item.latitude, item.longitude], 9);
    }

    L.tileLayer('http://tile.cloudmade.com/240f377fba63449fabfc11cc6cecd533/997/256/{z}/{x}/{y}.png', {
    attribution: '',
    maxZoom: 18
    }).addTo(map);

    var marker = L.marker([item.latitude, item.longitude]).addTo(map);
    marker.bindPopup("<b>"+item.name)//.openPopup();
  
  });

  // var firstpolyline = new L.Polyline(station_coordinates, {
  //   //color: '#cc6600',
  //   color: 'green',
  //   weight: 5,
  //   opacity: 0.5,
  //   smoothFactor: 1
  // });
  // map.addLayer(firstpolyline);

}

function populateTwitter(data){
  $.each(data, function(i, item) {
    //console.log(item.tweet);
    var tweets = document.getElementById('tweets');
    var entry = document.createElement('li');
    entry.appendChild(document.createTextNode(item.tweet));
    tweets.appendChild(entry);
  });
}

function populateFromJson(data){
  $.each(data[0]['Antelope Valley Line'], function(i, item) {
  stations.push({name: item.name, latitude: item.latitude, longitude: item.longitude})
  station_coordinates.push({lat: item.latitude, lon: item.longitude})

 //   map = L.map('map').setView([item.latitude, item.longitude], 13);
  
  // L.tileLayer('http://tile.cloudmade.com/240f377fba63449fabfc11cc6cecd533/997/256/{z}/{x}/{y}.png', {
  // attribution: '',
  // maxZoom: 18
  // }).addTo(map);
  
  // var marker = L.marker([item.latitude, item.longitude]).addTo(map);
  // marker.bindPopup("<b>"+item.name).openPopup();
  }); 
  
}

$(function() {
  var width = $( window ).width();
  var height = $( window ).height();
  var map_width = ((width * 2 ) / 3 ) - 100;
  var incidents_width = width / 3;
  $('#legend_box').css('top',height-100);
  $('#legend_box').hide();
  $('#incidents').hide();

  $.ajax({
    type: 'GET',
    url: 'http://localhost:8000/realtime/lines.json',
    success: function(data, status, settings){
      populateFromJson(data); 
    },
    error: function(requestObject, error, errorThrown){
      alert("An error occured");
    },
    dataType: 'json'
  });

  $.ajax({
    type: 'GET',
    url: 'http://localhost:8000/realtime/twitter.json',
    success: function(data, status, settings){
      populateTwitter(data); 
    },
    error: function(requestObject, error, errorThrown){
      alert("An error occured");
    },
    dataType: 'json'
  });

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
