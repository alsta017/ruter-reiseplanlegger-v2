const translations = {
    en: null,
    no: null
};

function loadTranslations(language) {
    fetch(`lang/${language}.json`)
        .then(response => response.json())
        .then(data => {
            translations[language] = data;
            applyTranslations(language);
        })
        .catch(error => console.error('Error loading translations:', error));
    }

    function applyTranslations(language) {
        const elements = document.querySelectorAll('[data-translate-key]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate-key');
            if (element.tagName === 'INPUT') {
                element.placeholder = translations[language][key];
            } else {
                element.innerHTML = translations[language][key];
            }
        });
    }

// Add event listener to language switcher
document.getElementById('languageSwitcher').addEventListener('change', (event) => {
    const language = event.target.value;
    loadTranslations(language);
    
    // Update userLanguage and set cookie
    userLanguage = language;
    document.cookie = `language=${language}; path=/; max-age=31536000`; // expires in 1 year
});

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Initialize default language
let userLanguage = navigator.language.startsWith('no') ? 'no' : 'en';
const cookieLanguage = getCookie('language'); // Get the cookie value

if (cookieLanguage) {
    userLanguage = cookieLanguage;
}

loadTranslations(userLanguage);

// Set the default selected value of the dropdown menu
const languageSwitcher = document.getElementById('languageSwitcher');
languageSwitcher.value = userLanguage;