var express = require('express');
var router = express.Router();

// validates the scoring settings
let validateScoringQuery = req => {
	let query = req.query;
	if (0 === Object.keys(query).length) return true;

	let batterKeys = req.app.locals.batterData.keys;
	let pitcherKeys = req.app.locals.pitcherData.keys;

	// all the scoring settings must correspond to a pitcher or batter stat
	for (var x in query){
		let y = x.substr(2, x.length-1);

		if (pitcherKeys.indexOf(y) !== -1 || batterKeys.indexOf(y) !== -1){
			// check if number
			if (isNaN(query[x])) {
				return false; 
			}
				//scores must be numbers
		} else {
			return false;
		}
	}

	return true;
};

const keysToIgnore = ['playerid', 'WAR', 'RA9-WAR', 'FIP', 'ERA', 'Name', 'Team', 
	'AVG', 'OBP', 'BB/9', 'K/9', 'SLG', 'OPS', 'WHIP', 'wOBA', 'wRC+', 'BsR', 'Fld', 'Off', 'Def', 'G', 'GS'];
// functor used to ignore playerid in an array
let filterToIgnore = val => (keysToIgnore.indexOf(val) === -1);

/* GET home page. */
router.get('/', function(req, res) {
	let viewData = {};

	if (!validateScoringQuery(req)) return res.status(500).send('Error: query string invalid');
	
	// build view data
	viewData.query = JSON.stringify(req.query);
	viewData.batterKeys = JSON.stringify(req.app.locals.batterData.keys.filter(filterToIgnore));
	viewData.pitcherKeys = JSON.stringify(req.app.locals.pitcherData.keys.filter(filterToIgnore));

  res.render ('index', viewData);
});

module.exports = router;
