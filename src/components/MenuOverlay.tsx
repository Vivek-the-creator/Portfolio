import React from 'react';
import StaggeredMenu from './StaggeredMenu';

interface MenuOverlayProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  overlayRef: React.RefObject<HTMLDivElement>;
  layerRefs: React.MutableRefObject<HTMLDivElement[]>;
  panelRef: React.RefObject<HTMLElement>;
  itemRefs: React.MutableRefObject<HTMLAnchorElement[]>;
  numberRefs: React.MutableRefObject<HTMLSpanElement[]>;
  socialRefs: React.MutableRefObject<HTMLAnchorElement[]>;
}

export default function MenuOverlay({
  isOpen,
  setIsOpen,
  overlayRef,
  layerRefs,
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
      <div
        className="absolute right-0 top-0 h-full w-80 sm:w-96 bg-[#8B0000] z-40"
        ref={(node) => {
          if (node) layerRefs.current[0] = node;
        }}
      />
      <div
        className="absolute right-0 top-0 h-full w-80 sm:w-96 bg-[#B11226] z-40"
        ref={(node) => {
          if (node) layerRefs.current[1] = node;
        }}
      />
      <div
        className="absolute right-0 top-0 h-full w-80 sm:w-96 bg-[#D62828] z-40"
        ref={(node) => {
          if (node) layerRefs.current[2] = node;
        }}
      />

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
