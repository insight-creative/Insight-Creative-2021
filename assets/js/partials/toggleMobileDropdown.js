const toggleMobileDropdown = document.querySelector('.toggle-mobile-dropdown')
const hasMobileDropdown = document.querySelector('.nav-list-has-dropdown')

toggleMobileDropdown.addEventListener('click', toggleMobileDropdownMenu)

function toggleMobileDropdownMenu() {

    if(hasMobileDropdown.classList.contains('active')) {
        toggleMobileDropdown.setAttribute('aria-expanded', 'false')
        toggleMobileDropdown.setAttribute('aria-label', 'open mobile dropdown menu')
        hasMobileDropdown.classList.remove('active')
    } else {
        hasMobileDropdown.classList.add('active')
        toggleMobileDropdown.setAttribute('aria-expanded','true')
        toggleMobileDropdown.setAttribute('aria-label','close mobile dropdown menu')
    }

    function updateMobileMenuHeight() {
        const mobileMenu = document.querySelector('.site-header__mobile-nav')
        const mobileMenuWrapper = document.querySelector('.site-header__mobile-nav-inner')
        const mobileMenuWrapperHeight = mobileMenuWrapper.getBoundingClientRect().height
        
        mobileMenu.style.height = mobileMenuWrapperHeight + 'px'
    }
    updateMobileMenuHeight()
}

export default toggleMobileDropdownMenu