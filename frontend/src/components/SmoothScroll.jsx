import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export const SmoothScroll = ({ children, className = '' }) => {
    const scrollRef = useRef(null);
    const lenisRef = useRef(null);
    useEffect(() => {
        if (!scrollRef.current)
            return;
        // Initialize Lenis with optimized settings
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            lerp: 0.1,
            smoothWheel: true,
            touchMultiplier: 2,
            infinite: false,
            wrapper: window,
            content: scrollRef.current,
        });
        lenisRef.current = lenis;
        // Connect to GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);
        // Animation frame
        const raf = (time) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
        // Refresh ScrollTrigger
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);
        return () => {
            lenis.destroy();
        };
    }, []);
    return (<div ref={scrollRef} className={`smooth-scroll-container ${className}`} data-scroll-container>
      {children}
    </div>);
};
