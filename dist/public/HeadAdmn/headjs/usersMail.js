document.addEventListener('DOMContentLoaded', async () => {
  const userTableBody = document.getElementById('user-table-body');
  const userCountElement = document.getElementById('user-count'); // New element to display the count

  try {
    const response = await fetch('/api/users');
    const data = await response.json();
    
    console.log('Fetched users:', data);

    if (Array.isArray(data.users)) {
      // Display the number of users
      userCountElement.textContent = `Total Users: ${data.users.length}`;

      data.users.forEach(user => {
        const tr = document.createElement('tr');

        const fullnameTd = document.createElement('td');
        fullnameTd.textContent = user.fullname;

        const emailTd = document.createElement('td');
        emailTd.textContent = user.email;

        const countryTd = document.createElement('td');
        countryTd.textContent = user.country.toUpperCase();

        // Format createdAt nicely
        const createdAtTd = document.createElement('td');
        const createdDate = new Date(user.createdAt);
        createdAtTd.textContent = createdDate.toLocaleDateString(); // e.g., "4/26/2025"

        // Set hover tooltip to show exact date & time
        tr.title = `Created on: ${createdDate.toLocaleString()}`;

        tr.appendChild(fullnameTd);
        tr.appendChild(emailTd);
        tr.appendChild(countryTd);
        tr.appendChild(createdAtTd);

        userTableBody.appendChild(tr);
      });
    } else {
      userTableBody.innerHTML = '<tr><td colspan="4">No users found or invalid data.</td></tr>';
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    userTableBody.innerHTML = '<tr><td colspan="4">Failed to load users</td></tr>';
  }
});
