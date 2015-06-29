	// Calculate the average population of cities in California (abbreviation CA)
// and New York (NY) (taken together) with populations over 25,000. 

use agg
db.zips.aggregate([
	{$match: {
		$or: [{state: {$eq: "CA"}}, {state: {$eq: "NY"}}]
	}},
	{$group: {
		_id: "$city", 
		total: {"$sum":"$pop"}
	}},
	{$match: {
			total: {$gt:25000}
	}},
	{$group: {
		_id: null, 
		avg: {"$avg":"$total"}
	}}
])

// shorthand
db.zips.aggregate([{$match:{$or:[{state:{$eq:"CA"}},{state:{$eq:"NY"}}]}},{$group:{_id:"$city",total:{"$sum":"$pop"}}},{$match:{total:{$gt:25000}}},{$group:{_id:null,avg:{"$avg":"$total"}}}])


// answer
db.zips.aggregate([
	{$match:
		{state: {$in: ['CA', 'NY']}}
	},
	{$group:{
		_id: {state: "$state", city: "$city"}, 
		pop: {$sum: "$pop"}}
	},
	{$match: 
		{pop: {$gt: 25000}}
	}, 
	{$group:{ 
		_id: null, pop: {$avg: "$pop"}}
	}
])