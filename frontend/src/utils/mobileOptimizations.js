/**
 * Mobile Optimizations for The Consistent Coders
 * Handles touch interactions, viewport fixes, and mobile-specific behaviors
 */
export const initMobileOptimizations = () => {
    // Detect if device is mobile/tablet
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTablet = /iPad|Android/i.test(navigator.userAgent) && window.innerWidth >= 768;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    // Add device classes to body
    if (isMobile)
        document.body.classList.add('is-mobile');
    if (isTablet)
        document.body.classList.add('is-tablet');
    if (isTouchDevice)
        document.body.classList.add('is-touch');
    // Fix viewport height for mobile browsers (address bar issue)
    const setVH = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
    // Prevent zoom on double tap for iOS
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (event) => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, { passive: false });
    // Improve scroll performance on mobile
    if (isTouchDevice) {
        document.body.style.webkitOverflowScrolling = 'touch';
    }
    // Disable pull-to-refresh on mobile
    let startY = 0;
    document.addEventListener('touchstart', (e) => {
        startY = e.touches[0].pageY;
    });
    document.addEventListener('touchmove', (e) => {
        const y = e.touches[0].pageY;
        // Prevent pull-to-refresh if at top of page
        if (window.scrollY === 0 && y > startY) {
            e.preventDefault();
        }
    }, { passive: false });
    // Handle orientation change
    window.addEventListener('orientationchange', () => {
        // Refresh ScrollTrigger after orientation change
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 100);
    });
    // Optimize touch events for better performance
    const addPassiveListener = (element, event) => {
        element.addEventListener(event, () => { }, { passive: true });
    };
    // Add passive listeners to improve scroll performance
    document.querySelectorAll('a, button, .btn-primary, .btn-secondary').forEach((el) => {
        addPassiveListener(el, 'touchstart');
    });
    // Handle safe area insets for notched devices
    if (CSS.supports('padding-top: env(safe-area-inset-top)')) {
        document.documentElement.style.setProperty('--safe-area-top', 'env(safe-area-inset-top)');
        document.documentElement.style.setProperty('--safe-area-bottom', 'env(safe-area-inset-bottom)');
    }
    return () => {
        window.removeEventListener('resize', setVH);
        window.removeEventListener('orientationchange', setVH);
    };
};
/**
 * Disable GSAP animations on low-end devices
 */
export const shouldReduceAnimations = () => {
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return true;
    }
    // Check for low-end device indicators
    const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
    const hasLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
    return isLowEnd || hasLowMemory;
};
/**
 * Get optimal animation duration based on device
 */
export const getAnimationDuration = (baseDuration) => {
    if (shouldReduceAnimations()) {
        return baseDuration * 0.5; // Faster animations on low-end devices
    }
    return baseDuration;
};
/**
 * Check if device is in landscape mode
 */
export const isLandscape = () => {
    return window.innerWidth > window.innerHeight;
};
/**
 * Get current breakpoint
 */
export const getCurrentBreakpoint = () => {
    const width = window.innerWidth;
    if (width < 768)
        return 'mobile';
    if (width < 1024)
        return 'tablet';
    if (width < 1440)
        return 'desktop';
    return 'large';
};
/**
 * Debounce function for resize events
 */
export const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};
