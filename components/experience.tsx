"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase } from "lucide-react";
import Link from "next/link";

interface Experience {
  id: number;
  company: string;
  role: string;
  period: string;
  description: string;
  link: string;
  technologies: string[];
  achievements: string[];
}

export function Experience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/experience')
      .then(res => res.json())
      .then(data => {
        setExperiences(data);
        if (data.length > 0) {
          setSelectedExp(data[0]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch experiences:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section id="experience" className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10 flex justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Loading experiences...</p>
          </div>
        </div>
      </section>
    );
  }

  if (experiences.length === 0) {
    return (
      <section id="experience" className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10 flex justify-center">
          <p className="text-muted-foreground">No experiences found.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-20 relative">
      <div className="absolute inset-0 cyberpunk-grid opacity-10" />
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 relative z-10"
      >
        <div className="space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold glow-text">Experience</h2>
          <p className="text-muted-foreground">
            My professional journey and the amazing companies I&apos;ve worked with.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Experience List */}
          <div className="space-y-4">
            {experiences.map((exp) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card
                  className={`p-4 cursor-pointer hover-card transition-colors ${
                    selectedExp?.id === exp.id
                      ? "bg-primary/20 border-primary"
                      : "bg-card/50 hover:bg-card/80"
                  }`}
                  onClick={() => setSelectedExp(exp)}
                >
                  <div className="flex items-center gap-3">
                    <Briefcase className={`w-5 h-5 ${
                      selectedExp?.id === exp.id ? "text-primary" : "text-muted-foreground"
                    }`} />
                    <div>
                      <h3 className="font-medium">{exp.company}</h3>
                      <p className="text-sm text-muted-foreground">{exp.period}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Experience Details */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {selectedExp && (
                <motion.div
                  key={selectedExp.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="p-6 bg-card/50 backdrop-blur neon-border">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl font-semibold">{selectedExp.role}</h3>
                        <p className="text-primary">{selectedExp.company}</p>
                        <p className="text-sm text-muted-foreground">{selectedExp.period}</p>
                      </div>

                      <p className="text-muted-foreground">{selectedExp.description}</p>

                      <div>
                        <h4 className="font-medium mb-2">Key Achievements</h4>
                        <ul className="space-y-2">
                          {selectedExp.achievements.map((achievement, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <ArrowRight className="w-4 h-4 text-primary" />
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedExp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-primary/10 border border-primary/20 rounded-full text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <Button asChild variant="default">
                        <Link href={selectedExp.link}>
                          View Details <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}