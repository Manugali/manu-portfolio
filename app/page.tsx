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
  Download,
} from "lucide-react";
import { useState, useRef, useEffect, forwardRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import experience from "@/data/experience.json";
import workProfile from "@/data/work-profile.json";
import { SiteBackground } from "@/components/SiteBackground";
import { MobileNav } from "@/components/MobileNav";
import { ExperienceCard } from "@/components/ExperienceCard";
import { ExploreLinkCard } from "@/components/ExploreLinkCard";
import { WorkStats } from "@/components/WorkStats";
import { cn } from "@/lib/utils";
import { PAGE_VERTICAL, SITE_CONTAINER, SITE_PADDING } from "@/lib/layout";

const ScrollSection = forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode;
    className?: string;
    sectionIndex: number;
    pinned?: boolean;
  }
>(({ children, className = "", sectionIndex, pinned = false }, ref) => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref as React.RefObject<HTMLDivElement>,
    offset: ["start 0.85", "end 0.15"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    prefersReducedMotion || pinned ? [1, 1, 1, 1] : [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion || pinned
      ? [0, 0]
      : sectionIndex % 2 === 0
        ? [32, -32]
        : [-32, 32]
  );

  return (
    <motion.section
      ref={ref}
      className={className}
      style={{
        opacity,
        y,
      }}
    >
      {children}
    </motion.section>
  );
});

ScrollSection.displayName = "ScrollSection";

const TITLES = [
  "Applications Engineer",
  "Enterprise .NET Developer",
  "Integration Specialist",
  "Financial Services Software",
] as const;

const PROOF_TAGS = [".NET", "SQL Server", "Azure", "Financial Services"] as const;

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

const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

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
        }, 80);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2400);
      }
    } else if (displayedText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(displayedText.slice(0, -1));
      }, 40);
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
              <div className="portrait-frame group relative mb-8 shrink-0 sm:mb-10">
                <img
                  src="/profile.jpg"
                  alt="Manohar Gali"
                  className="relative h-36 w-36 rounded-full border-2 border-[color-mix(in_srgb,#ffffff_12%,var(--border))] object-cover transition-all duration-500 group-hover:opacity-0 sm:h-40 sm:w-40"
                  style={{ objectPosition: "center 15%" }}
                />
                <img
                  src="/profilecolor.jpg"
                  alt="Manohar Gali"
                  className="absolute inset-0 h-36 w-36 rounded-full border-2 border-[color-mix(in_srgb,#ffffff_12%,var(--border))] object-cover opacity-0 transition-all duration-500 group-hover:scale-[1.02] group-hover:opacity-100 sm:h-40 sm:w-40"
                  style={{ objectPosition: "center 15%" }}
                />
              </div>

              <div className="w-full space-y-7">
                <div className="availability-badge mx-auto">
                  <span className="availability-dot" aria-hidden />
                  Open to opportunities
                </div>

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
                    className="gradient-text-hero block text-4xl font-semibold leading-tight sm:text-5xl"
                  >
                    Manohar Gali
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
                    className="block min-h-[1.75rem] bg-gradient-to-r from-[--accent] via-gray-300 to-[--accent] bg-clip-text text-lg text-transparent sm:min-h-[2rem] sm:text-xl"
                  >
                    <span>{displayedText || "\u00A0"}</span>
                    {displayedText ? (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                        className="ml-1 inline-block h-[0.9em] w-0.5 bg-[--accent] align-middle"
                      />
                    ) : null}
                  </motion.span>
                </h1>

                <p className="mx-auto max-w-sm px-1 text-sm leading-7 text-[--muted-foreground] sm:max-w-md sm:text-base sm:leading-8">
                  I build internal platforms in regulated financial environments — .NET
                  backends, SQL-heavy data layers, and integrations that have to work with
                  legacy systems.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-2">
                  {PROOF_TAGS.map((tag) => (
                    <span key={tag} className="tech-pill text-[11px] text-[--muted-foreground]">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col items-center justify-center gap-3 pt-1 sm:flex-row">
                  <Link href="/experience" className="btn-primary">
                    View my work
                    <ArrowRight className="h-4 w-4" strokeWidth={1.25} />
                  </Link>
                  <Link href="/resume" className="btn-ghost">
                    <Download className="h-4 w-4" strokeWidth={1.25} />
                    Resume
                  </Link>
                </div>

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
                  <p className="section-label transition-colors duration-300 group-hover:text-white">
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
                      strokeWidth={1.25}
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

          <div className="section-divider" />

          <ScrollSection
            ref={skillsRef}
            className="flex items-center justify-center py-24 sm:py-28"
            sectionIndex={1}
          >
            <div className="w-full space-y-10 sm:space-y-12">
              <div className="space-y-4 text-center">
                <p className="section-number">01</p>
                <h2 className="gradient-text-soft text-3xl font-semibold tracking-tight">
                  What I Bring to the Table
                </h2>
                <p className="mx-auto max-w-lg text-sm leading-relaxed text-[--muted-foreground] sm:text-base">
                  Enterprise software delivery with a focus on reliability, integration, and
                  measurable impact
                </p>
              </div>

              <motion.div
                className="mx-auto grid w-full max-w-2xl grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
              >
                {services.map((service) => {
                  const Icon = service.icon;
                  return (
                    <motion.div
                      key={service.title}
                      variants={staggerItem}
                      className="glass-card p-6 text-center sm:p-7"
                    >
                      <div className="icon-container mx-auto mb-5 h-12 w-12">
                        <Icon className="h-6 w-6 text-white" strokeWidth={1.25} />
                      </div>
                      <h3 className="mb-4 text-xl font-semibold gradient-text-soft">
                        {service.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-[--muted-foreground]">
                        {service.description}
                      </p>
                    </motion.div>
                  );
                })}
              </motion.div>

              <div className="mx-auto w-full max-w-2xl">
                <WorkStats stats={workProfile.stats} />
              </div>

              <div className="text-center">
                <Link
                  href="/experience"
                  className="link-underline inline-flex items-center gap-2 text-sm text-[--muted-foreground] transition-colors hover:text-white"
                >
                  View competencies and experience
                  <ArrowRight className="h-4 w-4" strokeWidth={1.25} />
                </Link>
              </div>
            </div>
          </ScrollSection>

          <div className="section-divider" />

          {FEATURED_EXPERIENCE ? (
            <ScrollSection
              ref={workRef}
              className="flex items-center justify-center py-24 sm:py-28"
              sectionIndex={2}
            >
              <div className="w-full space-y-10 sm:space-y-12">
                <div className="space-y-4 text-center">
                  <p className="section-number">02</p>
                  <p className="section-label">Featured work</p>
                  <h2 className="gradient-text-soft px-2 text-3xl font-semibold">
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
                      className="link-underline inline-flex items-center gap-2 text-sm text-white transition-colors hover:text-[--muted-foreground]"
                    >
                      View all work
                      <ArrowRight className="h-4 w-4" strokeWidth={1.25} />
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollSection>
          ) : null}

          <div className="section-divider" />

          <ScrollSection
            ref={exploreRef}
            className="flex items-center justify-center py-24 pb-32 sm:py-28 sm:pb-36"
            sectionIndex={3}
          >
            <div className="w-full space-y-10 sm:space-y-12">
              <div className="space-y-4 text-center">
                <p className="section-number">03</p>
                <p className="section-label">Explore</p>
                <h2 className="gradient-text-soft text-3xl font-semibold tracking-tight">
                  More to discover
                </h2>
                <p className="text-sm text-[--muted-foreground] sm:text-base">
                  Dive deeper into projects, notes, and ways to reach me
                </p>
              </div>

              <motion.div
                className="mx-auto grid w-full max-w-2xl grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
              >
                {exploreLinks.map((link) => (
                  <motion.div key={link.href} variants={staggerItem}>
                    <ExploreLinkCard {...link} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </ScrollSection>
        </main>
      </div>

      <MobileNav />
    </div>
  );
}
