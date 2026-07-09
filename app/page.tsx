"use client";

import Link from "next/link";
import { Topbar } from "@/components/Topbar";
import {
  ArrowRight,
  Brain,
  Rocket,
  Mouse,
  FolderKanban,
  BookText,
  Mail,
} from "lucide-react";
import { useState, useRef, useEffect, forwardRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import experience from "@/data/experience.json";
import { SiteBackground } from "@/components/SiteBackground";
import { MobileNav } from "@/components/MobileNav";
import { ExperienceCard } from "@/components/ExperienceCard";
import { ExploreLinkCard } from "@/components/ExploreLinkCard";
import { cn } from "@/lib/utils";
import { PAGE_VERTICAL, SITE_CONTAINER, SITE_PADDING } from "@/lib/layout";

const ScrollSection = forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode;
    className?: string;
    sectionIndex: number;
    /** Hero stays fully visible on first paint — no scroll-driven fade/slide */
    pinned?: boolean;
  }
>(({ children, className = "", sectionIndex, pinned = false }, ref) => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref as React.RefObject<HTMLDivElement>,
    offset: ["start 0.8", "end 0.2"],
  });

  const blur = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    prefersReducedMotion || pinned ? [0, 0, 0, 0] : [10, 0, 0, 10]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    prefersReducedMotion || pinned ? [1, 1, 1, 1] : [0, 1, 1, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    prefersReducedMotion || pinned ? [1, 1, 1] : [0.9, 1, 0.9]
  );

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion || pinned
      ? [0, 0]
      : sectionIndex % 2 === 0
        ? [100, -100]
        : [-100, 100]
  );

  return (
    <motion.section
      ref={ref}
      className={className}
      style={{
        filter: prefersReducedMotion ? undefined : `blur(${blur}px)`,
        opacity,
        scale,
        y,
      }}
    >
      {children}
    </motion.section>
  );
});

ScrollSection.displayName = "ScrollSection";

const TITLES = [
  "AI Enthusiast",
  "Code Artisan",
  "Tech Explorer",
  "Innovation Seeker",
] as const;

const FEATURED_EXPERIENCE = experience[0];

const services = [
  {
    icon: Brain,
    title: "Full-Stack Development",
    description:
      "End-to-end solutions with .NET, ASP.NET Core, and modern web technologies — from APIs to responsive frontends.",
  },
  {
    icon: Rocket,
    title: "System Integration",
    description:
      "Connecting new applications with legacy systems and databases for real-time data flow and smoother workflows.",
  },
] as const;

const exploreLinks = [
  {
    href: "/projects",
    icon: FolderKanban,
    label: "Projects",
    title: "What I've built",
    description: "Case studies and side builds — curated work, not filler demos.",
  },
  {
    href: "/blog",
    icon: BookText,
    label: "Notes",
    title: "What I'm thinking",
    description: "Thoughts on building, learning, and the craft of software.",
  },
  {
    href: "/contact",
    icon: Mail,
    label: "Contact",
    title: "Let's connect",
    description: "Have a project in mind or want to collaborate? I'd love to hear from you.",
  },
] as const;

export default function Home() {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const exploreRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const currentTitle = TITLES[currentTitleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayedText.length < currentTitle.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentTitle.slice(0, displayedText.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    } else if (displayedText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(displayedText.slice(0, -1));
      }, 50);
    } else {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setCurrentTitleIndex((prev) => (prev + 1) % TITLES.length);
      }, 0);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentTitleIndex]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY || document.documentElement.scrollTop);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="relative min-h-screen w-full text-[--foreground]"
      style={{
        background:
          "linear-gradient(135deg, #0A0A0A 0%, #0F0F0F 25%, #111111 50%, #0F0F0F 75%, #0A0A0A 100%)",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="pointer-events-none fixed inset-0" style={{ zIndex: 1 }}>
        <SiteBackground />
      </div>

      <div className={cn(SITE_CONTAINER, SITE_PADDING, "relative z-10")}>
        <Topbar />

        <main className={cn("mx-auto w-full", PAGE_VERTICAL)}>
          <ScrollSection
            ref={aboutRef}
            className="flex min-h-[calc(100dvh-9rem)] flex-col items-center justify-start pt-2 pb-8 sm:pt-4"
            sectionIndex={0}
            pinned
          >
            <div className="w-full">
              <div className="flex flex-col items-center gap-6 text-center sm:gap-8">
                <div className="group relative shrink-0">
                  <img
                    src="/profile.jpg"
                    alt="Manohar Gali"
                    className="relative h-32 w-32 rounded-full border-2 border-[--border] object-cover transition-all duration-500 group-hover:opacity-0"
                    style={{ objectPosition: "center 15%" }}
                  />
                  <img
                    src="/profilecolor.jpg"
                    alt="Manohar Gali"
                    className="absolute inset-0 h-32 w-32 rounded-full border-2 border-[--border] object-cover opacity-0 transition-all duration-500 group-hover:opacity-100"
                    style={{ objectPosition: "center 15%" }}
                  />
                </div>

                <div className="w-full">
                  <h1 className="mb-4 px-2 text-3xl font-bold leading-tight">
                    <motion.span
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                      className="block text-[--muted-foreground]"
                    >
                      Hi I&apos;m
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
                      className="mt-1 block bg-gradient-to-r from-white via-white to-gray-200 bg-clip-text text-4xl font-extrabold text-transparent"
                    >
                      Manohar Gali
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
                      className="mt-2 block bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-xl text-transparent"
                    >
                      <span>{displayedText}</span>
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                        className="ml-1 inline-block h-[0.9em] w-0.5 bg-white align-middle"
                      />
                    </motion.span>
                  </h1>
                  <p className="mb-6 px-2 text-xs leading-relaxed text-[--muted-foreground]">
                    I transform complex business challenges into elegant digital solutions.
                    Specializing in enterprise-grade applications, I architect systems that
                    drive operational efficiency, reduce costs, and deliver measurable ROI.
                  </p>
                  <div className="flex flex-col items-center gap-6">
                    <Link
                      href="/contact"
                      className="group relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-lg border border-[--border] px-6 py-3 text-white"
                    >
                      <motion.div
                        className="absolute inset-0 rounded-lg bg-gradient-to-r from-white/25 via-white/20 to-white/25"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                        style={{ transformOrigin: "left" }}
                      />
                      <span className="relative z-10">Get in touch</span>
                      <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>

                    <motion.div
                      className="group flex cursor-pointer flex-col items-center gap-2"
                      onClick={() => scrollToSection(skillsRef)}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{
                        y: 0,
                        opacity: scrollY > 100 ? 0 : 1,
                      }}
                      transition={{
                        y: { duration: 0.6, delay: 0.8, ease: "easeOut" },
                        opacity: { duration: 0.5, ease: "easeOut" },
                      }}
                      style={{
                        marginTop: "1.5rem",
                        pointerEvents: scrollY < 150 ? "auto" : "none",
                      }}
                    >
                      <p
                        className="text-xs uppercase tracking-wider text-[--muted-foreground] transition-colors duration-300 group-hover:text-white"
                        style={{
                          fontFamily:
                            '"Futura Bold", "Futura-Bold", Futura, "Century Gothic", -apple-system, BlinkMacSystemFont, sans-serif',
                          letterSpacing: "0.1em",
                        }}
                      >
                        Scroll to explore
                      </p>
                      <motion.div
                        className="relative"
                        animate={{ y: [0, 6, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <Mouse
                          className="h-6 w-6 text-[--muted-foreground] transition-colors duration-300 group-hover:text-white"
                          strokeWidth={1.5}
                        />
                        <motion.div
                          className="absolute left-1/2 top-[8px] h-1 w-0.5 -translate-x-1/2 rounded-full bg-[--muted-foreground] transition-colors duration-300 group-hover:bg-white"
                          animate={{
                            opacity: [0.4, 1, 0.4],
                            y: [0, 3, 6],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollSection>

          <ScrollSection
            ref={skillsRef}
            className="flex items-center justify-center py-20"
            sectionIndex={1}
          >
            <div className="w-full">
              <div className="mb-10 text-center">
                <h2 className="mb-4 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-3xl font-bold text-transparent">
                  What I Bring to the Table
                </h2>
                <p className="text-sm leading-relaxed text-[--muted-foreground]">
                  Enterprise software delivery with a focus on reliability, integration, and
                  measurable impact
                </p>
              </div>

              <div className="mx-auto grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
                {services.map((service) => {
                  const Icon = service.icon;
                  return (
                    <div key={service.title} className="glass-card p-6 text-center">
                      <Icon className="mx-auto mb-4 h-10 w-10 text-white" strokeWidth={1.5} />
                      <h3 className="mb-3 bg-gradient-to-r from-white via-gray-400 to-white bg-clip-text text-xl font-bold text-transparent">
                        {service.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-[--muted-foreground]">
                        {service.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 text-center">
                <Link
                  href="/experience"
                  className="inline-flex items-center gap-2 text-sm text-[--muted-foreground] transition-colors hover:text-white"
                >
                  View competencies and experience
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </ScrollSection>

          {FEATURED_EXPERIENCE ? (
            <ScrollSection
              ref={workRef}
              className="flex items-center justify-center py-20"
              sectionIndex={2}
            >
              <div className="w-full">
                <div className="mb-8 text-center">
                  <p className="section-label mb-3">Featured work</p>
                  <h2 className="mb-3 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text px-2 text-3xl font-bold text-transparent">
                    Recent Experience
                  </h2>
                  <p className="px-2 text-sm text-[--muted-foreground]">
                    A snapshot of where I&apos;m building today
                  </p>
                </div>

                <div className="mx-auto w-full max-w-2xl space-y-6">
                  <ExperienceCard item={FEATURED_EXPERIENCE} compact highlightLimit={2} />
                  <div className="text-center">
                    <Link
                      href="/experience"
                      className="inline-flex items-center gap-2 text-sm text-white transition-colors hover:text-[--muted-foreground]"
                    >
                      View all work
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollSection>
          ) : null}

          <ScrollSection
            ref={exploreRef}
            className="flex items-center justify-center py-20 pb-28"
            sectionIndex={3}
          >
            <div className="w-full">
              <div className="mb-8 text-center">
                <p className="section-label mb-3">Explore</p>
                <h2 className="mb-3 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-3xl font-bold text-transparent">
                  More to discover
                </h2>
                <p className="text-sm text-[--muted-foreground]">
                  Dive deeper into projects, notes, and ways to reach me
                </p>
              </div>

              <div className="mx-auto grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
                {exploreLinks.map((link) => (
                  <ExploreLinkCard key={link.href} {...link} />
                ))}
              </div>
            </div>
          </ScrollSection>
        </main>
      </div>

      <MobileNav />
    </div>
  );
}
