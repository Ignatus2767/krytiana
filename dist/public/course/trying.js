document.addEventListener("DOMContentLoaded", function () {
  const courseList = document.getElementById("course-list");
  const courseContent = document.getElementById("course-content");
  const progressBar = document.getElementById("progress-bar");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.getElementById("sidebar");
  const headerTitle = document.getElementById("header-title");
  const progressText = document.getElementById("progress-text");
  const searchBox = document.getElementById("search-box");
  const searchResults = document.getElementById("search-results");
  const videoContainer = document.getElementById("videoContainer");

  let currentCourseIndex = 0;
  let currentSectionIndex = 0;


    // Search function
  searchBox.addEventListener("input", function () {
    let query = searchBox.value.toLowerCase();
    searchResults.innerHTML = ""; // Clear previous results

    if (query.trim() === "") {
        searchResults.style.display = "none";
        return;
    }

    let matches = [];
    courses.forEach((course, courseIndex) => {
        course.sections.forEach((section, sectionIndex) => {
            if (section.heading.toLowerCase().includes(query)) {
                matches.push({ courseIndex, sectionIndex, title: section.heading });
            }
        });
    });

    if (matches.length === 0) {
        searchResults.innerHTML = "<li>No results found</li>";
    } else {
        matches.forEach(match => {
            let li = document.createElement("li");
            li.textContent = match.title;
            li.addEventListener("click", () => {
                loadCourse(match.courseIndex);
                currentSectionIndex = match.sectionIndex;
                displaySection();
                searchResults.style.display = "none"; // Hide results
                searchBox.value = ""; // Clear search box
            });
            searchResults.appendChild(li);
        });
    }

    searchResults.style.display = "block";
  });
  
  // ✅ Load saved progress BEFORE initializing courses
  function loadProgress() {
      let savedCourse = localStorage.getItem("currentCourseIndex");
      let savedSection = localStorage.getItem("currentSectionIndex");

      if (savedCourse !== null && savedSection !== null) {
          currentCourseIndex = parseInt(savedCourse);
          currentSectionIndex = parseInt(savedSection);
      }
  }

  function saveProgress() {
      localStorage.setItem("currentCourseIndex", currentCourseIndex);
      localStorage.setItem("currentSectionIndex", currentSectionIndex);
  }

  // ✅ Load progress first before anything else
  loadProgress();

  // Load course titles into the sidebar
  courses.forEach((course, index) => {
      let li = document.createElement("li");
      li.textContent = course.title;
      li.addEventListener("click", () => loadCourse(index));
      courseList.appendChild(li);
  });

  function loadCourse(courseIndex) {
      currentCourseIndex = courseIndex;
      currentSectionIndex = 0;

      let course = courses[courseIndex];

      // Update header title
      headerTitle.textContent = course.title;

      // Remove active class from all list items
      document.querySelectorAll("#course-list li").forEach(li => li.classList.remove("active"));
      document.querySelectorAll("#course-list li")[courseIndex].classList.add("active");

      displaySection();

      // Close sidebar automatically on small screens
      if (window.innerWidth <= 768) {
          sidebar.classList.remove("open");
      }

      saveProgress();
  }

  function calculateReadingTime(text) {
    const wordsPerMinute = 80; // Average reading speed
    const wordCount = text.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
}

// Function to dynamically load images and code within content
function insertMedia(content, images, codeSnippets) {
    let contentParts = content.split(/image\d+|code\d+/g); // Split content by image and code placeholders
    let newContent = "";

    contentParts.forEach((text, index) => {
        newContent += `<p>${text.trim()}</p>`; // Add text part
        
        if (images && images[index]) {
            newContent += `<img src="${images[index]}" alt="Course Image" style="max-width:100%; display:block; margin:10px 0;">`;
        }

        if (codeSnippets && codeSnippets[index]) {
            newContent += `<pre><code class="language-${codeSnippets[index].lang}">${codeSnippets[index].code}</code></pre>`;
        }
    });

    return newContent;
}

function displaySection() {
    let course = courses[currentCourseIndex];
    let section = course.sections[currentSectionIndex];

    let readingTime = calculateReadingTime(section.content);

    courseContent.innerHTML = `
        <p><em>Estimated Reading Time: ${readingTime} min</em></p>
        <h2 class="active-section">${section.heading}</h2>
        ${insertMedia(section.content, section.images || [], section.codes || [])}  
    `;

    // Check if video exists
    if (section.video) {
        videoContainer.innerHTML = `<iframe src="${section.video}" frameborder="0" allowfullscreen></iframe>`;
        videoContainer.style.display = "block";
    } else {
        videoContainer.innerHTML = "";
        videoContainer.style.display = "none";
    }

    // Apply syntax highlighting (if using Prism.js or another library)
    if (window.Prism) {
        Prism.highlightAll();
    }

    updateProgress();
    updateOverallProgress();
    updateNavigation();
}




function updateProgress() {
      let totalSections = courses[currentCourseIndex].sections.length;
      let progress = ((currentSectionIndex + 1) / totalSections) * 100;
      progressBar.style.width = progress + "%";

      // Change "Next" button to "Done" if at last section
      if (currentSectionIndex === totalSections - 1) {
          nextBtn.textContent = "Done";
      } else {
          nextBtn.textContent = "Next";
      }
  }

  function updateOverallProgress() {
      let totalSections = courses.reduce((total, course) => total + course.sections.length, 0);
      let completedSections = courses.slice(0, currentCourseIndex).reduce((total, course) => total + course.sections.length, 0) + currentSectionIndex + 1;

      let overallProgress = (completedSections / totalSections) * 100;
      progressText.textContent = Math.round(overallProgress) + "% completed";
  }

  function updateNavigation() {
      prevBtn.disabled = currentSectionIndex === 0;
  }

  prevBtn.addEventListener("click", () => {
      if (currentSectionIndex > 0) {
          currentSectionIndex--;
          displaySection();
      }
  });

  nextBtn.addEventListener("click", () => {
      let totalSections = courses[currentCourseIndex].sections.length;

      if (currentSectionIndex < totalSections - 1) {
          currentSectionIndex++;
          displaySection();
      } else {
          if (currentCourseIndex < courses.length - 1) {
              loadCourse(currentCourseIndex + 1);
          } else {
              alert("Congratulations! You've completed all courses.");
          }
      }
  });

  menuToggle.addEventListener("click", () => {
      sidebar.classList.toggle("open");
  });

  // ✅ Load the last visited course and section
  loadCourse(currentCourseIndex);
});
