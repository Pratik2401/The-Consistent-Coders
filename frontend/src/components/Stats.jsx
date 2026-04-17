import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
const stats = [
  { target: 500, suffix: "+", label: "ACTIVE MEMBERS" },
  { target: 5, suffix: "+", label: "LIVE PROJECTS" },
  { target: 100, suffix: "%", label: "FREE TO JOIN" },
  { target: 100, suffix: "+", label: "SESSIONS COMING SOON" },
];
export const Stats = () => {
  const sectionRef = useRef(null);
  useEffect(() => {
    if (!sectionRef.current) return;
    let ctx;
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        const section = sectionRef.current;
        if (!section) return;
        // SVG path drawing
        const paths = section.querySelectorAll(".draw-path");
        paths.forEach((path) => {
          const len = path.getTotalLength();
          gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
          gsap.to(path, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 20%",
              scrub: 1.5,
            },
          });
        });
        // Counter animations - trigger immediately on mount
        const counters = section.querySelectorAll(".stat-num");
        counters.forEach((counter) => {
          const target = +(counter.getAttribute("data-target") || 0);
          const suffix = counter.getAttribute("data-suffix") || "";
          const proxy = { val: 0 };
          // Animate immediately
          gsap.to(proxy, {
            val: target,
            duration: 2.2,
            delay: 0.5,
            ease: "power2.out",
            onUpdate: () => {
              counter.textContent = Math.round(proxy.val) + suffix;
            },
          });
        });
        // Reveal fade animations
        const statItems = section.querySelectorAll(".stat-item");
        statItems.forEach((el, index) => {
          gsap.fromTo(
            el,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              delay: index * 0.1,
              ease: "power3.out",
            },
          );
        });
      }, sectionRef);
    }, 100);
    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, []);
  return (
    <section className="section-stats theme-black" ref={sectionRef}>
      <div className="stats-svg-bg">
        <svg viewBox="0 0 1000 500" preserveAspectRatio="none">
          <path
            className="draw-path"
            d="M0,250 C200,500 300,0 500,250 C700,500 800,0 1000,250"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            className="draw-path"
            d="M0,250 C200,0 300,500 500,250 C700,0 800,500 1000,250"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
            strokeDasharray="10 10"
          />
        </svg>
      </div>
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div className="stat-item reveal-fade" key={index}>
            <span
              className="stat-num"
              data-target={stat.target}
              data-suffix={stat.suffix}
            >
              0
            </span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
