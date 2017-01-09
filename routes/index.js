var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	res.render ('index');
});

// gets the available fields
router.get('/pitcherKeys', function(req, res) {
  return res.status(200).send(req.app.locals.pitcherData.keys);
});

router.get('/batterKeys', function(req, res) {
  return res.status(200).send(req.app.locals.batterData.keys);
});

// returns projection data
router.get('/pitchers', function(req, res) {
  let returnData = [];

  if (1 === req.params){

  } else {
    req.app.locals.pitcherData.data.forEach( arr => {
      let tmpObj = {};
      for (var x = 0; x < arr.length; x++ ){
        tmpObj[req.app.locals.pitcherData.keys[x]] = arr[x];
      }

      returnData.push(tmpObj);
    });
  }

  return res.status(200).send(returnData);
});

// returns projection data
router.get('/batters', function(req, res) {
  let returnData = [];

  if (1 === req.params){

  } else {
    req.app.locals.batterData.data.forEach( arr => {
      let tmpObj = {};
      for (var x = 0; x < arr.length; x++ ){
        tmpObj[req.app.locals.batterData.keys[x]] = arr[x];
      }

      returnData.push(tmpObj);
    });
  }

  return res.status(200).send(returnData);
});

module.exports = router;
