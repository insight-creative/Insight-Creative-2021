import barba from '@barba/core';
import barbaPrefetch from '@barba/prefetch';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LocomotiveScroll from 'locomotive-scroll';
// import Swiper JS
import Swiper, { Navigation, Pagination } from 'swiper';
Swiper.use([Navigation, Pagination]);
import { pageTransitionOut, pageTransitionIn, contentAnimation, updateMenu } from './partials';

barba.use(barbaPrefetch);
gsap.registerPlugin(ScrollTrigger);

const menuButton = document.querySelector(".menu-button-wrap");
const menu = document.querySelector(".nav-list");
const hamburger = document.querySelector(".hamburger");

menuButton.addEventListener("click", toggleMobileMenu);

function initSwiper() {
    var mySwiper = new Swiper('.swiper-container', {
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

let scroll;
const selectAll = (e) => document.querySelectorAll(e);

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

function initZoom() {
    const zoomImages = document.querySelectorAll(".zoom-image");
    gsap.utils.toArray(zoomImages).forEach((section) => {
        const image = section.querySelector('img');
        gsap.to(image, {
            scale: 1.1,
            scrollTrigger: {
                trigger: section,
                scrub: true,
                scroller: ".smooth-scroll",
            }
        })
    });
}

function homepageAnimations() {
    fadeInContent();
    initZoom();
    initSwiper();
}

function removeScrollbar() {
    //Remove Old Locomotive Scrollbar otherwise there will be two
    const scrollbar = selectAll('.c-scrollbar');

    console.log(scrollbar);

    if (scrollbar.length > 1) {
        scrollbar[0].remove();
    }
}

function initPageTransitions() {
    // do something before the transition starts
    barba.hooks.before(() => {
        updateMenu();
    });

    // do something after the transition finishes
    barba.hooks.after(() => {
        // reinit locomotive scroll
        scroll.init();
        homepageAnimations();
        removeScrollbar();
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
                initSmoothScroll(data.next.container);
                homepageAnimations();
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
                scroll.destroy();
                initSmoothScroll(data.next.container);
            }

        }]
    });

    function initSmoothScroll(container) {
        // borrowed from the pens https://codepen.io/mulegoat/project/editor/XvJVNP and https://codepen.io/GreenSock/pen/1dc38ca14811bc76e25c4b8c686b653d
        scroll = new LocomotiveScroll({
            el: container.querySelector('[data-scroll-container]'),
            smooth: true,
            getDirection: true
        });

        scroll.on("scroll", ScrollTrigger.update);

        ScrollTrigger.scrollerProxy('[data-scroll-container]', {
            scrollTop(value) {
                return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
            }, // we don't have to define a scrollLeft because we're only scrolling vertically.
            getBoundingClientRect() {
                return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
            },
            // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
            pinType: container.querySelector('[data-scroll-container]').style.transform ? "transform" : "fixed"
        });

        // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
        ScrollTrigger.addEventListener('refresh', () => scroll.update());

        // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
        ScrollTrigger.refresh();
    }
}

initPageTransitions();