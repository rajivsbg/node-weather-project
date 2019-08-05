const path = require('path')
const express = require('express')
const hbs = require('hbs')
const locationUtil = require('./utils/location')
const weatherUtil = require('./utils/weather.js');


const app = express()
const port = process.env.PORT || 3000
console.log(__dirname)
console.log(__filename)

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname, '../templates/partials')

//Setup handlebar engine and view locations
app.set('view engine', 'hbs')
app.set('views', viewPath)

hbs.registerPartials(partialPath)

//To serve static files such as images, CSS files, and JavaScript files,
// use the express.static built-in middleware function in Express.
// for app.use() need to see this link http://expressjs.com/en/guide/writing-middleware.html#writing-middleware-for-use-in-express-apps

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));



app.get('', (req, res)=> {
    res.render('index', {
      'title': 'Weather',
      'name': 'Rajiv Sah'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        'title': 'About me',
        'name': 'Rajesh Sah'
    });
})

app.get('/help', (req, res) => {
    res.render('help',{
        'title': 'Need help',
        'name': 'Ravi Sah'
    });
})

//If we are uisng express static then no need to give empty route
// app.get('', (req, res) => {
//     res.send('<h1>Welcome to express page</h1>');
// })


app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
           'error': 'Address must be provided.'
        })
    }
    
    // If Address query string is there then below code will run
    locationUtil.getGeoLocation(req.query.address, (error, { lattitude, longitude, place } = {} /* object de structure*/)=> {
        if(error) {
            return res.send({error});
        }
        weatherUtil.getForcast(lattitude, longitude, (error, { temperature, preciptation, summary } = {} /* object de structure*/)=> {
            if(error) {
                return res.send({error});
            } 
            const weatherObj = {
                'summary': summary + '. It is currently ' + temperature + ' degree outside. There is a ' + preciptation + '% chance of rain.',
                'location': place,
                'address': req.query.address
            }
            res.send(weatherObj);
        });
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        'title': '404 Help',
        'name': 'Rajiv Kumar Sah',
        'errorMessage': 'Help article not found'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        'title': '404',
        'name': 'Rajiv Kumar Sah',
        'errorMessage': 'Page not found'
    });
})

// express server is listening in port 3000
app.listen(port, () => {
   console.log('Server is up on port' + port);
})