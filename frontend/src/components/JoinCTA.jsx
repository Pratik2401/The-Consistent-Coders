import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export const JoinCTA = () => {
    const containerRef = useRef(null);
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.cta-headline span', {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                },
                y: 100,
                opacity: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: 'power4.out',
            });
            gsap.from('.cta-btn-wrap', {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 75%',
                },
                y: 30,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                delay: 0.5
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);
    return (<section ref={containerRef} className="section-cta theme-black" style={{ padding: 'var(--section-pad) 2rem', overflow: 'hidden' }}>
      <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
        <h2 className="cta-headline serif-text" style={{ fontSize: 'clamp(3.5rem, 12vw, 12rem)', lineHeight: '0.9', marginBottom: '3rem' }}>
          <span style={{ display: 'inline-block' }}>READY TO</span> <br />
          <span style={{ display: 'inline-block' }} className="accent-text italic-serif">BUILD THE</span> <br />
          <span style={{ display: 'inline-block' }}>FUTURE?</span>
        </h2>
        
        <div className="cta-btn-wrap reveal-up">
           <Link to="/join" className="btn-primary btn-large" style={{ display: 'inline-block' }}>
              <span className="btn-text">JOIN THE MISSION →</span>
              <div className="btn-bg"></div>
           </Link>
           <div style={{ marginTop: '2rem' }}>
              <Link to="/tasks" className="mono-text" style={{ opacity: 0.5, fontSize: '0.8rem', textDecoration: 'underline' }}>Explore Open Tasks</Link>
           </div>
        </div>
      </div>
      
      <style>{`
        .italic-serif {
          font-family: var(--font-serif);
          font-style: italic;
          text-transform: none;
        }
      `}</style>
    </section>);
};
