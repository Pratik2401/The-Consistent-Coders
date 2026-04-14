import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
export const Marquee = ({ direction = 1, trackId, theme = 'black' }) => {
    const trackRef = useRef(null);
    useEffect(() => {
        const track = trackRef.current;
        if (!track)
            return;
        const ctx = gsap.context(() => {
            let pos = 0;
            let animationFrameId;
            const loop = () => {
                // Get Lenis velocity if available
                const lenisVelocity = window.lenis?.velocity || 0;
                const velocity = lenisVelocity;
                // Base speed + velocity-based speed
                pos += (0.25 + Math.abs(velocity) * 0.005) * direction;
                // Reset position for seamless loop (50% is half the content since we duplicate it)
                if (direction > 0 && pos >= 50)
                    pos = 0;
                if (direction < 0 && pos <= -50)
                    pos = 0;
                gsap.set(track, { xPercent: -pos });
                animationFrameId = requestAnimationFrame(loop);
            };
            loop();
            return () => {
                cancelAnimationFrame(animationFrameId);
            };
        }, trackRef);
        return () => ctx.revert();
    }, [direction]);
    return (<div className={`marquee-band ${direction < 0 ? 'marquee-band--reverse' : ''} theme-${theme}`}>
      <div className="marquee-track" id={trackId} ref={trackRef}>
        <span>LEARN FROM STRUCTURED PATHS</span>
        <span className="accent-dot">✦</span>
        <span>BUILD REAL PROJECTS</span>
        <span className="accent-dot">✦</span>
        <span>COLLABORATE IN TEAMS</span>
        <span className="accent-dot">✦</span>
        <span>GET RECOGNIZED</span>
        <span className="accent-dot">✦</span>
        <span>LAND YOUR FIRST JOB</span>
        <span className="accent-dot">✦</span>
        <span>LEARN FROM STRUCTURED PATHS</span>
        <span className="accent-dot">✦</span>
        <span>BUILD REAL PROJECTS</span>
        <span className="accent-dot">✦</span>
        <span>COLLABORATE IN TEAMS</span>
        <span className="accent-dot">✦</span>
        <span>GET RECOGNIZED</span>
        <span className="accent-dot">✦</span>
        <span>LAND YOUR FIRST JOB</span>
        <span className="accent-dot">✦</span>
        <span>LEARN FROM STRUCTURED PATHS</span>
        <span className="accent-dot">✦</span>
        <span>BUILD REAL PROJECTS</span>
        <span className="accent-dot">✦</span>
        <span>COLLABORATE IN TEAMS</span>
        <span className="accent-dot">✦</span>
        <span>GET RECOGNIZED</span>
        <span className="accent-dot">✦</span>
        <span>LAND YOUR FIRST JOB</span>
        <span className="accent-dot">✦</span>
        <span>LEARN FROM STRUCTURED PATHS</span>
        <span className="accent-dot">✦</span>
        <span>BUILD REAL PROJECTS</span>
        <span className="accent-dot">✦</span>
        <span>COLLABORATE IN TEAMS</span>
        <span className="accent-dot">✦</span>
        <span>GET RECOGNIZED</span>
        <span className="accent-dot">✦</span>
        <span>LAND YOUR FIRST JOB</span>
        <span className="accent-dot">✦</span>
      </div>
    </div>);
};
