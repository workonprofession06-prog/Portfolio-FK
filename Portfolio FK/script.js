// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
        backToTop.classList.add('visible');
    } else {
        navbar.classList.remove('scrolled');
        backToTop.classList.remove('visible');
    }

    // Active nav link highlight
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        const top = section.offsetTop - 100;
        const bottom = top + section.offsetHeight;
        const link = document.querySelector(`.nav-link[href="#${section.id}"]`);
        if (link) {
            if (window.scrollY >= top && window.scrollY < bottom) {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navlist   = document.getElementById('navlist');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navlist.classList.toggle('open');
});

// Close on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navlist.classList.remove('open');
    });
});

// ===== ANIMATED COUNTERS =====
const counters = document.querySelectorAll('.counter');
let counted = false;

const runCounters = () => {
    if (counted) return;
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;
    const rect = aboutSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
        counted = true;
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            let current = 0;
            const step = Math.ceil(target / 40);
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    counter.textContent = target + '+';
                    clearInterval(timer);
                } else {
                    counter.textContent = current;
                }
            }, 40);
        });
    }
};

window.addEventListener('scroll', runCounters);

// ===== CONTACT FORM =====
function handleForm(e) {
    e.preventDefault();
    const success = document.getElementById('formSuccess');
    success.style.display = 'block';
    e.target.reset();
    setTimeout(() => { success.style.display = 'none'; }, 4000);
}

// ===== SCROLL HELPER FOR BUTTONS =====
function scrollTo(id) {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ===== SCROLL REVEAL (lightweight) =====
const revealEls = document.querySelectorAll(
    '.service-card, .project-card, .skill-item, .stat-card, .about-text, .about-skills, .contact-form, .contact-text'
);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});