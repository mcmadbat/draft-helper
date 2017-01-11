var express = require('express');
var router = express.Router();

let buildPlayerData = (keys, obj) => {
  let ret = {};

  // build the key value pairs in a loop
  for (var x = 0; x < keys.length; x++){
    ret[keys[x]] = obj[x];
  } 

  return ret;
}

// gets the available fields
router.get('/pitcherKeys', function(req, res) {
  return res.status(200).json(req.app.locals.pitcherData.keys);
});

router.get('/batterKeys', function(req, res) {
  return res.status(200).json(req.app.locals.batterData.keys);
});

// gets the player names (for autocomplete)
router.get('/players', function(req, res) {
  let func = obj => {
    return {
      name: obj[0],
      id: obj[obj.length-1]
    }
  };

  let names = [...req.app.locals.batterData.data.map(x => func(x)), ...req.app.locals.pitcherData.data.map(x => func(x))];
  return res.status(200).json(names);
});

// returns projection data
// should only be used to search for a player via id
router.get('/pitchers', function(req, res) {
  // if there is a user name query 
  if (!req.query.id){
    return res.status(400).send('please include id as part of search query')
  } else {
    let found = req.app.locals.pitcherData.data.find(v => {
      return v[v.length-1] === req.query.id;
    });

    if (found){
      return res.status(200).json(buildPlayerData(req.app.locals.pitcherData.keys, found));
    } else {
      return res.status(400).send(`no match found for playerid ${req.query.id}`);
    }
  }
});

// returns projection data
// should only be used to search for a player via id
router.get('/batters', function(req, res) {
  // if there is a user name query 
  if (!req.query.id){
    return res.status(400).send('please include id as part of search query')
  } else {
    let found = req.app.locals.batterData.data.find(v => {
      return v[v.length-1] === req.query.id;
    });

    if (found){
      return res.status(200).json(buildPlayerData(req.app.locals.batterData.keys, found));
    } else {
      return res.status(400).send(`no match found for playerid ${req.query.id}`);
    }
  }
});

module.exports = router;
