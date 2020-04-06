const path = require('path');

const express = require('express');
const hbs = require('hbs');

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000;

// console.log(__dirname); // points to the directory where the file is called from.
// console.log(__filename); // points to the file being currently served.

// Define path for Express config
const publicDir = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// set up handlebars engine
app.set('view engine', 'hbs');

// by default express looks for hbs templates in view folder. To point it to another folder
app.set('views', viewPath);

// register partials folder
hbs.registerPartials(partialsPath);

// The root argument (publicDir here) specifies the root directory from which to serve static assets.
app.use(express.static(publicDir));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Anirudh Mahajan'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me HBS',
    name: 'Anirudh Mahajan'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help HBS',
    name: 'Anirudh Mahajan',
    docTitle: 'Help',
    helpMsg: 'Generic help message'
  })
})

app.get('/weather', (req, res) => {
  const searchLocation = req.query.location;

  if (!searchLocation) {
    return res.send({
      error: 'Please enter a location.'
    })
  }

  geocode(searchLocation, (err, { latitude, longitude, location } = {}) => {
    if (err) {
      return res.send({
        error: err
      });
    };

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error: error
        });
      }

      return res.send({
        address: searchLocation,
        location,
        forecast: forecastData
      });
    })
  });
});

// query params can be accessed via req obj.
app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'Please enter a search term.'
    })
  }
  console.log(req.query.search);
  // if res.send is executed more than 1, it throws an error as same res can't be sent again.
  res.send({
    products: []
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Error HBS',
    name: 'Anirudh Mahajan',
    errorMsg: 'Requested page not found'
  });
});

/* app.get('*', (req, res) => {
  res.render('404', {
    title: 'Error HBS',
    name: 'Anirudh Mahajan',
    errorMsg: 'Requested page not found'
  })
}); */

// Another way to set 404 page.
app.use((req, res, next) => {
  res.status(404).render('404', {
    title: 'Error HBS',
    name: 'Anirudh Mahajan',
    errorMsg: 'Requested page not found'
  })
});

app.listen(port, () => {
  console.log('Server is up at port ' + port + '.');
});
