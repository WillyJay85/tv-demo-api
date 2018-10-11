const monk = require('monk')
const db = monk("mongodb://Admin:password1@ds121343.mlab.com:21343/tv-demo")
const tvShowsCollection = db.get('tv-shows')
const express = require('express')
const app = express()
const port = 3009
const Joi = require('joi')
const bodyParser = require('body-parser')

app.use(bodyParser.json())

const schema = Joi.object().keys({
    name: Joi.string().regex(/^[a-zA-Z0-9 ]{3,30}$/).required(),
    rating: Joi.number().integer().min(1).max(5).required(),
    imageUrl: Joi.string().uri().required()
})

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested_With, Content-Type, Accept, Authorization')
    next()
})

app.get('/tv-demo', async (req, res) => {
    try {
        const TVShowArr = await tvShowsCollection.find({})
        res.send(TVShowArr)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

app.post('/tv-demo', async (req, res) => {
    let result = Joi.validate(req.body, schema)
    if (result.error) { res.send(result.error) }
    else {
        try {
            const savedTVShow = await tvShowsCollection.insert(req.body)
            res.send(tvShows)
        } catch (error) {
            console.log(error)
            res.send(error)
        }

    }
})

app.put('/tv-demo', (req, res) => res.send('You have changed your selection'))

app.delete('/tv-demo', (req, res) => res.send('Your show was cancelled'))

app.listen(port, () => console.log(` app listening on port ${port}!`))
