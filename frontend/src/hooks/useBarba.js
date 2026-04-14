import { useEffect } from 'react';
import barba from '@barba/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export const useBarba = () => {
    useEffect(() => {
        // Initialize Barba.js
        barba.init({
            prevent: ({ el }) => {
                // Prevent Barba on external links and specific elements
                return el.classList?.contains('no-barba') ||
                    el.hasAttribute('target') ||
                    el.hostname !== window.location.hostname;
            },
            transitions: [
                {
                    name: 'curtain-transition',
                    leave(data) {
                        return new Promise((resolve) => {
                            // Animate curtain panels
                            const panels = document.querySelectorAll('.curtain-panel');
                            gsap.timeline()
                                .set('.transition-curtain', { display: 'flex' })
                                .to(panels, {
                                scaleY: 1,
                                duration: 0.8,
                                stagger: 0.08,
                                ease: 'power4.inOut',
                            })
                                .to(data.current.container, {
                                opacity: 0,
                                duration: 0.3,
                                onComplete: resolve,
                            }, '-=0.4');
                        });
                    },
                    enter(data) {
                        return new Promise((resolve) => {
                            // Scroll to top
                            window.scrollTo(0, 0);
                            // Refresh ScrollTrigger
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
                                duration: 0.8,
                                stagger: 0.08,
                                ease: 'power4.inOut',
                            }, '-=0.2')
                                .set('.transition-curtain', { display: 'none', onComplete: resolve });
                        });
                    },
                },
            ],
        });
        return () => {
            barba.destroy();
        };
    }, []);
};
