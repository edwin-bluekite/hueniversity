'use strict';

var Hapi = require('hapi');
var Lab = require('lab');
var Code = require('code');
var Version = require('../lib/version');

var internals = {};

// Shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;
var Server = require('../lib');

describe('Server', function () {

    it('should get a running server1', function (done) {

        Server.init(null, function (err, server){

            expect(err).to.not.exist();
            expect(server).to.be.an.instanceof(Hapi.Server);
            server.stop(done);
        });
    });

    it('should get a running server in specific port', function (done) {

        var port = 9000;
        Server.init(port, function (err, server){

            expect(err).to.not.exist();
            expect(server.info.port).to.equal(port);
            server.stop(done);
        });
    });

    it('should get an error without port param', function (done) {

        Server.init(null, function (err, server){

            expect(err).to.not.exist();
            expect(server.info.port).to.equal(8000);
            server.stop(done);
        });
    });

    it('should get an error', { parallel: true }, function (done){

        var register = Version.register;
        Version.register = function (server, options, next){

            return next(new Error('registration fial'));
        };

        Version.register.attributes = {
            name: 'fake version'
        };

        Server.init(0, function (err, server){

            expect(err).to.exist();
            Version.register = register;
            done();
        });
    });
});
