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
				<p class="text">${escape(obj.content.text)}</p>
			</div>	
			<footer class="footer">
				<p class="date">${obj.created_at}</p>
				<span class="icons"> 		
					<i class="fa fa-heart" aria-hidden="true"></i>
                    <i class="fa fa-retweet" aria-hidden="true"></i>
                    <i class="fa fa-flag" aria-hidden="true"></i>
        		</span>
        	</footer>
        </article>`));

}


function renderTweets(tweets){
  $('#posts').empty();
	for (key of tweets){
		var $tweet = createTweetElement(key);
	$('#posts').prepend($tweet);
	}
}
//makes sure there is not unsafe text in tweets that could crash the application
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

$(".new-tweet form").on("submit", function(event) {
  event.preventDefault()
var $textArea = $(".new-tweet textarea").val().length;

if ($textArea > 0 && $textArea <= 140){
  
  console.log('Button clicked, performing ajax call...')

  $.ajax({
          url:  '/tweets',
          method: "POST",
          data: $(this).serialize(), 
          success: function(data) {
            loadTweets();
          console.log('Success:', data);
          }
        });

  $("#textarea").val('');

    } else if ($textArea === 0) {
      event.preventDefault();
      $("#error").css("opacity", 1);
      $('#error').delay(1000).fadeOut();
    } else if ($textArea > 140){
      event.preventDefault();
      $("#error").css("opacity", 1);
      $('#error').delay(1000).fadeOut();
    }


    
});

$("#compose").click(function(){
  $(".new-tweet").slideToggle();
});
  

function loadTweets(){
  var $button = $('#submit');
  $button.on('click', function(){
    console.log("button clicked");
    $.ajax({
      dataType: "json",
      url: "/tweets",
      method: "GET",
      success: function(objFromServer){
        renderTweets(objFromServer);
      }
    });
  })
}
 
loadTweets();

// event.preventDefault()



 // renderTweets(data);
	
});

