// scripts.js
document.getElementById('menuIcon').addEventListener('click', function() {
  const navMenu = document.getElementById('navMenu');
  navMenu.style.display = navMenu.style.display === 'block' ? 'none' : 'block';
});

document.getElementById('siteLogo').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent the default anchor behavior
  window.location.hash = '#home'; // Set the URL hash to #home
  window.scrollTo(0, 0); // Scroll to the top of the page
});

document.getElementById('searchIcon').addEventListener('click', function() {
  const searchForm = document.getElementById('searchForm');
  searchForm.classList.toggle('hidden');
});

document.getElementById('searchForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form from submitting normally

  const searchTerm = document.getElementById('searchInput').value;
  console.log('Search term:', searchTerm);

  // Here you can add functionality to handle the search, e.g., filtering content or sending a request to the server.
});

document.getElementById('subscriptionForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form from submitting normally

  const email = document.getElementById('email').value;
  const formMessage = document.getElementById('formMessage');

  if (validateEmail(email)) {
      fetch('/subscribe', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: email })
      })
      .then(response => response.json())
      .then(data => {
          formMessage.textContent = data.message;
          formMessage.style.color = 'green';
      })
      .catch(error => {
          formMessage.textContent = 'Error subscribing, please try again.';
          formMessage.style.color = 'red';
      });
  } else {
      formMessage.textContent = 'Please enter a valid email address.';
      formMessage.style.color = 'red';
  }
});

// Validate email function
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

// Profile icon functionality
const profileIcon = document.getElementById('profileIcon');
const authModal = document.getElementById('authModal');
const closeModal = document.querySelector('.close');

profileIcon.addEventListener('click', function() {
  authModal.classList.remove('hidden');
});

closeModal.addEventListener('click', function() {
  authModal.classList.add('hidden');
});

window.addEventListener('click', function(event) {
  if (event.target === authModal) {
      authModal.classList.add('hidden');
  }
});

document.getElementById('authForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const profileImage = document.getElementById('profileImage').files[0];

  if (profileImage) {
      const reader = new FileReader();
      reader.onload = function(e) {
          profileIcon.style.backgroundImage = `url(${e.target.result})`;
          profileIcon.style.backgroundSize = 'cover';
          profileIcon.textContent = ''; // Clear any text inside the icon
      };
      reader.readAsDataURL(profileImage);
  } else {
      // If no profile image is provided, use the first letter of the username
      const firstLetter = username.charAt(0).toUpperCase();
      profileIcon.textContent = firstLetter;

      // Generate a random color
      const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      profileIcon.style.backgroundColor = randomColor;
  }

  // Hide the modal after successful login/signup
  authModal.classList.add('hidden');
});

// Hide navMenu when clicking on a menu item
const navItems = document.querySelectorAll('#navMenu a');
navItems.forEach(item => {
  item.addEventListener('click', function() {
      document.getElementById('navMenu').style.display = 'none';
  });
});



