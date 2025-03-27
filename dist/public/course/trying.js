//trying.js
document.addEventListener("DOMContentLoaded", async function () {
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

    let courses = [];
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

    function saveProgress() {
        localStorage.setItem("currentCourseIndex", currentCourseIndex);
        localStorage.setItem("currentSectionIndex", currentSectionIndex);
    }

    function loadProgress() {
        let savedCourse = localStorage.getItem("currentCourseIndex");
        let savedSection = localStorage.getItem("currentSectionIndex");
    
        if (savedCourse !== null && savedSection !== null) {
            let tempCourseIndex = parseInt(savedCourse);
            let tempSectionIndex = parseInt(savedSection);
    
            // Ensure valid course index
            if (courses.length > 0 && tempCourseIndex >= 0 && tempCourseIndex < courses.length) {
                currentCourseIndex = tempCourseIndex;
            } else {
                currentCourseIndex = 0; // Reset if invalid
            }
    
            // Ensure valid section index
            if (courses.length > 0 && tempSectionIndex >= 0 && tempSectionIndex < courses[currentCourseIndex].sections.length) {
                currentSectionIndex = tempSectionIndex;
            } else {
                currentSectionIndex = 0;
            }
        }
    }
    
    

    // ✅ Fetch courses from backend
    async function fetchCourses() {
        try {
            const response = await fetch("http://localhost:3000/api/coursedata");
            const data = await response.json();
            
            if (!Array.isArray(data)) throw new Error("Fetched data is not an array");
    
            courses = data;
            
    
            loadCourseTitles();
    
            // Check if stored index is out of bounds and reset if necessary
            let savedCourse = parseInt(localStorage.getItem("currentCourseIndex") || "0", 10);
            if (savedCourse < 0 || savedCourse >= courses.length) {
                console.warn("⚠️ Resetting course index to 0 (out of bounds)");
                localStorage.setItem("currentCourseIndex", "0");
                savedCourse = 0;
            }
            currentCourseIndex = savedCourse;
    
            loadProgress();
            loadCourse(currentCourseIndex);
        } catch (error) {
            console.error("❌ Error fetching courses:", error);
        }
    }
    
    

    function loadCourseTitles() {
        courseList.innerHTML = ""; // Clear list before adding
        courses.forEach((course, index) => {
            let li = document.createElement("li");
            li.textContent = course.title;
            li.addEventListener("click", () => loadCourse(index));
            courseList.appendChild(li);
        });
    }

    function loadCourse(courseIndex) {
        
    
        if (courseIndex < 0 || courseIndex >= courses.length) {
            console.error("❌ Invalid course index:", courseIndex);
            return;
        }
    
        currentCourseIndex = courseIndex;
        currentSectionIndex = 0;
    
        let course = courses[currentCourseIndex];
    
        if (!course) {
            console.error("❌ Course not found at index:", courseIndex);
            return;
        }
    
        headerTitle.textContent = course.title;
    
        // Highlight active course
        document.querySelectorAll("#course-list li").forEach(li => li.classList.remove("active"));
        if (document.querySelectorAll("#course-list li")[courseIndex]) {
            document.querySelectorAll("#course-list li")[courseIndex].classList.add("active");
        }
    
        displaySection();
        saveProgress();
    
        // Auto-close sidebar on small screens
        if (window.innerWidth <= 768) {
            sidebar.classList.remove("open");
        }
    }
    


    function calculateReadingTime(text) {
        const wordsPerMinute = 80; // Average reading speed
        const wordCount = text.split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / wordsPerMinute);
        return readingTime;
    }

    function insertMedia(content, images = [], codes = []) {
        let mediaHTML = ""; // Final HTML output
        let codeIndex = 0; // Track which code snippet to insert
    
        // Split content by "code1", "code2", etc.
        let parts = content.split(/(code\d+)/g); // Preserve delimiters (code1, code2...)
    
        parts.forEach((part) => {
            if (/code\d+/.test(part) && codes[codeIndex]) {
                // If part is a code placeholder (e.g., "code1") and we have a corresponding code snippet
                let codeSnippet = typeof codes[codeIndex] === "object" && codes[codeIndex].code 
                    ? codes[codeIndex].code 
                    : codes[codeIndex];
    
                let language = typeof codes[codeIndex] === "object" && codes[codeIndex].language 
                    ? codes[codeIndex].language 
                    : "python"; // Default language is Python
    
                // Highlight the code using Prism.js
                let formattedCode = Prism ? Prism.highlight(codeSnippet, Prism.languages[language], language) : codeSnippet;
    
                // Ensure proper HTML structure
                mediaHTML += `<pre class="language-${language}"><code class="language-${language}">${formattedCode}</code></pre>`;
    
                codeIndex++; // Move to next code snippet
            } else {
                // Ensure paragraphs are properly wrapped
                mediaHTML += `<p>${part.trim()}</p>`;
            }
        });
    
        // Remove empty or invalid image URLs
        let validImages = images.filter(imgSrc => imgSrc.trim() !== "");
        validImages.forEach(imgSrc => {
            mediaHTML += `<img src="${imgSrc}" alt="Course Image" onerror="this.style.display='none';">`;
        });
    
        return mediaHTML;
    }
    
    function displaySection() {
        if (courses.length === 0) {
            console.warn("⚠️ No courses loaded, cannot display section.");
            return;
        }
    
        let course = courses[currentCourseIndex];
    
        if (!course || !course.sections || course.sections.length === 0) {
            console.warn("⚠️ No sections found in the selected course.");
            return;
        }
    
        let section = course.sections[currentSectionIndex];
        let readingTime = calculateReadingTime(section.content);
    
        courseContent.innerHTML = `
            <p><em>Estimated Reading Time: ${readingTime} min</em></p>
            <h2 class="active-section">${section.heading}</h2>
            ${insertMedia(section.content, section.images || [], section.codes || [])}
        `;
    
        if (section.video) {
            videoContainer.innerHTML = `<iframe src="${section.video}" frameborder="0" allowfullscreen></iframe>`;
            videoContainer.style.display = "block";
        } else {
            videoContainer.innerHTML = "";
            videoContainer.style.display = "none";
        }
    
        updateProgress();
        updateOverallProgress();
        updateNavigation();
    
        // ✅ Apply Prism.js Syntax Highlighting after content is inserted
        Prism.highlightAll();
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


    // Fetch courses on page load
    fetchCourses();
});
