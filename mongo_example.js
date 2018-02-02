
"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
	if (err) {
		console.error('Failed to connect: ${MONGODB_URI}');
		throw err;
	}

// we have a connection to the "test-tweets" db.
// starting here.
console.log('Connected to mongodb: ${MONGODB_URI}');

function getTweets(callback){
// Let's "get all the tweets". In Mongo-speak, we "find" them.
// db.collection("tweets").find({}, (err, results) => {
	db.collection("tweets").find().toArray((err, results) => {
	//Lazy error handling:
	if (err){
		return callback(err);
	}
	callback(null, tweets);
	});
}

	 // ==> Later it can be invoked. Remember even if you pass
  //     `getTweets` to another scope, it still has closure over
  //     `db`, so it will still work. Yay!

  getTweets((err, tweets) => {
  	if (err) throw err;

  	console.log("Logging each tweet:");
  	for (let tweet of tweets) {
  		console.log(tweet);
  	}

  	db.close();
  });

});


	
	// console.log("for each item yielded by the cursor:");
	// results.each((err, item) => console.log(" ", item));

	// or get the results back from the database and "slurp" them into an array
	// results.toArray((err, resultsArray) => {
	// 	if (err) throw err;

		// console.log("results.toArray:", resultsArray);
		// console.log("results array: ", results);
	// });

// ==> In typical node-callback style, any program
  //     logic that needs to use the connection needs
  //     to be invoked from within here.
  //
  // Another way to say: this is an "entry point" for
  // a database-connected application!

  // ==> At the end, we close the connection:
//   	db.close();
// 	});
// });