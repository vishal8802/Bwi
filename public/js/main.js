$("#search_btn").click(() => {
  console.log("clicked");
  $.post(
    "/find",
    {
      search: $("#searchbox").val()
    },
    async data => {
      await putData(data);
      $("html,body").animate(
        {
          scrollTop: $("#series_name").offset().top
        },
        "slow"
      );
    }
  );
});

//put data to page

async function putData(data) {
  let image_url = `http://image.tmdb.org/t/p/w500${data.poster_path}`;
  let series_bg = `http://image.tmdb.org/t/p/w500${data.backdrop_path}`;
  await $("#detail_bg").css({
    "background-image": `url("${series_bg}")`,
    filter: "blur(5px)"
  });
  $("#thumb").empty();
  await $("#thumb")
    .append(`<img src='${image_url}' class='poster' width=250px></img>`)
    .hide();
  $("#thumb").fadeIn(1500);
  $("#series_name").empty();
  $("#series_name")
    .text(data.original_name)
    .hide();
  $("#series_name").fadeIn();

  let min = data.episode_run_time[0] * data.number_of_episodes;
  let time =
    Math.floor(min / 24 / 60) +
    ":" +
    Math.floor((min / 60) % 24) +
    ":" +
    (min % 60);
  console.log(time);
  $("#time>h1").text(time);
  $(".smallest").text("DD:HH:MM");
  $("#comments").show();
}

//to get most searched =========================================================================

$.post("/get_most_search", {}, data => {
  console.log(data);
  for (let item of data) {
    $("#button-group").append(
      `<button class='popular' onclick='copy(this)'>${item.name}</button>`
    );
  }
});

//search bar functions===========================================================================

$("#searchbox").hide();
$("#search_div").mouseenter(() => {
  $("#searchbox").animate(
    {
      width: "300px",
      fontSize: "30px",
      opacity: "1"
    },
    300
  );
});
$("#search_div").mouseleave(() => {
  $("#searchbox").animate(
    {
      width: "-5px",
      fontSize: "0px",
      opacity: "0"
    },
    300
  );
});

function copy(target) {
  console.log(target.innerText);
  $("#searchbox").val(target.innerText);
  $("#searchbox").animate(
    {
      width: "300px",
      fontSize: "30px",
      opacity: "1"
    },
    300
  );
  $("#search_div").unbind("mouseleave");
}
