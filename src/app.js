const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

// Define paths for express config and 
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home',
        name: 'Ram Bandi',
        age: 27
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Sam',
        age: 25
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'You are currently viewing a Help Handlebars Page',
        title: 'Help',
        name: 'someHelp'
    })
})

/*app.get('', (req, res) => {
    res.send('<h1>Hello Ram</h1>')
})

app.get('/help', (req, res) => {
    res.send([{
        name: 'Ram',
        age: 27
    },{
        name: 'Sam',
        age: 25
    },{
        name: 'Honey',
        age:5
    }])
})

app.get('/about', (req, res) => {
    res.send('<title>About Title</title>')
})*/

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide a address term'
        })
    }
    /*res.send({location: {
        name: 'New York',
        country: 'United States of America',
        region: 'New York',
        address: req.query.address
        }})*/

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        // console.log('Error: ', error)
        // console.log('Response: ', response)
        if(error){
            //return console.log(error)
            return res.send({ error })
        }
        const loc = location.substr(0, location.indexOf(','));
        //forecast(40.7306, -73.9866, (error, response) => {
        //forecast(loc, (error, response) => {
        forecast({latitude, longitude}, (error, forecastData) => {
            // console.log('Error: ', error)
            // console.log('Response: ', response)
            if(error){
                //return console.log(error)
                return res.send({ error })
            }
            // console.log(location)
            // console.log(forecastData)
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    //res.send('Help article Not found')
    res.render('404error', {
        message: 'Help article not found',
        name: 'Ram',
        title: 404
    })
})

app.get('*', (req, res) => {
    //res.send('My 404 Page '+req.params)
    res.render('404', {
        message: 'Page not found!',
        name: 'Ram',
        title: 404
    })
})

app.listen(3000, () => {
    console.log('Server is up and running!')
})