document.addEventListener('DOMContentLoaded', function() {

    // Render content on profile image load
    function hideLoader() {
        document.querySelector('.loader').style.display = 'none';
    }

    const profileImg = document.querySelector('.profile-img');
    if(profileImg.complete) {
        hideLoader();
    }

    else{
        profileImg.addEventListener('load', hideLoader);
    }

    // Add copyright year to footer
    document.querySelector('.copyright .year').textContent = new Date().getFullYear();

    // handling of layout shift on hide and show of scrollbars by browser
    // Calculate scrollbarwidth
    function getScrollbarWidth() {
        const div = document.createElement('div');
        div.style.overflow = 'scroll';
        div.style.visibility = 'hidden';
        div.style.position = 'absolute';
        div.style.width = '100px';
        div.style.height = '100px';
        document.body.appendChild(div);
        const scrollbarWidth = div.offsetWidth - div.clientWidth;
        document.body.removeChild(div);
        return scrollbarWidth;
    }

    const scrollbarWidth = getScrollbarWidth();

    function handleScrollBar() {
        const header = document.querySelector('header');
        const currentSection = document.querySelector('section.active');
        const currentScrollBarWidth = window.innerWidth - currentSection.offsetWidth;
        if(!currentScrollBarWidth) {
            header.style.paddingRight = `${scrollbarWidth}px`;
            currentSection.style.paddingRight = `${scrollbarWidth}px`;
        }
        else{
            header.style.paddingRight = '';
            currentSection.style.paddingRight = '';
        }
    }

    // URL based active link
    const nav_links = document.querySelectorAll('nav ul a');
    const sections = document.querySelectorAll('section');
    function urlBasedActive() {
        nav_links.forEach(link => link.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));
        const hashInUrl = window.location.hash;
        if(!hashInUrl) {
            document.querySelector('nav li:first-child a').classList.add('active');
            document.querySelector('section:first-child').classList.add('active');
        }
        else {
            const targetLink = document.querySelector(`nav a[href='${hashInUrl}']`);
            const targetSection = document.querySelector(hashInUrl);
            if(targetLink && targetSection) {
                targetLink.classList.add('active');
                targetSection.classList.add('active');
            }
            else{
                document.querySelector('nav li:first-child a').classList.add('active');
                document.querySelector('section:first-child').classList.add('active');
            }
        }
        handleScrollBar();
    }

    urlBasedActive();
    window.addEventListener('hashchange', urlBasedActive);

    // Nav Links Click Handling
    function active() {
        if(window.innerWidth <= 980) {
            const menuToggle = document.querySelector('.menuToggle');
            document.querySelector('nav ul').classList.remove('open');
            menuToggle.classList.remove('active');
            const isExpanding = menuToggle.getAttribute('aria-expanded') === "true" ? "false" : "true";
            menuToggle.setAttribute('aria-expanded', isExpanding);
        }
        nav_links.forEach(link => {
            link.classList.remove('active');
        });
        sections.forEach(section => {
            section.classList.remove('active');
        });
        this.classList.add('active');
        document.querySelector(this.getAttribute('href')).classList.add('active');
        handleScrollBar();
    }
    nav_links.forEach(link => link.addEventListener('click', active));


    // Toggle Nav
    function toggleNav() {
        document.querySelector('nav ul').classList.toggle('open');
        this.classList.toggle('active');
        const isExpanding = this.getAttribute('aria-expanded') === "true" ? "false" : "true";
        this.setAttribute('aria-expanded', isExpanding);
    }

    // Handling nav toggles on small devices
    function handleNavToggle() {
        if(window.innerWidth <= 980) {
            document.querySelector('.menuToggle').removeEventListener('click', toggleNav);
            document.querySelector('.menuToggle').addEventListener('click', toggleNav);
        }
    }

    handleNavToggle();
    window.addEventListener('resize', handleNavToggle);
});