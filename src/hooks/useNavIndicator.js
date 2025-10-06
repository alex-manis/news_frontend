import { useEffect } from "react";

export function useNavIndicator(navRef, indicatorRef, location, currentUser) {
  useEffect(() => {
    const updateIndicator = () => {
      if (!navRef.current || !indicatorRef.current) return;

      const links = navRef.current.querySelectorAll(".navigation__link");
      const activeLink =
        Array.from(links).find(
          (link) => link.getAttribute("href") === location.pathname
        ) || navRef.current.querySelector(".navigation__link[href='/']");

      if (!activeLink) return;

      const navStyle = getComputedStyle(navRef.current);
      const paddingLeft = parseFloat(navStyle.paddingLeft) || 0;

      const navRect = navRef.current.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();

      const indicatorWidth = linkRect.width * 1.3;
      const left =
        linkRect.left -
        navRect.left -
        paddingLeft +
        (linkRect.width - indicatorWidth) / 2;

      indicatorRef.current.style.width = `${indicatorWidth}px`;
      indicatorRef.current.style.transform = `translateX(${left}px)`;
      indicatorRef.current.style.backgroundColor =
        activeLink.getAttribute("href") === "/saved-news" ? "#000" : "#fff";
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [location, currentUser, navRef, indicatorRef]);
}
