import barba from '@barba/core';
import barbaPrefetch from '@barba/prefetch';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Swiper, { Navigation, Pagination } from 'swiper';
Swiper.use([Navigation, Pagination]);
import Scrollbar from 'smooth-scrollbar';
// import { pageTransitionOut, pageTransitionIn, contentAnimation, updateMenu } from './partials';

barba.use(barbaPrefetch);
gsap.registerPlugin(ScrollTrigger);

let bodyScrollBar;

const select = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);

const menuButton = document.querySelector(".menu-button-wrap");
const menu = document.querySelector(".nav-list");
// const menuListItem = document.querySelector(".nav-list-item");
const menuItems = document.querySelectorAll(".nav-item");
// const links = document.querySelectorAll("a");
const projectLinks = document.querySelectorAll(".featured-projects__link");
const blogLinks = document.querySelectorAll(".blog-card");
const serviceLinks = document.querySelectorAll(".service-list__link");
const hamburger = document.querySelector(".hamburger");
const follow = document.querySelector('.follower');
const followerText = document.querySelector('.follower__text');
// const body = document.querySelector("body");
const siteHeader = document.querySelector('.site-header');
const primaryNav = document.querySelector('.primary-nav');
const container = document.querySelector('.scroll-container');
const scroller = document.querySelector('#viewport');

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

// function initCursor() {
//     function updateCursor(e) {
//         cursor.classList.remove("cursor-hide");
//         cursor.setAttribute("style","top: "+(e.pageY - scrollY)+"px; left: "+(e.pageX)+"px")
//     }
    
//     function hideCursor() {
//         cursor.classList.add("cursor-hide");
//     }
    
//     menuItems.forEach(item => {
//         item.addEventListener("mouseover", () => {
//             cursor.classList.add("cursor-grow");
//         });
//         item.addEventListener("mouseout", () => {
//             cursor.classList.remove("cursor-grow");
//         });
//     })
    
//     projectLinks.forEach(item => {
//         item.addEventListener("mouseover", () => {
//             cursor.classList.add("cursor-project");
//         });
//         item.addEventListener("mouseout", () => {
//             cursor.classList.remove("cursor-project");
//         });
//     })
    
//     blogLinks.forEach(item => {
//         item.addEventListener("mouseover", () => {
//             cursor.classList.add("cursor-blog");
//         });
//         item.addEventListener("mouseout", () => {
//             cursor.classList.remove("cursor-blog");
//         });
//     })
    
//     window.addEventListener("mousemove", updateCursor);
//     body.addEventListener("mouseleave", hideCursor);
// }

function initCursor() {
    gsap.set('.follower',{xPercent:-50,yPercent:-50,backgroundColor: '#8bc0c6'});
    gsap.set('.cursor',{xPercent:-50,yPercent:-50});

    window.addEventListener('mousemove',e => {
        gsap.to(follow,0.3,{x:e.clientX,y:e.clientY});
    });

    menuItems.forEach(link => {
        link.addEventListener("mouseover", () => {
            gsap.to(follow, 0.3, {
                scale: 6
            });
        });
        link.addEventListener("mouseout", () => {
            gsap.to(follow, 0.3, {
                scale: 1
            });
        });
    })

    serviceLinks.forEach(link => {
        link.addEventListener("mouseover", () => {
            gsap.to(follow, 0.3, {
                scale: 6
            });
        });
        link.addEventListener("mouseout", () => {
            gsap.to(follow, 0.3, {
                scale: 1
            });
        });
    })

    projectLinks.forEach(link => {
        link.addEventListener("mouseover", () => {
            followerText.innerHTML = "View Project";
            gsap.to(follow, 0.3, {
                scale: 10,
                backgroundColor: '#cd1f40',
                autoAlpha: .9,
                mixBlendMode: 'initial'
            });
            gsap.to(followerText, 0.3, {
                autoAlpha: 1,
            });
        });
        link.addEventListener("mouseout", () => {
            gsap.to(follow, 0.3, {
                scale: 1,
                backgroundColor: '#8bc0c6',
                autoAlpha: 1,
                mixBlendMode: 'exclusion'
            });
            gsap.to(followerText, 0.3, {
                autoAlpha: 0,
            });
        });
    })
    
    blogLinks.forEach(link => {
        link.addEventListener("mouseover", () => {
            followerText.innerHTML = "View Post";
            gsap.to(follow, 0.3, {
                scale: 10,
                backgroundColor: '#cd1f40',
                autoAlpha: .9,
                mixBlendMode: 'initial'
            });
            gsap.to(followerText, 0.3, {
                autoAlpha: 1,
            });
        });
        link.addEventListener("mouseout", () => {
            gsap.to(follow, 0.3, {
                scale: 1,
                backgroundColor: '#8bc0c6',
                autoAlpha: 1,
                mixBlendMode: 'exclusion'
            });
            gsap.to(followerText, 0.3, {
                autoAlpha: 0,
            });
        });
    })
}

menuButton.addEventListener("click", toggleMobileMenu);

function initVideo() {
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

function initSmoothScrollbar() {
    // Scrollbar.init(document.querySelector('#viewport'));

    bodyScrollBar = Scrollbar.init(select('#viewport'), {damping: 0.05});

    // remove horizontal scrollbar
    bodyScrollBar.track.xAxis.element.remove();

    // keep ScrollTrigger in sync with Smooth Scrollbar
    ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
            if (arguments.length) {
                bodyScrollBar.scrollTop = value; // setter
            }
            return bodyScrollBar.scrollTop;    // getter
        }
    });
    
    // when the smooth scroller updates, tell ScrollTrigger to update() too: 
    bodyScrollBar.addListener(ScrollTrigger.update);

}

function pageInit() {
    // initSmoothScrollbar();
    initSmoothScroll();
    initCursor();
    initImageParallax();
    initSwiper();
}

function pageTransitionIn() {
    console.log('pageTransitionIn');
    // return gsap.to('.transition', {duration: 1, yPercent: -100, ease: 'power1.inOut'});
    const tl = gsap.timeline({
        defaults: {
            duration: 1.3,
            ease: 'power1.inOut'
        },
        onComplete: () => pageInit()
    });
    tl.to('.transition', {
        yPercent: -100
    });
    return tl;
}

function pageTransitionOut() {
    console.log('pageTransitionOut');
    // return gsap.to('.transition', {duration: 1, yPercent: 0, ease: 'power1.inOut'});
    const tl = gsap.timeline({
        defaults: {
            duration: 1.3,
            ease: 'power1.inOut'
        },
        onComplete: () => pageInit()
    });
    tl.to('.transition', {
        yPercent: 0
    });
    return tl;
}

function initPageTransitions() {

    // do something before the transition starts
    barba.hooks.before(() => {
        select('html').classList.add('is-transitioning');
    });
    // do something after the transition finishes
    barba.hooks.after(() => {
        select('html').classList.remove('is-transitioning');
    });

    // scroll to the top of the page
    barba.hooks.enter(() => {
        window.scrollTo(0, 0);
    });

    barba.init({
        transitions: [{
            once() {
                // do something once on the initial page load
                pageInit();
                initVideo();
            },
            async leave() {
                // animate loading screen in
                await pageTransitionIn();
            },
            enter() {
                // animate loading screen away
                pageTransitionOut();
            }

        }]
    });
}

initPageTransitions();