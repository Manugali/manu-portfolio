"use client";

import { Topbar } from "@/components/Topbar";
import { ArrowRight, Brain, Rocket, Wrench, Users, Lightbulb, Mail, Phone } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import experience from "@/data/experience.json";
import { Footer } from "@/components/Footer";
import LightRays from "@/components/LightRays";

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
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
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
      </div>

      <Topbar
        sections={['About', 'Skills', 'Experience', 'Contact']}
        currentSection={currentSection}
        onSelectSection={(i) => scrollToSection(i)}
      />

      <main className="pt-24">
        {/* Hero Section */}
        <section
          ref={aboutRef}
          className="min-h-screen flex items-center justify-center py-20 px-6"
        >
          <div className="max-w-7xl mx-auto w-full">
            <div className="flex flex-col items-center text-center gap-12 lg:gap-16">
              {/* Profile Picture */}
              <div className="flex-shrink-0 group relative">
                {/* Default version */}
                <img
                  src="/profile.jpg"
                  alt="Manohar Gali"
                  className="w-48 h-48 lg:w-64 lg:h-64 rounded-full object-cover border-2 border-[--border] transition-all duration-500 group-hover:opacity-0 absolute"
                  style={{ objectPosition: 'center 15%' }}
                />
                {/* Color version (on hover) */}
                <img
                  src="/profilecolor.jpg"
                  alt="Manohar Gali"
                  className="w-48 h-48 lg:w-64 lg:h-64 rounded-full object-cover border-2 border-[--border] transition-all duration-500 opacity-0 group-hover:opacity-100"
                  style={{ objectPosition: 'center 15%' }}
                />
              </div>

              {/* Hero Content */}
              <div className="flex-1 max-w-3xl mx-auto">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
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
                    className="block bg-gradient-to-r from-white via-white to-gray-200 bg-clip-text text-transparent font-extrabold text-5xl md:text-6xl lg:text-7xl mt-2"
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
                <p className="text-sm md:text-base text-[--muted-foreground] mb-8 leading-relaxed max-w-2xl mx-auto">
                  I transform complex business challenges into elegant digital solutions. Specializing in enterprise-grade applications, 
                  I architect systems that drive operational efficiency, reduce costs, and deliver measurable ROI. 
                  From legacy system modernization to building next-generation platforms, I combine technical depth with business acumen 
                  to ship products that users love and stakeholders trust.
                </p>
                <div className="flex justify-center">
                  <button
                    onClick={scrollToContact}
                    className="inline-flex items-center gap-2 px-6 py-3 border border-[--border] rounded-lg text-white hover:bg-[--muted] transition-colors group cursor-pointer"
                  >
                    <span>Get in touch</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What I can offer Section */}
        <section
          ref={skillsRef}
          className="py-20 px-6"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
                What I Bring to the Table
              </h2>
              <p className="text-lg text-[--muted-foreground] max-w-2xl mx-auto">
                Combining technical expertise with a problem-solving mindset to deliver solutions that matter
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div
                    key={index}
                    className="p-6 rounded-lg border border-[--border] bg-[--card] hover:border-[--muted-foreground] transition-colors"
                  >
                    <Icon className="h-8 w-8 text-white mb-4" strokeWidth={1.5} />
                    <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-white via-gray-400 to-white bg-clip-text text-transparent">{service.title}</h3>
                    <p className="text-[--muted-foreground] leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section
          ref={experienceRef}
          className="py-20 px-6"
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
                Experience
              </h2>
              <p className="text-lg text-[--muted-foreground] max-w-2xl mx-auto">
                Building solutions that drive digital transformation and deliver measurable impact
              </p>
            </div>

            <div className="space-y-6">
              {experience.map((item, index) => (
                <div
                  key={`${item.company}-${item.role}-${index}`}
                  className="p-6 rounded-lg border border-[--border] bg-[--card] hover:border-[--muted-foreground] transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold mb-1 bg-gradient-to-r from-white via-gray-400 to-white bg-clip-text text-transparent">
                        {item.role}
                      </h3>
                      <p className="text-lg text-[--muted-foreground]">{item.company}</p>
                      {item.location && (
                        <p className="text-sm text-[--muted-foreground] mt-1">{item.location}</p>
                      )}
                    </div>
                    <div className="text-sm md:text-base text-[--muted-foreground] whitespace-nowrap">
                      {item.period}
                    </div>
                  </div>
                  <p className="text-[--muted-foreground] mb-4 leading-relaxed">
                    {item.summary}
                  </p>
                  <ul className="space-y-2">
                    {item.highlights.map((highlight: string, idx: number) => (
                      <li key={idx} className="text-sm text-[--muted-foreground] flex items-start gap-3">
                        <span className="text-white mt-1.5">•</span>
                        <span className="leading-relaxed">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          ref={contactRef}
          className="py-20 px-6"
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
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-lg border border-[--border] bg-[--card] hover:border-[--muted-foreground] transition-colors">
                <Mail className="h-8 w-8 text-white mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-white via-gray-400 to-white bg-clip-text text-transparent">Get in Touch</h3>
                <p className="text-[--muted-foreground] mb-4">
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
                <button
                  onClick={() => window.location.href = 'mailto:manoharreddygali19061999@gmail.com'}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-[--border] rounded-lg text-white hover:bg-[--muted] transition-colors text-sm"
                >
                  <span>Send Message</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
