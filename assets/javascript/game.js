$(document).ready(function() {
   
    var topics = [];
    
         function displayFruit() {
    
        var x = $(this).data("search");
        console.log(x);
    
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=dc6zaTOxFJmzC&limit=10";
    
        console.log(queryURL);
    
        $.ajax({
              url: queryURL,
              method: "GET"
            }).done(function(response) {
                var results = response.data;
                console.log(results);
                $("#gifArea").html("");


                for (var i = 0; i < results.length; i++) {
                
                var fruitDiv = $("<div class='col-md-4'>");
    
                var rating = results[i].rating;
                var defaultAnimatedSrc = results[i].images.fixed_height.url;
                var staticSrc = results[i].images.fixed_height_still.url;
                var fruitImage = $("<img>");
                var p = $("<p>").text("Rating: " + rating);
    
                fruitImage.attr("src", staticSrc);
                fruitImage.addClass("fruitGiphy");
                fruitImage.attr("data-state", "still");
                fruitImage.attr("data-still", staticSrc);
                fruitImage.attr("data-animate", defaultAnimatedSrc);
                fruitDiv.append(p);
                fruitDiv.append(fruitImage);
                $("#gifArea").prepend(fruitDiv);
    
            }
        });
    }
    
      //Submit button click event takes search term from form input, trims and pushes to topics array, displays button
        $("#addFruit").on("click", function(event) {
            event.preventDefault();
            var newfruit = $("#fruitInput").val().trim();
            topics.push(newfruit);
            console.log(topics);
            $("#fruitInput").val('');
            displayButtons();
          });
    
      //Function iterates through topics array to display button with array values in "myButtons" section of HTML
        function displayButtons() {
        $("#myButtons").empty();
        for (var i = 0; i < topics.length; i++) {
          var a = $('<button class="btn btn-primary">');
          a.attr("id", "fruit");
          a.attr("data-search", topics[i]);
          a.text(topics[i]);
          $("#myButtons").append(a);
        }
      }
    
    
      displayButtons();
    
      //Click event on button with id of "show" executes displayNetflixShow function
      $(document).on("click", "#fruit", displayFruit);
    
      //Click event on gifs with class of "netflixGiphy" executes pausePlayGifs function
      $(document).on("click", ".fruitGiphy", pausePlayGifs);
    
      //Function accesses "data-state" attribute and depending on status, changes image source to "data-animate" or "data-still"
      function pausePlayGifs() {
           var state = $(this).attr("data-state");
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
      }
    }
    
    });