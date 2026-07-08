"use client";

import { Topbar } from "@/components/Topbar";
import { ArrowRight, Brain, Rocket, Wrench, Users, Lightbulb, Mail, Phone, Mouse } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import experience from "@/data/experience.json";
import { SiteBackground } from "@/components/SiteBackground";
import { TechStack } from "@/components/TechStack";
import { MobileNav } from "@/components/MobileNav";
import { forwardRef } from "react";

// Scroll-driven section wrapper component with creative transitions
const ScrollSection = forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; className?: string; sectionIndex: number }
>(({ children, className = "", sectionIndex }, ref) => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref as React.RefObject<HTMLDivElement>,
    offset: ["start 0.8", "end 0.2"]
  });

  const blur = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    prefersReducedMotion ? [0, 0, 0, 0] : [10, 0, 0, 10]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    prefersReducedMotion ? [1, 1, 1, 1] : [0, 1, 1, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    prefersReducedMotion ? [1, 1, 1] : [0.9, 1, 0.9]
  );

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : sectionIndex % 2 === 0 ? [100, -100] : [-100, 100]
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

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (section: number) => {
    // Update currentSection immediately to prevent underline from animating through intermediate positions
    setCurrentSection(section);
    const sections = [aboutRef, skillsRef, experienceRef, contactRef];
    sections[section]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Typing effect for titles
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

  // Update scroll position for hero scroll hint
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY || document.documentElement.scrollTop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update current section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      if (aboutRef.current && scrollPosition >= aboutRef.current.offsetTop && scrollPosition < (skillsRef.current?.offsetTop || Infinity)) {
        setCurrentSection(0);
      } else if (skillsRef.current && scrollPosition >= skillsRef.current.offsetTop && scrollPosition < (experienceRef.current?.offsetTop || Infinity)) {
        setCurrentSection(1);
      } else if (experienceRef.current && scrollPosition >= experienceRef.current.offsetTop && scrollPosition < (contactRef.current?.offsetTop || Infinity)) {
        setCurrentSection(2);
      } else if (contactRef.current && scrollPosition >= contactRef.current.offsetTop) {
        setCurrentSection(3);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      icon: Brain,
      title: "Full-Stack Development",
      description: "Building end-to-end solutions with .NET, ASP.NET Core, and modern web technologies. From backend APIs to responsive frontends, I create cohesive systems."
    },
    {
      icon: Rocket,
      title: "System Integration",
      description: "Seamlessly connecting new applications with legacy systems and databases. Specialized in complex integrations that enable real-time data flow and improved workflows."
    },
    {
      icon: Wrench,
      title: "Performance Optimization",
      description: "Writing efficient SQL queries, optimizing database operations, and improving application performance to deliver faster, more reliable experiences."
    },
    {
      icon: Users,
      title: "Collaborative Problem Solving",
      description: "Working effectively within cross-functional teams to solve complex problems, deliver quality software, and drive digital transformation initiatives."
    }
  ];

  return (
    <div className="relative mx-auto min-h-screen w-full max-w-lg lg:max-w-5xl xl:max-w-6xl text-[--foreground]" style={{
      background: 'linear-gradient(135deg, #0A0A0A 0%, #0F0F0F 25%, #111111 50%, #0F0F0F 75%, #0A0A0A 100%)',
      backgroundAttachment: 'fixed'
    }}>
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <SiteBackground />
      </div>

      <Topbar />

      <main className="px-3 pt-[4.5rem] pb-24">
        {/* Hero Section */}
        <ScrollSection
          ref={aboutRef}
          className="min-h-screen flex items-center justify-center py-12"
          sectionIndex={0}
        >
          <div className="w-full">
            <div className="flex flex-col items-center text-center gap-10">
              {/* Profile Picture */}
              <div className="flex-shrink-0 group relative">
                <img
                  src="/profile.jpg"
                  alt="Manohar Gali"
                  className="relative w-32 h-32 rounded-full object-cover border-2 border-[--border] transition-all duration-500 group-hover:opacity-0"
                  style={{ objectPosition: 'center 15%' }}
                />
                <img
                  src="/profilecolor.jpg"
                  alt="Manohar Gali"
                  className="absolute inset-0 w-32 h-32 rounded-full object-cover border-2 border-[--border] transition-all duration-500 opacity-0 group-hover:opacity-100"
                  style={{ objectPosition: 'center 15%' }}
                />
              </div>

              {/* Hero Content */}
              <div className="w-full">
                <h1 className="text-3xl font-bold mb-4 leading-tight px-2">
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
                    className="block bg-gradient-to-r from-white via-white to-gray-200 bg-clip-text text-transparent font-extrabold text-4xl mt-1"
                  >
                    Manohar Gali
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
                    className="block bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent text-xl mt-2"
                  >
                    <span>{displayedText}</span>
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                      className="inline-block ml-1 w-0.5 h-[0.9em] bg-white align-middle"
                    />
                  </motion.span>
                </h1>
                <p className="text-xs text-[--muted-foreground] mb-6 leading-relaxed px-2">
                  I transform complex business challenges into elegant digital solutions. Specializing in enterprise-grade applications, 
                  I architect systems that drive operational efficiency, reduce costs, and deliver measurable ROI. 
                  From legacy system modernization to building next-generation platforms, I combine technical depth with business acumen 
                  to ship products that users love and stakeholders trust.
                </p>
                <div className="flex flex-col items-center gap-6">
                  <motion.button
                    onClick={scrollToContact}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative inline-flex items-center gap-2 px-6 py-3 border border-[--border] rounded-lg text-white overflow-hidden group cursor-pointer"
                  >
                    {/* Gradient Fill Background on Hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/25 via-white/20 to-white/25 rounded-lg"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                      style={{ transformOrigin: 'left' }}
                    />
                    <span className="relative z-10">Get in touch</span>
                    <ArrowRight className="relative z-10 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                  
                  {/* Scroll to Explore */}
                  <motion.div
                    className="flex flex-col items-center gap-2 cursor-pointer group"
                    onClick={() => scrollToSection(1)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      y: 0,
                      opacity: scrollY > 100 ? 0 : 1
                    }}
                    transition={{ 
                      y: { duration: 0.6, delay: 0.8, ease: 'easeOut' },
                      opacity: { duration: 0.5, ease: 'easeOut' }
                    }}
                    style={{
                      marginTop: '3rem',
                      pointerEvents: scrollY < 150 ? 'auto' : 'none',
                    }}
                  >
                    <p className="text-xs text-[--muted-foreground] uppercase tracking-wider group-hover:text-white transition-colors duration-300" style={{
                      fontFamily: '"Futura Bold", "Futura-Bold", Futura, "Century Gothic", -apple-system, BlinkMacSystemFont, sans-serif',
                      letterSpacing: '0.1em',
                    }}>
                      Scroll to explore
                    </p>
                    <motion.div
                      className="relative"
                      animate={{ y: [0, 6, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      {/* Mouse icon */}
                      <Mouse className="h-6 w-6 text-[--muted-foreground] group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                      
                      {/* Animated scroll wheel - Main dot */}
                      <motion.div
                        className="absolute top-[8px] left-1/2 -translate-x-1/2 w-0.5 h-1 rounded-full bg-[--muted-foreground] group-hover:bg-white transition-colors duration-300"
                        animate={{
                          opacity: [0.4, 1, 0.4],
                          y: [0, 3, 6],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: 0,
                        }}
                      />
                      
                      {/* Trailing scroll dot 1 */}
                      <motion.div
                        className="absolute top-[8px] left-1/2 -translate-x-1/2 w-0.5 h-1 rounded-full bg-[--muted-foreground] group-hover:bg-white transition-colors duration-300"
                        animate={{
                          opacity: [0, 0.6, 0],
                          y: [0, 3, 6],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: 0.25,
                        }}
                      />
                      
                      {/* Trailing scroll dot 2 */}
                      <motion.div
                        className="absolute top-[8px] left-1/2 -translate-x-1/2 w-0.5 h-1 rounded-full bg-[--muted-foreground] group-hover:bg-white transition-colors duration-300"
                        animate={{
                          opacity: [0, 0.4, 0],
                          y: [0, 3, 6],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: 0.5,
                        }}
                      />
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </ScrollSection>

        {/* What I can offer Section */}
        <ScrollSection
          ref={skillsRef}
          className="min-h-screen flex items-center justify-center py-12"
          sectionIndex={1}
        >
          <div className="w-full">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
                What I Bring to the Table
              </h2>
              <p className="text-sm text-[--muted-foreground] leading-relaxed">
                Combining technical expertise with a problem-solving mindset to deliver solutions that matter
              </p>
            </div>

            <div className="mb-10">
              <div className="text-center mb-6">
                <p className="section-label mb-3">Toolbox</p>
                <h3 className="text-2xl font-bold gradient-text">Tech Stack</h3>
              </div>
              <TechStack />
            </div>

            <div className="grid grid-cols-1 gap-4">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div
                    key={index}
                    className="glass-card p-6"
                  >
                    <Icon className="h-10 w-10 text-white mb-4" strokeWidth={1.5} />
                    <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-white via-gray-400 to-white bg-clip-text text-transparent">{service.title}</h3>
                    <p className="text-sm text-[--muted-foreground] leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollSection>

        {/* Experience Section */}
        <ScrollSection
          ref={experienceRef}
          className="min-h-screen flex items-center justify-center py-12"
          sectionIndex={2}
        >
          <div className="w-full">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent px-2">
                Experience
              </h2>
              <p className="text-sm text-[--muted-foreground] px-2">
                Building solutions that drive digital transformation and deliver measurable impact
              </p>
            </div>

            <div className="space-y-4">
              {experience.map((item, index) => (
                <div
                  key={`${item.company}-${item.role}-${index}`}
                  className="glass-card p-4"
                >
                  <div className="flex flex-col gap-3 mb-4">
                    <div>
                      <h3 className="text-lg font-bold mb-1 bg-gradient-to-r from-white via-gray-400 to-white bg-clip-text text-transparent">
                        {item.role}
                      </h3>
                      <p className="text-sm text-[--muted-foreground]">{item.company}</p>
                      {item.location && (
                        <p className="text-sm text-[--muted-foreground] mt-1">{item.location}</p>
                      )}
                    </div>
                    <div className="text-sm text-[--muted-foreground]">
                      {item.period}
                    </div>
                  </div>
                  <p className="text-sm text-[--muted-foreground] mb-4 leading-relaxed">
                    {item.summary}
                  </p>
                  <ul className="space-y-2">
                    {item.highlights.map((highlight: string, idx: number) => (
                      <li key={idx} className="text-xs text-[--muted-foreground] flex items-start gap-3">
                        <span className="text-white mt-1.5 flex-shrink-0">•</span>
                        <span className="leading-relaxed">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </ScrollSection>

        {/* Contact Section */}
        <ScrollSection
          ref={contactRef}
          className="min-h-screen flex items-center justify-center py-12"
          sectionIndex={3}
        >
          <div className="w-full">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
                Let&apos;s Connect
              </h2>
              <p className="text-sm text-[--muted-foreground]">
                Have a problem to solve or a product to ship? Let&apos;s build it right.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="glass-card p-4">
                <Mail className="h-6 w-6 text-white mb-3" strokeWidth={1.5} />
                <h3 className="text-lg font-bold mb-2 bg-gradient-to-r from-white via-gray-400 to-white bg-clip-text text-transparent">Get in Touch</h3>
                <p className="text-sm text-[--muted-foreground] mb-3">
                  Have a project in mind or want to discuss opportunities? Feel free to reach out.
                </p>
                <div className="space-y-2">
                  <a 
                    href="mailto:manoharreddygali19061999@gmail.com" 
                    className="flex items-center gap-2 text-sm text-[--muted-foreground] hover:text-white transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    <span>manoharreddygali19061999@gmail.com</span>
                  </a>
                  <a 
                    href="tel:8067019862" 
                    className="flex items-center gap-2 text-sm text-[--muted-foreground] hover:text-white transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    <span>806-701-9862</span>
                  </a>
                </div>
              </div>

              <div className="glass-card p-4">
                <Lightbulb className="h-6 w-6 text-white mb-3" strokeWidth={1.5} />
                <h3 className="text-lg font-bold mb-2 bg-gradient-to-r from-white via-gray-400 to-white bg-clip-text text-transparent">Let&apos;s Build Together</h3>
                <p className="text-sm text-[--muted-foreground] mb-4">
                  I&apos;m open to interesting projects and opportunities. Let&apos;s discuss how we can work together to bring your ideas to life.
                </p>
                <motion.button
                  onClick={() => window.location.href = 'mailto:manoharreddygali19061999@gmail.com'}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative inline-flex items-center gap-2 px-4 py-2 border border-[--border] rounded-lg text-white overflow-hidden group text-sm"
                >
                  {/* Gradient Fill Background on Hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/25 via-white/20 to-white/25 rounded-lg"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    style={{ transformOrigin: 'left' }}
                  />
                  <span className="relative z-10">Send Message</span>
                  <ArrowRight className="relative z-10 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </div>
          </div>
        </ScrollSection>
      </main>

      <MobileNav />
    </div>
  );
}
