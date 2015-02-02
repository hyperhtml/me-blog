var mongoClient = require('mongodb').MongoClient;

var Server = mongoClient.Server;
var Db = mongoClient.db
var BSON = mongoClient.pure().BSON;

// Setup db connection
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('blogdb', server);

// Open db connection
db.open(function(err, db){
    if(!err){
        console.log("Connected to 'blogdb' database");
        db.collection('posts', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'posts' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    } else {
        console.log("Error connecting to 'blogdb' database");
    }
});




// List all blog entries
exports.findAll = function(req, res){
    db.collection('posts', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
}

// List specific entry
exports.findById = function(req, res){
    var id = req.params.id;
    console.log('Retrieving post: ' + id);
    db.collection('posts', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
}


// Initialization DB function
var populateDB = function() {
 
    var postItems = [{
        title: "This is a test post",
        tags: ["test","first"],
        type: "post",
        date: new Date("2015-02-02T01:47:02.218Z"),
        body: "This is the test body of the post.  beep boop bop de bop."
    },{
        title: "This is the second post",
        tags: ["test","second"],
        type: "post",
        date: new Date("2015-02-02T01:51:08.196Z"),
        body: "This is the second post body.  Test test test."
    },{
        title: "Third Post Title",
        tags: ["test","third"],
        type: "post",
        date: new Date("2015-02-02T01:51:54.918Z"),
        body: "This is the third post body.  Lorem Ipsum?"
    }];
 
    db.collection('posts', function(err, collection) {
        collection.insert(postItems, {safe:true}, function(err, result) {});
    });
 
};
