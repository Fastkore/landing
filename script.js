document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const nav = document.querySelector(".site-nav");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelectorAll(".site-nav a");

  const toggleNavigation = () => {
    const isOpen = nav.classList.toggle("open");
    if (navToggle) {
      navToggle.setAttribute("aria-expanded", String(isOpen));
    }
  };

  if (navToggle) {
    navToggle.addEventListener("click", toggleNavigation);
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (nav.classList.contains("open")) {
        nav.classList.remove("open");
        if (navToggle) {
          navToggle.setAttribute("aria-expanded", "false");
        }
      }
    });
  });

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
  };

  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: "0px 0px -80px 0px",
      threshold: 0.2,
    }
  );

  document.querySelectorAll(".reveal").forEach((element) => {
    revealObserver.observe(element);
  });

  const hero = document.querySelector(".hero");
  const orbs = document.querySelectorAll(".orb");

  if (hero && orbs.length) {
    hero.addEventListener("mousemove", (event) => {
      const bounds = hero.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      const centerX = bounds.width / 2;
      const centerY = bounds.height / 2;

      orbs.forEach((orb, index) => {
        const intensity = 12 + index * 6;
        const translateX = ((x - centerX) / centerX) * intensity;
        const translateY = ((y - centerY) / centerY) * intensity;
        orb.style.transform = `translate(${translateX}px, ${translateY}px)`;
      });
    });

    hero.addEventListener("mouseleave", () => {
      orbs.forEach((orb) => {
        orb.style.transform = "translate(0, 0)";
      });
    });
  }
});
