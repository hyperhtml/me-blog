// List all blog entries
exports.findAll = function(req, res){
    res.send([{title:"test1",body:"test1 body"}, {title:"test2",body:"test2 body"}, {title:"test3",body:"test3 body"}]);
}

// List specific entry
exports.findById = function(req, res){
    res.send({id:req.params.id, title:"test1",body:"test1 body"});
}
