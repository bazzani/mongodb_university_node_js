// Using the aggregation framework, calculate the sum total of people 
// who are living in a zip code where the city starts with a digit

use test
db.zips.aggregate([
	{$project: {
		_id:0,
		first_char: {$substr : ["$city",0,1]},
		pop:"$pop"
	}},
	{$match: {first_char:{$regex:/[0-9]/}}},
	{$group: {
		_id:null,
		total_pop:{$sum:"$pop"}
	}}
])