const hamburger = document.querySelector('.hamburger')

hamburger.addEventListener('click', toggleMobileMenu);

function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.site-header__mobile-nav')
    const mobileMenuWrapper = document.querySelector('.site-header__mobile-nav-inner')
    const mobileMenuWrapperHeight = mobileMenuWrapper.getBoundingClientRect().height

    mobileMenu.style.height = 0

    if(mobileMenu.classList.contains("nav-open")) {
        this.setAttribute("aria-expanded", "false");
        this.setAttribute("aria-label", "open mobile menu");
        mobileMenu.classList.remove("nav-open");
        mobileMenu.style.height = 0
        hamburger.classList.remove("is-active");
    } else {
        mobileMenu.classList.add("nav-open");
        console.log(mobileMenuWrapperHeight)
        mobileMenu.style.height = mobileMenuWrapperHeight + 'px'
        hamburger.classList.add("is-active");
        this.setAttribute("aria-expanded","true");
        this.setAttribute("aria-label","close mobile menu");
    }
}

export default toggleMobileMenu