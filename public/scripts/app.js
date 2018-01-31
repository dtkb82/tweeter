/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
function createTweetElement(obj){
	return (
		$(`<article class="article">
			<header class="header">
				<img class="user-avatar" src="${obj.user.avatars.small}"/>
				<p class="name">${obj.user.name}</p>
				<p class="handle">${obj.user.handle}</p>
			</header>
			<div>
				<p class="text">${obj.content.text}</p>
			</div>	
			<footer class="footer">
				${obj.created_at}
				<span> 		
					<i class="fa fa-heart" aria-hidden="true"></i>
                    <i class="fa fa-retweet" aria-hidden="true"></i>
                    <i class="fa fa-flag" aria-hidden="true"></i>
        		</span>
        	</footer>
        </article>`));
}

// Test / driver code (temporary). Eventually will get this from the server.
// const data = [
//   {
//     "user": {
//       			"name": "Newton",
//       			"avatars": {
//         					"small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         					"regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         					"large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//       						},
//       			"handle": "@SirIsaac"
//     						},
//     			"content": {
//       						"text": "If I have seen further it is by standing on the shoulders of giants"
//     						},
//     			"created_at": 1461116232227
//   							},
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": {
//         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   },
//   {
//     "user": {
//       	"name": "Johann von Goethe",
//       "avatars": {
//         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//       },
//       "handle": "@johann49"
//     },
//     "content": {
//       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//     },
//     "created_at": 1461113796368
//   }
// ];

function renderTweets(tweets){
	for (key of tweets){
		var $tweet = createTweetElement(key);
		$('#posts').prepend($tweet);
	}
}


$(".new-tweet form").on("submit", function(event) {
  event.preventDefault()
  console.log('Button clicked, performing ajax call...')
	$.ajax({
		url: 	'/tweets',
		method: "POST",
		data: $(this).serialize(), 
    success: function(data) {
      console.log('Success:', data);
    }

	})
	
});

function loadTweets(){
  var $button = $('#submit');
  $button.on('click', function(){
    console.log("button clicked");
    $.ajax({
      dataType: "json",
      url: "/tweets",
      method: "GET",
      success: function(object){
        renderTweets(object);
      }
    });
  })
}
 
loadTweets();

// event.preventDefault()



 // renderTweets(data);
	
});

