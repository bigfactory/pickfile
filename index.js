
var path = require('path');
var fs = require('fs');
var walk = require('fs-walk');
var async = require('async');
var inArray = require('in-array');
var noop = function(){};

module.exports = function(options){
    var picker = new Picker(options);

    if(options.filter){
        picker.pick();
    }
};

function fixType(type) {
    if(!type || !type.length){
        return type;
    }
    for (var i = 0, len = type.length; i < len; i++) {
        if(type[i][0] != '.'){
           type[i] = '.' + type[i]; 
        }
    }

    return type;
}

function checkExclude(exclude, filename){
    for(var i = 0, len = exclude.length; i < len; i++){
        if(filename.indexOf(exclude[i]) !== -1){
            return true;
        }
    }
    return false;
}

function Picker(options){
    this.dirs = options.dirs;
    this.type = options.type || [];
    this.exclude = options.exclude || [];
    this.filter = options.filter || noop;
    this.done = options.done || noop;

    this.type = fixType(this.type);
}

Picker.prototype.pick = function(filter){
    var picker = this;

    if(filter){
        this.filter = filter;
    }

    async.each(picker.dirs, function(dir, nextDir) {
        walk.files(dir, function(base, filename, stat, nextFile) {

            var ext = path.extname(filename);
            var file = path.join(base, filename);
            var content;

            if (
                checkExclude(picker.exclude, file) ||
                !ext || 
                !inArray(picker.type, ext)
                )
            {
                nextFile();
                return;
            }

            content = fs.readFileSync(file);

            picker.filter(file, content, nextFile);

        }, function(err) {
            nextDir();
        });
    }, function() {
        picker.done();
    })
};