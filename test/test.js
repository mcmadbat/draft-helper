var assert = require('assert');
var request = require('supertest');

process.env.NODE_ENV = 'test';

var app = require ('../app');

var expect = require('expect.js');

before(function (done) {
	// wait until app is loaded
  app.on("appStarted", function(){
    done();
  });
});

describe('API', function (){
	it('GET /api/players', function (){
		request(app).get('/api/players')
			.expect('Content-Type', /json/)
			.expect(200);
	});

	it('GET /api/batterKeys', function (){
		request(app).get('/api/batterKeys')
			.expect('Content-Type', /json/)
			.expect(200);
	});

	it('GET /api/pitcherKeys', function (){
		request(app).get('/api/pitcherKeys')
			.expect('Content-Type', /json/)
			.expect(200);
	});

	it('GET /api/pitchers (no id)', function (){
		request(app).get('/api/pitcherKeys')
			.expect(500);
	});

	it('GET /api/pitchers?id=6785', function (){
		request(app).get('/api/pitchers?id=6785')
			.expect('Content-Type', /json/)
			.expect(200);
	});

	it('GET /api/batters (no id)', function (){
		request(app).get('/api/batters')
			.expect(500);
	});

	it('GET /api/batters?id=10155', function (){
		request(app).get('/api/batters?id=10155')
			.expect('Content-Type', /json/)
			.expect(200);
	});
});