$.post('/find', {
    search: $('#searchbox').val()
}, async (data) => {
    let image_url = `http://image.tmdb.org/t/p/w500${data.poster_path}`
    let series_bg = `http://image.tmdb.org/t/p/w500${data.backdrop_path}`
    await $('#detail_bg').css({
        'background-image': `url("${series_bg}")`,
        'filter': 'blur(0.2rem)'
    })

    await $('#thumb').append(`<img src='${image_url}' class='poster' width=250px></img>`).hide()
    $('#thumb').fadeIn(1500)
    $('#series_name').empty()
    $('#series_name').text(data.original_name).hide()
    $('#series_name').fadeIn()

    let min = data.episode_run_time[0] * data.number_of_episodes
    let time = Math.floor(min / 24 / 60) + ":" + Math.floor(min / 60 % 24) + ':' + min % 60
    console.log(time)
    $('#time>h1').text(time)
    $('.smallest').text('DD:HH:MM')

    $('#comments').show()
})