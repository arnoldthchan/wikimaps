
$(document).ready(() => {

  var map;
  $.ajax({
    method: "GET",
    url: "/maps"
  }).done((maps) => {
    for(map of maps) {
      var heart = $('<i class="float-right glyphicon glyphicon-heart">');

      var item  = $(`<li data-mapid="${map.id}" class="listItem">`).text(map.title).append(heart);
      $('ul.list').append(item);
    }
  });
  $.ajax({
    method: "GET",
    url: "/favourite"
  }).done((maps) => {
    for(map of maps) {
      var heart = $('<i class="float-right glyphicon glyphicon-heart">');
      var fav   = $(`<a data-mapid="${map.id}" class="listItem">`).text(map.title).append(heart);
      $('div#sidebar').append(fav);
    }
  });
  $("body").on('click', '.listItem', (event) => {
    let mapid= $(event.target).data('mapid');
    displayNewMap(mapid);
  });

  $('nav').on('click', 'a#favs', (event) =>{
    $("#sidebar").toggleClass("active");
  })
  $('body').on('click', '.glyphicon-heart', (event) =>{
    event.stopPropagation();
    console.log('HEART CLICKED');
    console.log($(event.target).parent('.listItem').data('mapid'))
  })

  //TEST WITH NUM KEYS (1-5)
  // $(document).on('keyup', (event) => {
  //   switch (event.which) {
  //     case 49:
  //       displayNewMap(1);
  //       break;
  //     case 50:
  //       displayNewMap(2);
  //       break;
  //     case 51:
  //       displayNewMap(3);
  //       break;
  //     case 52:
  //       displayNewMap(4);
  //       break;
  //     case 53:
  //       displayNewMap(5);
  //       break;
  //   }
  // });

});

