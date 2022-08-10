var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0,score=0;

$(document).on("keypress",levelHandler);
$(".footer").on("click",levelHandler);

function levelHandler(){
    if(level===0)
    nextSequence();
}

$(".btn").on("click",handler);

function handler(){
    if(level!==0){
    var userChosenColour=this.id;
    var userChosenColourId="#" + String(userChosenColour);
    userClickedPattern.push(String(userChosenColour));
    console.log("User Pattern "+ userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColourId);
    checkAnswer(userClickedPattern.length-1);
    }
}

function nextSequence(){
    $("h1").text("Level " + level);
    $("h5").text("Score: " + score);
    if(level==0)
    score=0;
    else
    String(score+=10);
    level++;
    var randomNumber=Math.floor(Math.random()*4);
    // console.log(randomNumber);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    //console.log(randomChosenColour);
    var randomChosenColourId="#" + String(randomChosenColour);
    console.log("Game Pattern " + gamePattern);
    $(randomChosenColourId).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    animatePress(randomChosenColourId);
}


function animatePress(buttonId){
    //console.log(buttonId);
    $(buttonId).addClass("pressed");
    setTimeout(function() {document.querySelector(buttonId).classList.remove("pressed");},100)

}
function playSound(buttonValue){
    var buttonSound="sounds/" + buttonValue + ".mp3";
    var sound=new Audio(buttonSound);
    sound.play();

}

function checkAnswer(currentLevel){
    console.log(currentLevel);
        if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
            if(userClickedPattern.length==gamePattern.length){
            setTimeout(nextSequence,800);
            userClickedPattern.length=0;
        }
        }
        else
            gameOver();
}

function gameOver() {
    $("h1").text("Game Over, Press Any Key to Replay");
    $("h5").text("Total Score: " + score);
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over");},300);
    var over=new Audio("sounds/wrong.mp3");
    over.play();
    level=0;
    score=0;
    gamePattern.length=0;
    userClickedPattern.length=0;
}




