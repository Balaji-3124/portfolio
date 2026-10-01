import React from "react";

const Footer = () => {
  const footerLinks = [
    {
      name: "About",
      href: "#about",
    },
    {
      name: "Skills",
      href: "#skills",
    },
    {
      name: "Projects",
      href: "#projects",
    },
    {
      name: "Journey",
      href: "#journey",
    },
    {
      name: "Contact",
      href: "#contact",
    },
  ];

  return (
    <footer className="bg-[#f5f5f5] text-[#111111]">
      <div
        className="
          mx-auto flex w-full max-w-[1400px] flex-col
          items-center
          px-5 py-4
          sm:px-8
          min-[992px]:px-[7vw]
          min-[992px]:py-5
        "
      >
        {/* Logo */}
        <a
          href="#"
          aria-label="Balaji Home"
          className="
            inline-flex
            items-center
            gap-[2px]
            no-underline
          "
        >
          <span
            className="
              text-[27px]
              font-black
              tracking-[0.1em]
              text-[#111111]
              max-[575px]:text-[25px]
            "
          >
            BALAJI
          </span>

          <img
            src="/dev.svg"
            alt=""
            aria-hidden="true"
            className="
              h-[25px]
              w-[30px]
              object-contain
              max-[575px]:h-[23px]
              max-[575px]:w-[28px]
            "
          />
        </a>

        {/* Built With */}
        <p
          className="
            mt-3
            text-center
            text-[13px]
            font-medium
            text-[#777777]
          "
        >
          Built with React &amp; Tailwind CSS
        </p>

        {/* Navigation */}
        <nav
          aria-label="Footer navigation"
          className="
            mt-5
            flex
            flex-wrap
            items-center
            justify-center
            gap-x-7
            gap-y-2
            max-[575px]:gap-x-5
          "
        >
          {footerLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="
                text-[14px]
                font-medium
                text-[#555555]
                no-underline
                transition-colors
                duration-200
                hover:text-[#111111]
                max-[575px]:text-[13px]
              "
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Divider */}
        <div
          className="
            mt-6
            h-px
            w-full
            bg-black/10
          "
        />

        {/* Copyright */}
        <p
          className="
            pt-5
            text-center
            text-[13px]
            text-[#888888]
          "
        >
          © {new Date().getFullYear()} Balaji. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;