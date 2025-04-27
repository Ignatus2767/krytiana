document.addEventListener("DOMContentLoaded", () => {
    const addTopicBtn = document.getElementById("add-topic");
    const topicsContainer = document.getElementById("topics-container");
    const courseForm = document.getElementById("course-form");
    const saveButton = document.querySelector("button[type='submit']"); 
    const previewBtn = document.getElementById("preview-btn");
    const previewModal = document.getElementById("preview-modal");
    const closeModal = document.querySelector(".close");
    const previewContent = document.getElementById("preview-content");

    let topicCount = 0;

    // ✅ Always show an input field for course title
    let courseTitleInput = document.createElement("input");
    courseTitleInput.type = "text";
    courseTitleInput.id = "course-title";
    courseTitleInput.placeholder = "Enter course title";
    courseTitleInput.required = true;
    
    let titleLabel = document.createElement("label");
    titleLabel.textContent = "Course Title:";
    
    let formContainer = document.querySelector("#course-form");
    formContainer.insertBefore(titleLabel, formContainer.firstChild);
    formContainer.insertBefore(courseTitleInput, formContainer.firstChild.nextSibling);

    // ✅ Ensure "Add Topic" button always works
    function enableAddTopic() {
        addTopicBtn.disabled = false;
    }

    enableAddTopic();

    // ➕ Add new topic
    addTopicBtn.addEventListener("click", () => {
        topicCount++;
        const topicDiv = document.createElement("div");
        topicDiv.classList.add("topic");
        topicDiv.innerHTML = `
            <h3>Topic ${topicCount}</h3>
            <label>Topic Title:</label>
            <input type="text" class="topic-title" required>

            <h4>Sections</h4>
            <div class="sections-container"></div>
            <button type="button" class="add-section">+ Add Section</button>

            <button type="button" class="remove-topic">Remove Topic</button>
        `;
        topicsContainer.appendChild(topicDiv);

        // 🗑️ Remove topic
        topicDiv.querySelector(".remove-topic").addEventListener("click", () => {
            topicDiv.remove();
        });

        // ➕ Add section inside topic
        topicDiv.querySelector(".add-section").addEventListener("click", () => {
            const sectionsContainer = topicDiv.querySelector(".sections-container");
            const sectionDiv = document.createElement("div");
            sectionDiv.classList.add("section");
            sectionDiv.innerHTML = `
                <label>Heading:</label>
                <input type="text" class="section-heading" required>

                <label>Content:</label>
                <textarea class="section-content" required></textarea>

                <label>Video URL (optional):</label>
                <input type="text" class="section-video">

                <label>Image URLs (comma-separated):</label>
                <input type="text" class="section-images">

                <div class="codes-container"></div>
                <button type="button" class="add-code">+ Add Code Snippet</button>

                <button type="button" class="remove-section">Remove Section</button>
            `;
            sectionsContainer.appendChild(sectionDiv);

            // 🗑️ Remove section
            sectionDiv.querySelector(".remove-section").addEventListener("click", () => {
                sectionDiv.remove();
            });

            // ➕ Add code snippet
            sectionDiv.querySelector(".add-code").addEventListener("click", () => {
                const codesContainer = sectionDiv.querySelector(".codes-container");
                const codeDiv = document.createElement("div");
                codeDiv.innerHTML = `
                    <label>Code Language:</label>
                    <input type="text" class="code-lang">
                    
                    <label>Code Snippet:</label>
                    <textarea class="code-snippet"></textarea>

                    <button type="button" class="remove-code">Remove Code</button>
                `;
                codesContainer.appendChild(codeDiv);

                // 🗑️ Remove code snippet
                codeDiv.querySelector(".remove-code").addEventListener("click", () => {
                    codeDiv.remove();
                });
            });
        });
    });

    // 📝 Collect course data in correct format
    function collectCourseData() {
        let courseTitle = courseTitleInput.value.trim();

        if (!courseTitle) {
            alert("Please enter a course title.");
            return null;
        }

        let courseData = {
            courseTitle: courseTitle,
            topics: []
        };

        document.querySelectorAll(".topic").forEach(topic => {
            let topicData = {
                title: topic.querySelector(".topic-title").value,
                sections: []
            };

            topic.querySelectorAll(".section").forEach(section => {
                let codes = [];
                section.querySelectorAll(".codes-container > div").forEach(codeDiv => {
                    codes.push({
                        lang: codeDiv.querySelector(".code-lang").value,
                        code: codeDiv.querySelector(".code-snippet").value
                    });
                });

                let imageLinks = section.querySelector(".section-images").value
                    .split(",")
                    .map(link => link.trim());

                topicData.sections.push({
                    heading: section.querySelector(".section-heading").value,
                    content: section.querySelector(".section-content").value,
                    video: section.querySelector(".section-video").value,
                    images: imageLinks, 
                    codes: codes
                });
            });

            courseData.topics.push(topicData);
        });

        return courseData;
    }

    // ✅ Submit the course form
    courseForm.addEventListener("submit", (event) => {
        event.preventDefault();

        let courseData = collectCourseData();
        if (!courseData) return;

        fetch("/api/coursedata/save-course", {    
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(courseData)
        })
        .then(response => response.json())
        .then(data => alert("Course saved successfully!"))
        .catch(error => console.error("Error:", error));
    });

    // 🏗️ Preview Button Functionality
    previewBtn.addEventListener("click", () => {
        previewModal.style.display = "block";
    });

    closeModal.addEventListener("click", () => {
        previewModal.style.display = "none";
    });
});
