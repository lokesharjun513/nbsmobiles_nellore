// ===== View More / View Less =====
document.querySelectorAll('.view-more').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const section = this.closest('.section');
        const products = section.querySelector('.products');

        products.classList.toggle('expanded');
        this.textContent = products.classList.contains('expanded') ? 'View Less' : 'View More';
    });
});

// ===== Highlight active bottom nav link while scrolling =====
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.bottom-nav a');

function updateActiveSection() {
    const scrollPos = window.scrollY + window.innerHeight / 2;
    console.log('Scroll Position:', scrollPos);
    scrollPos-50;
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
        console.log('Active Section:', activeId);
    }
}

// Update on scroll
window.addEventListener('scroll', updateActiveSection);

// ===== Smooth scroll for nav links =====
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });

            // Optional: manually update after scroll slightly delayed
            setTimeout(updateActiveSection, 100);
        }
    });
});
