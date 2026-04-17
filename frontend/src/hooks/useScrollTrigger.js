import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
/**
 * Custom hook to safely manage GSAP ScrollTrigger instances
 * Ensures proper cleanup on component unmount
 */
export const useScrollTrigger = (callback, deps = [], delay = 0) => {
    const ref = useRef(null);
    useEffect(() => {
        let timeoutId = null;
        let ctx = null;
        let customCleanup = null;
        const init = () => {
            if (!ref.current)
                return;
            ctx = gsap.context(() => {
                const cleanup = callback(ctx);
                if (typeof cleanup === 'function') {
                    customCleanup = cleanup;
                }
            }, ref);
        };
        if (delay > 0) {
            timeoutId = setTimeout(init, delay);
        }
        else {
            init();
        }
        return () => {
            if (timeoutId)
                clearTimeout(timeoutId);
            if (customCleanup)
                customCleanup();
            if (ctx)
                ctx.revert();
        };
    }, deps);
    return ref;
};
