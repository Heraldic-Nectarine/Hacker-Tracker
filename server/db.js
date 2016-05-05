var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/friendfinder', function(err) {
    if (err) throw err;
});
