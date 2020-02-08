
animals = ["cats","dogs","birds","fish"]

// load the animal buttons from the animal button array
function animalBtn(){

    $("#gifButton").empty()

    for(var i=0;i<animals.length;i++){

        var newButton = $("<button>");
        newButton.addClass("animalBtn");
        newButton.attr("id", "Btn-"+i);
        newButton.attr("data",animals[i])
        newButton.text(animals[i]);
        $("#gifButton").append(newButton);

    }
}

// create 10 new animal gifs and give them neccisarry properties
function animalGifs(){
    event.preventDefault();

    $("#animalGifs").html("");
    
    animal = $(this).attr("data")
    queryURL = "https://api.giphy.com/v1/gifs/search?q="+animal+"&api_key=8mDn00XQKeMIdoTpbO6X7xgjK2CZAVK0&limit=10"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        info = response.data

        // make 10 divs with pause and unpause URLs and the "state" attribute then append
        for(var i=0;i<info.length;i++){

            newGif = $("<div>");

            newUrl = $("<img>");
            newUrl.addClass("gif")
            newUrl.attr("src", info[i].images.fixed_height_still.url);

            newUrl.attr("Pause",info[i].images.fixed_height_still.url)
            newUrl.attr("Animate",info[i].images.fixed_height.url)

            newUrl.attr("state", "pause")

            newText = $("<p>")
            newText.text("Rated: "+info[i].rating)

            $(newGif).append(newText)
            $(newGif).append(newUrl)
            $("#animalGifs").append(newGif);
        };
    
    });
}

// reads the pause/animate "state" of the gif and makes the src reverse
function animate(){

    var state = $(this).attr("state");

    if (state === "pause") {
      $(this).attr("src", $(this).attr("animate"));
      $(this).attr("state", "animate");
    } else {
      $(this).attr("src", $(this).attr("pause"));
      $(this).attr("state", "pause");
    }
}

// onclick add new animal button
$("#animalAdd").click(function() {

    temp = $("#animalNew").val()
    animals.push(temp)
    console.log(animals)

    animalBtn()
});

// onclick pause/unpause gif
$(document).on("click", ".gif", animate);

// on click generate 10 animal gifs
$(document).on("click", ".animalBtn", animalGifs);

// load buttons on startup
animalBtn()