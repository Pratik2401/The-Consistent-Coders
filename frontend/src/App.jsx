import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { useLenis } from './hooks/useLenis';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { FullscreenMenu } from './components/FullscreenMenu';
// import { Footer } from './components/Footer';
import { BarbaWrapper } from './components/BarbaWrapper';
import { ErrorBoundary } from './components/ErrorBoundary';
import { SEOMeta } from './seo/SEOMeta';
import { HomePage } from './pages/HomePage';
import { LearnPage } from './pages/LearnPage';
import { BuildPage } from './pages/BuildPage';
import { JoinPage } from './pages/JoinPage';
import { TasksPage } from './pages/TasksPage';
import { ContributorsPage } from './pages/ContributorsPage';
import { JobsPage } from './pages/JobsPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProfilePage } from './pages/ProfilePage';
import { initMobileOptimizations } from './utils/mobileOptimizations';
import './App.css';
import './responsive.css';
import './hamburger-fix.css';
// Import GSAP and plugins
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
function AppContent() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const lenisRef = useLenis();
    const location = useLocation();
    const appRef = useRef(null);
    // Initialize mobile optimizations
    useEffect(() => {
        const cleanup = initMobileOptimizations();
        return cleanup;
    }, []);
    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };
    const closeMenu = () => {
        setIsMenuOpen(false);
    };
    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
        ScrollTrigger.refresh();
    }, [location.pathname]);
    // Close menu on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isMenuOpen) {
                closeMenu();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isMenuOpen]);
    // Magnetic elements effect
    useEffect(() => {
        const ctx = gsap.context(() => {
            const magneticElements = document.querySelectorAll('.magnetic');
            magneticElements.forEach((el) => {
                const strength = parseFloat(el.getAttribute('data-strength') || '20');
                const handleMouseMove = (e) => {
                    const rect = el.getBoundingClientRect();
                    const x = (e.clientX - (rect.left + rect.width / 2)) / strength;
                    const y = (e.clientY - (rect.top + rect.height / 2)) / strength;
                    gsap.to(el, { x, y, duration: 0.4, ease: 'power2.out' });
                };
                const handleMouseLeave = () => {
                    gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
                };
                el.addEventListener('mousemove', handleMouseMove);
                el.addEventListener('mouseleave', handleMouseLeave);
                // Store on element to clean up later
                el._magneticHandlers = { mousemove: handleMouseMove, mouseleave: handleMouseLeave };
            });
        }, appRef);
        return () => {
            const magneticElements = document.querySelectorAll('.magnetic');
            magneticElements.forEach((el) => {
                if (el._magneticHandlers) {
                    el.removeEventListener('mousemove', el._magneticHandlers.mousemove);
                    el.removeEventListener('mouseleave', el._magneticHandlers.mouseleave);
                }
            });
            ctx.revert();
        };
    }, []);
    // Scroll progress bar
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to('.scroll-progress', {
                width: '100%',
                ease: 'none',
                scrollTrigger: {
                    scrub: 0,
                    start: 'top top',
                    end: 'bottom bottom',
                },
            });
        });
        return () => ctx.revert();
    }, []);
    // Refresh ScrollTrigger after all components mount
    useEffect(() => {
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 300);
        return () => clearTimeout(timer);
    }, [location.pathname]);
    // Background color transitions
    useEffect(() => {
        const ctx = gsap.context(() => {
            const sections = [
                { el: '.section-hero', bg: '#0e0e0e', color: '#fafafa' },
                { el: '.section-vision', bg: '#050505', color: '#fafafa' },
                { el: '.section-stats', bg: '#0e0e0e', color: '#fafafa' },
                { el: '.section-how-it-works', bg: '#050505', color: '#fafafa' },
                { el: '.section-comparator', bg: '#0e0e0e', color: '#fafafa' },
                { el: '.section-fame', bg: '#0e0e0e', color: '#fafafa' },
                { el: '.section-footer', bg: '#050505', color: '#fafafa' },
            ];
            sections.forEach(({ el, bg, color }) => {
                const target = (appRef.current || document.body).querySelector(el);
                if (!target)
                    return;
                ScrollTrigger.create({
                    trigger: target,
                    start: 'top 55%',
                    onEnter: () => gsap.to('body', {
                        backgroundColor: bg,
                        color,
                        duration: 0.8,
                        ease: 'power2.inOut',
                        overwrite: 'auto',
                    }),
                    onEnterBack: () => gsap.to('body', {
                        backgroundColor: bg,
                        color,
                        duration: 0.8,
                        ease: 'power2.inOut',
                        overwrite: 'auto',
                    }),
                });
            });
        });
        return () => ctx.revert();
    }, []);
    useEffect(() => {
        let lastScroll = 0;
        const navbar = document.getElementById('mainNav');
        const ctx = gsap.context(() => { });
        const handleScroll = ({ scroll }) => {
            if (!navbar || isMenuOpen)
                return;
            const direction = scroll > lastScroll ? 'down' : 'up';
            if (direction === 'down' && scroll > 200) {
                gsap.to(navbar, { y: -120, duration: 0.5, ease: 'power2.inOut' });
            }
            else {
                gsap.to(navbar, { y: 0, duration: 0.5, ease: 'power2.out' });
            }
            lastScroll = scroll;
        };
        if (lenisRef.current) {
            lenisRef.current.on('scroll', handleScroll);
        }
        return () => {
            if (lenisRef.current) {
                lenisRef.current.off('scroll', handleScroll);
            }
            ctx.revert();
        };
    }, [lenisRef, isMenuOpen]);
    return (<>
      <SEOMeta title="The Consistent Coders | Learn. Build. Get Hired." description="Consistent Coders — a community-driven ecosystem for beginners and early professionals to learn structured paths, build real projects, and launch careers." keywords="coding, programming, web development, react, javascript, community, learning"/>

      {/* Noise & Overlay */}
      <div className="noise-overlay"></div>
      <div className="scroll-progress"></div>

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Barba Transition Curtain */}
      <div className="transition-curtain">
        <div className="curtain-panel"></div>
        <div className="curtain-panel"></div>
        <div className="curtain-panel"></div>
        <div className="curtain-panel"></div>
        <div className="curtain-panel"></div>
      </div>

      {/* Liquid Filter SVG */}
      <svg style={{ display: 'none' }}>
        <defs>
          <filter id="liquid">
            <feTurbulence type="fractalNoise" baseFrequency="0.005 0.005" numOctaves={2} result="warp"/>
            <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="30" in="SourceGraphic" in2="warp" id="liquid-displacement"/>
          </filter>
        </defs>
      </svg>

      {/* Navigation */}
      <Navbar onMenuToggle={toggleMenu} isMenuOpen={isMenuOpen}/>

      {/* Fullscreen Menu */}
      <FullscreenMenu isOpen={isMenuOpen} onClose={closeMenu} lenisRef={lenisRef}/>

      {/* Main Content */}
      <main data-barba="wrapper" ref={appRef}>
        <div data-barba="container" data-barba-namespace="home">
          <div className="scroll-container">
            <Routes>
              <Route path="/" element={<HomePage />}/>
              <Route path="/learn" element={<LearnPage />}/>
              <Route path="/build" element={<BuildPage />}/>
              <Route path="/join" element={<JoinPage />}/>
              <Route path="/tasks" element={<TasksPage />}/>
              <Route path="/contributors" element={<ContributorsPage />}/>
              <Route path="/jobs" element={<JobsPage />}/>
              <Route path="/contact" element={<ContactPage />}/>
              <Route path="/profile" element={<ProfilePage />}/>
              <Route path="*" element={<NotFoundPage />}/>
            </Routes>
          </div>
        </div>
      </main>
    </>);
}
function App() {
    return (<ErrorBoundary>
      <Router>
        <BarbaWrapper>
          <AppContent />
        </BarbaWrapper>
      </Router>
      <Analytics />
    </ErrorBoundary>);
}
export default App;
