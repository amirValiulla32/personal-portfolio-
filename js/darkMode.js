// Enhanced dark mode functionality
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved user preference or system preference
    const currentTheme = localStorage.getItem('theme') || 
        (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Apply initial theme
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    }

    // Toggle theme with smooth transition
    darkModeToggle.addEventListener('change', function() {
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        
        if (this.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            // Add animation class
            document.body.classList.add('theme-transition');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
            document.body.classList.add('theme-transition');
        }
        
        // Remove transition class after animation
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 300);
    });

    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.body.classList.add('dark-mode');
                darkModeToggle.checked = true;
            } else {
                document.body.classList.remove('dark-mode');
                darkModeToggle.checked = false;
            }
        }
    });

    // Add hover effect to toggle
    const wrapper = document.querySelector('.theme-switch-wrapper');
    wrapper.addEventListener('mouseenter', () => {
        wrapper.style.transform = 'translateY(-2px)';
    });
    wrapper.addEventListener('mouseleave', () => {
        wrapper.style.transform = 'translateY(0)';
    });
}

document.addEventListener('DOMContentLoaded', initDarkMode); 