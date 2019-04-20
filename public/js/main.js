$(".lds-rolling").hide();
$(".search").css({
  top: `${$(".msg2").offset().top + 150}px`
});
$(window).resize(() => {
  $(".search").css({
    top: `${$(".msg2").offset().top + 150}px`
  });
});

$("#search_btn").click(async () => {
  console.log("clicked");
  $(".no_result").text("");
  await $("#searchbox").animate(
    {
      width: "-5px",
      fontSize: "0px",
      opacity: "0"
    },
    200
  );
  $("#search_div").fadeOut(300);
  $(".lds-rolling").show();
  $.post(
    "/find",
    {
      search: $("#searchbox").val()
    },
    async data => {
      if (data == `no result found :(`) {
        console.log("no res found");
        $(".no_result").text(data);
      } else {
        await putData(data);
        $("html,body").animate(
          {
            scrollTop: $("#series_name").offset().top - 200
          },
          "slow"
        );
      }
      $(".lds-rolling").hide();
      $("#search_div").fadeIn(500);
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
  $(".smallest").show();
  $(".no_of_seasons").html(data.number_of_seasons);
  $(".seasons").show();
  $(".name").text(data.original_name);
  $(".overview").text(data.overview);
  let genres = ``;
  let language = ``;
  let creator = ``;
  let producer = ``;
  data.genres.forEach(name => {
    genres += ` ${name.name} |`;
  });
  genres = genres.slice(0, -1);

  data.languages.forEach(name => {
    language += ` ${name},`;
  });
  language = language.slice(0, -1);

  data.created_by.forEach(name => {
    creator += ` ${name.name},`;
  });
  creator = creator.slice(0, -1);

  data.production_companies.forEach(name => {
    if (name.origin_country) {
      producer += ` ${name.name} | ${name.origin_country},`;
    } else {
      producer += ` ${name.name},`;
    }
  });
  producer = producer.slice(0, -1);

  $(".genre").html(`GENRE : ${genres}`);
  $(".language").html(`LANGUAGE : ${language}`);
  $(".creators").html(`CREATED BY : ${creator}`);
  $(".producers").html(`PRODUCED BY ; ${producer}`);
  $(".details").show();
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

let window_width = 0;
$("#searchbox").hide();
$("#search_div").mouseenter(() => {
  window_width = $(window).width();
  if (window_width < 820) {
    window_width = 200;
  } else {
    window_width = 300;
  }
  console.log(window_width);
  $("#searchbox").animate(
    {
      width: `${window_width}px`,
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
