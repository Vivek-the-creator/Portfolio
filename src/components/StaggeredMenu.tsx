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
      className="menu-panel-glow absolute right-0 top-0 h-full w-full max-w-[420px] flex flex-col justify-between p-10 md:p-14 z-50 transform translate-x-full shadow-[-20px_0_40px_rgba(0,0,0,0.5)] border-l border-white/5"
      ref={panelRef}
      aria-label="Primary navigation"
      onMouseDown={(event) => event.stopPropagation()}
    >
      <div className="menu-panel-gradient" />

      <nav className="relative z-10 flex flex-col space-y-4 mt-20">
        {menuItems.map((item, index) => (
          <a
            key={item.href}
            href={item.href}
            className="menu-item-link group flex items-baseline gap-4 relative py-2"
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

      <div className="relative z-10 mt-12 border-t border-white/10 pt-8">
        <p className="text-xs font-bold uppercase tracking-[0.4em] text-flare mb-6">Connect</p>
        <div className="grid grid-cols-2 gap-4">
          {socialLinks.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
              className="flex items-center gap-2 text-sm text-ash hover:text-flare transition-colors group"
              ref={(node) => {
                if (node) socialRefs.current[index] = node;
              }}
            >
              <item.icon size={16} className="group-hover:scale-110 transition-transform" />
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
