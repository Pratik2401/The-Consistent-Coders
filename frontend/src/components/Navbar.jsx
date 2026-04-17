import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GoogleSignInButton } from './GoogleSignInButton';
import { useAuth } from '../context/AuthContext';
import './NavbarStyles.css';
// import tccLogo from '../assets/images/logo/favicon/the tcc.png';
gsap.registerPlugin(ScrollTrigger);
export const Navbar = ({ onMenuToggle, isMenuOpen }) => {
    const navRef = useRef(null);
    // const brandRef = useRef<HTMLDivElement>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const profileMenuRef = useRef(null);
    const location = useLocation();
    const { user, logout } = useAuth();
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (!profileMenuRef.current) return;
            if (!profileMenuRef.current.contains(event.target)) {
                setIsProfileMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Navbar entrance animation
            const navContainer = navRef.current?.querySelector('.nav-container');
            if (navContainer) {
                gsap.from(navContainer, {
                    y: -100,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out',
                    delay: 0.2,
                    clearProps: 'all',
                });
            }
            // Menu items stagger (only animate if they exist - desktop only)
            const navLinks = document.querySelectorAll('.nav-link');
            if (navLinks.length > 0 && window.innerWidth >= 1024) {
                gsap.from('.nav-link', {
                    opacity: 0,
                    y: -20,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'power3.out',
                    delay: 0.7,
                });
            }
            // Don't animate hamburger - it needs to be immediately visible on mobile
        }, navRef);
        return () => ctx.revert();
    }, []);
    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/learn', label: 'Learn' },
        { href: '/build', label: 'Build' },
        { href: '/tasks', label: 'Tasks' },
        { href: '/contributors', label: 'Honor' },
        { href: '/jobs', label: 'Jobs' },
        { href: '/contact', label: 'Contact' },
    ];
    return (<nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`} id="mainNav" ref={navRef}>
      <div className="nav-container">
        <div className="nav-center">
          {navLinks.map((link, index) => (<Link key={index} to={link.href} className={`nav-link ${location.pathname === link.href ? 'nav-link--active' : ''}`}>
              <span className="nav-link-text">{link.label}</span>
            </Link>))}
        </div>

        <div className="nav-right">
          {user ? (<div className="nav-profile-menu" ref={profileMenuRef}>
              <button type="button" className="nav-profile-trigger" onClick={() => setIsProfileMenuOpen((prev) => !prev)}>
                <div className="nav-profile-avatar">
                  {user.picture ? <img src={user.picture} alt={user.name || 'Profile'} /> : <span>{(user.name || user.email || 'U').charAt(0).toUpperCase()}</span>}
                </div>
                <span className="nav-profile-name">{user.name || user.email}</span>
              </button>
              {isProfileMenuOpen ? (<div className="nav-profile-dropdown">
                  <Link to="/profile" className="nav-profile-item" onClick={() => setIsProfileMenuOpen(false)}>
                    Edit Profile
                  </Link>
                  <button type="button" className="nav-profile-item nav-profile-item--danger" onClick={() => {
                logout();
                setIsProfileMenuOpen(false);
            }}>
                    Logout
                  </button>
                </div>) : null}
            </div>) : (<div className="nav-cta" style={{ display: 'inline-flex', alignItems: 'center' }}>
              <GoogleSignInButton enabled={!isMenuOpen} width={220} />
            </div>)}

          <div className={`hamburger ${isMenuOpen ? 'hamburger--active' : ''}`} onClick={onMenuToggle} role="button" tabIndex={0} aria-label="Toggle menu" onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onMenuToggle();
            }
        }}>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </div>
        </div>
      </div>
    </nav>);
};
