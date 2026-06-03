import React from 'react';
import StaggeredMenu from './StaggeredMenu';

interface MenuOverlayProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  overlayRef: React.RefObject<HTMLDivElement>;
  panelRef: React.RefObject<HTMLElement>;
  itemRefs: React.MutableRefObject<HTMLAnchorElement[]>;
  numberRefs: React.MutableRefObject<HTMLSpanElement[]>;
  socialRefs: React.MutableRefObject<HTMLAnchorElement[]>;
}

export default function MenuOverlay({
  isOpen,
  setIsOpen,
  overlayRef,
  panelRef,
  itemRefs,
  numberRefs,
  socialRefs,
}: MenuOverlayProps) {
  return (
    <div
      className="fixed inset-0 z-40 bg-black/70 backdrop-blur-[6px] transition-opacity"
      style={{ opacity: 0, pointerEvents: 'none' }}
      ref={overlayRef}
      role="presentation"
      onMouseDown={(event) => {
        if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      }}
    >
      <StaggeredMenu
        setIsOpen={setIsOpen}
        panelRef={panelRef}
        itemRefs={itemRefs}
        numberRefs={numberRefs}
        socialRefs={socialRefs}
      />
    </div>
  );
}
