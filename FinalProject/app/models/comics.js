/**
 * Created by Grant on 4/20/2016.
 */
var mongoose = require('mongoose');

// define the schema for our user model
var comicSchema = mongoose.Schema({
        comicNum     : String,
        comment      : String,
        published    : Boolean

});

// methods ======================



// create the model for users and expose it to our app

//var abComics = mongoose.model('abComics', comicSchema);
module.exports = mongoose.model('abComics', comicSchema);