import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
gsap.registerPlugin(ScrollTrigger);
export const Footer = ({ minimal = false }) => {
    const sectionRef = useRef(null);
    useEffect(() => {
        let ctx;
        // Small delay to ensure DOM is ready
        const timer = setTimeout(() => {
            ctx = gsap.context(() => {
                // Reveal text
                document.querySelectorAll('.footer-email.reveal-text').forEach((el) => {
                    const split = new SplitType(el, { types: 'words' });
                    split.words?.forEach((word) => {
                        const wrapper = document.createElement('span');
                        wrapper.style.overflow = 'hidden';
                        wrapper.style.display = 'inline-block';
                        word.parentNode?.insertBefore(wrapper, word);
                        wrapper.appendChild(word);
                    });
                    gsap.fromTo(split.words, { y: '105%' }, {
                        y: '0%',
                        duration: 1.2,
                        stagger: 0.08,
                        ease: 'power4.out',
                        delay: 0.3,
                    });
                });
                // Reveal up - animate immediately
                gsap.utils.toArray('.section-footer .reveal-up').forEach((el, index) => {
                    gsap.to(el, {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        delay: index * 0.1,
                        ease: 'power3.out',
                    });
                });
            }, sectionRef);
        }, 100);
        return () => {
            clearTimeout(timer);
            if (ctx)
                ctx.revert();
        };
    }, []);
    return (<section id="contact" className="section-footer theme-black" ref={sectionRef}>
      <div className="footer-content">
        {!minimal && (<div className="footer-top">
            <p className="footer-eyebrow mono-text reveal-up"> // READY TO STOP LEARNING ALONE?</p>
            <p className="footer-tagline reveal-up">500+ members. Real projects. Real jobs. Zero paywalls.</p>
            <div className="footer-cta reveal-up">
              <a href="https://discord.gg/F7bWaYqf" className="btn-primary btn-large" target="_blank" rel="noopener noreferrer">
                <span className="btn-text">JOIN ON DISCORD →</span>
                <div className="btn-bg"></div>
              </a>
              <a href="https://chat.whatsapp.com/GGLUiPALqOYCPcCZK752Rv?mode=gi_t" className="btn-primary btn-large" target="_blank" rel="noopener noreferrer">
                <span className="btn-text">JOIN ON WHATSAPP →</span>
                <div className="btn-bg"></div>
              </a>
            </div>
            <div className="footer-links reveal-up">
              <a href="https://discord.gg/F7bWaYqf" className="footer-link mono-text" target="_blank" rel="noopener noreferrer">
                DISCORD
              </a>
              <a href="https://chat.whatsapp.com/GGLUiPALqOYCPcCZK752Rv?mode=gi_t" className="footer-link mono-text" target="_blank" rel="noopener noreferrer">
                WHATSAPP
              </a>
              <a href="https://www.linkedin.com/company/the-consistent-coders/" className="footer-link mono-text" target="_blank" rel="noopener noreferrer">
                LINKEDIN
              </a>
              <a href="https://www.youtube.com" className="footer-link mono-text" target="_blank" rel="noopener noreferrer">
                YOUTUBE
              </a>
              <a href="https://github.com/ANDROIDHASSAN" className="footer-link mono-text" target="_blank" rel="noopener noreferrer">
                GITHUB
              </a>
            </div>
          </div>)}
        
        {!minimal && (<div className="footer-email-wrapper reveal-up">
            <a href="mailto:theconsistentcoders@gmail.com" className="footer-email">
              THECONSISTENTCODERS@GMAIL.COM
            </a>
          </div>)}

        {!minimal && (<div className="footer-bottom mono-text reveal-up">
            <span>© 2025 THE CONSISTENT CODERS</span>
            <span>BUILT BY THE COMMUNITY</span>
          </div>)}
      </div>
    </section>);
};
