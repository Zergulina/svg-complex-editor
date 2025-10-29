"use client";

import { useEffect } from "react";

interface HeaderProps {
  onUndo: () => void;
  onRedo: () => void;
  onSave: () => void;
}

const Header = ({ onUndo, onRedo, onSave }: HeaderProps) => {
  // Implement keyboard shortcuts that work regardless of keyboard language
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Using code property which represents the physical key location
      // instead of key property which represents the character
      if ((e.ctrlKey || e.metaKey)) {
        switch (e.code) {
          case 'KeyZ':
            e.preventDefault();
            if (e.shiftKey) {
              onRedo(); // Ctrl+Shift+Z for redo
            } else {
              onUndo(); // Ctrl+Z for undo
            }
            break;
          case 'KeyY':
            e.preventDefault();
            onRedo(); // Ctrl+Y for redo
            break;
          case 'KeyS':
            e.preventDefault();
            onSave(); // Ctrl+S for save
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onUndo, onRedo, onSave]);

  return (
    <header className="h-14 border-b flex items-center px-4 gap-2">
      <div className="flex items-center gap-2">
        <div className="text-lg font-semibold">SVG Complex Editor</div>
      </div>
    </header>
  );
};

export default Header;