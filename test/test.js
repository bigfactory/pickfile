
var path = require('path');
var pickfile = require('../');

var testDir = path.resolve('./test/folderA');

describe('pickfile', function() {
    it('should pick file exactly', function(done) {
        

        var files = [];

        pickfile({
            dirs: [testDir],
            type: ['js', 'txt'],
            filter: function(file, content, next){
                files.push(file);
                next();
            },
            done: function(){
                files.length.should.eql(2);
                done();
            }
        })
    });
});

describe('pickfile', function() {
    it('should pick file not in exclude', function(done) {
        

        var files = [];

        pickfile({
            dirs: [testDir],
            type: ['js', 'txt'],
            exclude: ['folderB'],
            filter: function(file, content, next){
                files.push(file);
                next();
            },
            done: function(){
                files.length.should.eql(1);
                done();
            }
        })
    });
});

describe('pickfile', function() {
    it('should pick file by type', function(done) {
        

        var files = [];

        pickfile({
            dirs: [testDir],
            type: ['js'],
            filter: function(file, content, next){
                files.push(file);
                next();
            },
            done: function(){
                files.length.should.eql(1);
                done();
            }
        })
    });
});
