// Handle the content display and countdown timer
document.addEventListener('DOMContentLoaded', () => {
  showDiv('content1', 'button1');
  const countdownDuration = 3 * 60 * 60 * 1000;
  document.querySelectorAll(".offer-container").forEach(container => {
      createCountdown(container, new Date().getTime() + countdownDuration);
  });
  if (courseId) fetchCourseData(courseId);
  else document.body.innerHTML = "<h1>Invalid course ID</h1>";
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

const params = new URLSearchParams(window.location.search);
const courseId = params.get('id');

if (!courseId) console.error("Course ID is missing from URL!");
else fetchCourseData(courseId);

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
      'course-description': course.description,
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
      if (el) el.textContent = value || "N/A";
      else console.error(`Element with ID "${id}" not found`);
  });
  const imgEl = document.getElementById('course-image');
  if (imgEl) imgEl.src = course.image || '';
  else console.error('Image element not found');
  
  updateList('outcome-list', course.outcomes);
  updateList('who-list', course.who);
  updateList('requirements-list', course.requirements);
  
  const unitContainer = document.getElementById('unit-container');
if (!unitContainer) return console.error('Unit container not found');
unitContainer.innerHTML = '';

if (course.units && course.units.length > 0) {
  console.log("Units received in frontend:", JSON.stringify(course.units, null, 2));

  course.units.forEach((unit, index) => {
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

      // 🔥 FIX: Use 'topics' instead of 'items'
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
