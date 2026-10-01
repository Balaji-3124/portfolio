import ContactBg from "../../assets/zoomoutBG.png";

const CONTACT = {
  email: "tbalaji2411@gmail.com",
  phone: "+91 93458 68996",
  location: "Tamil Nadu, India",
  whatsapp: "https://wa.me/919345868996",
  linkedin: "https://www.linkedin.com/in/balaji-webs/",
  github: "https://github.com/Balaji-3124",
  instagram: "https://www.instagram.com/your-handle",
  telegram: "https://t.me/your-handle",
};

const Contact = () => {
  return (
    <section
      id="contact"
      className="
        relative isolate
        h-[min(max(calc(100vh-88px),700px),850px)]
        max-[990px]:h-auto
        scroll-mt-[88px]
        max-[991px]:scroll-mt-[85px]
        max-[575px]:scroll-mt-[72px]
        overflow-hidden
        bg-white
        px-5 py-7
        sm:px-8
        min-[990px]:px-[7vw]
        min-[990px]:py-8
        max-[380px]:px-3
      "
    >
      {/* ==================== BACKGROUND ====================
          Full-bleed — stays outside the max-width content
          wrapper below so it always spans the whole section. */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-no-repeat grayscale"
        style={{
          backgroundImage: `url(${ContactBg})`,
          backgroundPosition: "52% 0%",
          opacity: 0.8,

          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0) 2%, rgba(0,0,0,0.15) 10%, rgba(0,0,0,0.45) 25%, #000 34%, #000 100%)",

          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0) 2%, rgba(0,0,0,0.15) 10%, rgba(0,0,0,0.45) 25%, #000 34%, #000 100%)",
        }}
        aria-label="Contact background"
      />

      {/* ==================== CONTENT (max-width, centered) ====================
          flex flex-col + h-full is what makes "mt-auto" on the
          lower section below actually push it to the bottom. */}
      <div className="mx-auto flex h-full w-full max-w-[1800px] flex-col">

      {/* ==================== HEADER ==================== */}
      <header data-reveal="up" className="mx-auto text-center">
        <h1
          className="
            text-[clamp(2.5rem,7vw,5rem)]
            font-extrabold
            uppercase
            leading-[0.95]
            tracking-[-0.05em]
          "
        >
          Let's{" "}
          <span className="text-[#3f51d8]">
            Connect
          </span>
          .
        </h1>

        <p
          className="
            mx-auto
            mt-4
            max-w-[55ch]
            text-[clamp(0.9rem,1.3vw,1.1rem)]
            font-normal
            leading-[1.55]
            text-[#5b5b63]
          "
        >
          Ready to create something amazing? Reach out to me directly or
          connect across platforms. I'm always looking for exciting new
          projects!
        </p>
      </header>

      {/* ==================== LOWER SECTION ==================== */}
      <div
        className="
          mt-auto
          flex
          flex-col
          items-stretch
          gap-8
          pt-10
          max-[380px]:gap-6
          max-[380px]:pt-6

          min-[992px]:mx-[40px]
          min-[992px]:flex-row
          min-[992px]:items-end
          min-[992px]:justify-between
          min-[992px]:gap-6
          min-[992px]:pt-6
        "
      >
        {/* ==================== LEFT CONTACT DETAILS ==================== */}
        <address
          data-reveal="left"
          className="
            w-full
            rounded-[24px]
            border border-black/5
            bg-white/[0.86]
            p-5
            not-italic
            shadow-[0_10px_28px_rgba(20,20,30,0.07)]
            backdrop-blur-[14px]
            max-[380px]:p-4

            min-[992px]:w-[min(380px,100%)]
            min-[992px]:p-7
          "
        >
          <dl className="grid gap-5">

            {/* EMAIL */}
            <div>
              <dt
                className="
                  mb-1.5
                  text-[0.7rem]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-[#6f6f78]
                "
              >
                Email me
              </dt>

              <dd
                className="
                  m-0
                  break-words
                  text-[clamp(1.15rem,1.8vw,1.45rem)]
                  font-normal
                  leading-[1.2]
                "
              >
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="transition-colors hover:text-[#3f51d8]"
                >
                  {CONTACT.email}
                </a>
              </dd>
            </div>

            {/* PHONE */}
            <div>
              <dt
                className="
                  mb-1.5
                  text-[0.7rem]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-[#6f6f78]
                "
              >
                Call me
              </dt>

              <dd
                className="
                  m-0
                  break-words
                  text-[clamp(1.15rem,1.8vw,1.45rem)]
                  font-normal
                  leading-[1.2]
                "
              >
                <a
                  href={`tel:${CONTACT.phone.replace(/[^+\d]/g, "")}`}
                  className="transition-colors hover:text-[#3f51d8]"
                >
                  {CONTACT.phone}
                </a>
              </dd>
            </div>

            {/* LOCATION */}
            <div>
              <dt
                className="
                  mb-1.5
                  text-[0.7rem]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-[#6f6f78]
                "
              >
                Location
              </dt>

              <dd
                className="
                  m-0
                  break-words
                  text-[clamp(1.15rem,1.8vw,1.45rem)]
                  font-normal
                  leading-[1.2]
                "
              >
                {CONTACT.location}
              </dd>
            </div>

          </dl>
        </address>

        {/* ==================== RIGHT SIDE ==================== */}
        <div
          data-reveal="right"
          className="
            flex
            w-full
            flex-col
            gap-4

            min-[992px]:w-[min(420px,100%)]
          "
        >
          {/* ==================== Gmail ==================== */}
          <a
            href={`https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(
              CONTACT.email
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="
              group
              flex
              items-center
              justify-between
              gap-4
              rounded-[18px]
              border border-black/5
              bg-white/[0.86]
              px-5 py-4
              text-inherit
              no-underline
              shadow-[0_10px_28px_rgba(20,20,30,0.07)]
              backdrop-blur-[14px]
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:shadow-[0_14px_32px_rgba(20,20,30,0.12)]
            "
          >
            <div>
              <h2
                className="
                  mb-1
                  text-[1.2rem]
                  font-semibold
                  tracking-[-0.01em]
                "
              >
                Gmail
              </h2>

              <span
                className="
                  text-[0.85rem]
                  font-medium
                  text-[#5b5b63]
                "
              >
                Direct to inbox
              </span>
            </div>

            <span
              className="
                grid
                h-[44px]
                w-[44px]
                flex-none
                place-items-center
                rounded-full
                bg-[#f1f1f3]
                text-[#2a2a2e]
                transition-all
                duration-200
                group-hover:bg-[#EA4335]
                group-hover:text-white
              "
            >
              <MailIcon />
            </span>
          </a>

          {/* ==================== LINKEDIN ==================== */}
          <a
            href={CONTACT.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="
              group
              flex
              items-center
              justify-between
              gap-4
              rounded-[18px]
              border border-black/5
              bg-white/[0.86]
              px-5 py-4
              text-inherit
              no-underline
              shadow-[0_10px_28px_rgba(20,20,30,0.07)]
              backdrop-blur-[14px]
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:shadow-[0_14px_32px_rgba(20,20,30,0.12)]
            "
          >
            <div>
              <h2
                className="
                  mb-1
                  text-[1.2rem]
                  font-semibold
                  tracking-[-0.01em]
                "
              >
                LinkedIn
              </h2>

              <span
                className="
                  text-[0.85rem]
                  font-medium
                  text-[#5b5b63]
                "
              >
                Professional Network
              </span>
            </div>

            <span
              className="
                grid
                h-[44px]
                w-[44px]
                flex-none
                place-items-center
                rounded-full
                bg-[#f1f1f3]
                text-[#2a2a2e]
                transition-all
                duration-200
                group-hover:bg-[#0A66C2]
                group-hover:text-white
              "
            >
              <LinkedInIcon />
            </span>
          </a>

          {/* ==================== Whatsapp ==================== */}

          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="
              group
              flex
              items-center
              justify-between
              gap-4
              rounded-[18px]
              border border-black/5
              bg-white/[0.86]
              px-5 py-4
              text-inherit
              no-underline
              shadow-[0_10px_28px_rgba(20,20,30,0.07)]
              backdrop-blur-[14px]
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:shadow-[0_14px_32px_rgba(20,20,30,0.12)]
            "
          >
            <div>
              <h2
                className="
                  mb-1
                  text-[1.2rem]
                  font-semibold
                  tracking-[-0.01em]
                "
              >
                WhatsApp
              </h2>

              <span
                className="
                  text-[0.85rem]
                  font-medium
                  text-[#5b5b63]
                "
              >
                Send a quick message
              </span>
            </div>

            <span
              className="
                grid
                h-[44px]
                w-[44px]
                flex-none
                place-items-center
                rounded-full
                bg-[#f1f1f3]
                text-[#2a2a2e]
                transition-all
                duration-200
                group-hover:bg-[#25D366]
                group-hover:text-white
              "
            >
              <WhatsAppIcon />
            </span>
          </a>

          {/* ==================== SOCIAL ==================== */}
          <nav
            className="
              mt-4
              flex
              justify-center
              gap-5
            "
            aria-label="Social profiles"
          >
            <SocialButton
              href={CONTACT.github}
              label="GitHub"
              hoverClass="hover:text-black"
              icon={<GithubIcon />}
            />

            <SocialButton
              href={CONTACT.instagram}
              label="Instagram"
              hoverClass="hover:text-[#E4405F]"
              icon={<InstagramIcon />}
            />

            <SocialButton
              href={CONTACT.telegram}
              label="Telegram"
              hoverClass="hover:text-[#229ED9]"
              icon={<TelegramIcon />}
            />
          </nav>
        </div>
      </div>

      </div>
    </section>
  );
};


/* =========================================================
   ICONS
========================================================= */

const WhatsAppIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-[21px] w-[21px]"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2a9.9 9.9 0 0 0-8.54 15.01L2 22l5.17-1.36A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.08-1.12l-.29-.17-3.07.81.82-2.99-.19-.3A8 8 0 1 1 12 20Zm4.39-5.96c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.21-.72-.64-1.21-1.43-1.35-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.46-.39-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.09 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.51.1.46-.07 1.43-.58 1.63-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-[18px] w-[18px]"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const MailIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-[18px] w-[18px]"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const GithubIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-[23px] w-[23px]"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M9 19c-4.3 1.4-4.3-2.1-6-2.5" />
    <path d="M15 19v-3.5c0-.9-.3-1.6-.8-2.2 2.6-.3 5.3-1.3 5.3-5.8 0-1.3-.5-2.4-1.2-3.2.1-.3.5-1.6-.1-3.2 0 0-1-.3-3.3 1.2a11.5 11.5 0 0 0-6 0C6.6 2.1 5.6 2.4 5.6 2.4c-.6 1.6-.2 2.9-.1 3.2-.8.8-1.2 1.9-1.2 3.2 0 4.5 2.7 5.5 5.3 5.8-.5.4-.8 1-.8 2.2V19" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-[22px] w-[22px]"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const TelegramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-[22px] w-[22px]"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
);


/* =========================================================
   SOCIAL BUTTON
========================================================= */

const SocialButton = ({ href, label, icon, hoverClass }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`
        group
        grid
        h-[50px]
        w-[50px]
        place-items-center
        rounded-full
        bg-[rgba(226,226,229,0.92)]
        text-[#2a2a2e]
        transition-all
        duration-200
        hover:-translate-y-0.5
        focus-visible:outline
        focus-visible:outline-[3px]
        focus-visible:outline-[#3f51d8]
        focus-visible:outline-offset-[3px]
        ${hoverClass}
      `}
    >
      {icon}
    </a>
  );
};

export default Contact;