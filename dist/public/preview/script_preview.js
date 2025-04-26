// Handle the content display and countdown timer
document.addEventListener('DOMContentLoaded', () => {
  showDiv('content1', 'button1');

  
  const countdownDuration = 3 * 60 * 60 * 1000;
  document.querySelectorAll(".offer-container").forEach(container => {
      createCountdown(container, new Date().getTime() + countdownDuration);
  });

 


  // Get course ID from URL and fetch data
  const params = new URLSearchParams(window.location.search);
  const courseId = params.get('id');
  if (!courseId) {
      console.error("Course ID is missing from URL!");
      document.body.innerHTML = "<h1>Invalid course ID</h1>";
  } else {
      fetchCourseData(courseId);
  }
});

function createCountdown(container, endTime) {
  const timerElement = container.querySelector(".timer");
  if (!timerElement) return console.error('Timer element not found');
  
  const intervalId = setInterval(() => {
      const distance = endTime - new Date().getTime();
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      timerElement.textContent = distance < 0 ? "EXPIRED" : `${hours}h : ${minutes}m : ${seconds}s`;
      if (distance < 0) clearInterval(intervalId);
  }, 1000);
}

function showDiv(divId, buttonId) {
  document.querySelectorAll('.hidden-content').forEach(div => div.style.display = 'none');
  const selectedDiv = document.getElementById(divId);
  if (selectedDiv) selectedDiv.style.display = 'block';
  else console.error(`Div with ID "${divId}" not found`);
  
  document.querySelectorAll('.discription').forEach(button => button.classList.remove('active'));
  const selectedButton = document.getElementById(buttonId);
  if (selectedButton) selectedButton.classList.add('active');
  else console.error(`Button with ID "${buttonId}" not found`);
}

async function fetchCourseData(courseId) {
  try {
      const response = await fetch(`/api/courses/${courseId}`);
      if (!response.ok) throw new Error('Course not found');
      
      const { success, data } = await response.json();
      if (!success) throw new Error('Invalid response from server');
      
      updateCourseDetails(data);
  } catch (error) {
      console.error('Error fetching course:', error);
      document.body.innerHTML = "<h1>Course not found</h1>";
  }
}

function updateCourseDetails(course) {
  const elements = {
      'course-title': course.title,
      'course-description': course.details,
      'lessons': `${course.lessons} lessons`,
      'duration': `(${course.duration})`,
      'exercises': `${course.exercises} exercises`,
      'downloads': `${course.downloads} downloads`,
      'files': `(${course.files} files)`,
      'project': `${course.project} Course final project`,
      'badge': course.badge,
      'Price': `$${course.price}`,
      'discount': `-${course.discount}% Disc`,
      'offer-title': course.OfferTitle,
      'saleBadge': course.saleBadge
  };
  
  Object.entries(elements).forEach(([id, value]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
      else console.error(`Element with ID "${id}" not found`);
  });
  
  const imgEl = document.getElementById('course-image');
  if (imgEl) imgEl.src = course.image || '';
  else console.error('Image element not found');
  
  updateList('outcome-list', course.outcomes);
  updateList('who-list', course.who);
  updateList('requirements-list', course.requirements);
  
  
  updateUnits(course.units);

  // ✅ Set course title dynamically in the "Enter Course" button
   // ✅ Set course title dynamically in the "Enter Course" button
const enterCourseBtn = document.getElementById("enter-course-btn");

if (enterCourseBtn) {
    enterCourseBtn.dataset.courseTitle = course.title;

    enterCourseBtn.addEventListener("click", async () => {
        const accessToken = localStorage.getItem('token');
        const refreshToken = localStorage.getItem('refreshToken');

            if (!accessToken || !refreshToken) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Login Required',
                    text: 'Please log in to access the course!',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                }).then(() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('refreshToken');
                    window.location.href = "../register/";
                });
                return;
            }

            try {
                // 1. Try validating the access token
                const response = await fetch('/api/auth/validate-token', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    // Access token valid ➔ allow user to enter course
                    window.location.href = `/course/?courseTitle=${encodeURIComponent(course.title)}`;
                } else if (response.status === 401) {
                    console.log('Access token expired. Trying to refresh...');

                    // 2. Try refreshing the access token
                    const refreshResponse = await fetch('/api/auth/refresh-token', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ refreshToken }),
                    });

                    if (refreshResponse.ok) {
                        const data = await refreshResponse.json();
                        localStorage.setItem('token', data.accessToken);

                        // New token obtained ➔ allow user to enter course
                        window.location.href = `/course/?courseTitle=${encodeURIComponent(course.title)}`;
                    } else {
                        // Refresh failed ➔ ask user to log in again
                        Swal.fire({
                            icon: 'error',
                            title: 'Session Expired',
                            text: 'Please log in again.',
                            confirmButtonColor: '#d33',
                            confirmButtonText: 'OK'
                        }).then(() => {
                            localStorage.removeItem('token');
                            localStorage.removeItem('refreshToken');
                            window.location.href = "../register/";
                        });
                    }
                } else {
                    console.error('Unexpected error:', response.status);
                    Swal.fire({
                        icon: 'error',
                        title: 'Unexpected Error',
                        text: 'Something went wrong. Please try again later.',
                        confirmButtonColor: '#d33',
                        confirmButtonText: 'OK'
                    });
                }
            } catch (error) {
                console.error('Error validating token:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Something went wrong. Please log in again.',
                    confirmButtonColor: '#d33',
                    confirmButtonText: 'OK'
                }).then(() => {
                    window.location.href = "../register/";
                });
            }
        });

        console.log(`✅ Enter Course button updated: ${course.title}`);
    } else {
        console.error("❌ Enter Course button not found");
    }


    const orderNowBtn = document.querySelector(".buy-button");

    if (orderNowBtn) {
        orderNowBtn.addEventListener("click", async () => {
            const accessToken = localStorage.getItem('token');
            const refreshToken = localStorage.getItem('refreshToken');

            if (!accessToken || !refreshToken) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Login Required',
                    text: 'Please log in to place an order!',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                }).then(() => {
                    window.location.href = "../register/";
                });
                return;
            }

            try {
                // 1. Try validating the access token
                const response = await fetch('/api/auth/validate-token', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    // Access token valid ➔ allow user to place order
                    Swal.fire({
                        icon: 'info',
                        title: 'Congratulations!',
                        text: 'This course is available for free.',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        // Redirect to the order page
                        window.location.href = `/course/?courseTitle=${encodeURIComponent(course.title)}`;
                    });
                } else if (response.status === 401) {
                    console.log('Access token expired. Trying to refresh...');

                    // 2. Try refreshing the access token
                    const refreshResponse = await fetch('/api/auth/refresh-token', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ refreshToken }),
                    });

                    if (refreshResponse.ok) {
                        const data = await refreshResponse.json();
                        localStorage.setItem('token', data.accessToken);

                        // New token obtained ➔ allow user to place order
                        window.location.href = `/course/?courseTitle=${encodeURIComponent(course.title)}`;
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Session Expired',
                            text: 'Please log in again.',
                            confirmButtonColor: '#d33',
                            confirmButtonText: 'OK'
                        }).then(() => {
                            localStorage.removeItem('token');
                            localStorage.removeItem('refreshToken');
                            window.location.href = "../register/";
                        });
                    }
                } else {
                    console.error('Unexpected error:', response.status);
                    Swal.fire({
                        icon: 'error',
                        title: 'Unexpected Error',
                        text: 'Something went wrong. Please try again later.',
                        confirmButtonColor: '#d33',
                        confirmButtonText: 'OK'
                    });
                }
            } catch (error) {
                console.error('Error validating token:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Something went wrong. Please log in again.',
                    confirmButtonColor: '#d33',
                    confirmButtonText: 'OK'
                }).then(() => {
                    window.location.href = "../register/";
                });
            }
        });

        console.log("✅ Order Now button activated");
    } else {
        console.error("❌ Order Now button not found");
    }

    


}

function updateUnits(units) {
  const unitContainer = document.getElementById('unit-container');
  if (!unitContainer) return console.error('Unit container not found');
  unitContainer.innerHTML = '';

  if (units && units.length > 0) {
      

      units.forEach((unit, index) => {
          const clearfix = document.createElement('div');
          clearfix.classList.add('clearfix');

          const outcomeDiv = document.createElement('div');
          outcomeDiv.classList.add('outcome_div');
          
          const titleElement = document.createElement('h2');
          titleElement.classList.add('h2');
          titleElement.textContent = unit.title || `Unit ${index + 1}`;
          titleElement.id = `u${index + 1}`;
          outcomeDiv.appendChild(titleElement);
          
          const titleNote = document.createElement('div');
          titleNote.classList.add('title_note');
          
          const listElement = document.createElement('ul');
          listElement.id = `u${index + 1}-list`;
          (unit.topics || []).forEach(topic => {
              const listItem = document.createElement('li');
              listItem.textContent = topic;
              listItem.classList.add('li');
              listElement.appendChild(listItem);
          });

          titleNote.appendChild(listElement);
          clearfix.appendChild(outcomeDiv);
          clearfix.appendChild(titleNote);
          unitContainer.appendChild(clearfix);
      });
  }
}

function updateList(elementId, items) {
  const listElement = document.getElementById(elementId);
  if (!listElement) return console.error(`List element "${elementId}" not found`);
  listElement.innerHTML = '';
  
  (items || []).forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = item;
      listItem.classList.add('li');
      listElement.appendChild(listItem);
  });
}
