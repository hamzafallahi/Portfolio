"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Eye } from "lucide-react";
import { MatrixRain } from "@/components/ui/matrix-rain";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  github: string;
  demo: string;
  linkedinPost: string;
  tags: string[];
  featured: boolean;
}

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch projects:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section id="projects" className="py-20 relative animated-bg">
        <div className="container mx-auto px-4 relative z-10 flex justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section id="projects" className="py-20 relative animated-bg">
        <div className="container mx-auto px-4 relative z-10 flex justify-center">
          <p className="text-muted-foreground">No projects found.</p>
        </div>
      </section>
    );
  }

  const featuredProjects = projects.filter(p => p.featured);
  const regularProjects = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="py-20 relative animated-bg">
      <div className="absolute inset-0 cyberpunk-grid opacity-10" />
      <MatrixRain />
        <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 relative z-10 max-w-full overflow-hidden"
      >
        <div className="space-y-4 mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold glow-text">Projects</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            A showcase of my best work and personal projects.
          </p>
        </div>

       {/* Featured Projects */}
<div className="space-y-12 md:space-y-24 mb-12 md:mb-24">
  {featuredProjects.map((project, index) => (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >      <Card className="overflow-hidden project-card neon-border">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Section */}
          <div
            className={`relative h-[250px] sm:h-[350px] md:h-[500px] overflow-hidden ${
              index % 2 === 1 ? "md:order-2" : ""
            }`}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover project-image"
            />
          </div>
          {/* Text Section */}
          <div className="p-4 sm:p-6 md:p-8 flex flex-col justify-between bg-gradient-to-br from-card/95 to-card/50 backdrop-blur">
            <div className="space-y-4 md:space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 glow-text">{project.title}</h3>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-1 sm:gap-2">                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 sm:px-3 bg-primary/10 border border-primary/20 rounded-full text-xs sm:text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4 mt-6 md:mt-8">
                  {project.github && (
                    <Button asChild variant="default" size="sm" className="sm:size-lg">
                      <Link href={project.github} target="_blank">
                        <Github className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                        <span className="text-xs sm:text-sm">View Code</span>
                      </Link>
                    </Button>
                  )}
                  {project.demo && (
                    <Button asChild variant="outline" size="sm" className="sm:size-lg hover:bg-gradient-to-r">
                      <Link href={project.demo} target="_blank">
                        <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />                        <span className="text-xs sm:text-sm">Live Demo</span>
                      </Link>
                    </Button>
                  )}
                  {project.linkedinPost && (
                    <Button asChild variant="secondary" size="sm" className="sm:size-lg">
                      <Link href={project.linkedinPost} target="_blank">
                        <Eye className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                        <span className="text-xs sm:text-sm">View Details</span>
                      </Link>
                    </Button>
                  )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  ))}
</div>


        {/* Regular Projects Grid */}
        {regularProjects.length > 0 && (
          <div className="grid md:grid-cols-2 gap-8">
            {regularProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden project-card h-[600px] flex flex-col">
                  <div className="relative h-[300px] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover project-image"
                    />
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow bg-gradient-to-b from-card/95 to-card/50">
                    <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                    <p className="text-muted-foreground mb-6 flex-grow">
                      {project.description}
                    </p>
                    
                    <div className="space-y-6">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-primary/10 border border-primary/20 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                        <div className="flex gap-4">
                        {project.github && (
                          <Button asChild variant="default">
                            <Link href={project.github} target="_blank">
                              <Github className="w-4 h-4 mr-2" />
                              Code
                            </Link>
                          </Button>)}
                        {project.demo && (
                        <Button asChild variant="outline">
                          <Link href={project.demo} target="_blank">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Demo
                          </Link>
                        </Button>)}
                        {project.linkedinPost && (
                          <Button asChild variant="secondary">
                            <Link href={project.linkedinPost} target="_blank">
                              <Eye className="w-4 h-4 mr-2" />
                              Details
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}