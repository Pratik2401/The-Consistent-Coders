/**
 * Example component demonstrating smooth scroll features
 * This shows how to use Lenis and Locomotive Scroll effects
 */
import { useRef } from 'react';
import { useLenis } from '../hooks/useLenis';
import { scrollToElement, scrollToTop } from '../utils/smoothScroll';
export const SmoothScrollExample = () => {
    const lenisRef = useLenis();
    const sectionRef = useRef(null);
    const handleScrollToSection = () => {
        scrollToElement(lenisRef.current, sectionRef.current, {
            offset: -100,
            duration: 1.5,
        });
    };
    const handleScrollToTop = () => {
        scrollToTop(lenisRef.current, 1.2);
    };
    return (<div className="smooth-scroll-example">
      {/* Hero Section */}
      <section className="hero-section" style={{ height: '100vh', padding: '2rem' }}>
        <h1 data-scroll data-scroll-class="fade-in">
          Smooth Scrolling Demo
        </h1>
        
        <p data-scroll data-scroll-class="slide-up" data-scroll-delay="0.1">
          Experience buttery-smooth scrolling with Lenis and Locomotive Scroll
        </p>

        <button onClick={handleScrollToSection}>
          Scroll to Next Section
        </button>
      </section>

      {/* Parallax Section */}
      <section style={{ height: '100vh', padding: '2rem', position: 'relative' }}>
        <div data-scroll data-scroll-speed="0.5" style={{
            background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
            padding: '2rem',
            borderRadius: '1rem'
        }}>
          <h2>Parallax Effect</h2>
          <p>This section moves slower than the scroll (speed: 0.5)</p>
        </div>

        <div data-scroll data-scroll-speed="2" style={{
            marginTop: '2rem',
            background: 'linear-gradient(45deg, #f093fb 0%, #f5576c 100%)',
            padding: '2rem',
            borderRadius: '1rem'
        }}>
          <h2>Fast Parallax</h2>
          <p>This section moves faster than the scroll (speed: 2)</p>
        </div>
      </section>

      {/* Fade In Section */}
      <section ref={sectionRef} style={{ height: '100vh', padding: '2rem' }}>
        <div data-scroll data-scroll-class="fade-in">
          <h2>Fade In Animation</h2>
          <p>This content fades in when scrolled into view</p>
        </div>

        <div data-scroll data-scroll-class="fade-in" data-scroll-delay="0.2">
          <p>This fades in with a delay</p>
        </div>
      </section>

      {/* Slide Up Section */}
      <section style={{ height: '100vh', padding: '2rem' }}>
        <div data-scroll data-scroll-class="slide-up">
          <h2>Slide Up Animation</h2>
          <p>This content slides up when scrolled into view</p>
        </div>

        <div data-scroll data-scroll-class="slide-up" data-scroll-delay="0.1">
          <p>Multiple elements can slide up in sequence</p>
        </div>

        <div data-scroll data-scroll-class="slide-up" data-scroll-delay="0.2">
          <p>Creating a staggered effect</p>
        </div>
      </section>

      {/* Scale Section */}
      <section style={{ height: '100vh', padding: '2rem' }}>
        <div data-scroll data-scroll-class="scale">
          <h2>Scale Animation</h2>
          <p>This content scales up when scrolled into view</p>
        </div>
      </section>

      {/* Back to Top */}
      <section style={{ height: '50vh', padding: '2rem' }}>
        <button onClick={handleScrollToTop}>
          Back to Top
        </button>
      </section>
    </div>);
};
