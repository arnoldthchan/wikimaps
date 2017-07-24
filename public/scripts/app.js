$(document).ready(() => {

  var map;
  //Populates/refreshes list dropdown and favourites sidebar
  function loadPoints(){
    $.ajax({
      method: "GET",
      url: "/maps"
    }).done((maps) => {
      $("ul.list").empty();
      // Iterates through every instance of map, will add heart and append to List dropdown
      for(map of maps) {
        if (userJSON.id !== 0) {
          var heart = $(`<i class="float-right glyphicon glyphicon-heart">`);
          for (var i = 0; i < favouritesJSON.length; i++) {
            if (favouritesJSON[i]["map_id"] === map.id) {
              heart.addClass("liked");
            }
          }
        }
        var item  = $(`<li data-mapid="${map.id}" class="listItem">`).text(map.title).append(heart);
        $("ul.list").append(item);
      }
    });

    $.ajax({
      method: "GET",
      url: `favourites/${userJSON.id}`,
    }).done((maps) => {
      $("div#sidebar").empty();
      // Iterates for every favourite based on user.id
      for(map of maps) {
        var fav   = $(`<a data-mapid="${map.id}" class="listItem">`).text(map.title);
        $("div#sidebar").append(fav);
      }
    });
  }
  // On click listener for list items, will display corresponding map
  $("body").on("click", ".listItem", (event) => {
    let mapid= $(event.target).data("mapid");
    displayNewMap(mapid);
  });
  // Hide and show toggle for favourites sidebar
  $("nav").on("click", "a#favs", (event) =>{
    $("#sidebar").toggleClass("active");
  })
  // Sends post request with form value when Create button is pressed
  $("nav").on("click", "#new-point", (event) =>{
    let input = $(".new-point").val()
    let coords = gMap.getCenter()
    console.log(input);
    if (input){
      $.ajax({
        url: "map",
        method: "POST",
        data:{
         creator_id : userJSON.id,
         title      : input,
         latitude   : coords.lat(),
         longitude  : coords.lng()
        },
        success: function() {
          console.log(`${input} created!`);
          loadPoints();
        },
        error: function(err) {
          console.log(err);
        }
      });
    }
  })
  // Toggles heart and updates favourite with put request when heart is clicked
  $("body").on("click", ".glyphicon-heart", (event) =>{
    event.stopPropagation();
    let mapID = $(event.target).parent(".listItem").data("mapid");
    $(event.target).toggleClass("liked");
    let isLiked = $(event.target).hasClass("liked");
    if (userJSON.id !== 0) {
      $.ajax({
        url: `/favourites?user_id=${userJSON.id}&map_id=${mapID}&state=${isLiked}`,
        method: "PUT",
        success: function() {
          if (isLiked) {
            var fav   = $(`<a data-mapid="${mapID}" class="listItem">`).text(map_names[mapID-1]);
            $("div#sidebar").append(fav);
          } else {
            $("div#sidebar").find(`[data-mapid=${mapID}]`).remove();
          }
        },
        error: function(err) {
          console.log(err);
        }
      })
    }
  });
  //Populates once for when page is loaded
  loadPoints();
});

