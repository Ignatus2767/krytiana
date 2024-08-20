function scrollSessionsLeft() {
  document.querySelector('.sessions-wrapper').scrollBy({
      left: -173,
      behavior: 'smooth'
  });
}

function scrollSessionsRight() {
  document.querySelector('.sessions-wrapper').scrollBy({
      left: 173,
      behavior: 'smooth'
  });
}

function toggleContent(sectionId) {
  const content = document.getElementById(`section-${sectionId}`);
  const isVisible = content.style.display === 'block';
  const arrow = content.previousElementSibling.querySelector('.arrow');
  const sectionTitle = content.previousElementSibling;
  
  // Hide all section contents and remove active class from all section titles
  document.querySelectorAll('.section-content').forEach(secContent => {
    secContent.style.display = 'none';
  });
  document.querySelectorAll('.section-title').forEach(title => {
    title.classList.remove('active');
  });

  // Toggle the clicked section content and add active class
  content.style.display = isVisible ? 'none' : 'block';
  sectionTitle.classList.toggle('active', !isVisible);
  arrow.innerHTML = isVisible ? '&#9660;' : '&#9650;';
}

function displayContent(sessionId) {
  // Hide all content sections
  const contents = document.querySelectorAll('.content');
  contents.forEach(content => content.style.display = 'none');

  // Remove active class from all sessions
  const sessions = document.querySelectorAll('.session');
  sessions.forEach(session => session.classList.remove('active'));

  // Show the selected content section and add active class to the selected session
  document.getElementById(`content-${sessionId}`).style.display = 'block';
  document.getElementById(`session-${sessionId}`).classList.add('active');
}

// Initialize by displaying the content of the active session (Session 2)
document.addEventListener('DOMContentLoaded', function() {
  displayContent(2);
});
