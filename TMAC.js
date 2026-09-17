// === Burger Menu Setup ===
function setupBurgerMenu(burgerBtnId, menuId) {
    const burgerBtn = document.getElementById(burgerBtnId);
    const menu = document.getElementById(menuId);

    if (!burgerBtn || !menu) return;

    function setOpen(isOpen) {
        menu.classList.toggle('open', isOpen);
        burgerBtn.setAttribute('aria-expanded', String(isOpen));
    }

    burgerBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        setOpen(!menu.classList.contains('open'));
    });

    // Close when clicking outside
    document.addEventListener('click', function (e) {
        if (!menu.contains(e.target) && !burgerBtn.contains(e.target)) {
            setOpen(false);
        }
    });

    // Close after choosing a nav link (mobile)
    menu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            setOpen(false);
        });
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') setOpen(false);
    });

    // Close when resizing back to desktop
    window.addEventListener('resize', function () {
        if (window.innerWidth >= 900) setOpen(false);
    });
}

// === Search Bar Focus Behaviour ===
function setupSearchBar(searchBarId) {
    const searchBar = document.getElementById(searchBarId);
    if (!searchBar) return;

    searchBar.addEventListener('focusin', function () {
        searchBar.classList.add('open');
    });

    searchBar.addEventListener('focusout', function () {
        setTimeout(function () {
            searchBar.classList.remove('open');
        }, 200);
    });
}

// === Image Slider ===
function setupImageSlider() {
    const mainImage = document.getElementById('main-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    if (!mainImage || thumbnails.length === 0) return;

    const imageUrls = [
        'images/communities-cuba.png',
        'images/community-indian.jpg',
        'images/community-brazil.jpeg',
        'images/Community-Nigeria.jpg'
    ];

    let currentIndex = 0;
    let timer = null;

    function updateMainImage() {
        mainImage.src = imageUrls[currentIndex];
        thumbnails.forEach(function (thumb) { thumb.classList.remove('active'); });
        if (thumbnails[currentIndex]) thumbnails[currentIndex].classList.add('active');
    }

    function restartAutoplay() {
        if (timer) clearInterval(timer);
        timer = setInterval(function () {
            currentIndex = (currentIndex + 1) % imageUrls.length;
            updateMainImage();
        }, 5000);
    }

    thumbnails.forEach(function (thumbnail) {
        thumbnail.addEventListener('click', function () {
            currentIndex = parseInt(thumbnail.getAttribute('data-index'), 10);
            updateMainImage();
            restartAutoplay();
        });
    });

    restartAutoplay();
}

// === Scroll Animation ===
function isInViewport(el, offset) {
    offset = offset || 60;
    var rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight - offset && rect.bottom > offset;
}

function animateOnScroll() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.querySelectorAll('.animate-fadeInUp, .animate-scaleIn').forEach(function (el) {
        if (isInViewport(el)) {
            el.style.visibility = 'visible';
            el.classList.add('animated');
        } else {
            el.style.visibility = 'hidden';
            el.classList.remove('animated');
        }
    });
}

// === Init ===
document.addEventListener('DOMContentLoaded', function () {

    // Header burger — controls the nav panel
    setupBurgerMenu('main-burger-btn', 'main-burger-menu');

    // Search bars
    setupSearchBar('main-search-bar');
    setupSearchBar('footer-search-bar');

    // Image slider
    setupImageSlider();

    // Scroll animations
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll('.animate-fadeInUp, .animate-scaleIn').forEach(function (el) {
            el.style.visibility = 'hidden';
            el.classList.remove('animated');
        });
    }

    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('resize', animateOnScroll);
});