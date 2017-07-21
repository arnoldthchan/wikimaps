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

$(document).ready(() => {
  $.ajax({
    method: "GET",
    url: "/maps"
  }).done((maps) => {
    for(map of maps) {
      $(`<br> <a href="/maps/${map.id}" class="list">`).text(`${map.title}`).prependTo($("span#list-box"));
    }
    $('<p></p>').appendTo($("h2#favourites"));
    $('<a href="/maps/1" class="list">').text('HARD CODED FAVOURITE').appendTo($("h2#favourites"));
  });
});

