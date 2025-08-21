// Simple language switcher functionality
document.addEventListener('DOMContentLoaded', function() {
    const langToggle = document.getElementById('lang-toggle');
    
    // Check if button exists
    if (!langToggle) {
        return;
    }
    
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
}); 