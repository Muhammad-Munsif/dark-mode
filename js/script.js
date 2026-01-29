
// Toggle Sidebar
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');

  sidebar.classList.toggle('show');
  overlay.classList.toggle('show');

  // On desktop, use collapsed class
  if (window.innerWidth > 992) {
    sidebar.classList.toggle('collapsed');
    overlay.classList.remove('show');
  }
}

// Toggle Dark Mode
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');

  // Save preference to localStorage
  const isDarkMode = document.body.classList.contains('dark-mode');
  localStorage.setItem('dark-mode', isDarkMode);

  // Update button text
  const darkModeBtn = document.querySelector('.dark-mode-toggle');
  if (isDarkMode) {
    darkModeBtn.innerHTML = '<i class="bi bi-sun-fill"></i> Light Mode';
  } else {
    darkModeBtn.innerHTML = '<i class="bi bi-moon-fill"></i> Dark Mode';
  }
}

// Toggle User Dropdown
function toggleUserDropdown() {
  const dropdown = document.getElementById('userDropdown');
  dropdown.classList.toggle('show');
}

// Close dropdown when clicking outside
document.addEventListener('click', function (event) {
  const dropdown = document.getElementById('userDropdown');
  const toggle = document.querySelector('.user-dropdown-toggle');

  if (!toggle.contains(event.target) && !dropdown.contains(event.target)) {
    dropdown.classList.remove('show');
  }
});

// Initialize Chart
document.addEventListener('DOMContentLoaded', function () {
  // Check for saved dark mode preference
  const savedDarkMode = localStorage.getItem('dark-mode') === 'true';
  if (savedDarkMode) {
    document.body.classList.add('dark-mode');
    document.querySelector('.dark-mode-toggle').innerHTML = '<i class="bi bi-sun-fill"></i> Light Mode';
  }

  // Chart configuration
  const ctx = document.getElementById('chart').getContext('2d');
  const isDarkMode = document.body.classList.contains('dark-mode');

  const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
  const textColor = isDarkMode ? '#f8f9fa' : '#333';

  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      datasets: [
        {
          label: 'Website Views',
          data: [12000, 19000, 15000, 25000, 22000, 30000, 28000],
          borderColor: '#4f46e5',
          backgroundColor: 'rgba(79, 70, 229, 0.1)',
          fill: true,
          tension: 0.4,
          borderWidth: 3,
        },
        {
          label: 'Active Users',
          data: [8000, 12000, 10000, 16000, 14000, 20000, 18000],
          borderColor: '#22c55e',
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          fill: true,
          tension: 0.4,
          borderWidth: 3,
        }
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: textColor,
            font: {
              size: 14
            }
          }
        },
        tooltip: {
          mode: 'index',
          intersect: false,
        }
      },
      scales: {
        x: {
          grid: {
            color: gridColor,
          },
          ticks: {
            color: textColor,
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: gridColor,
          },
          ticks: {
            color: textColor,
            callback: function (value) {
              if (value >= 1000) {
                return value / 1000 + 'k';
              }
              return value;
            }
          }
        },
      },
    },
  });

  // Update chart colors when dark mode is toggled
  const originalToggleDarkMode = toggleDarkMode;
  toggleDarkMode = function () {
    originalToggleDarkMode();

    // Update chart colors
    const isDark = document.body.classList.contains('dark-mode');
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
    const textColor = isDark ? '#f8f9fa' : '#333';

    chart.options.scales.x.grid.color = gridColor;
    chart.options.scales.x.ticks.color = textColor;
    chart.options.scales.y.grid.color = gridColor;
    chart.options.scales.y.ticks.color = textColor;
    chart.options.plugins.legend.labels.color = textColor;

    chart.update();
  };
});

// Handle window resize
window.addEventListener('resize', function () {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');

  // On desktop, ensure overlay is hidden
  if (window.innerWidth > 992) {
    overlay.classList.remove('show');
    sidebar.classList.remove('show');
  } else {
    // On mobile, hide sidebar by default
    if (!sidebar.classList.contains('show')) {
      sidebar.classList.add('collapsed');
    }
  }
});

// Initialize on load
window.dispatchEvent(new Event('resize'));
