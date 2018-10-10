const monk = require('monk') 
const db = monk("mongodb://Admin:password1@ds121343.mlab.com:21343/tv-demo")
const tvShowsCollection = db.get('tv-shows')
const express = require('express')
const app = express()
const port = 3009
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested_With, Content-Type, Accept, Authorization')
    next()
})

//   const tvShows = []

app.get('/tv-demo', async (req, res) => {
    try {
        console.log('beforemongo')
        const TVShowArr = await tvShowsCollection.find({})
        console.log('aftermongo')
        res.send(TVShowArr)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

app.post('/tv-demo', async (req, res) => {
    try {
        const savedTVShow = await tvShowsCollection.insert(req.body)
        res.send(tvShows)
    } catch (error) {
        console.log(error)
        res.send(error)
    }

})

app.put('/tv-demo', (req, res) => res.send('You have changed your selection'))

app.delete('/tv-demo', (req, res) => res.send('Your show was cancelled'))

app.listen(port, () => console.log(` app listening on port ${port}!`))
