// Hardcoded array of courses
const coursList = [
    { id: 1, title: "JavaScript for Beginners" },
    { id: 2, title: "Advanced CSS Techniques" },
    { id: 3, title: "Intro to Python" },
    { id: 4, title: "React.js Fundamentals" },
    { id: 5, title: "Node.js and Express" }
];



// Call the function when the page loads
document.addEventListener('DOMContentLoaded', loadCoursesToDropdown);

const userData = {
    username: "krytian",
    coursesInProgress: 2,
    CourseCompletionPercentage: 37,
    CoursesCompleted: 1,
    
    courses: [
        {
            name: "Full Stack Development",
            progress: 79,
            lastActive: "Today",
            imageUrl: "./web.png", // Replace with actual image URL
        },
        {
            name: "Compelete android and ios repaire course",
            progress: 100,
            lastActive: "Today",
            imageUrl: "./repaire.jpg", // Replace with actual image URL
        },
        {
            name: "Web Development with HTML and CSS for Beginners",
            progress: 27,
            lastActive: "Yesterday",
            imageUrl: "./android1.jpg", // Replace with actual image URL
        }
    ]
};

// Function to load courses into the dropdown
function loadCoursesToDropdown() {
    const dropdown = document.getElementById('todo-task');

    // Loop through the courses array and create <option> elements
    coursList.forEach(course => {
        const option = document.createElement('option');
        option.value = course.id;
        option.textContent = course.title;
        dropdown.appendChild(option);
    });
}


const courseList = document.getElementById("course-list");

userData.courses.forEach(course => {
    const courseCard = document.createElement("div");
    courseCard.className = "course-card";

    // Check if progress is 100%
    let buttonLabel = "Continue Learning";
    let progressText = `${course.progress}% Complete`;

    if (course.progress === 100) {
        buttonLabel = "Enroll Again";  // Change the button label to "Enroll Again"
        progressText = "Completed";   // Change the progress text to "Completed"
    }

    courseCard.innerHTML = `
        <div class="left-section">
            <div class="course-image">
                <img src="${course.imageUrl}" alt="${course.name}">
            </div>
            <button class="unenroll-button">Unenroll</button>
        </div>

        <div class="right-section">
            <h3>${course.name}</h3>
            <div class="progress-bar">
                <div style="width: ${course.progress}%"></div>
                <span id="progress-percentage">${progressText}</span>
            </div>
            <button class="continue-button">${buttonLabel}</button>
        </div>
    `;

    courseList.appendChild(courseCard);
});


// Fetch user data and populate the dashboard with dynamic content
async function fetchUserData() {
    try {
        const response = await fetch('/api/user/profile', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // Use token from local storage
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        console.log('User data fetched:', data); // Log the user data fetched

        if (data.success) {
            // Update the dashboard with dynamic data
            document.getElementById("username").textContent = `${data.user.username}'s dashboard`;
            
            // Access and display user statistics
            document.getElementById("CoursesInProgress").textContent = data.statistics.coursesInProgress;
            document.getElementById("CoursesCompleted").textContent = data.statistics.coursesCompleted;
            document.getElementById("CourseCompletionPercentage").textContent = data.statistics.courseCompletionPercentage;
            document.getElementById("course-count").textContent = data.statistics.coursesInProgress;
            document.getElementById("user").textContent = `${data.user.username},`;

            // Clear the course list before displaying new courses
            const courseList = document.getElementById("course-list");
            courseList.innerHTML = '';  // Clears any previous content

            // Loop through courses and display them
            data.courses.forEach(course => {
                const courseCard = document.createElement("div");
                courseCard.className = "course-card";

                let buttonLabel = course.progress === 100 ? "Enroll Again" : "Continue Learning";
                let progressText = course.progress === 100 ? "Completed" : `${course.progress}% Complete`;

                courseCard.innerHTML = `
                    <div class="left-section">
                        <div class="course-image">
                            <img src="./web.png" alt="${course.title}">
                        </div>
                        <button class="unenroll-button">Unenroll</button>
                    </div>

                    <div class="right-section">
                        <h3>${course.title}</h3>
                        <div class="progress-bar">
                            <div style="width: ${course.progress}%"></div>
                            <span id="progress-percentage">${progressText}</span>
                        </div>
                        <button class="continue-button">${buttonLabel}</button>
                    </div>
                `;

                courseList.appendChild(courseCard);
            });
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

// Add a new To-Do reminder
async function addTodoReminder(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    console.log('Adding To-Do reminder...'); // Log before adding

    const task = document.getElementById('todo-task').value;
    const date = document.getElementById('todo-date').value;

    console.log('Task:', task); // Log the task
    console.log('Date:', date); // Log the date

    try {
        const response = await fetch('/api/todo', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // Use token from local storage
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ task, date }), // Send the task and date as JSON
        });

        const data = await response.json();
        console.log('Response from server:', data); // Log the server response

        if (data.success) {
            fetchTodoReminders(); // Refresh the list of reminders after successfully adding a new one
            document.getElementById('todo-form').reset(); // Reset the form fields
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Error adding reminder:', error);
    }
}



// Call the fetch function on page load or when needed
fetchUserData();
