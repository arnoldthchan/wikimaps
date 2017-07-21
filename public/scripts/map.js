var iconBase = 'http://www.google.com/intl/en_us/mapfiles/ms/micons/';
var markerColours = [
  'red.png',
  'orange.png',
  'yellow.png',
  'green.png',
  'blue.png',
  'purple.png',
  'pink.png'
];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var counter = 0;
var infoWindow = [];

function initMap() {

  var mapProp = {
    center: new google.maps.LatLng(43.6446447,-79.3949987),
    zoom: 15,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.HYBRID]
    }, // here´s the array of controls
    disableDefaultUI: true, // a way to quickly hide all controls
    //mapTypeControl: true,
    scaleControl: true,
    zoomControl: true,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.LARGE
    },
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  // init map
  map = new google.maps.Map(document.getElementById("googleMap"),mapProp);

  // Hide POI
  // var styles = {
  //   default: null,
  //   hide: [
  //   {
  //     featureType: 'all',
  //     stylers: [{visibility: 'off'}]
  //   }]
  // };

  // map.setOptions({styles: styles['default']})

  //add listener for adding markers
  google.maps.event.addListener(map, 'click', function(event) {
    console.log(event.latLng.lat(), event.latLng.lng());
    addPoint(event.latLng.lat(), event.latLng.lng(), counter, counter);
    counter++;
  });

  // Add markers
  // for (let i = 0; i < 360; i+=10) {
  //   addPoint(43.6446447 + Math.cos(i*(Math.PI/180)) * 0.001,-79.3949987 + Math.sin(i*(Math.PI/180)) * 0.001, i);
  // }
}

function addPoint(lat, lng, message, counter) {

  // random icon
  var icon = iconBase + markerColours[randomInt(0,markerColours.length-1)];

  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(lat, lng),
    map: map,
    icon: icon,
    animation: google.maps.Animation.DROP,
    title: String(message),
    info_id: counter
  });

  // Add info window
  var infoDesc = "<h2>Info Window!</h2><p>This is an info window! It is made of info and window!";
  infoWindow[counter] = new google.maps.InfoWindow({
    content: infoDesc
  });

  marker.addListener('click', function() {
    map.setCenter(this.getPosition());
    for (var i = 0; i < infoWindow.length; i++) {
      infoWindow[i].close();
    }

    infoWindow[this.info_id].open(map, marker);
  });
}
