// Language switcher functionality
document.addEventListener('DOMContentLoaded', function() {
    const langToggle = document.getElementById('lang-toggle');
    const langTexts = document.querySelectorAll('.lang-text');
    
    // Check if elements exist
    if (!langToggle || langTexts.length === 0) {
        console.log('Language switcher elements not found');
        return;
    }
    
    let currentLang = 'zh'; // Default to Chinese
    
    // Check current page and determine language
    function checkCurrentPageLanguage() {
        const currentPath = window.location.pathname;
        if (currentPath === '/en/about/' || currentPath === '/en/') {
            currentLang = 'en';
        } else {
            currentLang = 'zh';
        }
        console.log('Current page language:', currentLang, 'Path:', currentPath);
        updateLanguageDisplay(currentLang);
        
        // Ensure button is visible
        const langToggle = document.getElementById('lang-toggle');
        if (langToggle) {
            langToggle.style.display = 'block';
        }
    }
    
    function updateLanguageDisplay(lang) {
        console.log('Updating display for language:', lang);
        langTexts.forEach(text => {
            const showWhen = text.getAttribute('data-show-when');
            if (showWhen === lang) {
                text.style.display = 'inline';
                console.log('Showing text:', text.textContent);
            } else {
                text.style.display = 'none';
            }
        });
        
        // Ensure the button itself is always visible
        const langToggle = document.getElementById('lang-toggle');
        if (langToggle) {
            langToggle.style.display = 'block';
            langToggle.style.visibility = 'visible';
        }
    }
    
    function redirectToLanguagePage(lang) {
        const currentPath = window.location.pathname;
        console.log('Redirecting to:', lang, 'from:', currentPath);
        
        if (lang === 'en') {
            // Redirect to English page
            if (currentPath === '/' || currentPath === '/about/' || currentPath === '/about.html') {
                window.location.href = '/en/about/';
            }
        } else {
            // Redirect to Chinese page
            if (currentPath === '/en/about/' || currentPath === '/en/') {
                window.location.href = '/';
            }
        }
    }
    
    // Add click event listener
    if (langToggle) {
        langToggle.addEventListener('click', function() {
            // Toggle language
            currentLang = currentLang === 'zh' ? 'en' : 'zh';
            console.log('Language toggled to:', currentLang);
            
            // Update display immediately
            updateLanguageDisplay(currentLang);
            
            // Redirect to appropriate page
            redirectToLanguagePage(currentLang);
        });
    }
    
    // Initialize on page load
    checkCurrentPageLanguage();
}); 