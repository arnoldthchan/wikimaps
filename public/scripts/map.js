var map;
var curMap_id;
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

// function getMapData(map_id) {
//   $.ajax({
//     url: `/map/${map_id}`,
//     method: "GET",
//     success: function(obj){
//       return obj;
//     }
//   });
// }

function displayNewMap(map_id) {

  curMap_id = map_id;

  for (var i = 0; i < counter; i++) {
    marker[i].setMap(null);
    infoWindow[i].setMap(null);
  }

  counter = 0;
  var curMap;

  $.ajax({
    url: `/map/${map_id}`,
    method: "GET",
    success: function(obj){
      console.dir(obj);
      curMap = obj[0];

      if (curMap) {
        map.setCenter(new google.maps.LatLng(curMap['latitude'],curMap['longitude']));
        map.setZoom(12);
        getPointsFromDB(curMap["id"]);
      }
    }
  });
}

function initMap() {

  var curMap;

  $.ajax({
    url: "/maps",
    method: "GET",
    success: function(obj){
      curMap = obj[0];
      curMap_id = obj[0]['id'];

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

      if (!curMap) {
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
        addPoint("Click", "Clack", "Cleck", event.latLng.lat(), event.latLng.lng(), true);
        counter++;
      });

      if (curMap) {
        getPointsFromDB(curMap["id"]);
      }
    }
  });
}

function addPoint(title, desc, img, lat, lng, isNew) {

  // random icon
  var icon = iconBase + markerColours[randomInt(0,markerColours.length-1)];

  marker[counter] = new google.maps.Marker({
    position: new google.maps.LatLng(lat, lng),
    map: map,
    draggable: true,
    icon: icon,
    animation: google.maps.Animation.DROP,
    title: title,
    info_id: counter
  });

  // Add info window
  var infoDesc = `<form>
                    <label for="titleBox">Title</label>
                    <textarea id="titleBox">${title}</textarea><br/>
                    <label for="descriptionBox">Description</label>
                    <textarea id="descriptionBox">${desc}</textarea><br/>
                    <label for="imgBox">Image</label>
                    <textarea id="imgBox">${img}</textarea>
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
    var curMarker = this;

    curMarker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function(){ curMarker.setAnimation(null); }, 400);
  });

  //add to database
  if (isNew) {
    $.ajax({
      url: "/point",
      data: {title      : title,
            description : desc,
            image       : img,
            latitude    : lat,
            longitude   : lng,
            map_id      : curMap_id,
            user_id     : 1},
      method: "POST",
      success: function(){
        console.log("OKSDF");
      }
    });
  }
}

function getPointsFromDB(map_id) {
  $.ajax( {
    url: `maps/${map_id}/points`,
    method: "GET",
    success: function(obj) {
      console.log(obj);
      for (var i = 0; i < obj.length; i++) {
        console.log(obj[i]);
        addPoint(obj[i]["title"],
                 obj[i]["description"],
                 obj[i]["image"],
                 obj[i]["latitude"],
                 obj[i]["longitude"],
                 false);
        counter++;
      }
    }
  });
}
