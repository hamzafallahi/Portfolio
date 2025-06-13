"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Github, Linkedin, Facebook, Mail, Phone, MapPin, Trophy, Code } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function AboutMe() {  return (
    <section id="about" className="relative min-h-screen flex items-center pt-20 md:pt-0">
      {/* Cyberpunk Grid Background */}
      <div className="absolute inset-0 cyberpunk-grid opacity-20" />
      
      <div className="relative z-10 w-full max-w-full overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 max-w-full"
        >
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Profile Image Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative order-1 lg:order-none"
            >
              <div className="aspect-square relative rounded-lg overflow-hidden neon-border max-w-sm mx-auto lg:max-w-none">
                <Image
                  src="/Hamza2.jpeg"
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Content Section */}
            <div className="space-y-6 md:space-y-8 order-2 lg:order-none">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-center lg:text-left"
              >
                <h1 
                  className="text-3xl sm:text-4xl md:text-6xl font-bold glitch glow-text break-words"
                  data-text="Hamza Fallahi"
                >
                  Hamza Fallahi
                </h1>
                <h2 className="text-xl sm:text-2xl md:text-3xl text-primary mt-2">
                  Full Stack Developer
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="space-y-6"
              >                <Card className="p-4 md:p-6 bg-card/50 backdrop-blur hover-card">
                  <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
                    Passionate full-stack developer with 2+ years of experience building scalable web applications.
                    I specialize in NextJs, MERN, Angular/SpringBoot.
                  </p>
                </Card>                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">                  <Card className="p-3 md:p-4 bg-card/50 backdrop-blur hover-card">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0" />
                      <span className="text-xs sm:text-sm">Officially graduated in Business Computing with highest honors</span>
                    </div>
                  </Card>                  <Card className="p-3 md:p-4 bg-card/50 backdrop-blur hover-card">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0" />
                      <span className="text-xs sm:text-sm">Bab Souika, Tunis.</span>
                    </div>
                  </Card>
                  <Card className="p-3 md:p-4 bg-card/50 backdrop-blur hover-card">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0" />
                      <span className="text-xs sm:text-sm break-all">hamza.fallahi@esen.tn</span>
                    </div>
                  </Card>
                  <Card className="p-3 md:p-4 bg-card/50 backdrop-blur hover-card">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0" />
                      <span className="text-xs sm:text-sm">+216 50909086</span>
                    </div>
                  </Card>
                </div>                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {[ "NextJs", "Spring Boot","Nodejs","React", "Angular", "Docker","MongoDB","PostgreSQL","MySQL","Tailwind Css","TypeScript","JavaScript","java" ].map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 sm:px-3 bg-primary/10 border border-primary/20 rounded-full text-xs sm:text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 sm:gap-4 justify-center lg:justify-start">                  <Button asChild variant="default" className="hover-card text-xs sm:text-sm">
                    <Link href="https://github.com/hamzafallahi" target="_blank">
                      <Github className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">GitHub</span>
                    </Link>
                  </Button>
                  <Button asChild variant="default" className="hover-card text-xs sm:text-sm">
                    <Link href="https://www.linkedin.com/in/hamza-fallahi-b3b5b0246/" target="_blank">
                      <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">LinkedIn</span>
                    </Link>
                  </Button>
                  <Button asChild variant="default" className="hover-card text-xs sm:text-sm">
                    <Link href="https://www.facebook.com/hamza.fallahi.12/" target="_blank">
                      <Facebook className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Facebook</span>
                    </Link>
                  </Button>
                  <Button asChild variant="default" className="hover-card text-xs sm:text-sm">
                    <Link href="https://codeforces.com/profile/hamzafallahi" target="_blank">
                      <Code className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Codeforces</span>
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}