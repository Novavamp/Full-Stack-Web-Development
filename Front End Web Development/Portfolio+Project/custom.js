document.addEventListener('DOMContentLoaded', function() {
  // Get the toggle button element
  const modeToggleBtn = document.getElementById('modeToggleBtn');
  // Get the mode icon element
  const modeIcon = document.getElementById('modeIcon');
  // Get the buttons you want to change their styles
  const button1 = document.getElementById('button1');
  const button2 = document.getElementById('button2');
  const button3 = document.getElementById('button3');
  const button4 = document.getElementById('button4');
  // Get the logo element
  const logo = document.getElementById('logo');

  // Add click event listener to the toggle button
  modeToggleBtn.addEventListener('click', function() {
      // Toggle between dark and light mode
      const currentTheme = document.documentElement.getAttribute('data-bs-theme');
      if (currentTheme === 'dark') {
          // Switch to light mode
          document.documentElement.setAttribute('data-bs-theme', 'light');
          // Change icon to light mode icon
          modeIcon.classList.remove('fa-moon');
          modeIcon.classList.add('fa-sun');
          // Change button styles to light mode
          button1.classList.remove('btn-light');
          button2.classList.remove('btn-outline-light');
          button1.classList.add('btn-dark');
          button2.classList.add('btn-outline-dark');
          button3.classList.remove('btn-light');
          button4.classList.remove('btn-outline-light');
          button3.classList.add('btn-dark');
          button4.classList.add('btn-outline-dark');
          // Change logo to light mode logo
          logo.src = './assets/Precious-logo-1.png';
      } else {
          // Switch to dark mode
          document.documentElement.setAttribute('data-bs-theme', 'dark');
          // Change icon to dark mode icon
          modeIcon.classList.remove('fa-sun');
          modeIcon.classList.add('fa-moon');
          // Change button styles back to dark mode
          button1.classList.remove('btn-dark');
          button2.classList.remove('btn-outline-dark');
          button1.classList.add('btn-light');
          button2.classList.add('btn-outline-light');
          button3.classList.remove('btn-dark');
          button4.classList.remove('btn-outline-dark');
          button3.classList.add('btn-light');
          button4.classList.add('btn-outline-light');
          // Change logo back to dark mode logo
          logo.src = './assets/Precious-logo-2.png';
      }
  });
});
