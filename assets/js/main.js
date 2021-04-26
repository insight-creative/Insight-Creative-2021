import barba from '@barba/core';
import barbaPrefetch from '@barba/prefetch';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Swiper JS
import Swiper, { Navigation, Pagination } from 'swiper';
Swiper.use([Navigation, Pagination]);
import { pageTransitionOut, pageTransitionIn, contentAnimation, updateMenu } from './partials';

barba.use(barbaPrefetch);
gsap.registerPlugin(ScrollTrigger);

const menuButton = document.querySelector(".menu-button-wrap");
const menu = document.querySelector(".nav-list");
const menuListItem = document.querySelector(".nav-list-item");
const menuItems = document.querySelectorAll(".nav-item");
const hamburger = document.querySelector(".hamburger");
const cursor = document.querySelector(".cursor");
const projectLinks = document.querySelectorAll(".featured-projects__link");
const blogLinks = document.querySelectorAll(".blog-card");
const body = document.querySelector("body");
const siteHeader = document.querySelector('.site-header');
const primaryNav = document.querySelector('.primary-nav');
const container = document.querySelector('.scroll-container');

// let scrollState = 0;

// const scrollTop = function() {
//   return window.scrollY;
// };

// const scrollDetect = function(collapse, expand) {
//   const currentScroll = scrollTop();
//   if (currentScroll > scrollState) {
//     collapse();
//   } else {
//     expand();
//   }
//   scrollState = scrollTop();
// };

// function collapseNav() {
//   siteHeader.classList.remove('expand');
//   siteHeader.classList.add('collapse');
// }

// function expandNav() {
//   siteHeader.classList.remove('collapse');
//   siteHeader.classList.add('expand');
// }

// window.addEventListener("scroll", function() {
//   scrollDetect(collapseNav, expandNav);
// });

var animateNav = gsap.to(siteHeader, {
    y:'-=150', 
    duration:0.5, 
    ease:'power2.in', 
    autoAlpha: 0, 
    paused:true
});

ScrollTrigger.create({
  trigger: "siteHeader",
  start: "100px top",
  end: "bottom bottom-=20",
  onUpdate: ({progress, direction, isActive}) => {
    if (direction == -1) {
      animateNav.reverse()
    } if (direction == 1 ) {
      animateNav.play()
    } else if (direction == 1 && isActive == true) {
      animateNav.play()
    }
  }
});

function initCursor() {
    function updateCursor(e) {
        cursor.classList.remove("cursor-hide");
        cursor.setAttribute("style","top: "+(e.pageY - scrollY)+"px; left: "+(e.pageX)+"px")
    }
    
    function hideCursor() {
        cursor.classList.add("cursor-hide");
    }
    
    menuItems.forEach(item => {
        item.addEventListener("mouseover", () => {
            cursor.classList.add("cursor-grow");
        });
        item.addEventListener("mouseout", () => {
            cursor.classList.remove("cursor-grow");
        });
    })
    
    projectLinks.forEach(item => {
        item.addEventListener("mouseover", () => {
            cursor.classList.add("cursor-project");
        });
        item.addEventListener("mouseout", () => {
            cursor.classList.remove("cursor-project");
        });
    })
    
    blogLinks.forEach(item => {
        item.addEventListener("mouseover", () => {
            cursor.classList.add("cursor-blog");
        });
        item.addEventListener("mouseout", () => {
            cursor.classList.remove("cursor-blog");
        });
    })
    
    window.addEventListener("mousemove", updateCursor);
    body.addEventListener("mouseleave", hideCursor);
}

menuButton.addEventListener("click", toggleMobileMenu);

function selectVideo() {
    //get screen width and pixel ratio
    const width = screen.width;
    //initialise 2 videos — 
    //“small” is 960 pixels wide (), large is 1920 pixels wide ()
    const mobileVideo="/video/Insight-Background-Video-Mobile.mp4";
    const desktopVideo = "/video/Insight-Background-Video.mp4";

    if (width<1000){
        const sourceTag = "\<source src=\"" +mobileVideo +"\"/\>";
        document.getElementById('hero-video__video').innerHTML = sourceTag;
        }
    else {
        const sourceTag = "\<source src=\"" +desktopVideo +"\"/\>";
        document.getElementById('hero-video__video').innerHTML = sourceTag;
    }
}

function initSwiper() {
    const mySwiper = new Swiper('.swiper-container', {
        // Optional parameters
        loop: true,
        grabCursor: true,
        // If we need pagination
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true,
        },
      
        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      })
}

function toggleMobileMenu() {
    menu.classList.toggle("nav-open");
    hamburger.classList.toggle("is-active");
}

function fadeNavigation() {
    gsap.from(primaryNav, {
        opacity: 0,
        y: -150,
        duration: 1,
        ease: 'Power2.in'
    });
}

fadeNavigation();

function fadeInContent() {
    const introSection = document.querySelector(".intro-section");
    const fadeWrapper = document.querySelector(".fade-wrapper .container");
    const fadeUp = document.querySelectorAll(".fade-up");
    const blog = document.querySelector(".blog-container");

    gsap.from(introSection, {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: 'Power2.in',
        scrollTrigger: {
            trigger: introSection,
            start: "top bottom-=50",
            toggleActions: "play none none reset",
            scroller: ".smooth-scroll",
        }
    });
    gsap.utils.toArray(fadeUp).forEach((fade) => {
        gsap.from(fade, {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: 'Power2.in',
            scrollTrigger: {
                trigger: fade,
                toggleActions: "play none none reset",
                scroller: ".smooth-scroll",
            }
        })
    });
    gsap.from(fadeWrapper, {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: 'Power2.in',
        delay: 1,
        scrollTrigger: {
            trigger: fadeWrapper,
            start: "top bottom-=25",
            toggleActions: "play none none reset",
            scroller: ".smooth-scroll",
        }
    });
    if (document.body.contains(blog)) {
        gsap.from(blog, {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: 'Power2.in',
            delay: 1.5,
            scrollTrigger: {
                trigger: blog,
                start: "top bottom-=25",
                toggleActions: "play none none reset",
                scroller: ".smooth-scroll",
            }
        });
    }
}

// function initZoom() {
//     const zoomImages = document.querySelectorAll(".zoom-image");
//     gsap.utils.toArray(zoomImages).forEach((section) => {
//         const image = section.querySelector('img');
//         gsap.to(image, {
//             scale: 1.2,
//             scrollTrigger: {
//                 trigger: section,
//                 scrub: true,
//             }
//         })
//     });
// }

function initImageParallax() {
    gsap.utils.toArray('.with-parallax').forEach(section => {
        const image = section.querySelector('img');

        gsap.to(image, {
            yPercent: 20,
            ease: 'none',
            scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                scrub: 1,
            }
        });
    });
}

function initSmoothScroll() {
    document.body.style.height = `${container.clientHeight}px`;

    let height; 
    function setHeight() {
        height = container.clientHeight;
        document.body.style.height = `${height}px`
    }
    ScrollTrigger.addEventListener('refreshInit', setHeight);

    gsap.to(container, {
        y: () => -(height - document.documentElement.clientHeight),
        ease: 'none',
        scrollTrigger: {
            trigger: document.body,
            start: 'top top', 
            end: 'bottom bottom', 
            scrub: 1,
            invalidateOnRefresh: true
        }
    });

    // var html = document.documentElement;

    // var scroller = {
    // target: document.querySelector("#scroll-container"),
    // ease: 0.05, // <= scroll speed
    // endY: 0,
    // y: 0,
    // resizeRequest: 1,
    // scrollRequest: 0,
    // };

    // var requestId = null;

    // TweenLite.set(scroller.target, {
    // rotation: 0.01,
    // force3D: true
    // });

    // window.addEventListener("load", onLoad);

    // function onLoad() {    
    // updateScroller();  
    // window.focus();
    // window.addEventListener("resize", onResize);
    // document.addEventListener("scroll", onScroll); 
    // }

    // function updateScroller() {
    
    // var resized = scroller.resizeRequest > 0;
        
    // if (resized) {    
    //     var height = scroller.target.clientHeight;
    //     body.style.height = height + "px";
    //     scroller.resizeRequest = 0;
    // }
        
    // var scrollY = window.pageYOffset || html.scrollTop || body.scrollTop || 0;

    // scroller.endY = scrollY;
    // scroller.y += (scrollY - scroller.y) * scroller.ease;

    // if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
    //     scroller.y = scrollY;
    //     scroller.scrollRequest = 0;
    // }
    
    // TweenLite.set(scroller.target, { 
    //     y: -scroller.y 
    // });
    
    // requestId = scroller.scrollRequest > 0 ? requestAnimationFrame(updateScroller) : null;
    // }

    // function onScroll() {
    // scroller.scrollRequest++;
    // if (!requestId) {
    //     requestId = requestAnimationFrame(updateScroller);
    // }
    // }

    // function onResize() {
    // scroller.resizeRequest++;
    // if (!requestId) {
    //     requestId = requestAnimationFrame(updateScroller);
    // }
    // }
}

function homepageInit() {
    fadeInContent();
    selectVideo();
    initCursor();
    initSmoothScroll();
    initImageParallax();
    initZoom();
    initSwiper();
}

function initPageTransitions() {
    // do something before the transition starts
    barba.hooks.before(() => {
        updateMenu();
    });

    // do something after the transition finishes
    barba.hooks.after(() => {
        homepageInit();
        updateAria();
        ga('set', 'page', window.location.pathname);
        ga('send', 'pageview');
    });

    // scroll to the top of the page
    barba.hooks.enter(() => {
        window.scrollTo(0, 0);
    });

    barba.init({
        timeout: 7000,
        transitions: [{
            name: 'fade-transition',
            once(data) {
                contentAnimation();
                // do something once on the initial page load
                homepageInit();
            },
            async leave(data) {
                // animate loading screen in
                await pageTransitionOut(data.current);
                data.current.container.remove();
            },
            async enter(data) {
                // animate loading screen away
                pageTransitionIn(data.next);
            },
            async beforeEnter(data) {
                contentAnimation();
                ScrollTrigger.getAll().forEach(t => t.kill());
            }

        }]
    });
}

initPageTransitions();