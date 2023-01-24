let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickPattern = [];

let gameStart = false;
let level = 0;

function nextSequence() {

  userClickPattern = [];
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  
  level++;
  $("#level-title").text("level " + level)
  

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  
}



$(".btn").click(function(){
    let userChosenColour = $(this).attr("id");
    userClickPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickPattern.length - 1)

})


function playSound(name){
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

$(document).keypress(function(){
  if(!gameStart){
    nextSequence();
    gameStart = true;
  }
});
$("#level-title").click(function(){
  if(!gameStart){
    nextSequence();
    gameStart = true;
  }
});

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickPattern[currentLevel]){
    console.log("sucess");
    if(gamePattern.length ===  userClickPattern.length){
      setTimeout(function (){
        nextSequence();
      },1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function (){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $(document).keypress(startOver())
  }

}

function startOver(){
  gamePattern = [];
  userClickPattern = [];
  gameStart = false;
  level = 0;
  
}