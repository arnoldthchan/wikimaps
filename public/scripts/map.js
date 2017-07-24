var gMap;
var curMap_id;
var curUser_id = userJSON.id;
var counter = 0;
var marker = [];
var infoWindow = [];
var users_list = [];

var iconBase = "http://www.google.com/intl/en_us/mapfiles/ms/micons/";
var markerColours = [
  "red.png",
  "orange.png",
  "yellow.png",
  "green.png",
  "blue.png",
  "purple.png",
  "pink.png"
];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function initApp() {

  // get all user names
  $.ajax({
    url: "/users",
    method: "GET",
    success: function(obj){
      users_list.push("Guest");
      for (var i = 0; i < obj.length; i++) {
        users_list.push(obj[i]["name"]);
      }
      initMap();
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
      curMap_id = obj[0]["id"];

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
      gMap = new google.maps.Map(document.getElementById("googleMap"),mapProp);

      // Hide POI
      // var styles = {
      //   default: null,
      //   hide: [
      //   {
      //     featureType: "all",
      //     stylers: [{visibility: "off"}]
      //   }]
      // };

      // gMap.setOptions({styles: styles["default"]})

      //add listener for adding markers
      google.maps.event.addListener(gMap, "click", function(event) {
        addNewPoint("Raccoon", "Trash Panda", "raccoon.jpg", event.latLng.lat(), event.latLng.lng());
      });

      if (curMap) {
        getPointsFromDB(curMap["id"]);
      }

      // Add listeners to all edit buttons
      $("#googleMap").on("click", ".editButton", function() {

        var curMarker = marker[$(this).closest(".infoDesc").data("marker-id")];

        if (curUser_id === curMarker.user_id) {

        // Flip edit/show state of window.
        curMarker.editing = !curMarker.editing;
        $(this).closest(".infoDesc").find(".editInfo").toggle();
        $(this).closest(".infoDesc").find(".showInfo").toggle();

        // update text in show state
        if (!curMarker.editing) {
          var newTitle = $(this).closest(".infoDesc").find(".editInfo").find("#titleBox").val();
          $(this).closest(".infoDesc").find(".showInfo").find(".titleText").text(newTitle);

          var newDesc = $(this).closest(".infoDesc").find(".editInfo").find("#descriptionBox").val();
          $(this).closest(".infoDesc").find(".showInfo").find(".descriptionText").text(newDesc);

          var newImg = $(this).closest(".infoDesc").find(".editInfo").find("#imgBox").val();
          $(this).closest(".infoDesc").find(".showInfo").find(".img-responsive").attr("src",`/images/${newImg}`);

            // update the database with new position
            if (curUser_id !== 0) {
              $.ajax({
                url: `/point/${curMarker.db_id}`,
                data: {title      : newTitle,
                      description : newDesc,
                      image       : newImg,
                      latitude    : curMarker.position.lat(),
                      longitude   : curMarker.position.lng(),
                      map_id      : curMarker.map_id,
                      user_id     : curMarker.user_id},
                method: "PUT",
                success: function(data){
                  console.log(data);
                },

                error: function(err){
                  debugger;
                  console.log("errorz");
                }
              });
            }
          }
        }
      });
    }
  });
}

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
      curMap = obj[0];

      if (curMap) {
        gMap.setCenter(new google.maps.LatLng(curMap["latitude"],curMap["longitude"]));
        gMap.setZoom(12);
        getPointsFromDB(curMap["id"]);
      }
    }
  });
}

// Code common to both addNewPoint and addExistingPoint
function addPointCommon(title, desc, img, user_id) {

  // Add info window

  var container = $("<div></div>");
  var infoDesc = $(`<div class="infoDesc" data-marker-id=${counter}></div>`);

  container.append(infoDesc);

  var editInfo = $(`<form class="editInfo"></form>`);

  editInfo.append($(`<label for="titleBox">Title</label>
                      <textarea id="titleBox" class="form-control">${title}</textarea><br/>
                      <label for="descriptionBox">Description</label>
                      <textarea id="descriptionBox" class="form-control">${desc}</textarea><br/>
                      <label for="imgBox">Image</label>
                      <textarea id="imgBox" class="form-control">${img}</textarea>`));

  infoDesc.append(editInfo);

  var showInfo = $(`<div class="showInfo"</div>`);

  showInfo.append($(`<h3 class="titleText">${title}</h3>
                     <p class="descriptionText">${desc}</p>
                     <img src="/images/${img}" class="img-responsive showImg">
                     <p class="userText">Created by: ${users_list[user_id]}</p>`));

  infoDesc.append(showInfo);

  var editButton = $(`<button class="editButton btn btn-success btn-block btn-xs">Edit</button>`);

  if (curUser_id !== user_id) {
    editButton.css("display", "none");
  }

  infoDesc.append(editButton);

  infoWindow[counter] = new google.maps.InfoWindow({
    content: container.html(),
  });

  // marker Click
  marker[counter].addListener("click", function() {
    gMap.setCenter(this.getPosition());
    for (var i = 0; i < infoWindow.length; i++) {
      infoWindow[i].close();
    };

    infoWindow[this.info_id].open(gMap, this);
  });

  // marker drag
  if (user_id !== curUser_id) {
    marker[counter].setDraggable(false);
  } else {
    marker[counter].addListener("dragend", function() {

      // update the database with new position
      if (curUser_id !== 0) {
        $.ajax({
          url: `/point/${this.db_id}`,
          data: {title      : this.title,
                description : this.desc,
                image       : this.image,
                latitude    : this.position.lat(),
                longitude   : this.position.lng(),
                map_id      : this.map_id,
                user_id     : this.user_id},
          method: "PUT",
          success: function(data){
          },

          error: function(err){
            console.log("error");
          }
        });
      }
    });
  }
}

// Add a point from the database
function addExistingPoint(title, desc, img, lat, lng, map_id, user_id, db_id) {

  // random icon
  var icon = iconBase + markerColours[randomInt(0,markerColours.length-1)];

  marker[counter] = new google.maps.Marker({
    position: new google.maps.LatLng(lat, lng),
    map: gMap,
    draggable: true,
    icon: icon,
    animation: google.maps.Animation.DROP,

    // custom properties
    title: title,
    desc: desc,
    image: img,
    info_id: counter,
    map_id: map_id,
    user_id: user_id,
    db_id: db_id,
    editing: false
  });

  addPointCommon(title, desc, img, user_id);

  counter++;
}

// Add a new point on the map
function addNewPoint(title, desc, img, lat, lng) {

  // random icon
  var icon = iconBase + markerColours[randomInt(0,markerColours.length-1)];

  marker[counter] = new google.maps.Marker({
    position: new google.maps.LatLng(lat, lng),
    map: gMap,
    draggable: true,
    icon: icon,
    animation: google.maps.Animation.DROP,

    // custom properties
    title: title,
    desc: desc,
    image: img,
    info_id: counter,
    map_id: curMap_id,
    user_id: curUser_id,
    db_id: undefined,
    editing: false
  });

  addPointCommon(title, desc, img, curUser_id);

  //add to database
  if (curUser_id !== 0) {
    $.ajax({
      url: "/point",
      data: {title      : title,
            description : desc,
            image       : img,
            latitude    : lat,
            longitude   : lng,
            map_id      : curMap_id,
            user_id     : curUser_id},
      method: "POST",
      success: function(data){
        marker[counter].db_id = data[0];
        counter++;
      },
      error: function(err){
        console.log("Error!");
      }
    });
  } else {
    counter++;
  }
}

function getPointsFromDB(map_id) {
  $.ajax( {
    url: `maps/${map_id}/points`,
    method: "GET",
    success: function(obj) {
      for (var i = 0; i < obj.length; i++) {
        addExistingPoint(obj[i]["title"],
                         obj[i]["description"],
                         obj[i]["image"],
                         obj[i]["latitude"],
                         obj[i]["longitude"],
                         obj[i]["map_id"],
                         obj[i]["user_id"],
                         obj[i]["id"]);
      }
    }
  });
}
