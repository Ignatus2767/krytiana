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

    let currentTopicIndex = 0; // Add this line to define the variable
    let currentSectionIndex = 0; // Your existing code
    
    let topics = [];


    // Function to fetch topics based on course title
    async function loadTopics() {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const courseTitle = urlParams.get("courseTitle");

            if (!courseTitle) {
                console.error("❌ No course title found in URL.");
                return;
            }


            // Fetch course data from MongoDB API
            const response = await fetch(`/api/coursedata/${encodeURIComponent(courseTitle)}`);
            const courseData = await response.json();

            // Ensure valid course data with topics
            if (!courseData || !courseData.courseTitle || !Array.isArray(courseData.topics)) {
                throw new Error("Course not found or invalid response");
            }

            console.log("✅ Course loaded:", courseData);

            // Directly store the topics in a variable
            topics = courseData.topics;

            if (topics.length === 0) {
                throw new Error("❌ No topics found in the course.");
            }

            // ✅ Populate sidebar dynamically AFTER topics are fetched
            courseList.innerHTML = ""; // Clear existing list
            topics.forEach((topic, index) => {
                let li = document.createElement("li");
                li.textContent = topic.title;
                li.addEventListener("click", () => loadTopic(index));
                courseList.appendChild(li);
            });

            // Load the first topic
            loadTopic(currentTopicIndex);  // Ensure this line is correctly placed here

        } catch (error) {
            console.error("❌ Error fetching course:", error);
        }
    }
    console.log("📌 Fetching topics:", topics);
    loadTopics();  // Call loadTopics when the page loads

    // Search function
    searchBox.addEventListener("input", function () {
        let query = searchBox.value.toLowerCase();
        searchResults.innerHTML = ""; // Clear previous results

        if (query.trim() === "") {
            searchResults.style.display = "none";
            return;
        }

        let matches = [];
        topics.forEach((topic, topicIndex) => {
            topic.sections.forEach((section, sectionIndex) => {
                if (section.heading.toLowerCase().includes(query)) {
                    matches.push({ topicIndex, sectionIndex, title: section.heading });
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
                    loadTopic(match.topicIndex);
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
        localStorage.setItem("currentTopicIndex", currentTopicIndex);
        localStorage.setItem("currentSectionIndex", currentSectionIndex);
    }
    

    // ✅ Load progress first before anything else
    loadProgress();

    // Load course titles into the sidebar


    function loadTopic(topicIndex) {
        currentTopicIndex = topicIndex;
        currentSectionIndex = 0;  // Start from the first section

        let topic = topics[topicIndex];

        // Update the header title to the topic's title
        headerTitle.textContent = topic.title;

        // Remove active class from all list items and add to the selected one
        const courseListItems = document.querySelectorAll("#course-list li");
        if (courseListItems.length > 0) {
            courseListItems.forEach(li => li.classList.remove("active"));
            if (courseListItems[topicIndex]) {
                courseListItems[topicIndex].classList.add("active");
            }
        }
        displaySection();  // Display the first section of the topic

        saveProgress();  // Save progress

        // Close sidebar if screen size is small
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
        let topic = topics[currentTopicIndex];
        let section = topic.sections[currentSectionIndex];

        let readingTime = calculateReadingTime(section.content);

        courseContent.innerHTML = `
            <p><em>Estimated Reading Time: ${readingTime} min</em></p>
            <h2 class="active-section">${section.heading}</h2>
            ${insertMedia(section.content, section.images || [], section.codes || [])}
        `;

        // Check if there's a video for this section
        if (section.video) {
            videoContainer.innerHTML = `<iframe src="${section.video}" frameborder="0" allowfullscreen></iframe>`;
            videoContainer.style.display = "block";
        } else {
            videoContainer.innerHTML = "";
            videoContainer.style.display = "none";
        }

        updateProgress();  // Update progress bar
        updateOverallProgress();  // Update overall progress
        updateNavigation();  // Update navigation buttons (Next/Previous)
    }

    function updateProgress() {
        let totalSections = topics[currentTopicIndex].sections.length;
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
        let totalSections = topics.reduce((total, topic) => total + topic.sections.length, 0);
        let completedSections = topics.slice(0, currentTopicIndex).reduce((total, topic) => total + topic.sections.length, 0) + currentSectionIndex + 1;

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
        let totalSections = topics[currentTopicIndex].sections.length;

        if (currentSectionIndex < totalSections - 1) {
            currentSectionIndex++;
            displaySection();
        } else {
            if (currentTopicIndex < topics.length - 1) {
                loadTopic(currentTopicIndex + 1);
            } else {
                alert("Congratulations! You've completed all topics.");
            }
        }
    });

    menuToggle.addEventListener("click", () => {
        sidebar.classList.toggle("open");
    });

    // ✅ Load the last visited course and section
    loadTopic(currentTopicIndex);
});
