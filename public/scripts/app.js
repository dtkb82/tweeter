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


function renderTweets(tweets){
	for (key of tweets){
		var $tweet = createTweetElement(key);
		$('#posts').prepend($tweet);
	}
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
          success: function() {
            loadTweets();
          console.log('Success:', data);
          }
       });

    } else if ($textArea === 0) {
      event.preventDefault();
      $("#error").css("opacity", 1);
    } else if ($textArea > 140){
      event.preventDefault();
      $("#error").css("opacity", 1);
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

