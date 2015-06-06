'use strict';

var Lab = require('lab');
var Code = require('code');
var Hapi = require('hapi');
var Server = require('../lib');

// Shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;

describe('Version module', function () {

    it('should insert a version route on server', function (done) {

        Server.init(8080, function (err, server) {

            server.inject('/version', function (res){

                expect(res.statusCode).to.equal(200);
            });
            server.stop(done);
        });
    });
});
