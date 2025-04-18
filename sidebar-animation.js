// darkmode.js code

// Toggle dark mode class on body
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
  }
  
  // Optional: Persist mode using localStorage
  document.addEventListener("DOMContentLoaded", () => {
    const isDark = localStorage.getItem("dark-mode") === "true";
    if (isDark) {
      document.body.classList.add("dark-mode");
    }
  
    const toggleBtn = document.querySelector(".btn-outline-dark");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        const darkModeEnabled = document.body.classList.toggle("dark-mode");
        localStorage.setItem("dark-mode", darkModeEnabled);
      });
    }
  });
  

// sidebar-animation.js code


document.addEventListener("DOMContentLoaded", () => {
  const sidebarLinks = document.querySelectorAll(".sidebar a i");

  sidebarLinks.forEach((icon) => {
    icon.classList.add("sidebar-icon");

    // Add event listeners for hover animation
    icon.parentElement.addEventListener("mouseenter", () => {
      icon.classList.add("icon-animate");
    });

    icon.parentElement.addEventListener("mouseleave", () => {
      icon.classList.remove("icon-animate");
    });
  });
});

// Want to move on to dropdown menus 
// dropdown-menus.js code

document.addEventListener("DOMContentLoaded", () => {
    const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
  
    dropdownToggles.forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const dropdownMenu = toggle.nextElementSibling;
        dropdownMenu.classList.toggle("show-dropdown");
      });
    });
  
    // Optional: Close dropdown when clicking outside
    document.addEventListener("click", (event) => {
      dropdownToggles.forEach((toggle) => {
        const dropdownMenu = toggle.nextElementSibling;
        if (!toggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
          dropdownMenu.classList.remove("show-dropdown");
        }
      });
    });
  });
  