
var gamePattern = [];
var buttonColors = ["red","blue","green","yellow"];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function() {
  if(!started)
  {
    $("level-title").text("Level "+level);
    nextSequence();
    started = true;
  }
})

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomColor = buttonColors[randomNumber];
  gamePattern.push(randomColor);
  $("#"+randomColor).fadeOut(100).fadeIn(100);
  playSound(randomColor);
  animatePress(randomColor);
}
$(".btn").click(function() {
  var userChoosenColor = $(this).attr("id");
  userClickedPattern.push(userChoosenColor);
  playSound(userChoosenColor);
  animatePress(userChoosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function playSound(name)
{
  var sound = new Audio("sounds/"+name+".mp3");
  sound.play();
}

function animatePress(randomColor){
    $("#"+randomColor).addClass("pressed");
    setTimeout(function() {
      $("#"+randomColor).removeClass("pressed");
    })
}

function checkAnswer(index){
  if(userClickedPattern[index] === gamePattern[index])
  {
    if(userClickedPattern.length === gamePattern.length)
    {
      setTimeout(function() {
        nextSequence();
      },1000);
    }
  }
  else{
    var sound = new Audio("sounds/wrong.mp3");
    sound.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    restart();
  }
}

function restart(){
  gamePattern = [];
  level = 0;
  started = false;
}
