"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, Bell, Settings, User, Download, Calendar, ExternalLink, Wifi, WifiOff } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type TopbarProps = {
  onOpenCommand?: () => void;
};

export function Topbar({ onOpenCommand }: TopbarProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [isOnline, setIsOnline] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    setMounted(true);
    
    // Update time every minute
    const timeInterval = setInterval(() => setCurrentTime(new Date()), 60000);
    
    // Monitor online status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      clearInterval(timeInterval);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <header className="h-16 fixed top-0 left-0 right-0 z-50 w-full border-b border-[--border] backdrop-blur supports-[backdrop-filter]:bg-[color-mix(in_oklch,oklch(var(--background))_90%,transparent)]">
      <div className="h-full flex items-center justify-between px-6">
        {/* Left Section - Live Status & Quick Actions */}
        <div className="flex items-center gap-6">
          {/* Live Status Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 rounded-xl border border-[--border] bg-[color-mix(in_oklch,oklch(var(--card))_50%,transparent)] px-4 py-2 backdrop-blur"
          >
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className={`h-2.5 w-2.5 rounded-full ${isOnline ? 'bg-blue-400' : 'bg-red-400'}`} />
                <div className={`absolute inset-0 h-2.5 w-2.5 rounded-full ${isOnline ? 'bg-blue-400' : 'bg-red-400'} animate-ping opacity-75`} />
              </div>
              <span className="text-xs font-medium text-[--foreground]">
                {isOnline ? 'Available' : 'Offline'}
              </span>
            </div>
            <div className="h-4 w-px bg-[--border]" />
            <div className="text-xs font-mono text-muted-foreground">
              {formatTime(currentTime)}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <div className="hidden lg:flex items-center gap-2">
            <motion.a
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              href="/resume.pdf"
              download
              className="group inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold border border-[--border] bg-[color-mix(in_oklch,oklch(var(--card))_60%,transparent)] hover:border-[--ring] hover:bg-[color-mix(in_oklch,oklch(var(--card))_80%,transparent)] transition-all duration-200"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Resume</span>
            </motion.a>
            
            <motion.a
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:hello@manu.dev"
              className="group inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold border border-[--border] bg-[color-mix(in_oklch,oklch(var(--card))_60%,transparent)] hover:border-[--ring] hover:bg-[color-mix(in_oklch,oklch(var(--card))_80%,transparent)] transition-all duration-200"
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>Contact</span>
            </motion.a>
            
            <motion.a
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com/Manugali"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold border border-[--border] bg-[color-mix(in_oklch,oklch(var(--card))_60%,transparent)] hover:border-[--ring] hover:bg-[color-mix(in_oklch,oklch(var(--card))_80%,transparent)] transition-all duration-200"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>GitHub</span>
            </motion.a>
          </div>
        </div>

        {/* Right Section - Actions & Profile */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            className="relative rounded-xl p-2.5 hover:bg-[color-mix(in_oklch,oklch(var(--muted))_80%,transparent)] transition-all duration-200"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            {notifications > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs flex items-center justify-center font-bold shadow-lg"
              >
                {notifications}
              </motion.span>
            )}
          </motion.button>

          {/* Settings */}
          <motion.button
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-xl p-2.5 hover:bg-[color-mix(in_oklch,oklch(var(--muted))_80%,transparent)] transition-all duration-200"
            aria-label="Settings"
          >
            <Settings className="h-4 w-4" />
          </motion.button>

          {/* Theme Toggle */}
          {mounted && (
            <motion.button
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-xl p-2.5 hover:bg-[color-mix(in_oklch,oklch(var(--muted))_80%,transparent)] transition-all duration-200"
              aria-label="Toggle theme"
            >
              <motion.div
                initial={false}
                animate={{ rotate: theme === "dark" ? 180 : 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </motion.div>
            </motion.button>
          )}

          {/* Profile Section */}
          <div className="flex items-center gap-4 pl-4 border-l border-[--border]">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-bold text-[--foreground]">Manu</div>
              <div className="text-xs text-muted-foreground font-medium">Full-Stack Developer</div>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="relative group cursor-pointer"
            >
              <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 opacity-0 group-hover:opacity-40 blur transition-opacity duration-300" />
              <div className="relative h-10 w-10 rounded-full ring-2 ring-[--ring] overflow-hidden shadow-lg">
                <img 
                  src="/profile.jpg" 
                  alt="Manohar Gali" 
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'center 20%' }}
                />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-blue-400 border-2 border-[--background] shadow-sm" />
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
}


