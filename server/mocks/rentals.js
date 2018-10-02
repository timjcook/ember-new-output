// @ts-check
/* eslint-env node */
'use strict';
const express = require('express');

const ALL_RENTALS = [
  {
    type: 'rentals',
    id: 'grand-old-mansion',
    attributes: {
      title: "Grand Old Mansion",
      owner: "Veruca Salt",
      city: "San Francisco",
      category: "Estate",
      bedrooms: 15,
      image: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg",
      description: "This grand old mansion sits on over 100 acres of rolling hills and dense redwood forests."
    }
  },
  {
    type: 'rentals',
    id: 'urban-living',
    attributes: {
      title: "Urban Living",
      owner: "Mike Teavee",
      city: "Seattle",
      category: "Condo",
      bedrooms: 1,
      image: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Alfonso_13_Highrise_Tegucigalpa.jpg",
      description: "A commuters dream. This rental is within walking distance of 2 bus stops and the Metro."
    }
  },
  {
    type: 'rentals',
    id: 'downtown-charm',
    attributes: {
      title: "Downtown Charm",
      owner: "Violet Beauregarde",
      city: "Portland",
      category: "Apartment",
      bedrooms: 3,
      image: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Wheeldon_Apartment_Building_-_Portland_Oregon.jpg",
      description: "Convenience is at your doorstep with this charming downtown rental. Great restaurants and active night life are within a few feet."
    }
  }
];

/**
 * @param {express.Request} request
 */
function dataForRequest(request) {
  if (request.query.city !== undefined) {
    return ALL_RENTALS.filter(function (i) {
      return i.attributes.city.toLowerCase().indexOf(request.query.city.toLowerCase()) !== -1;
    });
  } else {
    return ALL_RENTALS;
  }
}

module.exports = function(app) {
  let rentalsRouter = express.Router();

  rentalsRouter.get('/', function(req, res) {

    const data = dataForRequest(req);
    res.send({
      "jsonapi": {
        "version": "1.0"
      },
      data
    });
  });

  rentalsRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  rentalsRouter.get('/:id', function(req, res) {
    res.send({
      'rentals': {
        id: req.params.id
      }
    });
  });

  rentalsRouter.put('/:id', function(req, res) {
    res.send({
      'rentals': {
        id: req.params.id
      }
    });
  });

  rentalsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  // The POST and PUT call will not contain a request body
  // because the body-parser is not included by default.
  // To use req.body, run:

  //    npm install --save-dev body-parser

  // After installing, you need to `use` the body-parser for
  // this mock uncommenting the following line:
  //
  //app.use('/api/rentals', require('body-parser').json());
  app.use('/api/rentals', rentalsRouter);
};
