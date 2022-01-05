const dropdown = document.querySelector('.has-sub-menu')

function activateDropdown () {
    dropdown.addEventListener('mouseover', () => {
        dropdown.classList.add('sub-menu-active')
    })
    dropdown.addEventListener('mouseout', () => {
        dropdown.classList.remove('sub-menu-active')
    })
}

activateDropdown()

export default activateDropdown