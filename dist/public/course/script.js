let subtopics = []; // Store subtopics of the current session
let currentIndex = 0; // Tracks current subtopic

function displaySubtopic(title, content) {
  document.getElementById("subtopic-title").innerText = title;

  let subtopicContent = document.getElementById("subtopic-content");

  // Check if content contains HTML tags
  if (content.includes("<") && content.includes(">")) {
    subtopicContent.innerHTML = content; // Render HTML properly
  } else if (/\d+\./.test(content)) {
    let listItems = content.split(/\d+\./).filter(item => item.trim() !== "");
    let formattedContent = "<ul style='padding-left: 20px;'>";
    formattedContent += listItems.map(item => `<li style='margin-bottom: 10px; line-height: 1.5;'>${item.trim()}</li>`).join("");
    formattedContent += "</ul>";
    subtopicContent.innerHTML = formattedContent;
  } else {
    subtopicContent.innerText = content; // Plain text fallback
  }

  document.getElementById("subtopic-display").style.display = "block";
  currentIndex = subtopics.findIndex(subtopic => subtopic.title === title);
  updateNavigationButtons();
}




function navigateSubtopic(direction) {
  currentIndex += direction; // Move forward or backward
  if (subtopics[currentIndex]) {
    displaySubtopic(subtopics[currentIndex].title, subtopics[currentIndex].content);
  }
}

function updateNavigationButtons() {
  document.getElementById("prev-topic").disabled = currentIndex === 0;
  document.getElementById("next-topic").disabled = currentIndex === subtopics.length - 1;
}



function displayContent(sessionId) {
  document.querySelectorAll('.content').forEach(content => content.style.display = 'none');
  document.querySelectorAll('.session').forEach(session => session.classList.remove('active'));

  document.getElementById(`content-${sessionId}`).style.display = 'block';
  document.getElementById(`session-${sessionId}`).classList.add('active');

  loadSubtopics(sessionId);
}

// Scroll controls for sessions
function scrollSessionsLeft() {
  document.querySelector('.sessions-wrapper').scrollBy({ left: -173, behavior: 'smooth' });
}

function scrollSessionsRight() {
  document.querySelector('.sessions-wrapper').scrollBy({ left: 173, behavior: 'smooth' });
}

// Expand/collapse sections
function toggleContent(sectionId) {
  const content = document.getElementById(`section-${sectionId}`);
  const isVisible = content.style.display === 'block';
  const arrow = content.previousElementSibling.querySelector('.arrow');

  document.querySelectorAll('.section-content').forEach(sec => sec.style.display = 'none');
  document.querySelectorAll('.section-title').forEach(title => title.classList.remove('active'));

  content.style.display = isVisible ? 'none' : 'block';
  arrow.innerHTML = isVisible ? '&#9660;' : '&#9650;';
}

function toggleMenu() {
  const grid1 = document.querySelector('.grid-1');
  const grid2 = document.querySelector('.grid-2');

  if (grid2.style.display === "none" || grid2.style.display === "") {
      grid1.style.display = "none";  // Hide Grid 1
      grid2.style.display = "block"; // Show Grid 2
  } else {
      grid1.style.display = "block"; // Show Grid 1
      grid2.style.display = "none";  // Hide Grid 2
      
  }
}

function selectSession(sessionId) {
  toggleMenu(); // Hide Grid 2 and show Grid 1
  displayContent(sessionId); // Load the selected session
}



// Auto-load session 2 on page load
document.addEventListener('DOMContentLoaded', function() {
  displayContent(2);
});
