// Define the colors of the buttons
let buttonColors = ["red", "blue", "green", "yellow"];

// Arrays to store the game pattern and the user's clicked pattern
let gamePattern = [];
let userClickedPattern = [];

// Variables to track game state
let started = false;
let level = 0;

// Start the game when a key is pressed
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Handle button clicks
$(".btn").click(function() {
  // Get the ID of the clicked button
  let userChosenColor = $(this).attr("id");
   // Add the clicked color to the user's pattern
  userClickedPattern.push(userChosenColor);
 // Play sound and animate button press
  playSound(userChosenColor);
  animatePress(userChosenColor);
// Check the user's answer
  checkAnswer(userClickedPattern.length-1);
});

// Check if the user's answer matches the game pattern
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      // If the user has completed the pattern, go to the next level
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      // If the user's answer is wrong, end the game
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      // Reset the game
      startOver();
    }
}

// Generate the next color sequence
function nextSequence() {
  // Reset user's clicked pattern for the next round
  userClickedPattern = [];
  // Increment the level and update the level display
  level++;
  $("#level-title").text("Level " + level);
  // Generate a random color and add it to the game pattern
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // Show and hide the selected color for a brief period
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  // Play sound for the selected color
  playSound(randomChosenColor);
}

// Animate the button press
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Play sound for each color
function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Reset game state to start over
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
