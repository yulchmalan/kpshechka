const nav = document.querySelector('.nav');
const searchBtn = document.getElementById('search');
const useElement = searchBtn.querySelector('use');
const header = document.querySelector('header');
const burger = document.querySelector('.burger');
const navList = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');
const icon = document.querySelector('.burger-icon');

searchBtn.addEventListener("click", () => {
    navList.classList.remove('nav-active');
    if (!navList.classList.contains('nav-active')) {
        icon.setAttribute('href', 'images/icons.svg#burger');
    }

    nav.classList.toggle('openSearch');

    const isSmallScreen = window.innerWidth <= 1440; 
    const activeIcon = isSmallScreen 
        ? searchBtn.querySelector('.icon-sm use') 
        : searchBtn.querySelector('.icon-md use');

    const currentHref = activeIcon.getAttribute("href");

    if (nav.classList.contains('openSearch')) {
        activeIcon.setAttribute("href", currentHref.replace("search", "close"));
    } else {
        activeIcon.setAttribute("href", currentHref.replace("close", "search"));
    }
});



burger.addEventListener('click', () => {
    const isSmallScreen = window.innerWidth <= 1440; 
    const activeIcon = isSmallScreen 
        ? searchBtn.querySelector('.icon-sm use') 
        : searchBtn.querySelector('.icon-md use');
    const currentHref = activeIcon.getAttribute("href");
    nav.classList.remove('openSearch');
    navList.classList.toggle('nav-active');
    activeIcon.setAttribute("href", currentHref.replace("close", "search"));
    

    if (navList.classList.contains('nav-active')) {
        icon.setAttribute('href', 'images/icons.svg#close-24');
    } else {
        icon.setAttribute('href', 'images/icons.svg#burger');
    }
});



window.addEventListener('scroll', () => {
    if (header) { 
        if (window.scrollY > 0) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

const accordionItems = document.querySelectorAll(".accordion-item");

if (accordionItems) {
    accordionItems.forEach((item) => {
        item.addEventListener("click", () => {
            accordionItems.forEach((otherItem) => {
                const icon = otherItem.querySelectorAll('.icon use');
                if (otherItem !== item) {
                    otherItem.classList.remove("active");
                    if (icon) {
                        icon.forEach((inactiveIcon) => {
                            const href = inactiveIcon.getAttribute("href");
                            inactiveIcon.setAttribute("href", href.replace("minus", "plus"));
                        });
                    }
                }
            });
            item.classList.toggle("active");

            const activeIcon = item.querySelectorAll('.icon use');
            if (activeIcon) {
                activeIcon.forEach((icon) => {
                    const href = icon.getAttribute("href");
                    if (item.classList.contains("active")) {
                        icon.setAttribute("href", href.replace("plus", "minus"));
                    } else {
                        icon.setAttribute("href", href.replace("minus", "plus"));
                    }
                });
            }
        });
    });
}

document.addEventListener("click", (event) => {
    if (!searchBtn.contains(event.target) && !nav.contains(event.target)) {
        nav.classList.remove('openSearch');
        const isSmallScreen = window.innerWidth <= 1440; 
        const activeIcon = isSmallScreen 
            ? searchBtn.querySelector('.icon-sm use') 
            : searchBtn.querySelector('.icon-md use');
        const currentHref = activeIcon.getAttribute("href");
        activeIcon.setAttribute("href", currentHref.replace("close", "search"));
    }

    if (!burger.contains(event.target) && !navList.contains(event.target)) {
        navList.classList.remove('nav-active');
        icon.setAttribute('href', 'images/icons.svg#burger');
    }

    accordionItems.forEach((item) => {
        if (!item.contains(event.target)) {
            item.classList.remove("active");
            const icons = item.querySelectorAll('.icon use');
            if (icons) {
                icons.forEach((icon) => {
                    const href = icon.getAttribute("href");
                    icon.setAttribute("href", href.replace("minus", "plus"));
                });
            }
        }
    });
});


  