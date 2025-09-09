// ===== View More / View Less with smooth expansion =====
document.querySelectorAll('.view-more').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();

        const section = this.closest('.section');
        const products = section.querySelector('.products');

        const isExpanded = products.classList.toggle('expanded');
        this.textContent = isExpanded ? 'View Less' : 'View More';

        // Smooth scroll to top of section when expanding
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ===== Bottom Nav Active Highlight =====
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.bottom-nav a');

function updateActiveSection() {
    const scrollPos = window.scrollY + window.innerHeight / 2; // middle of viewport
    let activeId = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            activeId = section.id;
        }
    });

    navLinks.forEach(link => link.classList.remove('active'));
    if (activeId) {
        const activeLink = document.querySelector(`.bottom-nav a[href="#${activeId}"]`);
        if (activeLink) activeLink.classList.add('active');
    }
}

// Update active nav on scroll
window.addEventListener('scroll', updateActiveSection);
updateActiveSection(); // initial call

// ===== Smooth Scroll for Nav Links =====
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // Update active nav after scroll
            setTimeout(updateActiveSection, 300);
        }
    });
});
