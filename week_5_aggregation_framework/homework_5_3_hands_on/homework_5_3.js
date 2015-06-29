// You must figure out the GPA that each student has achieved in a class and then 
// average those numbers to get a class average. After that, you just need to sort. 

use test
db.grades.aggregate([
	{$unwind:"$scores"},
	{$match: {"scores.type": "homework"}},
	{'$group': {
		_id: {class_id: "$class_id", student_id: "$student_id"}, 
		'average': {"$avg": "$scores.score"}
	}},
	{$group: {
		_id: "$_id.class_id",
		'average': {"$avg": "$average"}	
	}},
	{$sort: {average:-1}},
	{$limit : 5 }
])


// answer
db.grades.aggregate([
	{ $unwind : "$scores" },
	{ $match : { "scores.type" : { $ne : "quiz" } } },
	{ $group : { _id : { student_id : "$student_id", class_id : "$class_id" }, avg : { $avg : "$scores.score" } } },
	{ $group : { _id : "$_id.class_id", avg : { $avg : "$avg" } } },
	{ $sort : { "avg" : -1 } },
	{ $limit : 5 }
])