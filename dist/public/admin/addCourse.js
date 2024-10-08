document.getElementById('addCourseForm').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
  
    try {
      const response = await fetch('/api/courses/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      if (result.success) {
        alert('Course added successfully!');
        // Optionally redirect or clear the form
        this.reset();
      } else {
        alert('Failed to add course: ' + result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding the course.');
    }
  });
  