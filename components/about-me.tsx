"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Github, Linkedin, Facebook, Mail, Phone, MapPin, Trophy, Code } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function AboutMe() {
  return (
    <section id="about" className="relative min-h-screen flex items-center">
      {/* Cyberpunk Grid Background */}
      <div className="absolute inset-0 cyberpunk-grid opacity-20" />
      
      <div className="relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square relative rounded-lg overflow-hidden neon-border">                <Image
                  src="/Hamza2.jpeg"
                  alt="Profile"
                  fill
                  className="object-cover"
                />
                
              </div>
            </motion.div>

            {/* Content Section */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h1 
                  className="text-4xl md:text-6xl font-bold glitch glow-text"
                  data-text="Hamza Fallahi"
                >
                  Hamza Fallahi
                </h1>
                <h2 className="text-2xl md:text-3xl text-primary mt-2">
                  Full Stack Developer
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="space-y-6"
              >
                <Card className="p-6 bg-card/50 backdrop-blur hover-card">
                  <p className="text-lg text-muted-foreground">
                    Passionate full-stack developer with 2+ years of experience building scalable web applications.
                    I specialize in NextJs, MERN, Angular/SpringBoot.
                  </p>
                </Card>                <div className="grid grid-cols-2 gap-4">                  <Card className="p-4 bg-card/50 backdrop-blur hover-card">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-primary" />
                      <span>Business Computing graduated with highest honors</span>
                    </div>
                  </Card>
                  <Card className="p-4 bg-card/50 backdrop-blur hover-card">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      <span>Bab Souika, Tunis.</span>
                    </div>
                  </Card>
                  <Card className="p-4 bg-card/50 backdrop-blur hover-card">
                    <div className="flex items-center gap-2">
                      <Mail className="w-5 h-5 text-primary" />
                      <span>hamza.fallahi@esen.tn</span>
                    </div>
                  </Card>
                  <Card className="p-4 bg-card/50 backdrop-blur hover-card">
                    <div className="flex items-center gap-2">
                      <Phone className="w-5 h-5 text-primary" />
                      <span>+216 50909086</span>
                    </div>
                  </Card>
                </div>

                <div className="flex flex-wrap gap-2">
                  {[ "NextJs", "Spring Boot","Nodejs","React", "Angular", "Docker","MongoDB","PostgreSQL","MySQL","Tailwind Css","TypeScript","JavaScript","java" ].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>                <div className="flex gap-4">
                  <Button asChild variant="default" className="hover-card">
                    <Link href="https://github.com/hamzafallahi" target="_blank">
                      <Github className="w-5 h-5 mr-2" />
                      GitHub
                    </Link>
                  </Button>
                  <Button asChild variant="default" className="hover-card">
                    <Link href="https://www.linkedin.com/in/hamza-fallahi-b3b5b0246/" target="_blank">
                      <Linkedin className="w-5 h-5 mr-2" />
                      LinkedIn
                    </Link>
                  </Button>
                  <Button asChild variant="default" className="hover-card">
                    <Link href="https://www.facebook.com/hamza.fallahi.12/" target="_blank">
                      <Facebook className="w-5 h-5 mr-2" />
                      Facebook
                    </Link>
                  </Button>
                  <Button asChild variant="default" className="hover-card">
                    <Link href="https://codeforces.com/profile/hamzafallahi" target="_blank">
                      <Code className="w-5 h-5 mr-2" />
                      Codeforces
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