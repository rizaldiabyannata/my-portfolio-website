"use client"
import React, { useEffect, useRef } from 'react';
import { GithubIcon, EmailIcon, InstagramIcon, LinkedInIcon } from './icons/UtilityIcons';
import { gsap } from 'gsap';

const socialLinks = [
  { href: 'https://github.com/rizaldiabyannata', icon: <GithubIcon /> },
  { href: 'https://www.linkedin.com/in/rizaldi-abyannata-1093571b5/', icon: <LinkedInIcon /> },
  { href: 'https://www.instagram.com/abyannata___/', icon: <InstagramIcon /> },
  { href: 'mailto:mail@rizaldiabyannata.dev', icon: <EmailIcon /> },
];

const SocialLinks: React.FC = () => {
    const socialLinksRef = useRef(null);

    useEffect(() => {
        gsap.from(socialLinksRef.current, {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: 'power3.out',
            delay: 1,
        });

        gsap.from(".social-link", {
            opacity: 0,
            y: 10,
            duration: 0.5,
            ease: 'power3.out',
            stagger: 0.1,
            delay: 1.2,
        });
    }, []);

  return (
    <div ref={socialLinksRef} className="hidden md:block fixed bottom-0 left-12 z-10">
      <ul className="flex flex-col items-center space-y-6 after:content-[''] after:block after:w-px after:h-24 after:bg-slate after:mt-6">
        {socialLinks.map((link, index) => (
          <li key={index} className="social-link">
            <a href={link.href} target="_blank" rel="noopener noreferrer" className="block w-6 h-6 text-slate hover:text-brand hover:-translate-y-1 transition-all duration-300">
              {link.icon}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SocialLinks;