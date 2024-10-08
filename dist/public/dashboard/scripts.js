// Hardcoded array of courses
const coursList = [
    { id: 1, title: "JavaScript for Beginners" },
    { id: 2, title: "Advanced CSS Techniques" },
    { id: 3, title: "Intro to Python" },
    { id: 4, title: "React.js Fundamentals" },
    { id: 5, title: "Node.js and Express" }
];

// Fetch with Refresh Token function
async function fetchWithRefreshToken(url, options = {}) {
    const accessToken = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    console.log('Access Token:', accessToken); // Log the access token
    console.log('Refresh Token:', refreshToken); // Log the refresh token

    options.headers = {
        ...options.headers,
        'Authorization': `Bearer ${accessToken}`,
    };

    console.log(`Fetching URL: ${url} with options:`, options); // Log the URL and options

    let response = await fetch(url, options);
    console.log('Initial response status:', response.status); // Log the response status

    // Check if the access token has expired
    if (response.status === 401) {
        console.log('Access token expired. Attempting to refresh token...'); // Log token expiration

        const refreshResponse = await fetch('/api/refresh-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
        });

        console.log('Refresh token response status:', refreshResponse.status); // Log the refresh response status

        if (refreshResponse.ok) {
            const data = await refreshResponse.json();
            console.log('New access token received:', data.accessToken); // Log the new access token
            localStorage.setItem('accessToken', data.accessToken);
            options.headers['Authorization'] = `Bearer ${data.accessToken}`;
            response = await fetch(url, options);
            console.log('Retrying original request with new access token...'); // Log the retry attempt
        } else {
            console.error('Failed to refresh token'); // Log failure to refresh
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            // Optionally redirect to login page here
        }
    }

    return response;
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadCoursesToDropdown();
    fetchUserData();
});


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
        const response = await fetchWithRefreshToken('/api/user/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        console.log('User data fetched:', data);

        if (data.success) {
            // Update the dashboard with dynamic data
            document.getElementById("username").textContent = `${data.user.username}'s dashboard`;
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

                const buttonLabel = course.progress === 100 ? "Enroll Again" : "Continue Learning";
                const progressText = course.progress === 100 ? "Completed" : `${course.progress}% Complete`;

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
