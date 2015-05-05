var pickfile = require('./');

pickfile({
    dirs: ['./test'],
    type: ['vm'],
    exclude: ['node_module', '.git'],
    filter: function(file, content, next){

    },
    done: function(){

    }
});