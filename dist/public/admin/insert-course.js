document.addEventListener("DOMContentLoaded", () => {
    const addSectionBtn = document.getElementById("add-section");
    const sectionsContainer = document.getElementById("sections-container");
    const courseForm = document.getElementById("course-form");

    let sectionCount = 0;

    addSectionBtn.addEventListener("click", () => {
        sectionCount++;
        const sectionDiv = document.createElement("div");
        sectionDiv.classList.add("section");
        sectionDiv.innerHTML = `
            <h3>Section ${sectionCount}</h3>
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

        sectionDiv.querySelector(".remove-section").addEventListener("click", () => {
            sectionDiv.remove();
        });

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

            codeDiv.querySelector(".remove-code").addEventListener("click", () => {
                codeDiv.remove();
            });
        });
    });

    function collectCourseData() {
        let courseData = {
            title: document.getElementById("course-title").value,
            sections: []
        };

        document.querySelectorAll(".section").forEach(section => {
            let codes = [];
            section.querySelectorAll(".codes-container > div").forEach(codeDiv => {
                codes.push({
                    lang: codeDiv.querySelector(".code-lang").value,
                    code: codeDiv.querySelector(".code-snippet").value
                });
            });

            let imageLinks = section.querySelector(".section-images").value
                .split(",")
                .map(link => link.trim()); // ✅ Split by comma and trim spaces

            courseData.sections.push({
                heading: section.querySelector(".section-heading").value,
                content: section.querySelector(".section-content").value,
                video: section.querySelector(".section-video").value,
                images: imageLinks, // ✅ Store links instead of file names
                codes: codes
            });
        });

        return courseData;
    }

    courseForm.addEventListener("submit", (event) => {
        event.preventDefault();

        let courseData = collectCourseData();
        fetch("/api/courses/save-course", {  
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(courseData)  // ✅ Send as JSON
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to save course");
            }
            return response.json();
        })
        .then(data => alert("Course saved successfully!"))
        .catch(error => console.error("Error:", error));
    });
});
