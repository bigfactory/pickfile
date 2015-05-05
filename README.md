## Install

```
npm install --save pickfile
```

## Usage

```
var pickfile = require('pickfile');

pickfile({
    dirs: ['/User/test/'],
    type: ['js', 'css'],
    exclude: ['node_module', '.git'],
    filter: function(file, content, next){

    },
    done: function(){
        console.log('all file done');
    }
});

```