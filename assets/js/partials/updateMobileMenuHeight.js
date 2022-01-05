function updateMobileMenuHeight() {
    const mobileMenu = document.querySelector('.site-header__mobile-nav')
const mobileMenuWrapper = document.querySelector('.site-header__mobile-nav-inner')
const mobileMenuWrapperHeight = mobileMenuWrapper.getBoundingClientRect().height

    mobileMenu.style.height = mobileMenuWrapperHeight + 'px'
    console.log("mobile menu height test")
}

export default updateMobileMenuHeight