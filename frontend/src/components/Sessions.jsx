import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { upcomingSessions, pastRecordings } from '../data/sessionsData.js';
gsap.registerPlugin(ScrollTrigger);
export const Sessions = ({ onCardClick }) => {
    const sectionRef = useRef(null);
    useEffect(() => {
        if (!sectionRef.current)
            return;
        const ctx = gsap.context(() => {
            const section = sectionRef.current;
            if (!section)
                return;
            // Reveal text
            const revealTexts = section.querySelectorAll('.reveal-text');
            revealTexts.forEach((el) => {
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
                    scrollTrigger: { trigger: el, start: 'top 85%' },
                });
            });
            // Reveal up
            const revealUps = section.querySelectorAll('.reveal-up');
            revealUps.forEach((el) => {
                gsap.to(el, {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: el, start: 'top 88%' },
                });
            });
            // Card stagger
            const cardRows = section.querySelectorAll('.craft-cards-row');
            cardRows.forEach((row) => {
                const cards = row.querySelectorAll('.craft-card');
                if (cards.length > 0) {
                    gsap.fromTo(cards, { y: 60, opacity: 0 }, {
                        y: 0,
                        opacity: 1,
                        duration: 0.9,
                        stagger: 0.09,
                        ease: 'power3.out',
                        scrollTrigger: { trigger: row, start: 'top 85%' },
                    });
                }
            });
            // Pills stagger
            const pillRows = section.querySelectorAll('.craft-libs-row');
            pillRows.forEach((row) => {
                const pills = row.querySelectorAll('.craft-lib-pill');
                if (pills.length > 0) {
                    gsap.fromTo(pills, { y: 30, opacity: 0 }, {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        stagger: 0.07,
                        ease: 'power2.out',
                        scrollTrigger: { trigger: row, start: 'top 88%' },
                    });
                }
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);
    const renderSessionCard = (session) => {
        const letters = session.title.split(' ')[0].split('').slice(0, 5);
        const titleParts = session.title.split(' ');
        const lastWord = titleParts[titleParts.length - 1];
        const restOfTitle = titleParts.slice(0, -1).join(' ');
        return (<div key={session.id} className="craft-card reveal-fade" id={session.id} data-tag={session.tag} data-title={session.title} data-desc={session.desc} data-libs={session.libs} data-pitfalls={JSON.stringify(session.pitfalls)} data-example={session.example} onClick={() => onCardClick(session)}>
        <div className="craft-card-inner">
          <div className="craft-card-preview cc-preview-split">
            {letters.map((letter, i) => (<div key={i} className="cc-letter">
                {letter}
              </div>))}
          </div>
          <div className="craft-card-body">
            <h3 className="craft-card-title">
              {restOfTitle} <span className="accent-text">{lastWord}</span>
            </h3>
            <p className="craft-card-desc mono-text">{session.libs}</p>
            <div className="craft-card-tag mono-text">{session.tag}</div>
          </div>
          <div className="craft-card-arrow">↗</div>
        </div>
      </div>);
    };
    return (<section id="sessions" className="section-craft theme-dark" ref={sectionRef}>
      <div className="craft-header">
        <div className="craft-label mono-text reveal-up"> // LIVE & RECORDED</div>
        <h2 className="craft-title reveal-text">
          UPCOMING <span className="text-italic serif-text">Sessions</span>
        </h2>
        <p className="craft-subtitle reveal-up">
          Register for live workshops, coding sessions, career guidance, and doubt-solving. All sessions are recorded
          for later access.
        </p>
      </div>

      <div className="craft-categories">
        <div className="craft-category">
          <div className="craft-category-label mono-text"> // THIS MONTH — REGISTER NOW</div>
          <div className="craft-cards-row">{upcomingSessions.map((session) => renderSessionCard(session))}</div>
        </div>

        {/* PAST RECORDINGS */}
        <div className="craft-category">
          <div className="craft-category-label mono-text"> // RECORDED SESSIONS — WATCH ANYTIME</div>
          <div className="craft-libs-row">
            {pastRecordings.map((recording, index) => (<div key={index} className={`craft-lib-pill ${recording.includes('New') ? 'craft-lib-pill--new' : ''} reveal-fade`}>
                <span className={`lib-dot ${recording.includes('New') ? 'lib-dot--new' : ''}`}></span>
                {recording}
              </div>))}
          </div>
        </div>
      </div>
    </section>);
};
