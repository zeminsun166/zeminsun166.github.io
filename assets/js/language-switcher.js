// Simple language switcher functionality
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit to ensure all elements are loaded
    setTimeout(function() {
        const langToggle = document.getElementById('lang-toggle');
        const langSwitcher = document.querySelector('.language-switcher');
        
        // Check if button exists
        if (!langToggle) {
            console.log('Language toggle button not found');
            return;
        }
        
        // Force display the button and its container
        if (langSwitcher) {
            langSwitcher.style.display = 'block';
            langSwitcher.style.visibility = 'visible';
        }
        
        langToggle.style.display = 'flex';
        langToggle.style.visibility = 'visible';
        
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
        
        // Add click event listener
        langToggle.addEventListener('click', switchLanguage);
        
        // Update button title based on current language
        const currentLang = getCurrentLanguage();
        if (currentLang === 'zh') {
            langToggle.title = 'Switch to English';
        } else {
            langToggle.title = '切换到中文';
        }
        
        console.log('Language switcher initialized for:', currentLang);
    }, 100);
}); 