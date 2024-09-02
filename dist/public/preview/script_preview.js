// Handle the content display and countdown timer
document.addEventListener('DOMContentLoaded', (event) => {
  // Show the content for Button 1 by default and set it as active
  showDiv('content1', 'button1');
  
  // Set the duration for countdown (3 hours in milliseconds)
  const countdownDuration = 3 * 60 * 60 * 1000; 
  
  // Set up timers for each offer-container
  const offerContainers = document.querySelectorAll(".offer-container");

  offerContainers.forEach(function(container) {
    const endTime = new Date().getTime() + countdownDuration; // 3 hours from now
    createCountdown(container, endTime);
  });
});

// Function to create a countdown timer
function createCountdown(container, endTime) {
    const timerElement = container.querySelector(".timer");
    
    // Check if timerElement exists
    if (!timerElement) {
        console.error('Timer element not found in container');
        return;
    }

    // Update the count down every 1 second
    const intervalId = setInterval(function() {
        // Get current date and time
        const now = new Date().getTime();

        // Find the distance between now and the count down date
        const distance = endTime - now;

        // Time calculations for hours, minutes, and seconds
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the timer element
        timerElement.textContent = `${hours}h : ${minutes}m : ${seconds}s`;

        // If the count down is over, write some text 
        if (distance < 0) {
            clearInterval(intervalId);
            timerElement.textContent = "EXPIRED";
        }
    }, 1000);
}

// Function to show and hide content sections
function showDiv(divId, buttonId) {
  // Hide all hidden content divs
  const hiddenDivs = document.querySelectorAll('.hidden-content');
  hiddenDivs.forEach(div => div.style.display = 'none');

  // Show the selected div
  const selectedDiv = document.getElementById(divId);
  if (selectedDiv) {
    selectedDiv.style.display = 'block';
  } else {
    console.error(`Div with ID "${divId}" not found`);
  }

  // Remove active class from all buttons
  const buttons = document.querySelectorAll('.discription');
  buttons.forEach(button => button.classList.remove('active'));

  // Add active class to the selected button
  const selectedButton = document.getElementById(buttonId);
  if (selectedButton) {
    selectedButton.classList.add('active');
  } else {
    console.error(`Button with ID "${buttonId}" not found`);
  }
}

// Extract course ID from URL
const params = new URLSearchParams(window.location.search);
const courseId = params.get('id');

// Define course data with learning outcomes and additional details
const courses = [
  {
    id: 1,
    title: "Full Stack Development",
    description: "Do fractions and decimals make you apprehensive about maths? Do you lack confidence in dealing with numbers? If so, then this free course, Numbers, units and arithmetic, is for you. The course will explain the basics of working with positive and negative numbers and how to multiply and divide with fractions and decimals.",
    image: "./pics/web.png",
    outcomes: [
      "Write whole numbers and decimals in place-value columns and compare their sizes",
      "Multiply and divide whole numbers and decimals by 10, 100, 1000 and so on",
      "Indicate given fractions on a diagram and find equivalent fractions for a given fraction",
      "Mark numbers on a number line",
      "Choose appropriate units for a given purpose"
    ],
    who: [
      "Anyone interested in learning the basics of machine learning"
    ],
    requirements: [
      "To carry out this course, you will need basic knowledge of Python."
    ],
    lessons: "31 lessons",
    duration: "(2h 18m)",
    exercises: "16 exercises",
    downloads: "13 downloads",
    files: "(9 files)",
    project: "12 Course final project",
    u1: "U1: Introduction",
    OfferTitle: "Best Price with Unlimited Offer",
    badge: "PLUS",
    price: "$0.99",
    discount: "95% Disc. <s>$19.99 USD</s>",
    saleBadge: "Promotion!",
    u1_list: [
      "Write whole numbers and decimals in place-value columns and compare their sizes",
      "Multiply and divide whole numbers and decimals by 10, 100, 1000 and so on",
      "Indicate given fractions on a diagram and find equivalent fractions for a given fraction",
      "Mark numbers on a number line",
      "Choose appropriate units for a given purpose."
    ],
    u2: "U2: HTML structure",
    u2_list: [
      "Write whole numbers and decimals in place-value columns and compare their sizes",
      "Multiply and divide whole numbers and decimals by 10, 100, 1000 and so on",
      "Indicate given fractions on a diagram and find equivalent fractions for a given fraction",
      "Mark numbers on a number line",
      "Choose appropriate units for a given purpose."
    ]
  },

  {
    id: 2,
    title: "Full Stack Development",
    description: "This course offers an in-depth exploration of Android and iOS smartphones, covering both software development and hardware design. It is designed for learners who want to master the intricacies of mobile technology from the ground up.",
    image: "./pics/repaire.jpg",
    outcomes: [
      "Understand the fundamental architecture of Android and iOS operating systems.",
      "Develop mobile applications for both Android and iOS platforms using modern programming languages and tools such as Java, Kotlin, Swift, and Xcode.",
      "Explore hardware components of smartphones, including processors, memory, sensors, and displays.",
      "Learn about the integration of hardware and software, focusing on optimizing performance and energy efficiency.",
      "Gain hands-on experience in mobile UI/UX design, ensuring apps are user-friendly and adhere to platform-specific guidelines.",
      "Study the security frameworks of Android and iOS, understanding how to protect user data and ensure app integrity.",
    ],
    who: [
      "This course is ideal for software developers, hardware engineers, product designers, and tech enthusiasts who are eager to gain a comprehensive understanding of mobile phone technology."
    ],
    requirements: [
      "Basic knowledge of programming is recommended but not required. A keen interest in mobile technology will help learners get the most out of this course."
    ],
    lessons: "300 lessons",
    duration: "(20h 18m)",
    exercises: "160 exercises",
    downloads: "103 downloads",
    files: "(94 files)",
    project: "72 Course final project",
    u1: "U1: Introduction",
    OfferTitle: "Best Price with Unlimited Offer",
    badge: "PLUS",
    price: "$7.99",
    discount: "455% Disc. <s>$19.99 USD</s>",
    saleBadge: "Promotion!",
    u1_list: [
      "Analyze case studies of popular apps and hardware innovations to learn from real-world examples.",
      "Introduction to Mobile Operating Systems: Overview of Android and iOS, their history, and market influence.",
      "Software Development for Android and iOS: Setting up development environments, coding basics, and creating simple applications.",
      "Deep Dive into Smartphone Hardware: Exploration of CPU, GPU, RAM, storage, and other critical components.",
      "Sensor Integration and Performance Optimization: Understanding how sensors work with software to deliver features like GPS, accelerometers, and biometrics."
    ],
    u2: "U2: phone board structure",
    u2_list: [
      "UI/UX Design Principles: Designing intuitive and aesthetically pleasing interfaces for both platforms.",
      "Security and Data Protection: Implementing secure coding practices and understanding OS-level security features.",
      "Testing and Deployment: Best practices for testing mobile applications and deploying them to app stores.",
      "Case Studies and Emerging Technologies: Learning from successful applications and exploring the future of mobile technology.",
      "Course Duration: 12 weeks (with an optional final project for hands-on experience)."
    ]
  },

  {
    id: 3,
    title: "Compelete android and ios repaire course",
    description: "Learn data analysis and visualization techniques",
    image: "./pics/android1.jpg",
    outcomes: [
      "Understand the principles of data analysis and visualization",
      "Use statistical techniques to interpret data",
      "Create effective data visualizations"
    ]
  }
];

// Load course data based on ID
window.addEventListener('DOMContentLoaded', () => {
  const course = courses.find(c => c.id == courseId);

  if (course) {
    document.getElementById('course-title').textContent = course.title;
    document.getElementById('course-description').textContent = course.description;
    document.getElementById('course-image').src = course.image;

    // Populate learning outcomes
    const outcomeList = document.getElementById('outcome-list');
    course.outcomes.forEach(outcome => {
      const listItem = document.createElement('li');
      listItem.textContent = outcome;
      listItem.classList.add('li');
      outcomeList.appendChild(listItem);
    });

    // Populate who is this course for
    const whoList = document.getElementById('who-list');
    course.who?.forEach(who => {
      const listItem = document.createElement('li');
      listItem.textContent = who;
      listItem.classList.add('li');
      whoList.appendChild(listItem);
    });

    // Populate requirements
    const requirementsList = document.getElementById('requirements-list');
    course.requirements?.forEach(requirement => {
      const listItem = document.createElement('li');
      listItem.textContent = requirement;
      listItem.classList.add('li');
      requirementsList.appendChild(listItem);
    });

    // Populate course details
    document.getElementById('lessons').textContent = `${course.lessons}`;
    document.getElementById('duration').textContent = `${course.duration}`;
    document.getElementById('exercises').textContent = `${course.exercises}`;
    document.getElementById('downloads').textContent = `${course.downloads}`;
    document.getElementById('files').textContent = `${course.files}`;
    document.getElementById('project').textContent = `${course.project}`;
    document.getElementById('badge').textContent = `${course.badge}`;
    document.getElementById('Price').textContent = `${course.price}`;
    document.getElementById('discount').textContent = `${course.discount}`;
    document.getElementById('offer-title').textContent = `${course.OfferTitle}`;
    document.getElementById('saleSadge').textContent = `${course.saleBadge}`;

    // Populate course units
    const u1Element = document.getElementById('u1');
    u1Element.textContent = course.u1;
    
    const u1List = document.getElementById('u1-list');
    course.u1_list?.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = item;
      listItem.classList.add('li');
      u1List.appendChild(listItem);
    });

    const u2Element = document.getElementById('u2');
    u2Element.textContent = course.u2;
    
    const u2List = document.getElementById('u2-list');
    course.u2_list?.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = item;
      listItem.classList.add('li');
      u2List.appendChild(listItem);
    });
  } else {
    document.body.innerHTML = "<h1>Course not found</h1>";
  }
});
