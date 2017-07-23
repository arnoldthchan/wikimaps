$(document).ready(function() {
  var map;
  $('a.popup-window').click(function() {

    //Fade in the Popup
    $('#popup-box').fadeIn(300);

    // Add the mask to body
    $('body').append('<div id="mask"></div>');
    $('#mask').fadeIn(300);

  });

  // When clicking on the button close or the mask layer the popup closed
  $('body').on('click', 'a.close, #mask', function() {
    $('#mask , #popup-box').fadeOut(300 , function() {
      $('#mask').remove();
    });
  });

  //Toggles favourites sidebar visibility
  $("#favs").click(function(event) {
    event.preventDefault();
    $("#wrapper").toggleClass("toggled");
  });
  $.ajax({
    method: "GET",
    url: "/favourite"
  }).done((maps) => {
    for(map of maps) {
      var fav = $(`<li data-mapid="${map.id}" class="list-group-item">${map.title}</li>`);
      var heart = $('<i class="glyphicon glyphicon-heart">');
      $('ul.favs').append(heart, fav);
    }
  });
});
