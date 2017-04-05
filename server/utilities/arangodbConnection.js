var Database = require('arangojs').Database;

var createConnection = function(){
    var db = new Database('http://127.0.0.1:8529');
    db.useDatabase('test');
    var collection = db.collection('users');

    return collection;
}

module.exports = createConnection;