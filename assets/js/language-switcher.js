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
            
            // Update button title based on current language
            const currentLang = getCurrentLanguage();
            if (currentLang === 'zh') {
                langToggleMobile.title = 'Switch to English';
            } else {
                langToggleMobile.title = '切换到中文';
            }
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