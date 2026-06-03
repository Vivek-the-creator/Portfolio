import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X, Menu } from 'lucide-react';
import MenuOverlay from './MenuOverlay';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<HTMLAnchorElement[]>([]);
  const numberRefs = useRef<HTMLSpanElement[]>([]);
  const socialRefs = useRef<HTMLAnchorElement[]>([]);
  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(overlayRef.current, { autoAlpha: 0, pointerEvents: 'none' });
      gsap.set(panelRef.current, { xPercent: 100 });
      gsap.set([...itemRefs.current, ...numberRefs.current, ...socialRefs.current], {
        y: 36,
        opacity: 0,
      });

      openTlRef.current = gsap
        .timeline({
          paused: true,
          defaults: { ease: 'power4.inOut' },
        })
        .to(overlayRef.current, { autoAlpha: 1, pointerEvents: 'auto', duration: 0.32, ease: 'power2.out' }, 0)
        .to(panelRef.current, { xPercent: 0, duration: 0.82 }, 0.08)
        .to(
          numberRefs.current,
          { y: 0, opacity: 0.6, duration: 0.54, stagger: 0.045, ease: 'power3.out' },
          0.52
        )
        .to(
          itemRefs.current,
          { y: 0, opacity: 1, duration: 0.72, stagger: 0.045, ease: 'power3.out' },
          0.56
        )
        .to(socialRefs.current, { y: 0, opacity: 1, duration: 0.48, stagger: 0.06, ease: 'power3.out' }, 0.84);
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Kill any running close animation
      closeTlRef.current?.kill();
      closeTlRef.current = null;

      document.body.style.overflow = 'hidden';
      (window as any).lenis?.stop();

      // Reset to open-ready state and play
      gsap.set(panelRef.current, { xPercent: 100 });
      gsap.set([...itemRefs.current, ...numberRefs.current, ...socialRefs.current], {
        y: 36,
        opacity: 0,
      });
      openTlRef.current?.progress(0).play();
    } else {
      document.body.style.overflow = '';
      (window as any).lenis?.start();

      // Only run close animation if the menu was actually open
      if (openTlRef.current && openTlRef.current.progress() > 0) {
        openTlRef.current.pause();

        closeTlRef.current = gsap
          .timeline({
            defaults: { ease: 'power3.inOut' },
            onComplete: () => {
              // Reset everything for the next open
              gsap.set(overlayRef.current, { autoAlpha: 0, pointerEvents: 'none' });
              gsap.set(panelRef.current, { xPercent: 100 });
              gsap.set([...itemRefs.current, ...numberRefs.current, ...socialRefs.current], {
                y: 36,
                opacity: 0,
              });
              openTlRef.current?.progress(0).pause();
              closeTlRef.current = null;
            },
          })
          .to(
            [...socialRefs.current, ...numberRefs.current],
            { y: -16, opacity: 0, duration: 0.22, stagger: 0.02, ease: 'power2.in' },
            0
          )
          .to(
            itemRefs.current,
            { y: -24, opacity: 0, duration: 0.28, stagger: 0.025, ease: 'power2.in' },
            0.04
          )
          .to(panelRef.current, { xPercent: -100, duration: 0.55, ease: 'power3.inOut' }, 0.18)
          .to(overlayRef.current, { autoAlpha: 0, duration: 0.38, ease: 'power2.in' }, 0.32);
      }
    }

    return () => {
      document.body.style.overflow = '';
      (window as any).lenis?.start();
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
        className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 pointer-events-none transition-all duration-500 ${
          isScrolled ? 'h-[80px]' : 'h-[100px] pt-4'
        }`}
      >
        <a
          href="#home"
          className={`pointer-events-auto text-2xl font-bold tracking-widest uppercase text-[#F5F5F5] hover:text-[#D62828] transition-all duration-500 ${
            isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          aria-label="Vivek K home"
        >
          VIVEK K
        </a>

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="pointer-events-auto menu-btn-glass flex items-center justify-center rounded-full w-12 h-12 text-[#F5F5F5] group"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
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
        panelRef={panelRef}
        itemRefs={itemRefs}
        numberRefs={numberRefs}
        socialRefs={socialRefs}
      />
    </>
  );
}
