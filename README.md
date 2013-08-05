xapt
==========

Validate & convert xFace application package

###Usage
* Install it with npm

    ``npm install xapt -g``

* To validate an app

    ``xapt test.zip``

    Options:
      ``-m, --minify  use uglify.js to minify *.js``
      ``-t, --target  target filename``

###API
````javascript
var xapt=require('xapt');

xapt({
    source:'test.zip',  //required
    target:'test.xpa',  //optional
    minify:true   //optional
});
````
