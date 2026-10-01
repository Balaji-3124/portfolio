import { useEffect, useState } from "react";
import BalajiResume from "../../assets/Balaji_T.pdf";
import useActiveSection from "../../hooks/useActiveSection";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Journey", href: "#journey" },
  { name: "Contact", href: "#contact" },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeId = useActiveSection(navLinks.map((l) => l.href.slice(1)));

  // Open mobile menu
  const openMenu = () => {
    setIsMenuOpen(true);
  };

  // Close mobile menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Escape key + resize behavior
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 991) {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Close menu when clicking a navigation link
  const handleMobileLinkClick = () => {
    closeMenu();
  };

  return (
    <>
      {/* =========================================================
          NAVBAR
      ========================================================= */}
      <header
        className="
          sticky top-0 z-[1000]
          h-[88px]
          w-full
          border-b border-black/[0.08]
          bg-white/[0.96]
          backdrop-blur-[12px]
          [-webkit-backdrop-filter:blur(12px)]
          max-[991px]:h-[85px]
          max-[575px]:h-[72px]
        "
      >
        <div
          className="
            mx-auto
            h-full
            w-[min(1800px,calc(100%-60px))]
            max-[991px]:w-[calc(100%-30px)]
            max-[575px]:w-[calc(100%-24px)]
          "
        >
          <nav className="flex h-full items-center justify-between">
            {/* =====================================================
                MOBILE LEFT AREA
            ===================================================== */}
            <div className="hidden items-center gap-[15px] max-[991px]:flex">
              {/* Hamburger */}
              <button
                type="button"
                onClick={openMenu}
                aria-label="Open menu"
                aria-expanded={isMenuOpen}
                className="
                  flex
                  cursor-pointer
                  h-[42px]
                  w-[42px]
                  flex-col
                  items-center
                  justify-center
                  gap-[5px]
                  rounded-[6px]
                  p-[8px]
                  transition-[background-color]
                  duration-300
                  ease-in-out
                  hover:bg-[#f2f2f2]
                "
              >
                <span className="block h-[2px] w-[25px] bg-[#111111] transition-all duration-300" />
                <span className="block h-[2px] w-[25px] bg-[#111111] transition-all duration-300" />
                <span className="block h-[2px] w-[25px] bg-[#111111] transition-all duration-300" />
              </button>

              {/* Mobile Logo */}
              <a
                href="#"
                className="
                  text-[26px]
                  font-black
                  tracking-[0.12em]
                  text-[#111111]
                  max-[575px]:text-[23px]
                "
              >
                <span className="flex items-center gap-[7px]">
                    BALAJI

  <svg
    viewBox="0 -3 19 16"
    xmlns="http://www.w3.org/2000/svg"
    className="h-[26px] w-[30px] ml-1 mb-1"
    fill="#22c55e"
    aria-hidden="true"
  >
    <path
      d="M129.204085,3126.419 C129.587463,3126.032 129.587463,3125.405 129.204085,3125.018 L129.191207,3125.005 C128.807829,3124.618 128.186697,3124.618 127.803319,3125.005 L124.287534,3128.553 C123.904155,3128.94 123.904155,3129.568 124.287534,3129.955 L127.803319,3133.503 C128.186697,3133.89 128.807829,3133.89 129.191207,3133.503 L129.204085,3133.49 C129.587463,3133.103 129.587463,3132.476 129.204085,3132.089 L127.090057,3129.955 C126.706679,3129.568 126.706679,3128.94 127.090057,3128.553 L129.204085,3126.419 Z M142.712466,3128.553 L139.196681,3125.005 C138.814294,3124.618 138.192171,3124.618 137.808793,3125.005 L137.795915,3125.018 C137.412537,3125.405 137.412537,3126.032 137.795915,3126.419 L139.910934,3128.553 C140.294312,3128.94 140.294312,3129.568 139.910934,3129.955 L137.795915,3132.089 C137.412537,3132.476 137.412537,3133.103 137.795915,3133.49 C138.192171,3133.89 138.814294,3133.89 139.196681,3133.503 L142.712466,3129.955 C143.095845,3129.568 143.095845,3128.94 142.712466,3128.553 Z M136.809359,3124.40817 L131.74698,3135.23866 C131.582981,3135.57915 131.295245,3136 130.924037,3136 L130.904396,3136 C130.182602,3136 129.712209,3135.0197 130.031369,3134.3588 L135.064287,3123.63077 C135.228287,3123.29128 135.836165,3123.02511 135.836165,3123 L136.809359,3124.40817 Z"
      fill="#22c55e"
      transform="translate(-124, -3123)"
    />
  </svg>

</span>
              </a>
            </div>

            {/* =====================================================
                DESKTOP LOGO
            ===================================================== */}
<a
  href="#"
  className="
    flex items-center gap-[8px]
    text-[26px]
    font-black
    tracking-[0.12em]
    text-[#111111]
    max-[991px]:hidden
  "
>
  BALAJI
  <svg
    viewBox="0 -3 19 16"
    xmlns="http://www.w3.org/2000/svg"
    className="h-[26px] w-[30px] ml-1 mb-1"
    fill="#22c55e"
    aria-hidden="true"
  >
    <path
      d="M129.204085,3126.419 C129.587463,3126.032 129.587463,3125.405 129.204085,3125.018 L129.191207,3125.005 C128.807829,3124.618 128.186697,3124.618 127.803319,3125.005 L124.287534,3128.553 C123.904155,3128.94 123.904155,3129.568 124.287534,3129.955 L127.803319,3133.503 C128.186697,3133.89 128.807829,3133.89 129.191207,3133.503 L129.204085,3133.49 C129.587463,3133.103 129.587463,3132.476 129.204085,3132.089 L127.090057,3129.955 C126.706679,3129.568 126.706679,3128.94 127.090057,3128.553 L129.204085,3126.419 Z M142.712466,3128.553 L139.196681,3125.005 C138.814294,3124.618 138.192171,3124.618 137.808793,3125.005 L137.795915,3125.018 C137.412537,3125.405 137.412537,3126.032 137.795915,3126.419 L139.910934,3128.553 C140.294312,3128.94 140.294312,3129.568 139.910934,3129.955 L137.795915,3132.089 C137.412537,3132.476 137.412537,3133.103 137.795915,3133.49 L137.808793,3133.503 C138.192171,3133.89 138.814294,3133.89 139.196681,3133.503 L142.712466,3129.955 C143.095845,3129.568 143.095845,3128.94 142.712466,3128.553 Z M136.809359,3124.40817 L131.74698,3135.23866 C131.582981,3135.57915 131.295245,3136 130.924037,3136 L130.904396,3136 C130.182602,3136 129.712209,3135.0197 130.031369,3134.3588 L135.064287,3123.63077 C135.228287,3123.29128 135.836165,3123.02511 135.836165,3123.02511 L135.836165,3123 C136.818198,3123 137.127538,3123.74728 136.809359,3124.40817 Z"
      fill="#22c55e"
      transform="translate(-124, -3123)"
    />
  </svg>

</a>
            {/* =====================================================
                DESKTOP MENU
            ===================================================== */}
            <div
              className="
                flex
                items-center
                gap-[42px]
                max-[991px]:hidden
              "
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  data-active={activeId === link.href.slice(1)}
                  className="
                    group
                    relative
                    py-[8px]
                    data-[active=true]:text-[#ff4d00]
                    text-[19px]
                    font-bold
                    text-[#111111]
                    transition-colors
                    duration-300
                    ease-in-out
                  "
                >
                  {link.name}

                  {/* Orange underline */}
                  <span
                    className="
                      absolute
                      bottom-[2px]
                      left-0
                      h-[3px]
                      w-0
                      bg-[#ff4d00]
                      transition-[width]
                      duration-300
                      ease-in-out
                      group-hover:w-full
                      group-data-[active=true]:w-full
                    "
                  />
                </a>
              ))}
            </div>

            {/* =====================================================
                DESKTOP DOWNLOAD CV
            ===================================================== */}
            <a
              href={BalajiResume}
              download
              className="
                relative
                isolate
                inline-flex
                h-[52px]
                min-w-[165px]
                items-center
                justify-center
                overflow-hidden
                rounded-[6px]
                bg-[#111111]
                px-[25px]
                text-[14px]
                font-bold
                uppercase
                tracking-[0.04em]
                text-white
                transition-all
                duration-300
                ease-in-out

                before:absolute
                before:inset-x-0
                before:bottom-0
                before:z-[-1]
                before:h-0
                before:bg-[#ff4d00]
                before:transition-[height]
                before:duration-300
                before:ease-in-out

                hover:-translate-y-[2px]
                hover:before:h-full

                max-[768px]:hidden
              "
            >
              Download CV
            </a>
          </nav>
        </div>
      </header>

      {/* =========================================================
          MOBILE OVERLAY
      ========================================================= */}
      <div
        onClick={closeMenu}
        aria-hidden="true"
        className={`
          fixed
          inset-0
          z-[1998]
          bg-black/[0.45]
          transition-all
          duration-[350ms]
          ease-in-out
          ${
            isMenuOpen
              ? "visible opacity-100"
              : "invisible opacity-0"
          }
        `}
      />

      {/* =========================================================
          MOBILE MENU
      ========================================================= */}
      <aside
        className={`
          fixed
          left-0
          top-0
          z-[1999]
          h-screen
          w-[min(390px,88%)]
          overflow-y-auto
          bg-[#111111]
          text-white
          transition-transform
          duration-[650ms]
          ease-[cubic-bezier(0.77,0,0.175,1)]
          ${
            isMenuOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* =====================================================
            MOBILE MENU HEADER
        ===================================================== */}
        <div
          className="
            flex
            h-[100px]
            items-center
            justify-between
            border-b
            border-white/[0.12]
            px-[30px]
            max-[575px]:h-[85px]
            max-[575px]:px-[22px]
          "
        >
          {/* Mobile Logo */}
          <a
            href="#"
            onClick={closeMenu}
            className="
              text-[25px]
              font-extrabold
              tracking-[0.12em]
              text-white
            "
          >
            BALAJI
          </a>

          {/* Close Button */}
          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close menu"
            className="
              relative
              cursor-pointer
              flex
              h-[44px]
              w-[44px]
              items-center
              justify-center
              rounded-full
              p-[10px]
              transition-colors
              duration-300
              ease-in-out
              hover:bg-white/10
            "
          >
            <span
              className="
                absolute
                h-[2px]
                w-[27px]
                rotate-45
                bg-white
              "
            />

            <span
              className="
                absolute
                h-[2px]
                w-[27px]
                -rotate-45
                bg-white
              "
            />
          </button>
        </div>

        {/* =====================================================
            MOBILE NAVIGATION
        ===================================================== */}
        <nav
          className="
            px-[30px]
            py-[45px]
            max-[575px]:px-[22px]
            max-[575px]:py-[30px]
          "
        >
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={handleMobileLinkClick}
              className={`
                group
                block
                rounded-[10px]
                p-[14px]
                text-[clamp(18px,7vw,22px)]
                font-bold
                text-white
                opacity-50
                transition-transform
                duration-500
                ease-in-out
                hover:bg-[rgba(150,150,150,0.2)]
                hover:text-[#ff4d00]

                max-[575px]:text-[16px]

                ${
                  isMenuOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-[30px]"
                }
              `}
              style={{
                transitionDelay: isMenuOpen
                  ? `${0.15 + index * 0.1}s`
                  : "0s",
              }}
            >
              {link.name}
            </a>
          ))}

          {/* ===================================================
              MOBILE DOWNLOAD CV
          =================================================== */}
          <a
            href={BalajiResume}
            download
            onClick={handleMobileLinkClick}
            className={`
              mt-[35px]
              flex
              w-full
              items-center
              justify-center
              rounded-[5px]
              bg-white
              px-[25px]
              py-[17px]
              text-[17px]
              font-bold
              text-[#111111]
              transition-transform
              duration-300
              ease-in-out
              hover:bg-[#ff4d00]
              hover:text-white

              ${
                isMenuOpen
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-[30px] opacity-50"
              }
            `}
            style={{
              transitionDelay: isMenuOpen ? "0.65s" : "0s",
            }}
          >
            Download CV
          </a>
        </nav>
      </aside>
    </>
  );
}

export default Navbar;