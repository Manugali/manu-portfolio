"use client";

import { CommandPalette } from "@/components/CommandPalette";
import { Topbar } from "@/components/Topbar";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ChevronDown, ArrowRight, Github, Mail, Linkedin, ExternalLink, MapPin } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { SkillBadge } from "@/components/SkillBadge";
import { ActivityCard } from "@/components/ActivityCard";
import { AIDevConsole } from "@/components/AIDevConsole";
import { ParticleField } from "@/components/ParticleField";
import { GitHubWidget } from "@/components/GitHubWidget";
import { TypingText } from "@/components/TypingText";
import { ProjectCard } from "@/components/ProjectCard";
import projects from "@/data/projects.json";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Section progress tracking
  const aboutProgress = useScroll({
    target: aboutRef,
    offset: ["start center", "end center"]
  });

  const skillsProgress = useScroll({
    target: skillsRef,
    offset: ["start center", "end center"]
  });

  const projectsProgress = useScroll({
    target: projectsRef,
    offset: ["start center", "end center"]
  });

  const contactProgress = useScroll({
    target: contactRef,
    offset: ["start center", "end center"]
  });

  // Transform values for cinematic effects
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  const skillsY = useTransform(skillsProgress.scrollYProgress, [0, 1], [100, -100]);
  const skillsOpacity = useTransform(skillsProgress.scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const projectsY = useTransform(projectsProgress.scrollYProgress, [0, 1], [100, -100]);
  const projectsOpacity = useTransform(projectsProgress.scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const contactY = useTransform(contactProgress.scrollYProgress, [0, 1], [100, -100]);
  const contactOpacity = useTransform(contactProgress.scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Additional parallax layers for hero
  const layer1Y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const layer2Y = useTransform(scrollYProgress, [0, 1], [0, 250]);

  // Update current section based on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      if (latest < 0.25) setCurrentSection(0);
      else if (latest < 0.5) setCurrentSection(1);
      else if (latest < 0.75) setCurrentSection(2);
      else setCurrentSection(3);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  const scrollToSection = (section: number) => {
    const sections = [aboutRef, skillsRef, projectsRef, contactRef];
    sections[section]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[--background] overflow-x-hidden">
      {/* Fixed Navigation */}
      <div className="fixed top-20 left-6 z-50 hidden lg:block">
        <div className="flex flex-col gap-2">
          {['About', 'Skills', 'Projects', 'Contact'].map((section, index) => (
            <motion.button
              key={section}
              onClick={() => scrollToSection(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSection === index 
                  ? 'bg-[--primary] scale-125' 
                  : 'bg-[--muted-foreground] hover:bg-[--foreground]'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <Topbar onOpenCommand={() => setOpen(true)} />
      <div className="h-16" />

      <div className="w-full">
        <div ref={containerRef} className="relative">
            {/* About Section */}
            <motion.section
              ref={aboutRef}
              style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
              className="relative min-h-screen flex items-start justify-center overflow-hidden pt-32"
            >
              {/* Advanced Background Effects */}
              <div className="absolute inset-0">
                <ParticleField />
                {/* Multiple gradient layers for depth */}
                <div className="pointer-events-none absolute -inset-32 bg-[radial-gradient(400px_200px_at_20%_30%,rgba(59,130,246,0.15),transparent_70%),radial-gradient(400px_200px_at_80%_20%,rgba(147,51,234,0.12),transparent_70%),radial-gradient(300px_150px_at_50%_80%,rgba(99,102,241,0.08),transparent_60%)]" />
                
                {/* Animated gradient orbs */}
                <motion.div
                  aria-hidden
                  style={{ y: layer1Y }}
                  className="pointer-events-none absolute -top-32 -left-32 h-80 w-80 rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-3xl"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  aria-hidden
                  style={{ y: layer2Y }}
                  className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 blur-3xl"
                  animate={{ 
                    scale: [1.1, 1, 1.1],
                    opacity: [0.2, 0.4, 0.2]
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Grid pattern overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
              </div>
              
              <div className="relative w-full max-w-7xl mx-auto px-6 py-20">
                <motion.div 
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="relative z-10"
                >
                  {/* Hero Layout - Text and Image */}
                  <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Side - Text Content */}
                    <div className="space-y-8 text-center lg:text-left">
                      {/* Hero Headline */}
                      <div className="space-y-6">
                        <motion.h1 
                          className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]"
                          initial={{ opacity: 0, y: 40 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                        >
                          <span className="block">
                            {[
                              { t: "I'm", d: 0.0, weight: "font-medium" },
                              { t: "Manohar", d: 0.1, h: true, weight: "font-black" },
                              { t: "Gali", d: 0.2, h: true, weight: "font-black" }
                            ].map((w) => (
                              <motion.span
                                key={w.t}
                                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ 
                                  duration: 0.6, 
                                  ease: [0.25, 0.46, 0.45, 0.94], 
                                  delay: 0.3 + w.d 
                                }}
                                className={`${w.weight} ${w.h ? "bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent inline-block mr-2" : "text-[--foreground] inline-block mr-2"}`}
                              >
                                {w.t}
                              </motion.span>
                            ))}
                          </span>
                        </motion.h1>
                        
                        {/* Animated Subtitle */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.8 }}
                          className="relative"
                        >
                          <TypingText
                            texts={[
                              "Full-Stack Developer",
                              "UI/UX Enthusiast", 
                              "Problem Solver",
                              "Code Architect",
                              "Tech Innovator"
                            ]}
                            speed={60}
                            pauseTime={3000}
                            className="block text-lg md:text-xl lg:text-2xl font-semibold text-[--foreground] mt-4"
                          />
                        </motion.div>
                      </div>
                      
                      {/* Introduction */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.9 }}
                        className="max-w-2xl mx-auto lg:mx-0"
                      >
                        <p className="text-base md:text-lg text-[--foreground] font-medium leading-relaxed">
                          Welcome to my digital space! I'm a passionate developer who loves turning ideas into reality.
                        </p>
                      </motion.div>

                      {/* Description */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.1 }}
                        className="max-w-2xl mx-auto lg:mx-0"
                      >
                        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                          I build <span className="text-[--primary] font-semibold">fast</span>, <span className="text-[--primary] font-semibold">delightful</span>, and <span className="text-[--primary] font-semibold">scalable</span> web applications that users love. 
                          Specializing in modern React ecosystems, cloud-native architectures, and pixel-perfect interfaces. 
                          Passionate about creating digital experiences that solve real problems and drive meaningful impact.
                        </p>
                      </motion.div>
                    </div>

                    {/* Right Side - Profile Image */}
                    <motion.div
                      initial={{ opacity: 0, x: 40, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="relative flex justify-center lg:justify-end"
                    >
                      <div className="relative group">
                        {/* Image Container */}
                        <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden">
                          {/* Your actual photo */}
                          <img 
                            src="/profile.jpg" 
                            alt="Manohar Gali" 
                            className="w-full h-full object-cover"
                            style={{ objectPosition: 'center 20%' }}
                          />
                          
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                        </div>
                        
                        {/* Floating elements around image */}
                        <motion.div
                          animate={{ 
                            y: [0, -10, 0],
                            rotate: [0, 2, 0]
                          }}
                          transition={{ 
                            duration: 4, 
                            repeat: Infinity, 
                            ease: "easeInOut" 
                          }}
                          className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-2xl blur-xl"
                        />
                        <motion.div
                          animate={{ 
                            y: [0, 10, 0],
                            rotate: [0, -2, 0]
                          }}
                          transition={{ 
                            duration: 5, 
                            repeat: Infinity, 
                            ease: "easeInOut",
                            delay: 1
                          }}
                          className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-2xl blur-xl"
                        />
                        
                        {/* Border glow effect */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-indigo-500/20 blur-sm -z-10 scale-105" />
                      </div>
                    </motion.div>
                  </div>

                </motion.div>
              </div>

              {/* Enhanced Scroll Indicator */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 }}
                className="absolute bottom-24 left-1/2 transform -translate-x-1/2"
              >
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="flex flex-col items-center gap-3 text-muted-foreground group cursor-pointer"
                >
                  <span className="text-sm font-medium tracking-wide">Scroll to explore</span>
                  <motion.div
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center"
                  >
                    <motion.div
                      animate={{ y: [0, 12, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      className="w-1 h-3 bg-muted-foreground/60 rounded-full mt-2"
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.section>

            {/* Skills Section */}
            <motion.section
              ref={skillsRef}
              style={{ y: skillsY, opacity: skillsOpacity }}
              className="relative min-h-screen flex items-center justify-center py-20"
            >
              <div className="w-full max-w-6xl mx-auto px-6">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-center space-y-12"
                >
                  <div className="space-y-4">
                    <h2 className="text-5xl md:text-7xl font-extrabold">
                      <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Skills
                      </span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                      Technologies and tools I use to bring ideas to life
                    </p>
                  </div>

                  <div className="grid gap-8 md:grid-cols-3">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      viewport={{ once: true }}
                      className="space-y-4"
                    >
                      <h3 className="text-2xl font-bold text-[--primary]">Frontend</h3>
                      <div className="flex flex-wrap gap-3 justify-center">
                        {["Next.js", "React", "TypeScript", "TailwindCSS", "Framer Motion", "ShadCN"].map((skill) => (
                          <SkillBadge key={skill} label={skill} />
                        ))}
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="space-y-4"
                    >
                      <h3 className="text-2xl font-bold text-[--primary]">Backend</h3>
                      <div className="flex flex-wrap gap-3 justify-center">
                        {[".NET", "ASP.NET Core", "EF Core", "Node.js", "tRPC", "PostgreSQL"].map((skill) => (
                          <SkillBadge key={skill} label={skill} />
                        ))}
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      viewport={{ once: true }}
                      className="space-y-4"
                    >
                      <h3 className="text-2xl font-bold text-[--primary]">Tools & Cloud</h3>
                      <div className="flex flex-wrap gap-3 justify-center">
                        {["Docker", "Vercel", "Azure", "Git", "Figma", "VS Code"].map((skill) => (
                          <SkillBadge key={skill} label={skill} />
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Activity Widgets */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="grid gap-6 lg:grid-cols-3 mt-16"
                  >
                    <ActivityCard />
                    <GitHubWidget user="Manugali" />
                    <AIDevConsole />
                  </motion.div>
                </motion.div>
              </div>
            </motion.section>

            {/* Projects Section */}
            <motion.section
              ref={projectsRef}
              style={{ y: projectsY, opacity: projectsOpacity }}
              className="relative min-h-screen flex items-center justify-center py-20"
            >
              <div className="w-full max-w-7xl mx-auto px-6">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-center space-y-12"
                >
                  <div className="space-y-4">
                    <h2 className="text-5xl md:text-7xl font-extrabold">
                      <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Projects
                      </span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                      A showcase of my recent work and side projects
                    </p>
                  </div>

                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <ProjectCard project={project} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.section>

            {/* Contact Section */}
            <motion.section
              ref={contactRef}
              style={{ y: contactY, opacity: contactOpacity }}
              className="relative min-h-screen flex items-center justify-center py-20"
            >
              <div className="w-full max-w-4xl mx-auto px-6">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-center space-y-12"
                >
                  <div className="space-y-4">
                    <h2 className="text-5xl md:text-7xl font-extrabold">
                      <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Let's Connect
                      </span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                      Ready to work together? Let's discuss your next project
                    </p>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="grid gap-6 md:grid-cols-2 max-w-2xl mx-auto"
                  >
                    <a
                      href="mailto:manoharreddygali@gmail.com"
                      className="group relative p-6 rounded-2xl border border-[--border] bg-[color-mix(in_oklch,oklch(var(--card))_60%,transparent)] backdrop-blur hover:border-[--ring] transition-all duration-300"
                    >
                      <Mail className="h-8 w-8 text-[--primary] mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Email</h3>
                      <p className="text-muted-foreground">manoharreddygali@gmail.com</p>
                    </a>

                    <a
                      href="https://github.com/Manugali"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative p-6 rounded-2xl border border-[--border] bg-[color-mix(in_oklch,oklch(var(--card))_60%,transparent)] backdrop-blur hover:border-[--ring] transition-all duration-300"
                    >
                      <Github className="h-8 w-8 text-[--primary] mb-4" />
                      <h3 className="text-xl font-semibold mb-2">GitHub</h3>
                      <p className="text-muted-foreground">@Manugali</p>
                    </a>

                    <a
                      href="https://linkedin.com/in/manu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative p-6 rounded-2xl border border-[--border] bg-[color-mix(in_oklch,oklch(var(--card))_60%,transparent)] backdrop-blur hover:border-[--ring] transition-all duration-300"
                    >
                      <Linkedin className="h-8 w-8 text-[--primary] mb-4" />
                      <h3 className="text-xl font-semibold mb-2">LinkedIn</h3>
                      <p className="text-muted-foreground">Connect with me</p>
                    </a>

                    <a
                      href="/resume.pdf"
                      className="group relative p-6 rounded-2xl border border-[--border] bg-[color-mix(in_oklch,oklch(var(--card))_60%,transparent)] backdrop-blur hover:border-[--ring] transition-all duration-300"
                    >
                      <ExternalLink className="h-8 w-8 text-[--primary] mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Resume</h3>
                      <p className="text-muted-foreground">Download PDF</p>
                    </a>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="pt-8"
                  >
                    <div className="inline-flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>United States</span>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.section>
          </div>

          <CommandPalette open={open} onOpenChange={setOpen} />
      </div>
    </div>
  );
}