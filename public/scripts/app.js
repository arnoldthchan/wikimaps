
$(document).ready(() => {

  var map;

  $.ajax({
    method: "GET",
    url: "/maps"
  }).done((maps) => {
    for(map of maps) {
      let link = $('<a>').attr('href',`/maps/${map.id}`).text(map.title)
      let item = $('<li>').append(link);
      $('ul.list').append(item);
    }
  });

  $(document).on('keyup', (event) => {
    switch (event.which) {
      case 49:
        displayNewMap(1);
        break;
      case 50:
        displayNewMap(2);
        break;
      case 51:
        displayNewMap(3);
        break;
      case 52:
        displayNewMap(4);
        break;
      case 53:
        displayNewMap(5);
        break;
    }
  });
});

