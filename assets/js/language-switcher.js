// Language switcher functionality
document.addEventListener('DOMContentLoaded', function() {
    const langToggle = document.getElementById('lang-toggle');
    const langTexts = document.querySelectorAll('.lang-text');
    
    // Check if user has a saved language preference
    let currentLang = localStorage.getItem('preferred-language') || 'zh';
    
    // Initialize language display
    updateLanguageDisplay(currentLang);
    
    // Add click event listener
    langToggle.addEventListener('click', function() {
        // Toggle language
        currentLang = currentLang === 'zh' ? 'en' : 'zh';
        
        // Save preference to localStorage
        localStorage.setItem('preferred-language', currentLang);
        
        // Update display
        updateLanguageDisplay(currentLang);
        
        // Redirect to appropriate page
        redirectToLanguagePage(currentLang);
    });
    
    function updateLanguageDisplay(lang) {
        langTexts.forEach(text => {
            if (text.dataset.lang === lang) {
                text.style.display = 'inline';
            } else {
                text.style.display = 'none';
            }
        });
    }
    
    function redirectToLanguagePage(lang) {
        const currentPath = window.location.pathname;
        
        if (lang === 'en') {
            // Redirect to English page
            if (currentPath === '/' || currentPath === '/about/' || currentPath === '/about.html') {
                window.location.href = '/en/';
            }
        } else {
            // Redirect to Chinese page
            if (currentPath === '/en/') {
                window.location.href = '/';
            }
        }
    }
    
    // Check current page and update language display accordingly
    function checkCurrentPageLanguage() {
        const currentPath = window.location.pathname;
        if (currentPath === '/en/') {
            currentLang = 'en';
            updateLanguageDisplay(currentLang);
        } else {
            currentLang = 'zh';
            updateLanguageDisplay(currentLang);
        }
    }
    
    // Check current page on load
    checkCurrentPageLanguage();
}); 