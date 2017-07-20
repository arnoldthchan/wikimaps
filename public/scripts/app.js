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
      console.log(map);
      $(`<a href = "/maps/${map.id}">`).text(`${map.title}, By: ${map.creator_id}`).appendTo($("#list-box"));
      $('<p>').appendTo($("span#list-box"));
    }
  });;
});
