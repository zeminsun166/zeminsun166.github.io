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
            
            console.log('Found mobile texts:', mobileTexts.length);
            console.log('Current language:', currentLang);
            
            mobileTexts.forEach(text => {
                const showWhen = text.getAttribute('data-show-when');
                console.log('Text element:', text.textContent, 'showWhen:', showWhen);
                
                if (showWhen === currentLang) {
                    text.classList.add('show');
                    // 强制设置所有可能的隐藏属性
                    text.style.display = 'inline';
                    text.style.visibility = 'visible';
                    text.style.opacity = '1';
                    text.style.color = '#7a8288';
                    text.style.fontSize = '1em';
                    text.style.position = 'static';
                    text.style.clip = 'auto';
                    text.style.height = 'auto';
                    text.style.width = 'auto';
                    console.log('Showing text:', text.textContent);
                } else {
                    text.classList.remove('show');
                    text.style.display = 'none';
                    console.log('Hiding text:', text.textContent);
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
            
            // Trigger navigation link update event
            document.dispatchEvent(new Event('languageChanged'));
        }
        
        // Add click event listeners to both buttons
        if (langToggleMobile) {
            langToggleMobile.addEventListener('click', switchLanguage);
            
            // Update mobile button text display
            updateMobileButtonDisplay();
        }
        
        // Listen for menu state changes
        const navButton = document.querySelector('.greedy-nav button');
        if (navButton) {
            navButton.addEventListener('click', () => {
                // Wait for menu to expand/collapse, then update text
                setTimeout(() => {
                    updateMobileButtonDisplay();
                    
                    // 移动端：确保折叠框状态正确
                    if (window.innerWidth <= 768) {
                        const hiddenLinks = document.querySelector('.greedy-nav .hidden-links');
                        if (hiddenLinks) {
                            const hasHiddenItems = hiddenLinks.children.length > 0;
                            if (!hasHiddenItems) {
                                hiddenLinks.classList.add('hidden');
                            }
                        }
                    }
                }, 100);
            });
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