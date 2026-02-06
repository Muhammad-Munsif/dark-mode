
// Page titles mapping
const pageTitles = {
  dashboard: 'Dashboard Overview',
  messages: 'Messages',
  reports: 'Reports',
  users: 'Users Management',
  analytics: 'Advanced Analytics',
  calendar: 'Calendar',
  settings: 'Settings',
  help: 'Help & Support'
};

// Toggle Sidebar
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');

  sidebar.classList.toggle('show');
  overlay.classList.toggle('show');

  if (window.innerWidth > 992) {
    sidebar.classList.toggle('collapsed');
    overlay.classList.remove('show');
  }
}

// Show specific page
function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll('.page-content').forEach(page => {
    page.classList.remove('active');
  });

  // Show selected page
  const selectedPage = document.getElementById(pageId);
  if (selectedPage) {
    selectedPage.classList.add('active');
  }

  // Update page title
  document.getElementById('pageTitle').textContent = pageTitles[pageId] || 'Dashboard';

  // Update active nav link
  document.querySelectorAll('.sidebar a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('onclick')?.includes(pageId)) {
      link.classList.add('active');
    }
  });

  // Close sidebar on mobile
  if (window.innerWidth <= 992) {
    toggleSidebar();
  }
}

// Toggle Dark Mode
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const isDarkMode = document.body.classList.contains('dark-mode');
  localStorage.setItem('dark-mode', isDarkMode);

  // Update chart colors if chart exists
  if (window.myChart) {
    updateChartColors();
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

  // Close mobile overlay
  const overlay = document.getElementById('sidebarOverlay');
  if (overlay.classList.contains('show') && event.target === overlay) {
    toggleSidebar();
  }
});

// Initialize Chart
let myChart;
function initChart() {
  const ctx = document.getElementById('chart').getContext('2d');
  const isDarkMode = document.body.classList.contains('dark-mode');

  const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
  const textColor = isDarkMode ? '#f1f5f9' : '#1e293b';
  const borderColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

  myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Revenue',
          data: [6500, 8900, 12500, 14200, 16800, 19400, 22000, 24500, 27800, 31000, 34500, 38000],
          borderColor: '#4f46e5',
          backgroundColor: 'rgba(79, 70, 229, 0.1)',
          fill: true,
          tension: 0.4,
          borderWidth: 3,
        },
        {
          label: 'Users',
          data: [1200, 1850, 2200, 3100, 4200, 5100, 6200, 7300, 8200, 9100, 10200, 11500],
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
              size: 14,
              family: "'Inter', sans-serif"
            }
          }
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          backgroundColor: isDarkMode ? '#1e293b' : 'white',
          titleColor: textColor,
          bodyColor: textColor,
          borderColor: borderColor,
          borderWidth: 1
        }
      },
      scales: {
        x: {
          grid: {
            color: gridColor,
          },
          ticks: {
            color: textColor,
            font: {
              family: "'Inter', sans-serif"
            }
          },
          border: {
            color: borderColor
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: gridColor,
          },
          ticks: {
            color: textColor,
            font: {
              family: "'Inter', sans-serif"
            },
            callback: function (value) {
              if (value >= 1000) {
                return '$' + (value / 1000) + 'k';
              }
              return '$' + value;
            }
          },
          border: {
            color: borderColor
          }
        },
      },
    },
  });
}

// Update chart colors
function updateChartColors() {
  if (!myChart) return;

  const isDarkMode = document.body.classList.contains('dark-mode');
  const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
  const textColor = isDarkMode ? '#f1f5f9' : '#1e293b';
  const borderColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

  myChart.options.scales.x.grid.color = gridColor;
  myChart.options.scales.x.ticks.color = textColor;
  myChart.options.scales.x.border.color = borderColor;
  myChart.options.scales.y.grid.color = gridColor;
  myChart.options.scales.y.ticks.color = textColor;
  myChart.options.scales.y.border.color = borderColor;
  myChart.options.plugins.legend.labels.color = textColor;
  myChart.options.plugins.tooltip.backgroundColor = isDarkMode ? '#1e293b' : 'white';
  myChart.options.plugins.tooltip.titleColor = textColor;
  myChart.options.plugins.tooltip.bodyColor = textColor;
  myChart.options.plugins.tooltip.borderColor = borderColor;

  myChart.update();
}

// Initialize on load
document.addEventListener('DOMContentLoaded', function () {
  // Check for saved dark mode preference
  const savedDarkMode = localStorage.getItem('dark-mode') === 'true';
  if (savedDarkMode) {
    document.body.classList.add('dark-mode');
  }

  // Initialize chart
  if (document.getElementById('chart')) {
    initChart();
  }

  // Add animation to cards on load
  document.querySelectorAll('.stat-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.style.animation = 'slideIn 0.5s ease forwards';
  });
});

// Handle window resize
window.addEventListener('resize', function () {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');

  if (window.innerWidth > 992) {
    overlay.classList.remove('show');
    sidebar.classList.remove('show');
  }
});

// Initialize
window.dispatchEvent(new Event('resize'));