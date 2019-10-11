const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebar engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Mohit Nagori'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Mohit Nagori'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'this is some helpful text!!!',
        title: 'Help',
        name: 'Mohit Nagori'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Address must be provided!!'
        })
    }

    geocode(req.query.address, (error,  { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        } 
        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            } 
            
            return res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    });
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must return a serach term' 
        });        
    }
    res.send({
        products: []
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found',
        title: '404',
        name: 'Mohit Nagori'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found',
        title: '404',
        name: 'Mohit Nagori'
    });
});

app.listen(port, () => {
    console.log('server is up on port ' + port);
});