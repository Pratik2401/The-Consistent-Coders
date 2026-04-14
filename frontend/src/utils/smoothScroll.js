/**
 * Scroll to a specific element smoothly
 */
export const scrollToElement = (lenis, target, options) => {
    if (!lenis)
        return;
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element)
        return;
    lenis.scrollTo(element, {
        offset: options?.offset || 0,
        duration: options?.duration || 1.2,
        easing: options?.easing || ((t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
    });
};
/**
 * Scroll to top of page
 */
export const scrollToTop = (lenis, duration = 1.2) => {
    if (!lenis)
        return;
    lenis.scrollTo(0, { duration });
};
/**
 * Stop smooth scrolling
 */
export const stopScroll = (lenis) => {
    if (!lenis)
        return;
    lenis.stop();
};
/**
 * Start smooth scrolling
 */
export const startScroll = (lenis) => {
    if (!lenis)
        return;
    lenis.start();
};
/**
 * Get current scroll position
 */
export const getScrollPosition = (lenis) => {
    if (!lenis)
        return window.scrollY;
    return lenis.scroll;
};
/**
 * Check if scrolling is in progress
 */
export const isScrolling = (lenis) => {
    if (!lenis)
        return false;
    return Boolean(lenis.isScrolling);
};
