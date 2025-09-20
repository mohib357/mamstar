function switchLanguage(lang) {
    // Content sections
    const englishContent = document.getElementById('english-content');
    const bengaliContent = document.getElementById('bengali-content');

    // Buttons
    const enBtn = document.getElementById('en-btn');
    const bnBtn = document.getElementById('bn-btn');

    // Header elements
    const policyTitle = document.getElementById('policy-title');
    const slogan = document.getElementById('slogan');

    if (lang === 'bn') {
        // Switch content
        englishContent.style.display = 'none';
        bengaliContent.style.display = 'block';

        // Switch button state
        enBtn.classList.remove('active');
        bnBtn.classList.add('active');

        // ******* CHANGE HEADER TEXT *******
        policyTitle.innerText = 'প্রাইভেসি পলিসি';
        slogan.innerText = 'MAM Star – গুণমানে উজ্জ্বল, বিশ্বাসে অটুট';

    } else { // lang === 'en'
        // Switch content
        bengaliContent.style.display = 'none';
        englishContent.style.display = 'block';

        // Switch button state
        bnBtn.classList.remove('active');
        enBtn.classList.add('active');

        // ******* CHANGE HEADER TEXT *******
        policyTitle.innerText = 'Privacy Policy';
        slogan.innerText = 'MAM Star – Bright in quality, firm in belief';
    }
}
document.addEventListener("DOMContentLoaded", () => {
    switchLanguage("en");
});