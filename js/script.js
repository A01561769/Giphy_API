$(document).ready(function() {

var animals  = ["dog", "car", "rabbit", "frog", "chicken", "bird", "turtle"];

// Funcion que crea la lista de botones
function populateButtons(arrayToUse, classToAdd, placeHolder){
    
    for (var i = 0; i < arrayToUse.length; i++){
        var a = $("<button>");
        a.addClass(classToAdd);
        a.attr("data-type", arrayToUse[i]);
        a.text(arrayToUse[i]);
        $(placeHolder).append(a);
    }

}

$("#add-animal").on("click", function(e){
    e.preventDefault();
    animals.push($("#animal-input").val())
    $("#animal-buttons").empty();
    $("#animal-input").val("");
    populateButtons(animals, "animal-button", "#animal-buttons");
})

$("#animal-buttons").on("click", ".animal-button", function(){
    $("#animals").empty();

    var search = $(this).attr("data-type");
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=6yVbM5A6MMpzkWH9PbYu12Vybi44l4yv&q=dog&limit=25&offset=0&rating=g&lang=en"

    $.ajax({url:queryUrl}).then( function(response){
        var result = response.data;
        
        for(var i = 0; i < result.length; i++) {

            // Se crea un div vacio con la clase animal-item
            var animalDiv = $("<div class =\"animal-item\">");
            var rating = result[i].rating;
            var p = $("<p>").text("rating: " + rating);

            var animated = result[i].images.fixed_height.url;
            var still = result[i].images.fixed_height_still.url;

            // Se crea la estructura de la imagen
            var animalImage = $("<img>");
            animalImage.attr("src", still);
            animalImage.attr("data-still", still);
            animalImage.attr("data-animate", animated);
            animalImage.attr("data-is-animated", "false");
            animalImage.addClass("animal-image");

            animalDiv.append(p);
            animalDiv.append(animalImage);

            $("#animals").append(animalDiv);
        }
    });
});

$("#animals").on("click", ".animal-item", function(){
    state = $(this).children("img").attr("data-is-animated")

    if (state === "false"){
        $(this).children("img").attr("src", $(this).children("img").attr("data-animate"));
        $(this).children("img").attr("data-is-animated", "true");
    } else {
        $(this).children("img").attr("src", $(this).children("img").attr("data-still"));
        $(this).children("img").attr("data-is-animated", "false");
    }

})

populateButtons(animals, "animal-button", "#animal-buttons");


});
