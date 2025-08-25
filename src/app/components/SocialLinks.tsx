
import React from 'react';
import { GithubIcon, EmailIcon, InstagramIcon, LinkedInIcon } from './icons/UtilityIcons';

const socialLinks = [
  { href: 'https://github.com/rizaldiabyannata', icon: <GithubIcon /> },
  { href: 'https://www.linkedin.com/in/rizaldi-abyannata-1093571b5/', icon: <LinkedInIcon /> },
  { href: 'https://www.instagram.com/abyannata___/', icon: <InstagramIcon /> },
  { href: 'mailto:mail@rizaldiabyannata.dev', icon: <EmailIcon /> },
];

const SocialLinks: React.FC = () => {
  return (
    <div className="hidden md:block fixed bottom-0 left-12 z-10" style={{ animation: 'fadeInUp 1s ease-out 1s forwards', opacity: 0 }}>
      <ul className="flex flex-col items-center space-y-6 after:content-[''] after:block after:w-px after:h-24 after:bg-slate after:mt-6">
        {socialLinks.map((link, index) => (
          <li key={index}>
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