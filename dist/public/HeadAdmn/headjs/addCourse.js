document.addEventListener("DOMContentLoaded", fetchCourses);

// Handle adding a new course
document.getElementById("courseForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const units = [];
    document.querySelectorAll('.unit').forEach((unitDiv) => {
        units.push({
            title: unitDiv.querySelector('.unit-title').value,
            topics: unitDiv.querySelector('.unit-list').value.split('|').map(topic => topic.trim().replace(/^"(.*)"$/, '$1')).filter(topic => topic.length > 0)

        });
    });

    const courseData = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        details: document.getElementById('detailsDesc').value,
        image: document.getElementById('image').value,
        outcomes: document.getElementById('outcomes').value.split('|').map(item => item.trim()),
        who: document.getElementById('who').value.split('|').map(item => item.trim()),
        requirements: document.getElementById('requirements').value.split('|').map(item => item.trim()),
        lessons: document.getElementById('lessons').value,
        duration: document.getElementById('duration').value,
        exercises: document.getElementById('exercises').value,
        downloads: document.getElementById('downloads').value,
        files: document.getElementById('files').value,
        project: document.getElementById('project').value,
        OfferTitle: document.getElementById('OfferTitle').value,
        badge: document.getElementById('badge').value,
        price: document.getElementById('price').value,
        discount: document.getElementById('discount').value,
        saleBadge: document.getElementById('saleBadge').value,
        units: units
    };

    try {
        

        const response = await fetch('/api/courses/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(courseData)
        });

        const result = await response.json();
        if (result.success) {
            alert('Course added successfully!');
            this.reset();
            document.getElementById('units').innerHTML = ""; // Clear units
            fetchCourses();
        } else {
            alert('Error adding course: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while adding the course.');
    }
});

async function fetchCourses() {
    try {
        const response = await fetch('/api/courses');
        const result = await response.json();
        const container = document.getElementById("coursesContainer");
        container.innerHTML = ""; // Clear existing content

        if (result.success && result.data.length > 0) {
            result.data.forEach(course => {
                const courseElement = document.createElement("div");
                courseElement.classList.add("course");
                courseElement.innerHTML = `
                    <p>${course.title}</p>
                    <button onclick="editCourse('${course._id}')">Edit</button>
                    <button onclick="deleteCourse('${course._id}')">Delete</button>
                `;
                container.appendChild(courseElement);
            });
        } else {
            container.innerHTML = "<p>No courses available.</p>";
        }
    } catch (error) {
        console.error('Error fetching courses:', error);
    }
}

async function deleteCourse(courseId) {
    if (confirm("Are you sure you want to delete this course?")) {
        try {
            const response = await fetch(`/api/courses/${courseId}`, { method: 'DELETE' });
            const result = await response.json();
            if (result.success) {
                alert('Course deleted successfully!');
                fetchCourses();
            } else {
                alert('Failed to delete course.');
            }
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    }
}

async function editCourse(id) {
    try {
        const response = await fetch(`/api/courses/${id}`);
        const course = await response.json();

        if (course.success) {
            document.getElementById("title").value = course.data.title;
            document.getElementById("description").value = course.data.description;
            document.getElementById("detailsDesc").value = course.data.details;
            document.getElementById("image").value = course.data.image;
            document.getElementById("discount").value = course.data.discount;
            document.getElementById("duration").value = course.data.duration;
            
            const form = document.getElementById("courseForm");
            form.onsubmit = async function(event) {
                event.preventDefault();
                await updateCourse(id);
            };
        }
    } catch (error) {
        console.error('Error fetching course for edit:', error);
    }
}

async function updateCourse(id) {
    const updatedData = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        details: document.getElementById('detailsDesc').value,
        image: document.getElementById('image').value,
        discount: document.getElementById('discount').value,
        duration: document.getElementById('duration').value
    };

    try {
        const response = await fetch(`/api/courses/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        });

        const result = await response.json();
        if (result.success) {
            alert("Course updated successfully!");
            document.getElementById("courseForm").reset();
            fetchCourses();
        } else {
            alert("Failed to update course.");
        }
    } catch (error) {
        console.error("Error updating course:", error);
    }
}

// Add and remove course units
document.getElementById('addUnit').addEventListener('click', function() {
    const unitIndex = document.querySelectorAll('.unit').length + 1;
    const unitDiv = document.createElement('div');
    unitDiv.classList.add('unit');
    unitDiv.innerHTML = `
        <input type="text" class="unit-title" placeholder="Unit ${unitIndex} Title" required>
        <textarea class="unit-list" placeholder="Unit ${unitIndex} Topics (comma separated)" required></textarea>
        <button type="button" class="remove-unit">Remove Unit</button>
    `;
    document.getElementById('units').appendChild(unitDiv);

    unitDiv.querySelector('.remove-unit').addEventListener('click', function() {
        unitDiv.remove();
    });
});