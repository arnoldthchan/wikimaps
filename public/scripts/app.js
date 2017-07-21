
$(() => {
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
});

