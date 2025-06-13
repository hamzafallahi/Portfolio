"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Eye } from "lucide-react";
import { MatrixRain } from "@/components/ui/matrix-rain";
import Link from "next/link";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "AppointNet - Appointment Booking Platform",
    description: "Developed a microservice-based appointment booking web application at Cloud Commit. Built with React, Node.js, Docker, Redis, and RabbitMQ for optimal scalability and performance.",
    image: "/appointnet.png",
    github: "",
    demo: "",
    linkedinPost: "https://www.linkedin.com/posts/hamza-fallahi-b3b5b0246_webdevelopment-microservices-reactjs-activity-7334637544271212544-q9yO?utm_source=share&utm_medium=member_desktop&rcm=ACoAADz03V8BPyjjCN1On9TRD4mewVSCm5QMPTk",
    tags: ["React", "Node.js", "Docker", "Redis", "RabbitMQ", "Keycloak", "NGINX"],
    featured: true,
  },
  {
    id: 2,
    title: "Référentiel ESG - Web Platform",
    description: "Built a web platform using Next.js to inform businesses about ESG practices and provide a paid ESG maturity assessment questionnaire. Developed during PFE internship at TAA.",
    image: "/TAA ESG REF new.png",
    github: "",
    demo: "https://taa-esg.tn",
    linkedinPost: "https://www.linkedin.com/posts/hamza-fallahi-b3b5b0246_nextjs-esg-sustainability-activity-7334634162630361088-5L6h?utm_source=share&utm_medium=member_desktop&rcm=ACoAADz03V8BPyjjCN1On9TRD4mewVSCm5QMPTk",
    tags: ["Next.js"],
    featured: true,
  },{
    id: 3,
    title: "EsenNET Job Fair 2024 Website",
    description: "Created a responsive website for EsenNET Job Fair 2024 using Next.js. Implemented a registration form, email-sending functionality, and data storage in PostgreSQL and Google Sheets.",
    image: "/esen.webp",
    github: "",
    demo: "https://esenet-jobfair2024.vercel.app/",
    tags: ["Next.js", "PostgreSQL", "Google Sheets"],
    featured: false,
  },    {
    id: 4,
    title: "9arini.tn - E-Learning Platform",
    description: "Developed the platform using PHP, AJAX, and MySQL. Implemented authentication features and CRUD operations for courses and users. Created a .NET superadmin app for dashboards and analytics.",
    image: "/9arini.webp",
    github: "https://github.com/hamzafallahi/9arini.tn-MVC-CRUD",
    demo: "",
    tags: ["PHP", "AJAX", "MySQL", ".NET"],
    featured: false,
  },

    {
    id: 5,
    title: "Esen Hive Club Website",
    description: "Designed and developed a web application using Node.js, React, and PostgreSQL for municipal asset management. Integrated JWT authentication to secure user access.",
    image: "/HIVE.webp",
    github: "",
    demo: "https://drive.google.com/file/d/1nVrumS_sSEqMskdmC3Byt_6hdb7m8GF0/view",
    tags: ["Node.js", "React", "PostgreSQL", "JWT"],
  }
,  {
    id: 6,
    title: "Doiini - Task Management App",
    description: "Designed and developed a responsive task management app with Angular and Spring Boot. Integrated features for task tagging, a Pomodoro timer, and a calendar view for time management.",
    image: "/doiini.webp",
    github: "https://github.com/hamzafallahi/doiini",
    demo: "https://doiini.vercel.app/",
    tags: ["Angular", "Spring Boot", "MySQL"],
    
  },
  {
    id: 7,
    title: "OPC Client-Server Web App",
    description: "Developed a web application for OPC Client-Server with Spring Boot and Angular to collect, process, and store OPC UA data in MySQL and MongoDB. Implemented features for generating CSV and Excel files.",
    image: "/opc.webp",
    github: "",//https://github.com/hamzafallahi/opc-client-server
    demo: "",
    tags: ["Spring Boot", "Angular", "MongoDB", "MySQL", "OPC UA"],
  },
 /* {
    id: 7,
    title: "Municipal Asset Management Web App",
    description: "Designed and developed a web application using Node.js, React, and PostgreSQL for municipal asset management. Integrated JWT authentication to secure user access.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0",
    github: "https://github.com/username/municipal-asset-management",
    demo: "https://municipal-assets-demo.com",
    tags: ["Node.js", "React", "PostgreSQL", "JWT"],
  },*/

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