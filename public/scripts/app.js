// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });

$(() => {
  $.ajax({
    method: "GET",
    url: "/maps"
  }).done((maps) => {
    for(map of maps) {
      let list = $('<li>');
      let link = $('<a>').attr('href',`/maps/${map.id}`).text(map.title)
      let item = $(list).append(link);
      $('ul.list').append(item);
    }
  });
});

