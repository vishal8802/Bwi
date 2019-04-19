const express = require('express')
const app = express()
const utility = require('./functions')
const {
    db,
    Search
} = require('./db/db')
const PORT = process.env.PORT || 7777

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use('/', express.static(__dirname + '/public'))

//post handler to find details

app.post('/find', async (req, res) => {
    let seriesDetails = await utility.getTime(req.body.search)
    if (seriesDetails == `no result found :(`) {
        res.send(seriesDetails)
    } else {
        let search = req.body.search.replace(/%20/g, ' ')
        utility.saveSearch(search)
        console.log('this must be last')
        res.send(seriesDetails)
    }
})
// app.get('/s', (req, res) => {
//     res.send('hello')
// })

app.post('/get_most_search', async (req, res) => {
    let data = await utility.getMostSearch()
    // console.log(data)
    res.send(data)
})

db.sync({
    force: false
}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}`)
    })
})