var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/dbname', function(err) {
    if (err) throw err;
});