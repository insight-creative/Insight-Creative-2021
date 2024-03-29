import barba from '@barba/core'
import barbaPrefetch from '@barba/prefetch'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Scrollbar from 'smooth-scrollbar'
import { toggleMobileMenu, toggleMobileDropdownMenu, dropdownMenu } from './partials';

console.log('%c Crafted by Insight Creative, Inc. Developed by Justin Parsons', 'background: #1d1d1d; color: white; padding: 5px 10px;')

barba.use(barbaPrefetch)
gsap.registerPlugin(ScrollTrigger)

let bodyScrollBar

const logo = document.querySelector('.site-header__logo')
const menuItems = document.querySelectorAll('.nav-item')
const hamburger = document.querySelector('.hamburger')
const follow = document.querySelector('.follower')
const followerText = document.querySelector('.follower__text')
const siteHeader = document.querySelector('.site-header')
const siteHeaderHeight = siteHeader.getBoundingClientRect().height
const primaryNav = document.querySelector('.site-header__inner')
const scroller = document.querySelector('#viewport')
const width = screen.width
const footer = document.querySelector('.footer')
const scrollContainer = document.querySelector('.scroll-content')
const social = document.querySelector('.social')
const breadcrumbs = document.querySelector('.breadcrumbs__inner')
const breadcrumbsProgressBar = document.querySelector('.breadcrumbs__progress-bar-inner')
const loader = document.querySelector('.preloader')
const loaderInner = document.querySelector('.preloader__inner')

var divisor = document.getElementById("divisor"),
slider = document.getElementById("slider");
function moveDivisor() { 
  console.log('slider position moved')
	divisor.style.width = slider.value+"%";
}

function filterPosts () {
  const filterBtn = document.querySelector('.btn-filter')
  const categoryList = document.querySelector('.category-list')
  if (!document.body.contains(categoryList)) return
  filterBtn.addEventListener('click', event => {
    categoryList.classList.toggle('list-open')
  })
}

function initSlider () {
  const slider = document.querySelector('.slider')
  if (!document.body.contains(slider)) return
  const nextButton = document.querySelector('.slider__btn-next')
  const prevButton = document.querySelector('.slider__btn-prev')
  const slides = document.querySelectorAll('.slider__slide')
  const slide = document.querySelector('.slider__slide')
  const sliderContents = slider.querySelector('.slider__content')
  const slideHeight = slide.getBoundingClientRect().height

  const setSliderHeight = () => {
    sliderContents.style.height = slideHeight + 'px'
  }

  setSliderHeight()

  const setSlidePositions = _ => {
    const slideWidth = slides[0].getBoundingClientRect().width
    slides.forEach((slide, index) => {
      slide.style.left = slideWidth * index + 'px'
    })
  }

  setSlidePositions()

  slides[0].classList.add('is-selected')

  const createDots = _ => {
    const dotsContainer = document.createElement('div')
    dotsContainer.classList.add('slider__dots')
    slides.forEach((slide, index) => {
      const a = slide.querySelector('a')
      a.addEventListener('keydown', event => {
        const { key } = event
        if (key === 'ArrowLeft') prevButton.click()
        if(key === 'ArrowRight') nextButton.click()
      })
      const dot = document.createElement('button')
      dot.classList.add('slider__dot')
      dot.setAttribute('tabindex', -1)
      dot.setAttribute('aria-label', 'go to slide' + ' ' + (index + 1))

      if (slide.classList.contains('is-selected')) {
        dot.classList.add('is-selected')
      }

      dotsContainer.appendChild(dot)
    })
    return dotsContainer
  }

  const dotsContainer = createDots()
  const dots = [...dotsContainer.children]
  slider.appendChild(dotsContainer)
  const switchSlide = (currentSlide, targetSlide) => {
    const destination = getComputedStyle(targetSlide).left
    const slideHeight = targetSlide.getBoundingClientRect().height
    // show next slide
    sliderContents.style.transform = 'translateX(-' + destination + ')'
    // sliderContents.style.height = slideHeight + 'px'
    currentSlide.classList.remove('is-selected')
    targetSlide.classList.add('is-selected')

    // show previous slide
    sliderContents.style.transform = 'translateX(-' + destination + ')'
    // sliderContents.style.height = slideHeight + 'px'
    currentSlide.classList.remove('is-selected')
    targetSlide.classList.add('is-selected')
    if (!targetSlide.previousElementSibling) {
      prevButton.classList.add('btn-inactive')
      event.preventDefault()
    } else if (!targetSlide.nextElementSibling) {
      nextButton.classList.add('btn-inactive')
      event.preventDefault()
    }

    // Focus on selected slide's anchor tag
    const currentLink = currentSlide.querySelector('a')
    const targetLink = targetSlide.querySelector('a')

    // Roving tabindex 
    currentLink.setAttribute('tabindex', -1)
    targetLink.removeAttribute('tabindex', -1)
  }
  // Highlights the correct dot
  const highlightDot = (currentDot, targetDot) => {
    currentDot.classList.remove('is-selected')
    targetDot.classList.add('is-selected')
  }
  // Show/hide the arrow buttons
  const showHideArrows = clickedDotIndex => {
    if (clickedDotIndex === 0) {
      prevButton.classList.add('btn-inactive')
      nextButton.classList.remove('btn-inactive')
    } else if (clickedDotIndex === dots.length - 1) {
      prevButton.classList.remove('btn-inactive')
      nextButton.classList.add('btn-inactive')
    } else {
      prevButton.classList.remove('btn-inactive')
      nextButton.classList.remove('btn-inactive')
    }
  }

  nextButton.addEventListener('click', event => {
    const currentSlide = sliderContents.querySelector('.is-selected')
    const nextSlide = currentSlide.nextElementSibling
    const currentDot = dotsContainer.querySelector('.is-selected')
    const nextDot = currentDot.nextElementSibling
    switchSlide(currentSlide, nextSlide)
    prevButton.classList.remove('btn-inactive')
    highlightDot(currentDot, nextDot)
    
  })
  prevButton.addEventListener('click', event => {
    const currentSlide = sliderContents.querySelector('.is-selected')
    const previousSlide = currentSlide.previousElementSibling
    const currentDot = dotsContainer.querySelector('.is-selected')
    const previousDot = currentDot.previousElementSibling
    switchSlide(currentSlide, previousSlide)
    nextButton.classList.remove('btn-inactive')
    highlightDot(currentDot, previousDot)
    
  })
  dotsContainer.addEventListener('click', event => {
    const dot = event.target.closest('button')
    if (!dot) return
    const currentSlide = sliderContents.querySelector('.is-selected')
    const clickedDotIndex = dots.findIndex(d => d === dot)
    const slideToShow = slides[clickedDotIndex]
    const currentDot = dotsContainer.querySelector('.is-selected')
    switchSlide(currentSlide, slideToShow)
    highlightDot(currentDot, dot)
    showHideArrows(clickedDotIndex)
    
  })
}

function initAnimatedNav () {
  const animateNav = gsap.to(siteHeader, {
    y: '-=150',
    duration: 1,
    ease: 'power2.in',
    autoAlpha: 0,
    paused: true
  })

  ScrollTrigger.create({
    trigger: siteHeader,
    start: '100px top',
    end: '+=999999',
    onUpdate: ({ direction, isActive }) => {
      if (direction === -1) {
        animateNav.reverse()
      } if (direction === 1) {
        animateNav.play()
      } else if (direction === 1 && isActive === true) {
        animateNav.play()
      }
    }
  })
}

function resetCursor () {
  follow.style.transform = 'scale(1)'
  gsap.to(follow, 0.3, {
    scale: 1,
    backgroundColor: '#8bc0c6',
    autoAlpha: 1,
    mixBlendMode: 'exclusion'
  })
  gsap.to(followerText, {
    opacity: 0
  })
}

function initCursor () {
  const serviceLink = document.querySelector('.service-list__link')
  const serviceLinks = document.querySelectorAll('.service-list__link')
  const primaryBtn = document.querySelector('.btn-primary')
  const primaryBtns = document.querySelectorAll('.btn-primary')
  const tertiaryBtn = document.querySelector('.btn-tertiary')
  const tertiaryBtns = document.querySelectorAll('.btn-tertiary')
  const projectLink = document.querySelector('.featured-projects__link')
  const projectLinks = document.querySelectorAll('.featured-projects__link')
  const blogCard = document.querySelector('.blog-card')
  const blogCards = document.querySelectorAll('.blog-card a')
  const socialLink = document.querySelector('.social__link')
  const socialLinks = document.querySelectorAll('.social__link')
  const slide = document.querySelector('.swiper-slide')
  const slides = document.querySelectorAll('.swiper-slide')
  const footerLinks = document.querySelectorAll('.footer a')
  const webCard = document.querySelector('.web-card')
  const webCards = document.querySelectorAll('.web-card')
  const staffCard = document.querySelector('.staff-card')
  const staffCards = document.querySelectorAll('.staff-card')
  const workCard = document.querySelector('.work-card')
  const workCards = document.querySelectorAll('.work-card')
  const subMenuLink = document.querySelector('.sub-menu__link')
  const subMenuLinks = document.querySelectorAll('.sub-menu__link')

  gsap.set('.follower', { xPercent: -50, yPercent: -50, backgroundColor: '#8bc0c6' })
  gsap.set('.cursor', { xPercent: -50, yPercent: -50 })

  window.addEventListener('mousemove', e => {
    gsap.to(follow, 0.3, { x: e.clientX, y: e.clientY })
  })

  logo.addEventListener('mouseover', () => {
    gsap.to(follow, 0.3, {
      scale: 6
    })
  })
  logo.addEventListener('mouseout', () => {
    gsap.to(follow, 0.3, {
      scale: 1
    })
  })

  menuItems.forEach(link => {
    link.addEventListener('mouseover', () => {
      gsap.to(follow, 0.3, {
        scale: 6
      })
    })
    link.addEventListener('mouseout', () => {
      gsap.to(follow, 0.3, {
        scale: 1
      })
    })
  })

  subMenuLinks.forEach(link => {
    link.addEventListener('mouseover', () => {
      gsap.to(follow, 0.3, {
        scale: 6
      })
    })
    link.addEventListener('mouseout', () => {
      gsap.to(follow, 0.3, {
        scale: 1
      })
    })
  })

  footerLinks.forEach(link => {
    link.addEventListener('mouseover', () => {
      gsap.to(follow, 0.3, {
        scale: 6
      })
    })
    link.addEventListener('mouseout', () => {
      gsap.to(follow, 0.3, {
        scale: 1
      })
    })
  })

  if (document.body.contains(serviceLink)) {
    serviceLinks.forEach(link => {
      link.addEventListener('mouseover', () => {
        gsap.to(follow, 0.3, {
          scale: 6
        })
      })
      link.addEventListener('mouseout', () => {
        gsap.to(follow, 0.3, {
          scale: 1
        })
      })
    })
  }

  if (document.body.contains(primaryBtn)) {
    primaryBtns.forEach(link => {
      link.addEventListener('mouseover', () => {
        gsap.to(follow, 0.3, {
          scale: 0
        })
      })
      link.addEventListener('mouseout', () => {
        gsap.to(follow, 0.3, {
          scale: 1
        })
      })
    })
  }

  socialLinks.forEach(link => {
    link.addEventListener('mouseover', () => {
      gsap.to(follow, 0.3, {
        scale: 0
      })
    })
    link.addEventListener('mouseout', () => {
      gsap.to(follow, 0.3, {
        scale: 1
      })
    })
  })

  if (document.body.contains(tertiaryBtn)) {
    tertiaryBtns.forEach(link => {
      link.addEventListener('mouseover', () => {
        gsap.to(follow, 0.3, {
          scale: 0
        })
      })
      link.addEventListener('mouseout', () => {
        gsap.to(follow, 0.3, {
          scale: 1
        })
      })
    })
  }

  if (document.body.contains(projectLink)) {
    projectLinks.forEach(link => {
      link.addEventListener('mouseover', () => {
        followerText.innerHTML = 'View Project'
        gsap.to(follow, 0.3, {
          scale: 10,
          backgroundColor: '#cd1f40',
          autoAlpha: 0.9,
          mixBlendMode: 'initial'
        })
        gsap.to(followerText, 0.3, {
          autoAlpha: 1
        })
      })
      link.addEventListener('mouseout', () => {
        gsap.to(follow, 0.3, {
          scale: 1,
          backgroundColor: '#8bc0c6',
          autoAlpha: 1,
          mixBlendMode: 'exclusion'
        })
        gsap.to(followerText, 0.3, {
          autoAlpha: 0
        })
      })
    })
  }

  if (document.body.contains(workCard)) {
    workCards.forEach(link => {
      link.addEventListener('mouseover', () => {
        followerText.innerHTML = 'View Project'
        gsap.to(follow, 0.3, {
          scale: 10,
          backgroundColor: '#cd1f40',
          autoAlpha: 0.9,
          mixBlendMode: 'initial'
        })
        gsap.to(followerText, 0.3, {
          autoAlpha: 1
        })
      })
      link.addEventListener('mouseout', () => {
        gsap.to(follow, 0.3, {
          scale: 1,
          backgroundColor: '#8bc0c6',
          autoAlpha: 1,
          mixBlendMode: 'exclusion'
        })
        gsap.to(followerText, 0.3, {
          autoAlpha: 0
        })
      })
    })
  }

  if (document.body.contains(blogCard)) {
    blogCards.forEach(link => {
      link.addEventListener('mouseover', () => {
        followerText.innerHTML = 'View Post'
        gsap.to(follow, 0.3, {
          scale: 10,
          backgroundColor: '#cd1f40',
          autoAlpha: 0.9,
          mixBlendMode: 'initial'
        })
        gsap.to(followerText, 0.3, {
          autoAlpha: 1
        })
      })
      link.addEventListener('mouseout', () => {
        gsap.to(follow, 0.3, {
          scale: 1,
          backgroundColor: '#8bc0c6',
          autoAlpha: 1,
          mixBlendMode: 'exclusion'
        })
        gsap.to(followerText, 0.3, {
          autoAlpha: 0
        })
      })
    })
  }

  if (document.body.contains(staffCard)) {
    staffCards.forEach(link => {
      link.addEventListener('mouseover', () => {
        followerText.innerHTML = 'View Bio'
        gsap.to(follow, 0.3, {
          scale: 10,
          backgroundColor: '#cd1f40',
          autoAlpha: 0.9,
          mixBlendMode: 'initial'
        })
        gsap.to(followerText, 0.3, {
          autoAlpha: 1
        })
      })
      link.addEventListener('mouseout', () => {
        gsap.to(follow, 0.3, {
          scale: 1,
          backgroundColor: '#8bc0c6',
          autoAlpha: 1,
          mixBlendMode: 'exclusion'
        })
        gsap.to(followerText, 0.3, {
          autoAlpha: 0
        })
      })
    })
  }

  if (document.body.contains(webCard)) {
    webCards.forEach(link => {
      link.addEventListener('mouseover', () => {
        followerText.innerHTML = 'View Website'
        gsap.to(follow, 0.3, {
          scale: 10,
          backgroundColor: '#cd1f40',
          autoAlpha: 0.9,
          mixBlendMode: 'initial'
        })
        gsap.to(followerText, 0.3, {
          autoAlpha: 1
        })
      })
      link.addEventListener('mouseout', () => {
        gsap.to(follow, 0.3, {
          scale: 1,
          backgroundColor: '#8bc0c6',
          autoAlpha: 1,
          mixBlendMode: 'exclusion'
        })
        gsap.to(followerText, 0.3, {
          autoAlpha: 0
        })
      })
    })
  }
}

function initContentFade() {
  const fadeUp = document.querySelectorAll('.fade-up')
  const fadeUpDelayed = document.querySelectorAll('.fade-up--delayed')
  const fadeOut = document.querySelectorAll('.fade-out')
  gsap.utils.toArray(fadeUp).forEach((fade) => {
        gsap.to(fade, {
            opacity: 1,
            y: 0,
            duration: .7,
            ease: 'Power2.in',
            scrollTrigger: {
                trigger: fade,
                toggleActions: 'play none none none',
                start: "top bottom-=50"
            }
        })
    })
  gsap.utils.toArray(fadeUpDelayed).forEach((fadeDelayed) => {
        gsap.to(fadeDelayed, {
            opacity: 1,
            delay: .7,
            y: 0,
            duration: .7,
            ease: 'Power2.in',
            stagger: 0.2
        })
    })
  gsap.set('.fade-staggered', {y: 50, autoAlpha: 0})

  ScrollTrigger.batch('.fade-staggered', {
    onEnter: batch => gsap.to(batch, {y: 0, autoAlpha: 1, stagger: 0.2}),
    })

  gsap.utils.toArray(fadeOut).forEach((fade) => {
    gsap.to(fade, {
      opacity: 0,
      duration: 0.5,
      ease: 'Power2.in',
      scrollTrigger: {
        trigger: fade,
        start: 'bottom-=50 top+=200',
        scrub: true,
        markers: true
      }
    })
  })
}

function initVideo () {
  const home = window.location.pathname;
  if (home === '/') {
    //initialise 2 videos —
    //“small” is 960 pixels wide (), large is 1920 pixels wide ()
    const mobileVideo='/video/Insight-Background-Video-Mobile.mp4'
    const desktopVideo = '/video/Insight-Background-Video.mp4'

    if (width < 992) {
      const sourceTag = "\<source src=\"" +mobileVideo +"\"/\>"
      document.getElementById('hero-video__video').innerHTML = sourceTag
      document.getElementById('hero-video__video').play()
    }
    else {
      const sourceTag = "\<source src=\"" +desktopVideo +"\"/\>"
      document.getElementById('hero-video__video').innerHTML = sourceTag
      document.getElementById('hero-video__video').play()
    }
  }
}

function initBreadcrumbs () {
  const breadcrumbs = document.querySelector('.breadcrumbs__inner')
  const breadcrumbsProgressBar = document.querySelector('.breadcrumbs__progress-bar-inner')
  gsap.to(breadcrumbs, {
    opacity: 1,
    x: 0,
    duration: 0.3,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: siteHeader,
      start: '400px top',
      scrub: true
    }
  })
  gsap.to(breadcrumbsProgressBar, {
    scaleX: 1,
    scrollTrigger: {
      trigger: '.site-main',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true
    }
  })
}

function initSocial() {
  gsap.to(social, {
    opacity: 1,
    y: 0,
    duration: 0.3,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: siteHeader,
      start: '400px top',
      scrub: true
    }
  })
}

function fadeNavigation () {
  const tl = gsap.timeline({
    defaults: {
      autoAlpha: 1,
      ease: 'none',
      stagger: 0.1
    }
  })
  tl.to(logo, { duration: 1 })
  tl.to(menuItems, { duration: 0.7, x: 5 })
}

fadeNavigation()

function initImageEffects () {
  gsap.utils.toArray('.with-parallax').forEach(section => {
    const image = section.querySelector('img')

    if (!document.body.contains(image)) return

    gsap.to(image, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        scrub: 1
      }
    })
  })

  gsap.utils.toArray('.with-zoom').forEach(section => {
    const image = section.querySelector('img')

    if (!document.body.contains(image)) return

    gsap.to(image, {
      scale: 1,
      ease: 'none',
      // duration: 2,
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        // toggleActions: "play complete reverse reset",
        scrub: 1
      }
    })
  })
}

function initHeroParallax () {
  const titleReveal = document.querySelector('.title-reveal')
  const titleRevealFadeAway = document.querySelector('.title-reveal--fade-up-away')
  const title = document.querySelector('.title-reveal__title')

  if (!document.body.contains(title)) return

  gsap.to(title, {
    top: 0,
    // delay: .3,
    duration: 1,
    ease: 'power1'
  })

  gsap.utils.toArray('.hero-parallax').forEach(section => {
    const image = section.querySelector('img')

    if (!document.body.contains(image)) return

    gsap.to(image, {
      scale: 1,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: '-100px top',
        scrub: 1
      }
    })
  })

  if (!document.body.contains(titleReveal)) return

  gsap.to(titleRevealFadeAway, {
    y: -100,
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '.work-hero',
      start: 'top top',
      scrub: 1
    }
  })
}

function initSmoothScrollbar () {
  const breadcrumbs = document.querySelector('.breadcrumbs')
   
  // Scrollbar.init(document.querySelector('#viewport'));
  bodyScrollBar = Scrollbar.init(document.querySelector('#viewport'), { damping: 0.05 })
  const windowHeight = window.innerHeight
  const siteHeader = document.querySelector('.site-header')
  const siteHeaderHeight = siteHeader.getBoundingClientRect().height
  // scrollContent.style.transform = "translate3d(0, 0, 0)";
  // remove horizontal scrollbar
  bodyScrollBar.track.xAxis.element.remove()
  // keep ScrollTrigger in sync with Smooth Scrollbar
  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop (value) {
      if (arguments.length) {
        bodyScrollBar.scrollTop = value // setter
      }
      return bodyScrollBar.scrollTop    // getter
    },
    getBoundingClientRect () {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
    }
  })
  bodyScrollBar.addListener(({ offset }) => {
    breadcrumbs.style.top = 'calc(' + offset.y + 'px' + ' + ' + siteHeaderHeight + 'px' + ' - 10px ' + ' + ' + windowHeight + 'px )'
  })
  scroller.focus()
}

function destroySmoothScrollbar () {
  bodyScrollBar.destroy()
}

function killScrollTriggers () {
  const triggers = ScrollTrigger.getAll()
  triggers.forEach(trigger => {
    trigger.kill()
  })
}

function pageTransitionIn ({ container }) {
  const tl = gsap.timeline({
    defaults: {
      duration: 0.9,
      ease: 'power1.inOut'
    }
  })
  tl.fromTo(loader, {
    opacity: 1,
    yPercent: -100
  }, {
    yPercent: 0
  })
  tl.fromTo(loaderInner, {
    yPercent: 80
  }, {
    yPercent: 0
  }, 0)
    .to(container, { y: 150 }, 0)
  return tl
}

function resetNav () {
  const mobileMenu = document.querySelector('.site-header__mobile-nav')
  const hasMobileDropdown = document.querySelector('.nav-list-has-dropdown')
  const dropdown = document.querySelector('.has-sub-menu')

    if (mobileMenu.classList.contains('nav-open')) {
        mobileMenu.classList.remove('nav-open')
        mobileMenu.style.height = 0
        hamburger.classList.remove('is-active')
    }

    if (hasMobileDropdown.classList.contains('active')) {
      hasMobileDropdown.classList.remove('active')
    }

    if (dropdown.classList.contains('sub-menu-active')) {
      dropdown.classList.remove('sub-menu-active')
    }
}

function pageTransitionOut ({ container }) {

  const tl = gsap.timeline({
    defaults: {
      duration: 0.9,
      ease: 'power1.inOut'
    },
    onComplete: () => initPage()
  })
  tl.to(loader, {
    yPercent: 100
  })
  tl.to(loaderInner, {
    yPercent: -80
  }, 0)
    .from(container, { y: -150 }, 0)
  return tl
}

function initComparisonSlider() {
  const sliderControl = document.querySelector('.comparison-slider__controls')
  const sliderControls = document.querySelectorAll('.comparison-slider__controls')
  // 1. add event listener to run functions when the slider controls are activated
  if(!document.body.contains(sliderControl)) return
  sliderControls.forEach(control => {
    control.addEventListener('input', event => {
      // 2. check which slider is being interacted with
      const currentControlId = control.getAttribute('id')
      const currentControlParent = control.parentNode
      // 3. change the divider width of just the slider that is currently beng interacted with
      const slideDivider = currentControlParent.querySelector('.comparison-slider__divider')
      slideDivider.style.width = control.value + '%'
    })
  })
}


function initPage () {
  killScrollTriggers()
  initSmoothScrollbar()
  initAnimatedNav()
  initVideo()
  initCursor()
  initBreadcrumbs()
  initSocial()
  initContentFade()
  initImageEffects()
  initHeroParallax()
  initSlider()
  filterPosts()
  initComparisonSlider()
}

function initPageTransitions () {
  // do something before the transition starts
  barba.hooks.before(() => {
    document.querySelector('html').classList.add('is-transitioning')
    destroySmoothScrollbar()
    // killScrollTriggers();
    resetNav()
  })
  // do something after the transition finishes
  barba.hooks.after(() => {
    document.querySelector('html').classList.remove('is-transitioning')
  })
  // scroll to the top of the page
  barba.hooks.enter(() => {
    initSmoothScrollbar()
    bodyScrollBar.setPosition(0, 0)
    resetCursor()
})

  barba.init({
    transitions: [{
      once () {
        // do something once on the initial page load
        initPage()
      },
      async leave ({ current }) {
        // animate loading screen in
        await pageTransitionIn(current)
      },
      enter ({ next }) {
        // animate loading screen away
        pageTransitionOut(next)
      }

    }]
  })
}

// initPreloader();
initPageTransitions()