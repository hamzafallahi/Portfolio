"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import { MatrixRain } from "@/components/ui/matrix-rain";
import Link from "next/link";
import Image from "next/image";

const projects = [
    {
    id: 1,
    title: "EsenNET Job Fair 2024 Website",
    description: "Created a responsive website for EsenNET Job Fair 2024 using Next.js. Implemented a registration form, email-sending functionality, and data storage in PostgreSQL and Google Sheets.",
    image: "./esen.webp",
    github: "https://github.com/rayen-heroshima/Esenet-v6.4",
    demo: "https://esenet-jobfair2024.vercel.app/",
    tags: ["Next.js", "PostgreSQL", "Google Sheets"],
    featured: true,
  },
    {
    id: 2,
    title: "9arini.tn - E-Learning Platform",
    description: "Developed the platform using PHP, AJAX, and MySQL. Implemented authentication features and CRUD operations for courses and users. Created a .NET superadmin app for dashboards and analytics.",
    image: "./9arini.webp",
    github: "https://github.com/hamzafallahi/9arini.tn-MVC-CRUD",
    demo: "https://9arini-demo.com",
    tags: ["PHP", "AJAX", "MySQL", ".NET"],
    featured: true,
  },
  {
    id: 3,
    title: "Doiini - Task Management App",
    description: "Designed and developed a responsive task management app with Angular and Spring Boot. Integrated features for task tagging, a Pomodoro timer, and a calendar view for time management.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0",
    github: "https://github.com/username/doiini",
    demo: "https://doiini-demo.com",
    tags: ["Angular", "Spring Boot", "MySQL"],
    
  },


  {
    id: 4,
    title: "Référentiel ESG - Web Platform",
    description: "Built a web platform called 'Référentiel ESG' using Next.js and Spring Boot. Designed the site to inform businesses about ESG practices and provided a paid ESG maturity assessment questionnaire. Developed an e-learning section for the TAA Academy.",
    image: "./taa.webp",
    github: "https://github.com/username/referentiel-esg",
    demo: "https://referentiel-esg-demo.com",
    tags: ["Next.js", "Spring Boot", "JWT", "Docker"],
  
  },
  {
    id: 5,
    title: "OPC Client-Server Web App",
    description: "Developed a web application for OPC Client-Server with Spring Boot and Angular to collect, process, and store OPC UA data in MySQL and MongoDB. Implemented features for generating CSV and Excel files.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0",
    github: "https://github.com/username/opc-client-server",
    demo: "https://opc-client-demo.com",
    tags: ["Spring Boot", "Angular", "MongoDB", "MySQL", "OPC UA"],
  },
  {
    id: 6,
    title: "Municipal Asset Management Web App",
    description: "Designed and developed a web application using Node.js, React, and PostgreSQL for municipal asset management. Integrated JWT authentication to secure user access.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0",
    github: "https://github.com/username/municipal-asset-management",
    demo: "https://municipal-assets-demo.com",
    tags: ["Node.js", "React", "PostgreSQL", "JWT"],
  },
    {
    id: 7,
    title: "Esen Hive Club Website",
    description: "Designed and developed a web application using Node.js, React, and PostgreSQL for municipal asset management. Integrated JWT authentication to secure user access.",
    image: "./HIVE.webp",
    github: "https://github.com/rayen-heroshima/Hive-club-v1.0",
    demo: "https://drive.google.com/file/d/1nVrumS_sSEqMskdmC3Byt_6hdb7m8GF0/view",
    tags: ["Node.js", "React", "PostgreSQL", "JWT"],
  }
];


export function Projects() {
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
        className="container mx-auto px-4 relative z-10"
      >
        <div className="space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold glow-text">Projects</h2>
          <p className="text-muted-foreground">
            A showcase of my best work and personal projects.
          </p>
        </div>

       {/* Featured Projects */}
<div className="space-y-24 mb-24">
  {featuredProjects.map((project, index) => (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="overflow-hidden project-card neon-border">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Section */}
          <div
            className={`relative h-[500px] overflow-hidden ${
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
          <div className="p-8 flex flex-col justify-between bg-gradient-to-br from-card/95 to-card/50 backdrop-blur">
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-bold mb-2 glow-text">{project.title}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-4 mt-8">
              <Button asChild variant="default" size="lg">
                <Link href={project.github} target="_blank">
                  <Github className="w-5 h-5 mr-2" />
                  View Code
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="hover:bg-gradient-to-r" >
                <Link href={project.demo} target="_blank">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Live Demo
                </Link>
              </Button>
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
                        <Button asChild variant="default">
                          <Link href={project.github} target="_blank">
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </Link>
                        </Button>
                        <Button asChild variant="outline">
                          <Link href={project.demo} target="_blank">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Demo
                          </Link>
                        </Button>
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