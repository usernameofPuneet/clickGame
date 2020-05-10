var buttonColors = ["red", "blue", "green", "yellow"]

var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(document).keypress(function() {
    if (level === 0) {
        nextSequence();
    }
});

function nextSequence() {

    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColors[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playsound(randomChosenColour);

};

$(".btn").click(function() {

    var userChosenColor = $(this).attr("id");

    userClickedPattern.push(userChosenColor);


    // var lastAnswer = userClickedPattern.length;

    checkAnswer(userClickedPattern.length - 1);


    playsound(userChosenColor);
    animatePress(userChosenColor);

})



function playsound(name) {
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    console.log(currentLevel);
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(nextSequence, 1000);
            userClickedPattern = [];
        }
    } else {
        console.log("fail");
        var wrongsound = new Audio("sounds/wrong.mp3");
        wrongsound.play();

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 200);

        $("h1").text("Game Over, Press any key to restart");

        $(document).keypress(startOver());

    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}