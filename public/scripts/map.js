var map;
var counter = 0;
var marker = [];
var infoWindow = [];

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

function initMap() {

  var curMap;

  $.ajax({
    url: "/maps",
    method: "GET",
    success: function(obj){
      //console.dir(obj[0]);
      curMap = obj[0];

      var mapProp = {
          center: new google.maps.LatLng(0,0),
          zoom: 15,
          mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.HYBRID]
          },
          disableDefaultUI: true,
          //mapTypeControl: true,
          scaleControl: true,
          zoomControl: true,
          zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE
          },
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

      if (!curMap["latitude"] || !curMap["longitude"]) {
        mapProp.center = new google.maps.LatLng(39.019444,125.738056);
        mapProp.zoom = 12;
      } else {
        mapProp.center = new google.maps.LatLng(curMap["latitude"],curMap["longitude"]);
        mapPropzoom = 15;
      }

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

  marker[counter].addListener('dragend', function() {
    this.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function(){
      marker[counter].setAnimation(null);
    }, 400);
  });
}
