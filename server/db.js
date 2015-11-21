var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/friendFinder', function(err) {
    if (err) throw err;
});
