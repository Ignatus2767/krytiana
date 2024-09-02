const courses = [
  // Existing course objects
  {
      id: 1,
      title: "Full Stack Development",
      description: "A comprehensive course on full stack development.",
      // other properties...
  },
  
  // More courses...
];

function generateObject() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const image = document.getElementById("image").value;
  const outcomes = document.getElementById("outcomes").value.split(',');
  const who = document.getElementById("who").value.split(',');
  const requirements = document.getElementById("requirements").value.split(',');

  const newCourseId = courses.length + 1; // Dynamically generate ID based on the length of the courses array

  const courseObject = {
      id: newCourseId,
      title: title,
      description: description,
      image: image,
      outcomes: outcomes.map(outcome => outcome.trim()),
      who: who.map(person => person.trim()),
      requirements: requirements.map(req => req.trim()),
      lessons: "31 lessons", // Default value or another form field
      duration: "(2h 18m)", // Default value or another form field
      // Add other fields as necessary
  };

  // Append the new course to the courses array
  courses.push(courseObject);

  // Display the new course object for verification
  document.getElementById("result").textContent = JSON.stringify(courseObject, null, 2);
}
