import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isColorChanged, setIsColorChanged] = useState(false);

  const links = [
    { id: 1, name: "Anggota", link: "#anggota" },
    { id: 2, name: "Tentang Kami", link: "#tentang" },
    { id: 3, name: "Berita", link: "#berita" },
    { id: 4, name: "Login", link: "/login" },
  ];

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    const timer = setTimeout(() => {
      setIsColorChanged(true);
    }, 5000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const handleLinkClick = (e, link) => {
    if (link.startsWith("#")) {
      e.preventDefault();
      const targetElement = document.querySelector(link);
      const offset = 64; // Adjust this value as needed
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = targetElement.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div
          className={`w-full navbar fixed z-40 px-14 ease-linear duration-200 ${
            scrollPosition > 15
              ? "bg-white text-black"
              : "bg-transparent text-white"
          }`}
        >
          <div className="flex-none lg:hidden -ml-5">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current text-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1">
            <img className="w-28 ml-10 lg:ml-0" src="./logo.png" alt="logo" />
          </div>
          <div className="hidden lg:block">
            <div className="flex gap-3">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={link.link}
                  className={`transition-colors duration-1000 ${
                    scrollPosition > 15
                      ? "text-black"
                      : isColorChanged
                      ? "text-white"
                      : "text-black"
                  }`}
                  onClick={(e) => handleLinkClick(e, link.link)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="drawer-side z-50">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu px-4 w-80 min-h-full gap-14 bg-white text-black font-medium text-base">
          <img className="w-28 mx-auto mt-5" src="./logo.png" alt="logo" />
          <div className="flex flex-col gap-1 divide-y-2 justify-center">
            {links.map((link) => (
              <a
                className="py-1"
                key={link.id}
                href={link.link}
                onClick={(e) => handleLinkClick(e, link.link)}
              >
                {link.name}
              </a>
            ))}
            <div />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
