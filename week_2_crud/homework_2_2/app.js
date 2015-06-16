var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/weather', function(err, db) {
    if(err) throw err;

    var updateOperator = { '$set' : { 'month_high' : true } };

	var weather = db.collection('data');
	var cursor = weather.find({});
	cursor.sort([{'State': 1}, {'Temperature': -1}]);

	var currentState;

	cursor.each(function(err, doc) {
        if(err) throw err;

        if(doc == null) {
            return db.close();
        }

		if(currentState != doc.State) {
			currentState = doc.State;

			weather.update({_id : doc._id}, updateOperator, function(err, updated) {
				console.dir('Flagging document :: ' + doc.State + ': ' + doc.Day + ' __ ' + doc.Temperature + ' F');
			});
		}
    });
});
