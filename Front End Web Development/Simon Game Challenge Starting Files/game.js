// needed variables
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
var gamePattern = [];
var level = 0;

// start up the sequence on user first interaction
$(document).keypress(function(){
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }
}); 

// providing the color sequence
function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.round(Math.random() * 3);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).animate({opacity: 0}, 100).animate({opacity: 1}, 100);

    level++;
    $("#level-title").text("Level " + level);
    playSound(randomChosenColour);
}
 
// playing a sound
function playSound(name) {
    var red = new Audio("./sounds/" + name + ".mp3")
    red.play();
 
}

// users click

$(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    var lastAnswer = userClickedPattern.length - 1;
    checkAnswer(lastAnswer);
});

// animation for users click
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

// checked clicked user answer right or wrong
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
    } else {
        playSound("wrong");
        
        $("body").addClass("game-over");
        $("#level-title").text("Game Over");
        
        setTimeout(function(){
            $("body").removeClass("game-over");
            $("#level-title").text("Press Any Key To Start");
        }, 800);

        startOver();        
        
    }   
     
}

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}