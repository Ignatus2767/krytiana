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

    if (!accessToken || !refreshToken) {
        console.warn("No tokens found. Redirecting to login...");
        alert("Please log in.");
        setTimeout(() => window.location.href = "../register/", 500); // Slight delay before redirect
        return;
    }

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

// Sample course data
const courses = [
    {
        id: 1,
        title: "Complete mobile repaire course",
        category: "Development",
        description: "This course offers an in-depth exploration of Android and iOS smartphones, covering both software development and hardware design. It is designed for learners who want to master the intricacies of mobile technology from the ground up.",
        image: "web.png",
        price: "video course",
        duration: "48 hrs"
    },

    // Add more courses as needed
];

// Function to generate course cards
function generateCourseCards(courses) {
    const courseList = document.getElementById("course-list1");

    courses.forEach(course => {
        // Create card element
        const card = document.createElement("div");
        card.className = "course-card";

        // Create content section
        const content = document.createElement("div");
        content.className = "course-content";

        // Create image element
        const img = document.createElement("img");
        img.src = course.image;
        img.alt = course.title;

        // Create details section
        const details = document.createElement("div");
        details.className = "course-details";

        // Create category, title, and description
        const category = document.createElement("div");
        category.className = "course-category";
        category.textContent = course.category;

        const title = document.createElement("div");
        title.className = "course-title";
        title.textContent = course.title;

        const description = document.createElement("div");
        description.className = "course-description";
        description.textContent = course.description;

        // Append category, title, and description to details
        details.appendChild(category);
        details.appendChild(title);
        details.appendChild(description);

        // Append image and details to content
        content.appendChild(img);
        content.appendChild(details);

        // Append content to card
        card.appendChild(content);

        // Create divider
        const divider = document.createElement("div");
        divider.className = "divider";
        card.appendChild(divider);

        // Create footer
        const footer = document.createElement("div");
        footer.className = "course-footer";

        // Create price and duration elements
        const price = document.createElement("div");
        price.className = "price";
        price.textContent = course.price;

        const duration = document.createElement("div");
        duration.className = "duration";
        duration.textContent = course.duration;

        // Append price and duration to footer
        footer.appendChild(price);
        footer.appendChild(duration);

        // Append footer to card
        card.appendChild(footer);

        courseList.appendChild(card);
    });
}

// Call the function to generate the cards
generateCourseCards(courses);



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

        const mainContent = document.querySelector("main"); // Selects the <main> element

        if (data.success) {
            mainContent.style.display = "block"; // Show the content

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
                            <img src="${course.imageUrl}" alt="${course.title}">
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
            if (data.message === "Invalid Token") {
                alert("Your session has expired. Please log in again.");
            }
            console.error(data.message);
            setTimeout(() => window.location.href = "../register/", 500); // Redirect after delay
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
