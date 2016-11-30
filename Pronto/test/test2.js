
var expect = require('chai').expect;
var webdriverio = require('webdriverio');

var options = {
    desiredCapabilities: {
        browserName: 'chrome'
    }
};

describe('WebdriverIO Sample Test', function () {
    it('should return "Pronto"', function () {
        webdriverio
            .remote(options)
            .init()
            .url('http://localhost:3000')
            .getTitle().then(function(title) {
            assert.equal("Pronto", title);
                })
            .end();
    })

    it('should return "Bar"', function () {
        webdriverio
            .remote(options)
            .init()
            .url('http://localhost:3000/bar.html')
            .getTitle().then(function(title) {
            assert.equal("Bar", title);
        })
            .end();
    })

    it('should return "Cuisine"', function () {
        webdriverio
            .remote(options)
            .init()
            .url('http://localhost:3000/cuisine.html')
            .getTitle().then(function(title) {
            assert.equal("Cuisine", title);
        })
            .end();
    })
});
