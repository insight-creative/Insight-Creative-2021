import barba from '@barba/core'
import barbaPrefetch from '@barba/prefetch'
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Swiper, { Navigation, Pagination } from 'swiper'
Swiper.use([Navigation, Pagination])
import Scrollbar from 'smooth-scrollbar'
// import { pageTransitionOut, pageTransitionIn, contentAnimation, updateMenu } from './partials';
import { updateMenu } from './partials'

barba.use(barbaPrefetch)
gsap.registerPlugin(ScrollTrigger)

let bodyScrollBar

const select = (e) => document.querySelector(e)
const selectAll = (e) => document.querySelectorAll(e)

const menu = select(".nav-list")
const logo = select(".site-header__logo")
const menuItems = selectAll(".nav-item")
const hamburger = select(".hamburger")
const follow = select('.follower')
const followerText = select('.follower__text')
const siteHeader = select('.site-header')
const primaryNav = select('.site-header__inner')
const scroller = select('#viewport')
const width = screen.width
const footer = select('.footer')
const scrollContainer = select('.scroll-content')
const social = select(".social")
const breadcrumbs = select(".breadcrumbs__inner")
const breadcrumbsProgressBar = select(".breadcrumbs__progress-bar-inner")
const loader = select(".preloader")
const loaderInner = select(".preloader__inner")
const slider = document.querySelector('.slider')


function initSlider () {
    const home = window.location.pathname;
    if(home === "/") {
        console.log('a slider was found')
        const nextButton = document.querySelector('.slider__btn-next')
    const prevButton = document.querySelector('.slider__btn-prev')
    const slides = document.querySelectorAll('.slider__slide')
    const sliderContents = slider.querySelector('.slider__content')
    const dotsContainer = slider.querySelector('.slider__dots')
    const sliderDots = Array.from(slider.querySelectorAll('.slider__dot'))
    const slideWidth = slides[0].getBoundingClientRect().width
    
      slides[0].classList.add('is-selected')
    
      slides.forEach((slide, index) => {
        slide.style.left = slideWidth * index + 'px'
      })
    
      nextButton.addEventListener('click', event => {
          console.log('next button clicked')
          
        const currentSlide = sliderContents.querySelector('.is-selected')
        const nextSlide = currentSlide.nextElementSibling
        console.log(currentSlide)
        console.log(nextSlide)
        const destination = getComputedStyle(nextSlide).left
        const currentDot = dotsContainer.querySelector('.is-selected')
        const nextDot = currentDot.nextElementSibling
    
        sliderContents.style.transform = 'translateX(-' + destination + ')'
        currentSlide.classList.remove('is-selected')
        nextSlide.classList.add('is-selected')
        prevButton.classList.remove('btn-inactive')
    
        if (!nextSlide.nextElementSibling) {
          nextButton.classList.add('btn-inactive')
          event.preventDefault()
        }
    
        currentDot.classList.remove('is-selected')
        nextDot.classList.add('is-selected')
      })
    
      prevButton.addEventListener('click', event => {
        console.log('previous button clicked')
        const currentSlide = sliderContents.querySelector('.is-selected')
        const previousSlide = currentSlide.previousElementSibling
        const destination = getComputedStyle(previousSlide).left
        const currentDot = dotsContainer.querySelector('.is-selected')
        const previousDot = currentDot.previousElementSibling
    
        sliderContents.style.transform = 'translateX(-' + destination + ')'
        currentSlide.classList.remove('is-selected')
        previousSlide.classList.add('is-selected')
        nextButton.classList.remove('btn-inactive')
    
        if (!previousSlide.previousElementSibling) {
          prevButton.classList.add('btn-inactive')
          event.preventDefault()
        }
    
        currentDot.classList.remove('is-selected')
        previousDot.classList.add('is-selected')
      })
    
      dotsContainer.addEventListener('click', event => {
        const dot = event.target.closest('button')
        if (!dot) return
    
        const clickedDotIndex = sliderDots.findIndex(d => d === dot)
        const slideToShow = slides[clickedDotIndex]
        const destination = getComputedStyle(slideToShow).left
    
        sliderContents.style.transform = 'translateX(-' + destination + ')'
        slides.forEach(slide => { slide.classList.remove('is-selected') })
        slideToShow.classList.add('is-selected')
        sliderDots.forEach(d => { d.classList.remove('is-selected') })
        dot.classList.add('is-selected')
    
        if (clickedDotIndex === 0) {
          prevButton.classList.add('btn-inactive')
          nextButton.classList.remove('btn-inactive')
        } else if (clickedDotIndex === sliderDots.length - 1) {
          prevButton.classList.remove('btn-inactive')
          nextButton.classList.add('btn-inactive')
        } else {
          prevButton.classList.remove('btn-inactive')
          nextButton.classList.remove('btn-inactive')
        }
      })
    } else {
        console.log('no slider was found')
    }
}

hamburger.addEventListener("click", toggleMobileMenu);

function initAnimatedNav() {
    var animateNav = gsap.to(siteHeader, {
        y:'-=150',
        duration:1,
        ease:'power2.in',
        autoAlpha: 0,
        paused:true
    });

    ScrollTrigger.create({
      trigger: siteHeader,
      start: "100px top",
      end: "+=999999",
      onUpdate: ({direction, isActive}) => {
        if (direction === -1) {
            animateNav.reverse()
        } if (direction === 1 ) {
            animateNav.play()
        } else if (direction === 1 && isActive === true) {
            animateNav.play()
        }
      }
    });
}

function initProgress() {
    gsap.to(breadcrumbsProgressBar, {
        scale: 1,
        scrollTrigger: {
            scrub: 0.3,
            horizontal: true,
            scroller: scrollContainer
        }
    });
}

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

function resetCursor() {
    follow.style.transform = "scale(1)";
    gsap.to(follow, 0.3, {
        scale: 1,
        backgroundColor: '#8bc0c6',
        autoAlpha: 1,
        mixBlendMode: 'exclusion'
    });
    gsap.to(followerText, {
        opacity: 0,
    });
}

function initCursor() {

    const serviceLink = select(".service-list__link");
    const serviceLinks = selectAll(".service-list__link");
    const primaryBtn = select(".btn-primary");
    const primaryBtns = selectAll(".btn-primary");
    const tertiaryBtn = select(".btn-tertiary");
    const tertiaryBtns = selectAll(".btn-tertiary");
    const projectLink = select(".featured-projects__link");
    const projectLinks = selectAll(".featured-projects__link");
    const blogLink = select(".blog-card");
    const blogLinks = selectAll(".blog-card a");
    const socialLink = select(".social__link");
    const socialLinks = selectAll(".social__link");
    const slide = select(".swiper-slide");
    const slides = selectAll(".swiper-slide");
    const footerLinks = selectAll(".footer a");

    gsap.set('.follower',{xPercent:-50,yPercent:-50,backgroundColor: '#8bc0c6'});
    gsap.set('.cursor',{xPercent:-50,yPercent:-50});

    window.addEventListener('mousemove',e => {
        gsap.to(follow,0.3,{x:e.clientX,y:e.clientY});
    });

    logo.addEventListener("mouseover", () => {
        gsap.to(follow, 0.3, {
            scale: 6
        });
    });
    logo.addEventListener("mouseout", () => {
        gsap.to(follow, 0.3, {
            scale: 1
        });
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

    footerLinks.forEach(link => {
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

    if (document.body.contains(serviceLink)) {
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
    }

    if (document.body.contains(primaryBtn)) {
        primaryBtns.forEach(link => {
            link.addEventListener("mouseover", () => {
                gsap.to(follow, 0.3, {
                    scale: 0
                });
            });
            link.addEventListener("mouseout", () => {
                gsap.to(follow, 0.3, {
                    scale: 1
                });
            });
        })
    }

    socialLinks.forEach(link => {
        link.addEventListener("mouseover", () => {
            gsap.to(follow, 0.3, {
                scale: 0
            });
        });
        link.addEventListener("mouseout", () => {
            gsap.to(follow, 0.3, {
                scale: 1
            });
        });
    })

    if (document.body.contains(tertiaryBtn)) {
        tertiaryBtns.forEach(link => {
            link.addEventListener("mouseover", () => {
                gsap.to(follow, 0.3, {
                    scale: 0
                });
            });
            link.addEventListener("mouseout", () => {
                gsap.to(follow, 0.3, {
                    scale: 1
                });
            });
        })
    }

    if (document.body.contains(projectLink)) {
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
    }

    if (document.body.contains(blogLink)) {
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

    // if (document.body.contains(slide)) {
    //     slides.forEach(link => {
    //         link.addEventListener("mouseover", () => {
    //             followerText.innerHTML = "Drag";
    //             gsap.to(follow, 0.3, {
    //                 scale: 10,
    //                 backgroundColor: '#cd1f40',
    //                 autoAlpha: .9,
    //                 mixBlendMode: 'initial'
    //             });
    //             gsap.to(followerText, 0.3, {
    //                 autoAlpha: 1,
    //             });
    //         });
    //         link.addEventListener("mouseout", () => {
    //             gsap.to(follow, 0.3, {
    //                 scale: 1,
    //                 backgroundColor: '#8bc0c6',
    //                 autoAlpha: 1,
    //                 mixBlendMode: 'exclusion'
    //             });
    //             gsap.to(followerText, 0.3, {
    //                 autoAlpha: 0,
    //             });
    //         });
    //     })
    // }

    // function hideCursor() {
    //     cursor.classList.add("cursor-hide");
    // }

    // body.addEventListener("mouseleave", hideCursor);
}

function initContentFade() {
    const fadeUp = selectAll(".fade-up");
    const fadeOut = selectAll(".fade-out");

    gsap.utils.toArray(fadeUp).forEach((fade) => {
        gsap.from(fade, {
            opacity: 0,
            y: 20,
            duration: .7,
            ease: 'none',
            scrollTrigger: {
                trigger: fade,
                start: "top bottom-=50",
                toggleActions: "play none none reverse",
            }
        })
    });
    gsap.utils.toArray(fadeOut).forEach((fade) => {
        gsap.to(fade, {
            opacity: 0,
            duration: .5,
            ease: 'Power2.in',
            scrollTrigger: {
                trigger: fade,
                start: "bottom-=50 top+=200",
                scrub: true,
                markers: true,
            }
        })
    });
}

function initVideo() {
    const home = window.location.pathname;
    if(home === "/"){
        //initialise 2 videos —
        //“small” is 960 pixels wide (), large is 1920 pixels wide ()
        const mobileVideo="/video/Insight-Background-Video-Mobile.mp4";
        const desktopVideo = "/video/Insight-Background-Video.mp4";

        if (width<992){
            const sourceTag = "\<source src=\"" +mobileVideo +"\"/\>";
            document.getElementById('hero-video__video').innerHTML = sourceTag;
            document.getElementById('hero-video__video').play();
            }
        else {
            const sourceTag = "\<source src=\"" +desktopVideo +"\"/\>";
            document.getElementById('hero-video__video').innerHTML = sourceTag;
            document.getElementById('hero-video__video').play();
        }
    }
}

function initBreadcrumbs() {
    const breadcrumbs = select(".breadcrumbs__inner");
    const breadcrumbsProgressBar = select(".breadcrumbs__progress-bar-inner");
    gsap.to(breadcrumbs, {
        opacity: 1,
        x: 0,
        duration: .3,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: siteHeader, 
            start: "400px top",
            scrub: true,
        }
    });
    gsap.to(breadcrumbsProgressBar, {
        scaleX: 1,
        scrollTrigger: {
            trigger: ".site-main", 
            start: 'top top',
            end: 'bottom bottom',
            scrub: true
        }
    });
}

function initSocial() {
    gsap.to(social, {
        opacity: 1,
        y: 0,
        duration: .3,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: siteHeader, 
            start: "400px top",
            scrub: true,
        }
    });
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
    if(menu.classList.contains("nav-open")) {
        this.setAttribute("aria-expanded", "false");
        this.setAttribute("aria-label", "open mobile menu");
        menu.classList.remove("nav-open");
        hamburger.classList.remove("is-active");
    } else {
        menu.classList.add("nav-open");
        hamburger.classList.add("is-active");
        this.setAttribute("aria-expanded","true");
        this.setAttribute("aria-label","close mobile menu");
    }
}

function fadeNavigation() {
    // gsap.from(primaryNav, {
    //     opacity: 0,
    //     y: -150,
    //     duration: 1,
    //     ease: 'Power2.in'
    // });
    let tl = gsap.timeline({
        defaults: {
            autoAlpha: 1,
            ease: "none",
            stagger: 0.1,
        }
    });
    tl.to(logo, { duration: 1 });
    tl.to(menuItems, { duration: 0.7, x: 5 });
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

function initFooter() {
    // add padding to our scroll container to account for the fixed footer spacing
    // const home = window.location.pathname;
    // const footerHeight = footer.offsetHeight;
    // const scrollContainer = select('.scroll-content');
    // if(home === "/"){ 
    //     scrollContainer.style.paddingBottom = "calc(" + footerHeight + "px" + " + 100px )";
    // } else {
    //     scrollContainer.style.paddingBottom = footerHeight + "px";
    // }
    // animate footer opacity and add a slight parallax movement
    // gsap.to(footer,{
    //     y: 0,
    //     opacity: 1,
    //     ease: 'power4.out',
    //     scrollTrigger: {
    //         trigger: '.site-main',
    //         start: "bottom bottom",
    //         end: "bottom 80%",
    //         scrub: 1,
    //     }
    // });
    gsap.set('.footer__container', { yPercent: 0 })

    const uncover = gsap.timeline({ paused:true })

    uncover
    .to('.footer__container', { yPercent: 0 })
    ;

    ScrollTrigger.create({  
    trigger: '.site-main',
    start: 'bottom bottom',
    end: 'bottom 45%',
    animation: uncover,
    scrub: true,  
    });
}
// function resetFooter() {
//     footer.style.opacity = "0";
//     footer.style.transform = "translate(0px, 100px)";
// }
// function initAnimateEmphasis() {
//     gsap.utils.toArray('.emphasis-red__inner').forEach(emphasis => {
//         gsap.to(emphasis, {
//             x: 0,
//             duration: .7,
//             scrollTrigger: {
//                 trigger: emphasis, 
//                 start: 'top bottom',
//                 toggleActions: "play none none reverse"
//             }
//         });
//     });

//     gsap.utils.toArray('.emphasis-underline__line').forEach(underline => {
//         gsap.to(underline, {
//             x: 0,
//             duration: 1, // seconds
//             delay: .7,
//             scrollTrigger: {
//                 trigger: underline,
//                 start: 'top bottom',
//                 toggleActions: 'play none none reverse',
//             }
//         });
//     });
// }
// function initImageZoom() {
//     gsap.utils.toArray('.with-parallax').forEach(section => {
//         const image = section.querySelector('img');

//         gsap.from(image, {
//             scale: 1.2,
//             ease: 'none',
//             scrollTrigger: {
//                 trigger: section,
//                 start: 'top bottom',
//                 end: 'top 80%',
//                 scrub: 1,
//                 markers: true,
//             }
//         });
//     });
// }

function initSmoothScrollbar() {
    const breadcrumbs = select(".breadcrumbs");

        // Scrollbar.init(document.querySelector('#viewport'));
        bodyScrollBar = Scrollbar.init(select('#viewport'), {damping: 0.04});

        // scrollContent.style.transform = "translate3d(0, 0, 0)";

        // remove horizontal scrollbar
        bodyScrollBar.track.xAxis.element.remove();

        // keep ScrollTrigger in sync with Smooth Scrollbar
        ScrollTrigger.scrollerProxy(document.body, {
            scrollTop(value) {
                if (arguments.length) {
                    bodyScrollBar.scrollTop = value; // setter
                }
                return bodyScrollBar.scrollTop;    // getter
            },
            getBoundingClientRect() {
            return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
            }
        });

        // when the smooth scroller updates, tell ScrollTrigger to update() too:
        // bodyScrollBar.addListener(ScrollTrigger.update);
        // bodyScrollBar.addListener(function(status) {
        // var offset = status.offset;

        // breadcrumbs.style.top = offset.y + 'px';
        // });
        bodyScrollBar.addListener(({ offset }) => {  
            breadcrumbs.style.top = "calc(" + offset.y + 'px' + " + 82.75vh )";
            footer.style.top = "calc(" + offset.y + 'px' + " - 90px )";
        });
        scroller.focus();
}

function destroySmoothScrollbar() {
    bodyScrollBar.destroy();
}

function killScrollTriggers() {
    let triggers = ScrollTrigger.getAll();
    triggers.forEach( trigger => {
        trigger.kill();
    });
}

function initPreloader() {
    const preloader = select(".preloader");
    const preloaderInner = select(".preloader__inner-content-wrapper");
    const preloaderContent = select(".preloader__inner-content");
    console.log('preloader out');
    const tl = gsap.timeline({
        defaults: {
            delay: 1
        }
    });
    tl.to(preloaderInner, {
        y: 0,
    });
    tl.to(preloader, {
        scale: 0,
        duration: 0.1,
    });
}

function pageTransitionIn({container}) {
    console.log('pageTransitionIn');
    // return gsap.to('.transition', {duration: 1, yPercent: -100, ease: 'power1.inOut'});
    // const tl = gsap.timeline({
    //     defaults: {
    //         duration: .7,
    //         ease: 'power1.inOut'
    //     }
    // });
    // tl.to(scroller, {
    //     opacity: 0,
    // })
    const tl = gsap.timeline({
        defaults: {
            duration: .9,
            ease: 'power1.inOut'
        }
    });
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
    return tl;
}

function pageTransitionOut({container}) {
    console.log('pageTransitionOut');
    // return gsap.to('.transition', {duration: 1, yPercent: 0, ease: 'power1.inOut'});
    // const tl = gsap.timeline({
    //     defaults: {
    //         duration: .7,
    //         ease: 'power1.inOut'
    //     },
    //     onComplete: () => initPage()
    // });
    // tl.to(scroller, {
    //     opacity: 1,
    // })
    const tl = gsap.timeline({
        defaults: {
            duration: .9,
            ease: 'power1.inOut'
        },
        onComplete: () => initPage()
    });
    tl.to(loader, {
        yPercent: 100,
    })
    tl.to(loaderInner, {
        yPercent: -80,
    }, 0)
    .from(container, { y: -150 }, 0)
    return tl;
}

function initPage() {
    killScrollTriggers();
    initSmoothScrollbar();
    initAnimatedNav();
    initVideo();
    initCursor();
    initBreadcrumbs();
    initSocial();
    initContentFade();
    initImageParallax();
    initSlider();
    initFooter();
}

function initPageTransitions() {

    // do something before the transition starts
    barba.hooks.before(() => {
        select('html').classList.add('is-transitioning');
        destroySmoothScrollbar();
        // killScrollTriggers();
    });
    // do something after the transition finishes
    barba.hooks.after(() => {
        select('html').classList.remove('is-transitioning');
        updateMenu();
    });

     // scroll to the top of the page
     barba.hooks.enter(() => {
        initSmoothScrollbar();
        bodyScrollBar.setPosition(0, 0);
        resetCursor();
    });

    barba.init({
        transitions: [{
            once() {
                // do something once on the initial page load
                initPage();
            },
            async leave({current}) {
                // animate loading screen in
                await pageTransitionIn(current);
            },
            enter({next}) {
                // animate loading screen away
                pageTransitionOut(next);
            }

        }]
    });
}

// initPreloader();
initPageTransitions();