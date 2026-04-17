import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
// Curtain Transition (Default)
export const curtainTransition = {
    name: 'curtain-transition',
    leave(data) {
        return new Promise((resolve) => {
            const panels = document.querySelectorAll('.curtain-panel');
            gsap.timeline()
                .set('.transition-curtain', { display: 'flex' })
                .to(panels, {
                scaleY: 1,
                duration: 0.7,
                stagger: 0.06,
                ease: 'power3.inOut',
            })
                .to(data.current.container, {
                opacity: 0,
                duration: 0.2,
                onComplete: resolve,
            }, '-=0.3');
        });
    },
    enter(data) {
        return new Promise((resolve) => {
            window.scrollTo(0, 0);
            ScrollTrigger.refresh();
            const panels = document.querySelectorAll('.curtain-panel');
            gsap.timeline()
                .set(data.next.container, { opacity: 0 })
                .to(data.next.container, {
                opacity: 1,
                duration: 0.3,
            })
                .to(panels, {
                scaleY: 0,
                duration: 0.7,
                stagger: 0.06,
                ease: 'power3.inOut',
            }, '-=0.1')
                .set('.transition-curtain', { display: 'none', onComplete: resolve });
        });
    },
};
// Liquid Transition
export const liquidTransition = {
    name: 'liquid-transition',
    leave(data) {
        return new Promise((resolve) => {
            gsap.timeline()
                .to(data.current.container, {
                opacity: 0,
                scale: 0.95,
                filter: 'url(#liquid)',
                duration: 0.6,
                ease: 'power2.inOut',
                onComplete: resolve,
            });
        });
    },
    enter(data) {
        return new Promise((resolve) => {
            window.scrollTo(0, 0);
            ScrollTrigger.refresh();
            gsap.timeline()
                .set(data.next.container, {
                opacity: 0,
                scale: 1.05,
                filter: 'url(#liquid)',
            })
                .to(data.next.container, {
                opacity: 1,
                scale: 1,
                filter: 'none',
                duration: 0.6,
                ease: 'power2.out',
                onComplete: resolve,
            });
        });
    },
};
// Slide Transition
export const slideTransition = {
    name: 'slide-transition',
    leave(data) {
        return new Promise((resolve) => {
            gsap.to(data.current.container, {
                x: '-100%',
                opacity: 0,
                duration: 0.5,
                ease: 'power2.inOut',
                onComplete: resolve,
            });
        });
    },
    enter(data) {
        return new Promise((resolve) => {
            window.scrollTo(0, 0);
            ScrollTrigger.refresh();
            gsap.timeline()
                .set(data.next.container, { x: '100%', opacity: 0 })
                .to(data.next.container, {
                x: '0%',
                opacity: 1,
                duration: 0.5,
                ease: 'power2.out',
                onComplete: resolve,
            });
        });
    },
};
// Fade Transition
export const fadeTransition = {
    name: 'fade-transition',
    leave(data) {
        return new Promise((resolve) => {
            gsap.to(data.current.container, {
                opacity: 0,
                duration: 0.4,
                ease: 'power2.inOut',
                onComplete: resolve,
            });
        });
    },
    enter(data) {
        return new Promise((resolve) => {
            window.scrollTo(0, 0);
            ScrollTrigger.refresh();
            gsap.timeline()
                .set(data.next.container, { opacity: 0 })
                .to(data.next.container, {
                opacity: 1,
                duration: 0.4,
                ease: 'power2.out',
                onComplete: resolve,
            });
        });
    },
};
// Zoom Transition
export const zoomTransition = {
    name: 'zoom-transition',
    leave(data) {
        return new Promise((resolve) => {
            gsap.to(data.current.container, {
                scale: 0.8,
                opacity: 0,
                duration: 0.5,
                ease: 'power2.inOut',
                onComplete: resolve,
            });
        });
    },
    enter(data) {
        return new Promise((resolve) => {
            window.scrollTo(0, 0);
            ScrollTrigger.refresh();
            gsap.timeline()
                .set(data.next.container, { scale: 1.2, opacity: 0 })
                .to(data.next.container, {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                ease: 'power2.out',
                onComplete: resolve,
            });
        });
    },
};
