document.addEventListener('DOMContentLoaded', (event) => {
  // Show the content for Button 1 by default and set it as active
  showDiv('content1', 'button1');
});

// Set the duration for countdown (3 hours in milliseconds)
var countdownDuration = 3 * 60 * 60 * 1000; 

// Function to create a countdown timer
function createCountdown(container, endTime) {
    var timerElement = container.querySelector(".timer");
    
    // Update the count down every 1 second
    var x = setInterval(function() {
        // Get current date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = endTime - now;

        // Time calculations for hours, minutes and seconds
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the timer element
        timerElement.innerHTML = hours + "h : " + minutes + "m : " + seconds + "s ";

        // If the count down is over, write some text 
        if (distance < 0) {
            clearInterval(x);
            timerElement.innerHTML = "EXPIRED";
        }
    }, 1000);
}

// Set up timers for each offer-container
var offerContainers = document.querySelectorAll(".offer-container");

offerContainers.forEach(function(container) {
    var endTime = new Date().getTime() + countdownDuration; // 3 hours from now
    createCountdown(container, endTime);
});

function showDiv(divId, buttonId) {
  // Hide all hidden content divs
  const hiddenDivs = document.querySelectorAll('.hidden-content');
  hiddenDivs.forEach(div => div.style.display = 'none');

  // Show the selected div
  const selectedDiv = document.getElementById(divId);
  selectedDiv.style.display = 'block';

  // Remove active class from all buttons
  const buttons = document.querySelectorAll('.discription');
  buttons.forEach(button => button.classList.remove('active'));

  // Add active class to the selected button
  const selectedButton = document.getElementById(buttonId);
  selectedButton.classList.add('active');
}
