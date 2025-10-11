import { useState, useEffect } from "react";

export function useBurgerMenu(breakpoint = 700) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= breakpoint;
      setIsMobile(mobile);

      if (!mobile) setIsMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return { isMobile, isMenuOpen, toggleMenu, closeMenu };
}
