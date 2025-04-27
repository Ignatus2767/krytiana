document.addEventListener("DOMContentLoaded", function () {
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.getElementById("sidebar");
  const courseList = document.getElementById('course-list');
  const contentDivs = document.querySelectorAll('#content > div');

  // Handle clicking sidebar list items
  courseList.addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
      const targetClass = event.target.getAttribute('data-target');

      contentDivs.forEach(div => {
        if (div.classList.contains(targetClass)) {
          div.classList.add('active');   // Show clicked content
        } else {
          div.classList.remove('active'); // Hide others
        }
      });
    }
  });

  // Set the first content active on page load
  contentDivs.forEach((div, index) => {
    if (index === 0) {
      div.classList.add('active');
    } else {
      div.classList.remove('active');
    }
  });

  // Close sidebar if screen size is small
  if (window.innerWidth <= 768) {
    sidebar.classList.remove("open");
  }

  // Toggle sidebar open/close
  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  // Load saved theme from localStorage
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
  }

  // Toggle dark mode on button click
  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Save preference to localStorage
    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("darkMode", "enabled");
    } else {
      localStorage.setItem("darkMode", "disabled");
    }
  });
});
