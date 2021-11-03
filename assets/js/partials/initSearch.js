function initSearch () {
    const siteHeader = document.querySelector('.site-header')
    const menu = document.querySelector('.nav-list')
    const menuHeight = menu.getBoundingClientRect().height
    const searchIcon = document.querySelector('.search__open')
    const searchCloseIcon = document.querySelector('.search__close')
    const search = document.querySelector('.search')

    search.style.height = menuHeight + 'px'

    searchIcon.addEventListener('click', function() {
        siteHeader.classList.add('has-search-open')
    })

    searchCloseIcon.addEventListener('click', function() {
        siteHeader.classList.remove('has-search-open')
    })
}

export default initSearch

