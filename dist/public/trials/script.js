

// Example data for dynamic content (could be retrieved from an API in a real application)
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

// Update the dashboard with dynamic data
document.getElementById("username").textContent = `${userData.username}'s dashboard`;
document.getElementById("course-count").textContent = userData.coursesInProgress;
document.getElementById("user").textContent = `${userData.username},`;
document.getElementById("CoursesInProgress").textContent = userData.coursesInProgress;
document.getElementById("CoursesCompleted").textContent = userData.CoursesCompleted;
document.getElementById("CourseCompletionPercentage").textContent = `${userData.CourseCompletionPercentage}%`;  




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


// To-Do Section

// Select form and list
const todoForm = document.getElementById("todo-form");
const todoList = document.getElementById("todo-list");

// Load existing to-dos from localStorage
const todos = JSON.parse(localStorage.getItem("todos")) || [];

// Function to add a todo item
function addTodo(task, date) {
    const todoItem = { task, date };
    todos.push(todoItem);
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
}

// Function to delete a todo item
function deleteTodo(index) {
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
}

// Function to render the to-do list
function renderTodos() {
    todoList.innerHTML = ""; // Clear current list
    todos.forEach((todo, index) => {
        const li = document.createElement("li");
        li.innerHTML = 
            `${todo.task} - ${todo.date}
            <button onclick="deleteTodo(${index})">Delete</button>
        `;
        todoList.appendChild(li);
    });
}

// Form submission
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const task = document.getElementById("todo-task").value;
    const date = document.getElementById("todo-date").value;
    if (task && date) {
        addTodo(task, date);
        todoForm.reset();
    }
});

// Initial rendering of existing todos
renderTodos();