function initMap() {
  let mapProp= {
    center:new google.maps.LatLng(43.6446447,-79.3949987),
    zoom: 15
  }

  map = new google.maps.Map(document.getElementById("googleMap"),mapProp)

  for (let i = 0; i < 360; i+=10) {
    addPoint(43.6446447 + Math.cos(i) * 0.001,-79.3949987 + Math.sin(i) * 0.001)
  }
}

function addPoint(lat, lng) {
    let marker = new google.maps.Marker({
    position: new google.maps.LatLng(lat, lng),
    map: map,
    title: 'Hello World!'
  })

  marker.addListener('click', function() {
    alert("Ouch")
  })
}
