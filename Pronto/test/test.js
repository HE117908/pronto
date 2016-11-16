var assert = require('assert');
var request = require("request");
var expect = require('chai').expect;
var helloWorld = require("../serveur.js");
var base_url = "http://localhost:3000/";

describe("Home Server", function() {
    describe("GET /", function() {
        it("returns status code 200", function(done) {
            request.get(base_url, function(error, response, body) {
                //expect(response.statusCode).toBe(200);
                assert.equal(200, response.statusCode);
                done();
            });
        });
    });

    describe("GET /login", function() {
        it("returns status code 200", function(done) {
            request.get(base_url+'/login.html', function(error, response, body) {
                //expect(response.statusCode).toBe(200);
                assert.equal(200, response.statusCode);
                done();
            });
        });
    });

    describe("GET /cuisine", function() {
        it("returns status code 200", function(done) {
            request.get(base_url+'/cuisine.html', function(error, response, body) {
                //expect(response.statusCode).toBe(200);
                assert.equal(200, response.statusCode);
                done();
            });
        });
    });

    describe("GET /bar", function() {
        it("returns status code 200", function(done) {
            request.get(base_url+'/bar.html', function(error, response, body) {
                //expect(response.statusCode).toBe(200);
                assert.equal(200, response.statusCode);
                done();
            });
        });
    });
});







describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            assert.equal(-1, [1,2,3].indexOf(4));
        });
    });
});