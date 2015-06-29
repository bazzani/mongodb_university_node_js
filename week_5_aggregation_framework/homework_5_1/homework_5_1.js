// Finding the most frequent author of comments on your blog

use agg
db.posts.aggregate([
	{$unwind:"$comments"}, 
	{$group:{
		_id:"$comments.author", 
		num_comments:{$sum:1}
		}
	},
	{$sort:{
		num_comments:-1}
	}
])

// shorthand
db.posts.aggregate([{$unwind:"$comments"}, {$group:{_id:"$comments.author", num_comments:{$sum:1}}},{$sort:{num_comments:-1}}])


// answer
db.posts.aggregate([{$unwind:"$comments"}, {$group:{_id:"$comments.author", num_comments:{$sum: 1}}}, {$sort: {num_comments: -1}}, {$limit: 1}])