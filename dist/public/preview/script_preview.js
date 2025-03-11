// Handle the content display and countdown timer
document.addEventListener('DOMContentLoaded', (event) => {
  // Show the content for Button 1 by default and set it as active
  showDiv('content1', 'button1');
  
  // Set the duration for countdown (3 hours in milliseconds)
  const countdownDuration = 3 * 60 * 60 * 1000; 
  
  // Set up timers for each offer-container
  const offerContainers = document.querySelectorAll(".offer-container");

  offerContainers.forEach(function(container) {
    const endTime = new Date().getTime() + countdownDuration; // 3 hours from now
    createCountdown(container, endTime);
  });
});

// Function to create a countdown timer
function createCountdown(container, endTime) {
    const timerElement = container.querySelector(".timer");
    
    // Check if timerElement exists
    if (!timerElement) {
        console.error('Timer element not found in container');
        return;
    }

    // Update the count down every 1 second
    const intervalId = setInterval(function() {
        // Get current date and time
        const now = new Date().getTime();

        // Find the distance between now and the count down date
        const distance = endTime - now;

        // Time calculations for hours, minutes, and seconds
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the timer element
        timerElement.textContent = `${hours}h : ${minutes}m : ${seconds}s`;

        // If the count down is over, write some text 
        if (distance < 0) {
            clearInterval(intervalId);
            timerElement.textContent = "EXPIRED";
        }
    }, 1000);
}

// Function to show and hide content sections
function showDiv(divId, buttonId) {
  // Hide all hidden content divs
  const hiddenDivs = document.querySelectorAll('.hidden-content');
  hiddenDivs.forEach(div => div.style.display = 'none');

  // Show the selected div
  const selectedDiv = document.getElementById(divId);
  if (selectedDiv) {
    selectedDiv.style.display = 'block';
  } else {
    console.error(`Div with ID "${divId}" not found`);
  }

  // Remove active class from all buttons
  const buttons = document.querySelectorAll('.discription');
  buttons.forEach(button => button.classList.remove('active'));

  // Add active class to the selected button
  const selectedButton = document.getElementById(buttonId);
  if (selectedButton) {
    selectedButton.classList.add('active');
  } else {
    console.error(`Button with ID "${buttonId}" not found`);
  }
}

// Extract course ID from URL
const params = new URLSearchParams(window.location.search);
const courseId = params.get('id');


// Load course data based on ID
window.addEventListener('DOMContentLoaded', () => {
  const course = courses.find(c => c.id == courseId);

  if (course) {
    document.getElementById('course-title').textContent = course.title;
    document.getElementById('course-description').textContent = course.description;
    document.getElementById('course-image').src = course.image;

    // Populate learning outcomes
    const outcomeList = document.getElementById('outcome-list');
    course.outcomes.forEach(outcome => {
      const listItem = document.createElement('li');
      listItem.textContent = outcome;
      listItem.classList.add('li');
      outcomeList.appendChild(listItem);
    });

    // Populate who is this course for
    const whoList = document.getElementById('who-list');
    course.who?.forEach(who => {
      const listItem = document.createElement('li');
      listItem.textContent = who;
      listItem.classList.add('li');
      whoList.appendChild(listItem);
    });

    // Populate requirements
    const requirementsList = document.getElementById('requirements-list');
    course.requirements?.forEach(requirement => {
      const listItem = document.createElement('li');
      listItem.textContent = requirement;
      listItem.classList.add('li');
      requirementsList.appendChild(listItem);
    });

    // Populate course details
    document.getElementById('lessons').textContent = `${course.lessons}`;
    document.getElementById('duration').textContent = `${course.duration}`;
    document.getElementById('exercises').textContent = `${course.exercises}`;
    document.getElementById('downloads').textContent = `${course.downloads}`;
    document.getElementById('files').textContent = `${course.files}`;
    document.getElementById('project').textContent = `${course.project}`;
    document.getElementById('badge').textContent = `${course.badge}`;
    document.getElementById('Price').textContent = `${course.price}`;
    document.getElementById('discount').textContent = `${course.discount}`;
    document.getElementById('offer-title').textContent = `${course.OfferTitle}`;
    document.getElementById('saleSadge').textContent = `${course.saleBadge}`;

    // Populate course units
    const u1Element = document.getElementById('u1');
    u1Element.textContent = course.u1;
    
    const u1List = document.getElementById('u1-list');
    course.u1_list?.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = item;
      listItem.classList.add('li');
      u1List.appendChild(listItem);
    });

    const u2Element = document.getElementById('u2');
    u2Element.textContent = course.u2;
    
    const u2List = document.getElementById('u2-list');
    course.u2_list?.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = item;
      listItem.classList.add('li');
      u2List.appendChild(listItem);
    });
  } else {
    document.body.innerHTML = "<h1>Course not found</h1>";
  }
});
