// Simple language switcher functionality
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit to ensure all elements are loaded
    setTimeout(function() {
        const langToggleMobile = document.getElementById('lang-toggle');
        const langToggleDesktop = document.getElementById('lang-toggle-desktop');
        
        // Determine current language from URL
        function getCurrentLanguage() {
            const currentPath = window.location.pathname;
            return (currentPath.includes('/en/')) ? 'en' : 'zh';
        }
        
        // Update mobile button text display
        function updateMobileButtonDisplay() {
            const currentLang = getCurrentLanguage();
            const mobileTexts = document.querySelectorAll('.lang-text-mobile');
            
            mobileTexts.forEach(text => {
                const showWhen = text.getAttribute('data-show-when');
                if (showWhen === currentLang) {
                    text.style.display = 'inline';
                } else {
                    text.style.display = 'none';
                }
            });
        }
        
        // Redirect to appropriate page
        function switchLanguage() {
            const currentPath = window.location.pathname;
            const currentLang = getCurrentLanguage();
            
            if (currentLang === 'zh') {
                // Switch to English
                window.location.href = '/en/about/';
            } else {
                // Switch to Chinese
                window.location.href = '/';
            }
        }
        
        // Add click event listeners to both buttons
        if (langToggleMobile) {
            langToggleMobile.addEventListener('click', switchLanguage);
            
            // Update mobile button text display
            updateMobileButtonDisplay();
        }
        
        if (langToggleDesktop) {
            langToggleDesktop.addEventListener('click', switchLanguage);
            
            // Update button title based on current language
            const currentLang = getCurrentLanguage();
            if (currentLang === 'zh') {
                langToggleDesktop.title = 'Switch to English';
            } else {
                langToggleDesktop.title = '切换到中文';
            }
        }
        
        console.log('Language switcher initialized for:', getCurrentLanguage());
    }, 100);
}); 