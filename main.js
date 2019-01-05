$( document ).ready(function() {

    var animals = ["Tiger", "Wolf", "Hawk", "Water Deer", "Antelope", "Bat", "Fox", "Lion", "Dog", "Cat"];

    // Creates the displayed buttons animals within the array
    function displayGifButtons(){
        $("#gifButtons").empty(); 
        for (var i = 0; i < animals.length; i++){
            var gifButton = $("<button>");
            gifButton.addClass("action");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", animals[i]);
            gifButton.text(animals[i]);
            $("#gifButtons").append(gifButton);
        }
    }

    function displayGifs(){
        var animal = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

        console.log(queryURL)

        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {

            console.log(response); 

            $("#gifsView").empty(); 
            var results = response.data; //shows results of gifs

            if (results == ""){
              alert("There isn't a gif for this selected button");
            }
            for (var i=0; i<results.length; i++){
    
                var gifDiv = $("<div>"); //div for the gifs to go inside
                gifDiv.addClass("gifDiv");
        
                // pulling rating of gif
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(gifRating);

                // pulling gif
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
                gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); 
                gifImage.attr("data-animate",results[i].images.fixed_height_small.url);
                gifImage.attr("data-state", "still"); // image state set
                gifImage.addClass("image");
                gifDiv.append(gifImage);

                // pulling still image of gif
                // adding div of gifs to gifsDisplay div
                $("#gifsDisplay").prepend(gifDiv);
            }
        });
    }
    // adding user buttons of animals
    function addNewButton(){
        $("#addGif").on("click", function(){
        var animal = $("#animal-input").val().trim();
        if (animal == ""){
          return false; 
        }
        animals.push(animal);
    
        displayGifButtons();
        return false;
        });
    }
    // removes recent button user has added
    function removeLastButton(){
        $("removeGif").on("click", function(){
        animals.pop(animal);
        displayGifButtons();
        return false;
        });
    }

    // Calling functions
    displayGifButtons(); 
    addNewButton();
    removeLastButton();

    // listeners
    $(document).on("click", ".action", displayGifs);
    $(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');

    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    } 
    else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});

});