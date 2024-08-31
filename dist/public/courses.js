// courses.js

// Step 1: Structure Your Data
const courses = [
  {
    title: "Full Stack Development",
    description: "Complete frontend web Development with html and css",
    details: "A comprehensive web development course for beginners to advanced learners. Start turning your dream of becoming a full-stack developer into reality. This is the first part of the course.",
    image: "./pics/web.png",
    discount: "20% off",
    duration: "20 mins",
    link: "./preview/?id=1"
  },

  {
    title: "Compelete android and ios repaire course",
    description: "Exploration of CPU, GPU, RAM, storage, and other critical components in mobile repair",
    details: "This course offers an in-depth exploration of Android and iOS smartphones, covering both software development and hardware design. It is designed for learners who want to master the intricacies of mobile technology from the ground up.",
    image: "./pics/repaire.jpg",
    discount: "5% off",
    duration: "276 mins",
    link: "./preview/?id=2"
  },
  
  // Add more courses here
];

// Step 2: Generate HTML Dynamically
window.addEventListener('DOMContentLoaded', () => {
  const courseContainer = document.querySelector('.grid_courses .row1_siteInfo');

  courses.forEach(course => {
      const courseHTML = `
          <div class="AboutUs">
              <div class="new_49">
                  <div class="new_video1">
                      <div class="video_div1">
                          <a href="${course.link}">
                              <div class="image_div9">
                                  <div class="box-image">
                                      <span class="content9">
                                          <img class="img-responsive9" typeof="foaf:Image" src="${course.image}" alt="${course.title}">
                                      </span>
                                  </div>
                              </div>
                          </a>
                          <div class="about_div9">
                              <a class="subject-name" href="#">${course.title}</a>
                              <div class="desc">
                                  <h3 class="content-title">
                                      <a class="bibblio-content">${course.description}</a>
                                  </h3>
                                  <p class="dotdot">${course.details}</p>
                              </div>
                          </div>
                          <div class="type_div9" style="display: flex;">
                              <div class="type" style="margin-bottom: 0px;">
                                  <div class="type-inner">
                                      <span class="time_disc1">${course.discount}</span>
                                  </div>
                              </div>
                              <div class="hours">
                                  <span class="icon-clock">
                                      <img class="icon-clock" src="icons/clock.svg">
                                  </span>
                                  <span class="time_disc">${course.duration}</span>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      `;
      courseContainer.innerHTML += courseHTML;
  });
});
