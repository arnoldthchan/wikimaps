function myMap() {
  var mapProp= {
    center:new google.maps.LatLng(43.6446447,-79.3949987),
    zoom: 15
  }

  var map = new google.maps.Map(document.getElementById("googleMap"),mapProp)
}