import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
gsap.registerPlugin(ScrollTrigger);
export const Vision = () => {
    const containerRef = useRef(null);
    const spotlightRef = useRef(null);
    const subtextRef = useRef(null);
    useEffect(() => {
        const spotlight = spotlightRef.current;
        const container = containerRef.current;
        let split = null;
        const ctx = gsap.context(() => {
            let xTo = null;
            let yTo = null;
            if (spotlight) {
                gsap.set(spotlight, { xPercent: -50, yPercent: -50, opacity: 0 });
                xTo = gsap.quickTo(spotlight, "x", { duration: 0.2, ease: "power3" });
                yTo = gsap.quickTo(spotlight, "y", { duration: 0.2, ease: "power3" });
            }
            const handleMouseMove = (e) => {
                if (!spotlight || !container || !xTo || !yTo)
                    return;
                const rect = container.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                xTo(x);
                yTo(y);
                gsap.to(spotlight, { opacity: 1, duration: 0.4 });
            };
            const handleMouseLeave = () => {
                if (spotlight)
                    gsap.to(spotlight, { opacity: 0, duration: 0.6 });
            };
            if (container) {
                container.addEventListener('mousemove', handleMouseMove);
                container.addEventListener('mouseleave', handleMouseLeave);
            }
            // Huge text color change & Hover Interaction
            const hugeSpans = document.querySelectorAll('.vision-huge-text span');
            const hugeText = document.querySelector('.vision-huge-text');
            gsap.fromTo(hugeSpans, { color: 'rgba(255, 255, 255, 0.25)' }, {
                color: '#ffffff',
                stagger: 0.1,
                scrollTrigger: {
                    trigger: '.vision-huge-text',
                    start: 'top 85%',
                    end: 'bottom 45%',
                    scrub: 1.5,
                },
            });
            if (hugeText) {
                const onEnter = () => {
                    gsap.to(hugeSpans, {
                        color: '#ccff00',
                        duration: 0.4,
                        stagger: 0.03,
                        ease: "power2.out",
                        overwrite: 'auto'
                    });
                };
                const onLeave = () => {
                    gsap.to(hugeSpans, {
                        color: '',
                        duration: 0.4,
                        stagger: 0.03,
                        ease: "power2.in",
                        overwrite: 'auto'
                    });
                };
                hugeText._onEnter = onEnter;
                hugeText._onLeave = onLeave;
                hugeText.addEventListener('mouseenter', onEnter);
                hugeText.addEventListener('mouseleave', onLeave);
            }
            // Typewriter effect for subtext
            if (subtextRef.current) {
                split = new SplitType(subtextRef.current, { types: 'chars,words' });
                gsap.from(split.chars, {
                    opacity: 0,
                    y: 15,
                    stagger: 0.015,
                    duration: 0.8,
                    ease: 'expo.out',
                    scrollTrigger: {
                        trigger: subtextRef.current,
                        start: 'top 90%',
                        end: 'bottom 60%',
                        scrub: 1.2,
                    }
                });
                // Hover effect using GSAP
                const subtext = subtextRef.current;
                const onEnter = () => {
                    gsap.to(split?.chars || [], { color: '#ccff00', duration: 0.4, stagger: 0.01, overwrite: 'auto' });
                    subtext.classList.add('is-hovered');
                };
                const onLeave = () => {
                    gsap.to(split?.chars || [], { color: '', duration: 0.4, stagger: 0.01, overwrite: 'auto' });
                    subtext.classList.remove('is-hovered');
                };
                subtext._onEnter = onEnter;
                subtext._onLeave = onLeave;
                subtext.addEventListener('mouseenter', onEnter);
                subtext.addEventListener('mouseleave', onLeave);
            }
            // Removed GSAP fromTo on .vision-flow-card to prevent them from getting stuck at opacity:0
            // Flow line animation
            gsap.fromTo('.vision-flow-line-fill', { height: '0%' }, {
                height: '100%',
                ease: 'none',
                scrollTrigger: {
                    trigger: '.vision-flow-wrapper',
                    start: 'top 85%',
                    end: 'bottom 15%',
                    scrub: 2
                }
            });
            // Floating circles parallax
            gsap.to('.vision-bg-circle', {
                y: -100,
                rotation: 30,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.5
                }
            });
            return () => {
                if (container) {
                    container.removeEventListener('mousemove', handleMouseMove);
                    container.removeEventListener('mouseleave', handleMouseLeave);
                }
                if (hugeText) {
                    hugeText.removeEventListener('mouseenter', hugeText._onEnter);
                    hugeText.removeEventListener('mouseleave', hugeText._onLeave);
                }
                if (subtextRef.current) {
                    subtextRef.current.removeEventListener('mouseenter', subtextRef.current._onEnter);
                    subtextRef.current.removeEventListener('mouseleave', subtextRef.current._onLeave);
                }
            };
        }, containerRef);
        return () => {
            ctx.revert();
            if (split)
                split.revert();
        };
    }, []);
    return (<section id="vision" className="section-vision theme-black" ref={containerRef}>
      <div className="vision-bg-elements">
        <div className="vision-bg-circle circle-1"></div>
        <div className="vision-bg-circle circle-2"></div>
      </div>
      
      <div className="vision-container">
        <div className="vision-header">
          <h2 className="vision-eyebrow mono-text">
            <span className="accent-text"> //</span> THE MANIFESTO
          </h2>
          <div className="vision-huge-text variable-font">
            <span>NOT</span> <span>JUST</span> <span>ANOTHER</span><br />
            <span><i className="text-italic serif-text">COURSE</i></span> <span>PLATFORM.</span>
          </div>
          <div className="vision-spotlight" ref={spotlightRef}></div>
          <p className="vision-subtext mt-2" ref={subtextRef}>
            You don't get hired by watching tutorials alone. The industry demands real projects, teamwork, and actual proof of work. This is an ecosystem where you <strong>prove your value</strong> by doing the work.
          </p>
        </div>

        <div className="vision-flow-wrapper">
          <div className="vision-flow-line">
            <div className="vision-flow-line-fill"></div>
          </div>
          
          <div className="vision-flow-card card-left magnetic" data-strength="15">
            <div className="v-card-inner">
              <div className="v-card-number mono-text">01.</div>
              <h3 className="v-card-title">LEARN & BUILD</h3>
              <p className="v-card-desc">No more tutorial hell. Select tasks from our real-world projects, write actual code, and build features that matter for scalable products.</p>
            </div>
          </div>

          <div className="vision-flow-card card-right magnetic" data-strength="15">
            <div className="v-card-inner">
              <div className="v-card-number mono-text">02.</div>
              <h3 className="v-card-title">SUBMIT & REVIEW</h3>
              <p className="v-card-desc">Your code gets reviewed by the community. Merged PRs earn you points. You build tangible proof of teamwork and peer-reviews.</p>
            </div>
          </div>

          <div className="vision-flow-card card-left magnetic" data-strength="15">
             <div className="v-card-inner">
              <div className="v-card-number mono-text">03.</div>
              <h3 className="v-card-title">RANK & STAND OUT</h3>
              <p className="v-card-desc">Top contributors rule the Hall of Fame. You earn unique certificates and unquestionable authority in the developer ecosystem.</p>
            </div>
          </div>

          <div className="vision-flow-card card-right magnetic" data-strength="15">
            <div className="v-card-inner highlight-card">
              <div className="v-card-number mono-text">04.</div>
              <h3 className="v-card-title accent-text">GET HIRED.</h3>
              <p className="v-card-desc">"I have worked on real projects with a team." That's your new interview superpower. The ecosystem filters the best for top companies.</p>
            </div>
          </div>
        </div>
      </div>
    </section>);
};
