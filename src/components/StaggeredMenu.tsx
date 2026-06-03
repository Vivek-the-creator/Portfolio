import React from 'react';
import { Github, Linkedin, Mail, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const menuItems = [
  { number: '01', label: 'Home', href: '#home' },
  { number: '02', label: 'About', href: '#about' },
  { number: '03', label: 'Skills', href: '#skills' },
  { number: '04', label: 'Projects', href: '#projects' },
  { number: '05', label: 'Experience', href: '#experience' },
  { number: '06', label: 'Achievements', href: '#achievements' },
  { number: '07', label: 'Certifications', href: '#certifications' },
  { number: '08', label: 'Contact', href: '#contact' },
];

export const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/', icon: Github },
  { label: 'LinkedIn', href: 'https://linkedin.com/', icon: Linkedin },
  { label: 'LeetCode', href: 'https://leetcode.com/', icon: Code2 },
  { label: 'Email', href: 'mailto:vivekkk@example.com', icon: Mail },
];

interface StaggeredMenuProps {
  setIsOpen: (isOpen: boolean) => void;
  panelRef: React.RefObject<HTMLElement>;
  itemRefs: React.MutableRefObject<HTMLAnchorElement[]>;
  numberRefs: React.MutableRefObject<HTMLSpanElement[]>;
  socialRefs: React.MutableRefObject<HTMLAnchorElement[]>;
}

export default function StaggeredMenu({
  setIsOpen,
  panelRef,
  itemRefs,
  numberRefs,
  socialRefs,
}: StaggeredMenuProps) {
  return (
    <aside
      id="cinematic-menu"
      className="menu-panel-glow absolute right-0 top-0 h-full w-80 sm:w-96 flex flex-col justify-between pt-24 pb-12 pl-10 pr-6 md:pl-12 md:pr-8 z-50 shadow-[-20px_0_40px_rgba(0,0,0,0.5)] border-l border-white/5"
      ref={panelRef}
      aria-label="Primary navigation"
      onMouseDown={(event) => event.stopPropagation()}
    >
      <div className="menu-panel-gradient" />

      <nav className="relative z-10 flex flex-col items-start space-y-4 mt-12 w-full">
        {menuItems.map((item, index) => (
          <a
            key={item.href}
            href={item.href}
            className="menu-item-link group flex items-baseline justify-start gap-2.5 relative py-2 w-full text-left"
            ref={(node) => {
              if (node) itemRefs.current[index] = node;
            }}
            onClick={() => setIsOpen(false)}
          >
            <span
              className="text-sm font-bold text-ash group-hover:text-flare transition-colors"
              ref={(node) => {
                if (node) numberRefs.current[index] = node;
              }}
            >
              {item.number}
            </span>
            <span className="menu-item-text text-2xl md:text-3xl uppercase tracking-wider relative group-hover:translate-x-3 transition-transform duration-300">
              {item.label}
              <div className="menu-item-underline" />
            </span>
          </a>
        ))}
      </nav>

      <div className="relative z-10 mt-6 border-t border-white/10" />
    </aside>
  );
}
