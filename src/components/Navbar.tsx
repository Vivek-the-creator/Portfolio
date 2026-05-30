import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X, Menu } from 'lucide-react';
import MenuOverlay from './MenuOverlay';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const layerRefs = useRef<HTMLDivElement[]>([]);
  const itemRefs = useRef<HTMLAnchorElement[]>([]);
  const numberRefs = useRef<HTMLSpanElement[]>([]);
  const socialRefs = useRef<HTMLAnchorElement[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(overlayRef.current, { autoAlpha: 0, pointerEvents: 'none' });
      gsap.set(layerRefs.current, { xPercent: 100 });
      gsap.set(panelRef.current, { xPercent: 100 });
      gsap.set([...itemRefs.current, ...numberRefs.current, ...socialRefs.current], {
        y: 36,
        opacity: 0,
      });

      timelineRef.current = gsap
        .timeline({
          paused: true,
          defaults: { ease: 'power4.inOut' },
          onReverseComplete: () => {
            gsap.set(overlayRef.current, { pointerEvents: 'none' });
          },
        })
        .to(overlayRef.current, { autoAlpha: 1, pointerEvents: 'auto', duration: 0.32, ease: 'power2.out' }, 0)
        .to(layerRefs.current, { xPercent: 0, duration: 0.72, stagger: 0.08 }, 0.04)
        .to(panelRef.current, { xPercent: 0, duration: 0.82 }, 0.22)
        .to(
          numberRefs.current,
          { y: 0, opacity: 0.6, duration: 0.54, stagger: 0.045, ease: 'power3.out' },
          0.64
        )
        .to(
          itemRefs.current,
          { y: 0, opacity: 1, duration: 0.72, stagger: 0.045, ease: 'power3.out' },
          0.68
        )
        .to(socialRefs.current, { y: 0, opacity: 1, duration: 0.48, stagger: 0.06, ease: 'power3.out' }, 0.96);
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      timelineRef.current?.play();
    } else {
      document.body.style.overflow = '';
      timelineRef.current?.reverse();
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full h-[80px] z-50 flex items-center justify-between px-6 md:px-12 transition-all duration-500 ${
          isScrolled ? 'navbar-glass' : 'bg-transparent'
        }`}
      >
        <a
          href="#home"
          className="text-2xl font-bold tracking-widest uppercase text-[#F5F5F5] hover:text-[#D62828] transition-colors duration-300"
          aria-label="Vivek K home"
        >
          VIVEK K
        </a>

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="menu-btn-glass flex items-center gap-2 rounded-full px-6 py-[14px] text-sm font-bold uppercase tracking-widest text-[#F5F5F5] group"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <span className="w-16 text-center transition-all duration-300">
            {isOpen ? 'CLOSE' : 'MENU'}
          </span>
          <div className="relative w-5 h-5 flex items-center justify-center">
            {isOpen ? (
              <X size={20} className="absolute text-flare transition-transform duration-300 rotate-90 scale-100" />
            ) : (
              <Menu size={20} className="absolute group-hover:text-flare transition-all duration-300 scale-100" />
            )}
          </div>
        </button>
      </header>

      <MenuOverlay
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        overlayRef={overlayRef}
        layerRefs={layerRefs}
        panelRef={panelRef}
        itemRefs={itemRefs}
        numberRefs={numberRefs}
        socialRefs={socialRefs}
      />
    </>
  );
}
