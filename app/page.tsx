"use client";

import { Topbar } from "@/components/Topbar";
import { ArrowRight, Brain, Rocket, Wrench, Users, Lightbulb, Mail, Phone, Mouse } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import experience from "@/data/experience.json";
import { Footer } from "@/components/Footer";
import LightRays from "@/components/LightRays";
import { forwardRef } from "react";

// Scroll-driven section wrapper component with creative transitions
const ScrollSection = forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; className?: string; sectionIndex: number }
>(({ children, className = "", sectionIndex }, ref) => {
  const { scrollYProgress } = useScroll({
    target: ref as React.RefObject<HTMLDivElement>,
    offset: ["start 0.8", "end 0.2"]
  });

  // Blur effect - sections blur as they enter/leave viewport (smooth focus effect)
  const blur = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [10, 0, 0, 10]
  );

  // Opacity fade - sections fade in smoothly
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );

  // Scale effect - subtle zoom when in focus
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.9, 1, 0.9]
  );

  // Parallax Y movement - alternating directions for visual interest
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    sectionIndex % 2 === 0 ? [100, -100] : [-100, 100]
  );

  return (
    <motion.section
      ref={ref}
      className={className}
      style={{
        filter: `blur(${blur}px)`,
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

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const titles = [
    "AI Enthusiast",
    "Code Artisan",
    "Tech Explorer",
    "Innovation Seeker"
  ];

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
    const currentTitle = titles[currentTitleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      // Typing
      if (displayedText.length < currentTitle.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentTitle.slice(0, displayedText.length + 1));
        }, 100);
      } else {
        // Finished typing, wait then start deleting
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      // Deleting
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 50);
      } else {
        // Finished deleting, move to next title
        setIsDeleting(false);
        setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentTitleIndex, titles]);

  // Update scroll progress and scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setScrollY(scrollTop);
      
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const totalScrollable = documentHeight - windowHeight;
      const progress = totalScrollable > 0 ? (scrollTop / totalScrollable) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
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
    <div className="min-h-screen text-[--foreground] relative" style={{
      background: 'linear-gradient(135deg, #0A0A0A 0%, #0F0F0F 25%, #111111 50%, #0F0F0F 75%, #0A0A0A 100%)',
      backgroundAttachment: 'fixed'
    }}>
      {/* Light Rays Background Effect */}
      <div className="fixed inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
          className="custom-rays"
        />
      </div>

      <Topbar
        sections={['About', 'Skills', 'Experience', 'Contact']}
        currentSection={currentSection}
        onSelectSection={(i) => scrollToSection(i)}
      />

      {/* Scroll Progress Indicator - Compact Left Side Design */}
      <div className="fixed left-4 md:left-6 top-1/2 -translate-y-1/2 h-60 md:h-72 w-px bg-gray-800/30 z-[70] pointer-events-none">
        {/* Static dots along the line - including start and end */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => {
            // Dots at 0%, 20%, 40%, 60%, 80%, 100% - perfectly evenly spaced
            const dotProgress = i * 20;
            const isActive = scrollProgress >= dotProgress;
            // Perfectly even spacing: 0%, 20%, 40%, 60%, 80%, 100%
            const dotPosition = i === 0 ? '0%' : i === 5 ? '100%' : `${i * 20}%`;
            const brightness = isActive ? 1 : 0.2;
            const glowIntensity = isActive ? 0.8 : 0;
            
            return (
              <motion.div
                key={i}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full"
                style={{
                  top: dotPosition,
                  backgroundColor: `rgba(255, 255, 255, ${brightness})`,
                  boxShadow: `0 0 ${4 * glowIntensity}px rgba(255, 255, 255, ${0.3 * glowIntensity})`,
                }}
                animate={{
                  opacity: brightness,
                  scale: isActive ? [1, 1.4, 1.2] : 1,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.4, 0, 0.2, 1],
                }}
              />
            );
          })}
        </div>
        
        {/* Falling light - gradient line that flows down */}
        <motion.div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-white via-gray-300 to-white"
          style={{
            height: `${scrollProgress}%`,
            maxHeight: '100%',
            opacity: 0.7,
            boxShadow: '0 0 8px rgba(255, 255, 255, 0.2), inset 0 0 5px rgba(255, 255, 255, 0.1)',
            filter: 'blur(0.2px)',
          }}
          initial={{ height: 0 }}
          animate={{ height: `${scrollProgress}%` }}
          transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>

      <main className="pt-16 md:pt-24">
        {/* Hero Section */}
        <ScrollSection
          ref={aboutRef}
          className="min-h-screen flex items-center justify-center py-12 md:py-20 px-4 md:px-6"
          sectionIndex={0}
        >
          <div className="max-w-7xl mx-auto w-full">
            <div className="flex flex-col items-center text-center gap-12 lg:gap-16">
              {/* Profile Picture */}
              <div className="flex-shrink-0 group relative">
                {/* Default version */}
                <img
                  src="/profile.jpg"
                  alt="Manohar Gali"
                  className="relative w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-full object-cover border-2 border-[--border] transition-all duration-500 group-hover:opacity-0"
                  style={{ objectPosition: 'center 15%' }}
                />
                {/* Color version (on hover) */}
                <img
                  src="/profilecolor.jpg"
                  alt="Manohar Gali"
                  className="absolute inset-0 w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-full object-cover border-2 border-[--border] transition-all duration-500 opacity-0 group-hover:opacity-100"
                  style={{ objectPosition: 'center 15%' }}
                />
              </div>

              {/* Hero Content */}
              <div className="flex-1 max-w-3xl mx-auto">
                <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 leading-tight px-2">
                  <motion.span
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    className="block text-[--muted-foreground]"
                  >
                    Hi I'm
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
                    className="block bg-gradient-to-r from-white via-white to-gray-200 bg-clip-text text-transparent font-extrabold text-4xl md:text-5xl lg:text-6xl xl:text-7xl mt-1 md:mt-2"
                  >
                    Manohar Gali
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
                    className="block bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent text-xl md:text-2xl lg:text-3xl mt-2"
                  >
                    <span>{displayedText}</span>
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                      className="inline-block ml-1 w-0.5 h-[0.9em] bg-white align-middle"
                    />
                  </motion.span>
                </h1>
                <p className="text-xs md:text-sm lg:text-base text-[--muted-foreground] mb-6 md:mb-8 leading-relaxed max-w-2xl mx-auto px-2">
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
          className="min-h-screen flex items-center justify-center py-12 md:py-20 px-4 md:px-6"
          sectionIndex={1}
        >
          <div className="max-w-7xl mx-auto w-full">
            <div className="text-center mb-16 md:mb-24">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
                What I Bring to the Table
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-[--muted-foreground] max-w-2xl mx-auto leading-relaxed">
                Combining technical expertise with a problem-solving mindset to deliver solutions that matter
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 max-w-5xl mx-auto">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div
                    key={index}
                    className="p-8 md:p-10 rounded-lg border border-[--border] bg-[--card] hover:border-[--muted-foreground] transition-all duration-300 hover:scale-[1.02]"
                  >
                    <Icon className="h-10 w-10 md:h-12 md:w-12 text-white mb-6" strokeWidth={1.5} />
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-white via-gray-400 to-white bg-clip-text text-transparent">{service.title}</h3>
                    <p className="text-sm md:text-base lg:text-lg text-[--muted-foreground] leading-relaxed">
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
          className="min-h-screen flex items-center justify-center py-12 md:py-20 px-4 md:px-6"
          sectionIndex={2}
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent px-2">
                Experience
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-[--muted-foreground] max-w-2xl mx-auto px-2">
                Building solutions that drive digital transformation and deliver measurable impact
              </p>
            </div>

            <div className="space-y-6">
              {experience.map((item, index) => (
                <div
                  key={`${item.company}-${item.role}-${index}`}
                  className="p-4 md:p-6 rounded-lg border border-[--border] bg-[--card] hover:border-[--muted-foreground] transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-1 bg-gradient-to-r from-white via-gray-400 to-white bg-clip-text text-transparent">
                        {item.role}
                      </h3>
                      <p className="text-base md:text-lg text-[--muted-foreground]">{item.company}</p>
                      {item.location && (
                        <p className="text-sm text-[--muted-foreground] mt-1">{item.location}</p>
                      )}
                    </div>
                    <div className="text-sm md:text-base text-[--muted-foreground] whitespace-nowrap">
                      {item.period}
                    </div>
                  </div>
                  <p className="text-sm md:text-base text-[--muted-foreground] mb-4 leading-relaxed">
                    {item.summary}
                  </p>
                  <ul className="space-y-2">
                    {item.highlights.map((highlight: string, idx: number) => (
                      <li key={idx} className="text-xs md:text-sm text-[--muted-foreground] flex items-start gap-3">
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
          className="min-h-screen flex items-center justify-center py-12 md:py-20 px-4 md:px-6"
          sectionIndex={3}
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
                        Let's Connect
                      </h2>
              <p className="text-lg text-[--muted-foreground] max-w-2xl mx-auto">
                Have a problem to solve or a product to ship? Let's build it right.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <div className="p-4 md:p-6 rounded-lg border border-[--border] bg-[--card] hover:border-[--muted-foreground] transition-colors">
                <Mail className="h-6 w-6 md:h-8 md:w-8 text-white mb-3 md:mb-4" strokeWidth={1.5} />
                <h3 className="text-lg md:text-xl font-bold mb-2 bg-gradient-to-r from-white via-gray-400 to-white bg-clip-text text-transparent">Get in Touch</h3>
                <p className="text-sm md:text-base text-[--muted-foreground] mb-3 md:mb-4">
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

              <div className="p-6 rounded-lg border border-[--border] bg-[--card] hover:border-[--muted-foreground] transition-colors">
                <Lightbulb className="h-8 w-8 text-white mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-white via-gray-400 to-white bg-clip-text text-transparent">Let's Build Together</h3>
                <p className="text-[--muted-foreground] mb-4">
                  I'm open to interesting projects and opportunities. Let's discuss how we can work together to bring your ideas to life.
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

      <Footer />
    </div>
  );
}
