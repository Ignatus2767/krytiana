// courses.js
window.addEventListener('DOMContentLoaded', async () => {
    const courseContainer = document.querySelector('.grid_courses .row1_siteInfo');
  
    try {
      // Fetch data from the backend API
      const response = await fetch('/api/courses'); // This URL should match the route in your backend
      const { data: courses } = await response.json(); // Parse JSON response and extract courses array
  
      // Iterate over the courses and generate HTML for each
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
        courseContainer.innerHTML += courseHTML; // Append the generated HTML to the container
      });
    } catch (error) {
      console.error('Error fetching courses:', error); // Log any errors
    }
  });
  