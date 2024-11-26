"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase } from "lucide-react";
import Link from "next/link";

const experiences = [
    {
    "id": 1,
    "company": "Freelance: EsenNET Job Fair 2024",
    "role": "Full Stack Developer",
    "period": "NOV 2024",
    "description": "Created a responsive website for EsenNET Job Fair 2024.",
    "achievements": [
      "Implemented a registration form and email-sending functionality.",
      "Stored data securely in PostgreSQL and Google Sheets.",
      "Delivered a seamless user experience."
    ],
    "technologies": ["Next.js", "PostgreSQL", "Google Sheets"],
    "link": "https://esenet-jobfair2024.vercel.app/"
  },
  {
    "id": 2,
    "company": "Tunisian Automotive Association (TAA)",
    "role": "Full Stack Developer",
    "period": "OCT 2024 - Present",
    "description": "Led development of scalable web applications using React and Node.js.",
    "achievements": [
      "Built a web platform called 'Référentiel ESG' using Next.js and Spring Boot.",
      "Designed the site to inform businesses about ESG practices.",
      "Provided a paid ESG maturity assessment questionnaire.",
      "Developed an e-learning section for the TAA Academy."
    ],
    "technologies": ["Next.js", "Spring Boot", "JWT", "Docker"],
    "link": "https://www.linkedin.com/posts/hamza-fallahi-b3b5b0246_fullstackdevelopment-webdevelopment-taa-activity-7255257562743296000-hSzT?utm_source=share&utm_medium=member_desktop"
  },
  {
    "id": 3,
    "company": "Addixo Smart Factory (Momsoft)",
    "role": "Full Stack Developer",
    "period": "AUG 2024 - SEPT 2024",
    "description": "Built and maintained multiple client projects using modern web technologies.",
    "achievements": [
      "Developed a web application for OPC Client-Server with Spring Boot and Angular.",
      "Collected, processed, and stored OPC UA data in MySQL and MongoDB.",
      "Implemented features for generating CSV and Excel files.",
    ],
    "technologies": ["Spring Boot", "Angular", "MongoDB", "MySQL", "OPC UA"],
    "link": "https://www.linkedin.com/posts/hamza-fallahi-b3b5b0246_internship-smartfactory-tech-activity-7238701535403151360-X-cX?utm_source=share&utm_medium=member_desktop"
  },
  {
    "id": 4,
    "company": "National Center for Informatics (CNI)",
    "role": "MERN Stack Developer",
    "period": "JUL 2024 - AUG 2024",
    "description": "Developed and implemented new features for the company's main product.",
    "achievements": [
      "Designed and developed a web application for municipal asset management using Node.js, React, and PostgreSQL.",
      "Integrated JWT authentication to secure user access.",
    ],
    "technologies": ["React", "Node.js", "PostgreSQL"],
    "link": "https://www.linkedin.com/posts/hamza-fallahi-b3b5b0246_internship-internship-cni-activity-7219345692123664386-J-rl?utm_source=share&utm_medium=member_desktop"
  },

]


export function Experience() {
  const [selectedExp, setSelectedExp] = useState(experiences[0]);

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
            My professional journey and the amazing companies I've worked with.
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
                    selectedExp.id === exp.id
                      ? "bg-primary/20 border-primary"
                      : "bg-card/50 hover:bg-card/80"
                  }`}
                  onClick={() => setSelectedExp(exp)}
                >
                  <div className="flex items-center gap-3">
                    <Briefcase className={`w-5 h-5 ${
                      selectedExp.id === exp.id ? "text-primary" : "text-muted-foreground"
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
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}