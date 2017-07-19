function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function initMap() {
  let mapProp = {
    center:new google.maps.LatLng(43.6446447,-79.3949987),
    zoom: 15
  }

  // init map
  map = new google.maps.Map(document.getElementById("googleMap"),mapProp)

  //add listener for adding markers
  google.maps.event.addListener(map, 'click', (event) => {
    addPoint(event.latLng.lat(), event.latLng.lng(), 'Hi')
  })

  // Add markers
  // for (let i = 0; i < 360; i+=10) {
  //   addPoint(43.6446447 + Math.cos(i*(Math.PI/180)) * 0.001,-79.3949987 + Math.sin(i*(Math.PI/180)) * 0.001, i)
  // }

  // Hide POI
  // let styles = {
  //   default: null,
  //   hide: [
  //   {
  //     featureType: 'all',
  //     stylers: [{visibility: 'off'}]
  //   }]
  // }

  // map.setOptions({styles: styles['default']})
}

function addPoint(lat, lng, message) {

  // random icon
  let iconBase = 'http://www.google.com/intl/en_us/mapfiles/ms/micons/'
  let markerColours = [
    'red.png',
    'orange.png',
    'yellow.png',
    'green.png',
    'blue.png',
    'purple.png',
    'pink.png'
  ]

  let icon = iconBase + markerColours[randomInt(0,markerColours.length-1)];

  let marker = new google.maps.Marker({
    position: new google.maps.LatLng(lat, lng),
    map: map,
    icon: icon,
    title: String(message)
  })

  marker.addListener('click', () => {
    map.setCenter(this.getPosition())
    alert('@pairsbot pair')
  })
}
