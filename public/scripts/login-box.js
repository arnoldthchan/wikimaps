$(document).ready(function() {
  $('a.login-window').click(function() {

    //Fade in the Popup
    $('#login-box').fadeIn(300);

    // Add the mask to body
    $('body').append('<div id="mask"></div>');
    $('#mask').fadeIn(300);
  });

  // When clicking on the button close or the mask layer the popup closed
  $('body').on('click', 'a.close, #mask', function() {
    $('#mask , .login-popup').fadeOut(300 , function() {
      $('#mask').remove();
    });
  });

  //Toggles favourites sidebar visibility
  $("#favs").click(function(event) {
    event.preventDefault();
    $("#wrapper").toggleClass("toggled");
  });
});
