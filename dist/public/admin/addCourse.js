document.addEventListener("DOMContentLoaded", fetchCourses);

document.getElementById("addCourseForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    try {
        const response = await fetch('/api/courses/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (result.success) {
            alert('Course added successfully!');
            this.reset();
            fetchCourses(); // Refresh the course list
        } else {
            alert('Failed to add course: ' + result.message);
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

      if (result.success) {
          result.data.forEach(course => {
              const courseElement = document.createElement("div");
              courseElement.classList.add("course");
              courseElement.innerHTML = `
                  <p>${course.title}</p>
                  <button onclick="editCourse('${course._id}', '${course.title}')">Edit</button>
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
                fetchCourses(); // Refresh course list
            } else {
                alert('Failed to delete course.');
            }
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    }
}

function editCourse(id, title, description, details, image, discount, duration, link) {
    document.getElementById("title").value = title;
    document.getElementById("description").value = description;
    document.getElementById("details").value = details;
    document.getElementById("image").value = image;
    document.getElementById("discount").value = discount;
    document.getElementById("duration").value = duration;
    document.getElementById("link").value = link;

    const form = document.getElementById("addCourseForm");
    form.onsubmit = async function(event) {
        event.preventDefault();
        const formData = new FormData(form);
        const updatedData = {};
        formData.forEach((value, key) => {
            updatedData[key] = value;
        });

        try {
            const response = await fetch(`/api/courses/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });

            const result = await response.json();
            if (result.success) {
                alert("Course updated successfully!");
                form.reset();
                fetchCourses();
                form.onsubmit = originalSubmitHandler; // Restore original submit behavior
            } else {
                alert("Failed to update course.");
            }
        } catch (error) {
            console.error("Error updating course:", error);
        }
    };
}

const originalSubmitHandler = document.getElementById("addCourseForm").onsubmit;
