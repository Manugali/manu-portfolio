"use client";

import Link from "next/link";
import Image from "next/image";
import { Topbar } from "@/components/Topbar";
import { ArrowRight, Brain, Rocket, Briefcase, BookText, Mail } from "lucide-react";
import { motion } from "framer-motion";
import experience from "@/data/experience.json";
import { SiteBackground } from "@/components/SiteBackground";
import { MobileNav } from "@/components/MobileNav";
import { ExperienceCard } from "@/components/ExperienceCard";
import { useLoaderBlocking } from "@/components/InitialLoader";
import { cn } from "@/lib/utils";
import { PAGE_VERTICAL, SITE_CONTAINER, SITE_PADDING } from "@/lib/layout";

const FEATURED_EXPERIENCE = experience[0];

const services = [
  {
    icon: Brain,
    title: "Full-Stack Development",
    description:
      "End-to-end solutions with .NET, ASP.NET Core, and modern web — from APIs to responsive frontends.",
  },
  {
    icon: Rocket,
    title: "System Integration",
    description:
      "Connecting new applications with legacy systems and databases for reliable, real-time data flow.",
  },
] as const;

const exploreLinks = [
  {
    href: "/experience",
    icon: Briefcase,
    label: "Work",
    title: "Experience & skills",
    description: "Enterprise delivery in financial services — architecture through deployment.",
  },
  {
    href: "/blog",
    icon: BookText,
    label: "Notes",
    title: "Writing & ideas",
    description: "Thoughts on building software, learning, and working in enterprise teams.",
  },
  {
    href: "/contact",
    icon: Mail,
    label: "Contact",
    title: "Get in touch",
    description: "Open to full-time roles and projects where reliability and integration matter.",
  },
] as const;

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] as const },
  },
};

export default function Home() {
  const isLoading = useLoaderBlocking();
  const show = !isLoading;

  return (
    <div className="relative min-h-screen w-full bg-[--background] text-[--foreground]">
      <SiteBackground />
      <div className={cn(SITE_CONTAINER, SITE_PADDING, "relative z-10")}>
        <Topbar />

        <motion.main
          className={cn("mx-auto w-full max-w-2xl", PAGE_VERTICAL)}
          initial="hidden"
          animate={show ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
          }}
        >
          <section className="flex flex-col items-center px-2 py-16 text-center sm:py-20">
            <motion.div variants={itemVariants} className="group relative mb-8">
              <Image
                src="/profile.jpg"
                alt="Manohar Gali"
                width={160}
                height={160}
                priority
                className="relative z-10 h-36 w-36 rounded-full border border-[--border] object-cover transition-opacity duration-300 group-hover:opacity-0 sm:h-40 sm:w-40"
                style={{ objectPosition: "center 15%" }}
              />
              <Image
                src="/profilecolor.jpg"
                alt=""
                aria-hidden
                width={160}
                height={160}
                className="absolute inset-0 h-36 w-36 rounded-full border border-[--border] object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:h-40 sm:w-40"
                style={{ objectPosition: "center 15%" }}
              />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <p className="text-sm text-[--muted-foreground] sm:text-base">Hi, I&apos;m</p>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Manohar Gali</h1>
              <p className="text-lg text-[--muted-foreground] sm:text-xl">
                Applications Engineer · Enterprise .NET
              </p>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-md text-sm leading-7 text-[--muted-foreground] sm:text-base sm:leading-8"
            >
              I build internal platforms in regulated financial environments — .NET backends,
              SQL-heavy data layers, and integrations that work with legacy systems.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Link href="/experience" className="btn-primary">
                View my work
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="btn-secondary">
                Contact me
              </Link>
            </motion.div>
          </section>

          <motion.section variants={itemVariants} className="space-y-8 py-16 sm:py-20">
            <div className="space-y-3 text-center">
              <p className="section-label">Capabilities</p>
              <h2 className="section-title">What I do</h2>
              <p className="section-copy">
                Enterprise software with a focus on reliability, integration, and maintainability.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <article key={service.title} className="glass-card p-6">
                    <Icon className="mb-4 h-8 w-8 text-white" strokeWidth={1.5} />
                    <h3 className="mb-2 text-lg font-semibold">{service.title}</h3>
                    <p className="text-sm leading-relaxed text-[--muted-foreground]">
                      {service.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </motion.section>

          {FEATURED_EXPERIENCE ? (
            <motion.section variants={itemVariants} className="space-y-8 py-16 sm:py-20">
              <div className="space-y-3 text-center">
                <p className="section-label">Experience</p>
                <h2 className="section-title">Where I work today</h2>
              </div>
              <ExperienceCard item={FEATURED_EXPERIENCE} compact highlightLimit={2} />
              <div className="text-center">
                <Link
                  href="/experience"
                  className="inline-flex items-center gap-2 text-sm text-[--muted-foreground] transition-colors hover:text-white"
                >
                  Full profile
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.section>
          ) : null}

          <motion.section variants={itemVariants} className="space-y-8 py-16 pb-8 sm:py-20">
            <div className="space-y-3 text-center">
              <p className="section-label">Explore</p>
              <h2 className="section-title">Around the site</h2>
            </div>

            <div className="grid gap-4">
              {exploreLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="glass-card glass-card-interactive flex items-start gap-4 p-5"
                  >
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-white" strokeWidth={1.5} />
                    <div className="min-w-0 text-left">
                      <p className="section-label mb-1">{link.label}</p>
                      <h3 className="font-semibold">{link.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-[--muted-foreground]">
                        {link.description}
                      </p>
                    </div>
                    <ArrowRight className="ml-auto h-4 w-4 shrink-0 self-center text-[--muted-foreground]" />
                  </Link>
                );
              })}
            </div>
          </motion.section>
        </motion.main>
      </div>

      <MobileNav />
    </div>
  );
}
