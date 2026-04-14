import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export const useLenis = () => {
    const lenisRef = useRef(null);
    useEffect(() => {
        // Initialize Lenis smooth scroll with enhanced settings
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
            lerp: 0.1,
            smoothWheel: true,
            touchMultiplier: 2,
            infinite: false,
            autoResize: true,
        });
        lenisRef.current = lenis;
        window.lenis = lenis;
        // Connect Lenis to GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);
        // Use GSAP ticker for smooth animation frame
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
        // Refresh ScrollTrigger after initialization
        const refreshTimer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);
        return () => {
            clearTimeout(refreshTimer);
            lenis.destroy();
            gsap.ticker.remove((time) => lenis.raf(time * 1000));
        };
    }, []);
    return lenisRef;
};
