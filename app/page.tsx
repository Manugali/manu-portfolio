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
            className="flex min-h-[calc(100dvh-9rem)] flex-col items-center justify-center px-2 py-10 sm:py-14"
            sectionIndex={0}
            pinned
          >
            <div className="flex w-full max-w-md flex-col items-center text-center">
              <div className="group relative mb-10 shrink-0 sm:mb-12">
                <img
                  src="/profile.jpg"
                  alt="Manohar Gali"
                  className="relative h-36 w-36 rounded-full border-2 border-[--border] object-cover transition-all duration-500 group-hover:opacity-0 sm:h-40 sm:w-40"
                  style={{ objectPosition: "center 15%" }}
                />
                <img
                  src="/profilecolor.jpg"
                  alt="Manohar Gali"
                  className="absolute inset-0 h-36 w-36 rounded-full border-2 border-[--border] object-cover opacity-0 transition-all duration-500 group-hover:opacity-100 sm:h-40 sm:w-40"
                  style={{ objectPosition: "center 15%" }}
                />
              </div>

              <div className="w-full space-y-8">
                <h1 className="space-y-4 px-2">
                  <motion.span
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    className="block text-base text-[--muted-foreground] sm:text-lg"
                  >
                    Hi I&apos;m
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
                    className="block bg-gradient-to-r from-white via-white to-gray-200 bg-clip-text text-4xl font-extrabold leading-tight text-transparent sm:text-5xl"
                  >
                    Manohar Gali
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
                    className="block min-h-[1.75rem] bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-lg text-transparent sm:min-h-[2rem] sm:text-xl"
                  >
                    <span>{displayedText || "\u00A0"}</span>
                    {displayedText ? (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                        className="ml-1 inline-block h-[0.9em] w-0.5 bg-white align-middle"
                      />
                    ) : null}
                  </motion.span>
                </h1>

                <p className="mx-auto max-w-sm px-1 text-sm leading-7 text-[--muted-foreground] sm:max-w-md sm:text-base sm:leading-8">
                  I transform complex business challenges into elegant digital solutions.
                  Specializing in enterprise-grade applications, I architect systems that
                  drive operational efficiency, reduce costs, and deliver measurable ROI.
                </p>

                <motion.div
                  className="group flex cursor-pointer flex-col items-center gap-3 pt-2"
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
          </ScrollSection>

          <ScrollSection
            ref={skillsRef}
            className="flex items-center justify-center py-24 sm:py-28"
            sectionIndex={1}
          >
            <div className="w-full space-y-10 sm:space-y-12">
              <div className="space-y-4 text-center">
                <h2 className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-3xl font-bold text-transparent">
                  What I Bring to the Table
                </h2>
                <p className="mx-auto max-w-lg text-sm leading-relaxed text-[--muted-foreground] sm:text-base">
                  Enterprise software delivery with a focus on reliability, integration, and
                  measurable impact
                </p>
              </div>

              <div className="mx-auto grid w-full max-w-2xl grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
                {services.map((service) => {
                  const Icon = service.icon;
                  return (
                    <div key={service.title} className="glass-card p-6 text-center sm:p-7">
                      <Icon className="mx-auto mb-5 h-10 w-10 text-white" strokeWidth={1.5} />
                      <h3 className="mb-4 bg-gradient-to-r from-white via-gray-400 to-white bg-clip-text text-xl font-bold text-transparent">
                        {service.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-[--muted-foreground]">
                        {service.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="text-center">
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
              className="flex items-center justify-center py-24 sm:py-28"
              sectionIndex={2}
            >
              <div className="w-full space-y-10 sm:space-y-12">
                <div className="space-y-4 text-center">
                  <p className="section-label">Featured work</p>
                  <h2 className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text px-2 text-3xl font-bold text-transparent">
                    Recent Experience
                  </h2>
                  <p className="px-2 text-sm text-[--muted-foreground] sm:text-base">
                    A snapshot of where I&apos;m building today
                  </p>
                </div>

                <div className="mx-auto w-full max-w-2xl space-y-8">
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
            className="flex items-center justify-center py-24 pb-32 sm:py-28 sm:pb-36"
            sectionIndex={3}
          >
            <div className="w-full space-y-10 sm:space-y-12">
              <div className="space-y-4 text-center">
                <p className="section-label">Explore</p>
                <h2 className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-3xl font-bold text-transparent">
                  More to discover
                </h2>
                <p className="text-sm text-[--muted-foreground] sm:text-base">
                  Dive deeper into projects, notes, and ways to reach me
                </p>
              </div>

              <div className="mx-auto grid w-full max-w-2xl grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
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
