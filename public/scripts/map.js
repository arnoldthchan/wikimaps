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
var marker = [];
var infoWindow = [];

function initMap() {

  var mapProp = {
    center: new google.maps.LatLng(43.6446447,-79.3949987),
    zoom: 15
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
}

function addPoint(lat, lng, message, counter) {

  // random icon
  var icon = iconBase + markerColours[randomInt(0,markerColours.length-1)];

  marker[counter] = new google.maps.Marker({
    position: new google.maps.LatLng(lat, lng),
    map: map,
    draggable: true,
    icon: icon,
    animation: google.maps.Animation.DROP,
    title: String(message),
    info_id: counter
  });

  // Add info window
  var infoDesc = `<form>
                    <label for="titleBox">Title</label>
                    <textarea id="titleBox">Untitled</textarea><br/>
                    <label for="descriptionBox">Description</label>
                    <textarea id="descriptionBox">Description</textarea>
                  </form>`;

  infoWindow[counter] = new google.maps.InfoWindow({
    content: infoDesc
  });

  marker[counter].addListener('click', function() {
    map.setCenter(this.getPosition());
    for (var i = 0; i < infoWindow.length; i++) {
      infoWindow[i].close();
    };

    infoWindow[this.info_id].open(map, this);
  });


}
