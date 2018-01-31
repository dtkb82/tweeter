/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function createTweetElement(obj){
	return (
		$(`<article>
			<header class="header">
				<p>${obj.user.name}</p>
				<img src="${obj.user.avatars.small}"/>
				<p>${obj.user.handle}</p>
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
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}

var $tweet = createTweetElement(tweetData);

$(document).ready(function() {
	// Test / driver code (temporary)
	console.log($tweet); // to see what it looks like
	$('#posts').prepend($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, e

});