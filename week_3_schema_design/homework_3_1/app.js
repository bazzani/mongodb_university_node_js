var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/school', function(err, db) {
    if(err) throw err;

	var students = db.collection('students');
	var cursor = students.find({"scores.type": "homework"});

	cursor.each(function(err, doc) {
        if(err) throw err;

        if(doc == null) {
            return db.close();
        }

        var sortedScores = doc.scores.sort(function(a,b) {
        	return a.score < b.score && a.type == "homework";
        });

		var lowestHomeworkScore = sortedScores[sortedScores.length-1].score;
		
		students.update({_id: doc._id}, 
						{$pull: {scores: {score: lowestHomeworkScore}}}, 
						{multi: true});
    });
});
