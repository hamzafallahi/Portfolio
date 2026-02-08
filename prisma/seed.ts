import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Create the Person
  const person = await prisma.person.create({
    data: {
      fullName: "Hamza Fallahi",
      title: "Full Stack Engineer",
      bio: "Passionate full-stack developer with 2+ years of experience building scalable web applications. I specialize in NextJs, MERN, Angular/SpringBoot.",
      email: "hamza.fallahi@esen.tn",
      phone: "+216 50909086",
      location: "Bab Souika, Tunis.",
      imageUrl: "/Hamza2.jpeg",
      technologyTags: [
        "NextJs",
        "Spring Boot",
        "Nodejs",
        "React",
        "Angular",
        "Docker",
        "MongoDB",
        "PostgreSQL",
        "MySQL",
        "Tailwind Css",
        "TypeScript",
        "JavaScript",
        "Java",
      ],
      github: "https://github.com/hamzafallahi",
      linkedin: "https://www.linkedin.com/in/hamza-fallahi-b3b5b0246/",
      facebook: "https://www.facebook.com/hamza.fallahi.12/",
      codeforces: "https://codeforces.com/profile/hamzafallahi",
    },
  });

  console.log(`Created person: ${person.fullName} (${person.id})`);

  // 2. Create Experiences
  const experiences = [
    {
      company: "Cloud Commit Software Solution",
      role: "Web Developer (Full-time)",
      period: "JAN 2025 - Present",
      description:
        "Developed a microservice-based appointment booking web application.",
      link: "https://www.linkedin.com/posts/hamza-fallahi-b3b5b0246_webdevelopment-microservices-reactjs-activity-7334637544271212544-q9yO?utm_source=share&utm_medium=member_desktop&rcm=ACoAADz03V8BPyjjCN1On9TRD4mewVSCm5QMPTk",
      technologies: [
        "React",
        "Node.js",
        "Docker",
        "Redis",
        "RabbitMQ",
        "Keycloak",
        "NGINX",
      ],
      achievements: [
        "Designed and developed the front-end using React with Atomic Design, React Query, and i18n.",
        "Built the back-end using Node.js (Express.js), containerized with Docker, and structured with NGINX.",
        "Integrated caching with Redis and asynchronous communication using RabbitMQ.",
        "Implemented data serialization/deserialization mechanisms and integrated Keycloak for authentication.",
      ],
    },
    {
      company: "Freelance: Tunisian Automotive Association (TAA)",
      role: "Full Stack Developer",
      period: "OCT 2024 - Present",
      description:
        "Built a web platform called Référentiel ESG using Next.js.",
      link: "https://taa-esg.tn",
      technologies: ["Next.js"],
      achievements: [
        "Designed the site to inform businesses about ESG practices and provided a paid ESG maturity assessment questionnaire.",
      ],
    },
    {
      company: "Freelance: EsenNET Job Fair 2024",
      role: "Full Stack Developer",
      period: "NOV 2024",
      description:
        "Created a responsive website for EsenNET Job Fair 2024.",
      link: "https://esenet-jobfair2024.vercel.app/",
      technologies: ["Next.js", "PostgreSQL", "Google Sheets"],
      achievements: [
        "Implemented a registration form and email-sending functionality.",
        "Stored data securely in PostgreSQL and Google Sheets.",
        "Delivered a seamless user experience.",
      ],
    },
    {
      company: "Addixo Smart Factory (Momsoft)",
      role: "Full Stack Developer",
      period: "AUG 2024 - SEPT 2024",
      description:
        "Built and maintained multiple client projects using modern web technologies.",
      link: "https://www.linkedin.com/posts/hamza-fallahi-b3b5b0246_internship-smartfactory-tech-activity-7238701535403151360-X-cX?utm_source=share&utm_medium=member_desktop",
      technologies: [
        "Spring Boot",
        "Angular",
        "MongoDB",
        "MySQL",
        "OPC UA",
      ],
      achievements: [
        "Developed a web application for OPC Client-Server with Spring Boot and Angular.",
        "Collected, processed, and stored OPC UA data in MySQL and MongoDB.",
        "Implemented features for generating CSV and Excel files.",
      ],
    },
    {
      company: "National Center for Informatics (CNI)",
      role: "MERN Stack Developer",
      period: "JUL 2024 - AUG 2024",
      description:
        "Developed and implemented new features for the company's main product.",
      link: "https://www.linkedin.com/posts/hamza-fallahi-b3b5b0246_internship-internship-cni-activity-7219345692123664386-J-rl?utm_source=share&utm_medium=member_desktop",
      technologies: ["React", "Node.js", "PostgreSQL"],
      achievements: [
        "Designed and developed a web application for municipal asset management using Node.js, React, and PostgreSQL.",
        "Integrated JWT authentication to secure user access.",
      ],
    },
  ];

  for (const exp of experiences) {
    await prisma.experience.create({
      data: {
        ...exp,
        personId: person.id,
      },
    });
  }

  console.log(`Created ${experiences.length} experiences`);

  // 3. Create Projects
  const projects = [
    {
      title: "AppointNet - Appointment Booking Platform",
      description:
        "Developed a microservice-based appointment booking web application at Cloud Commit.",
      imageUrl: "/appointnet.png",
      githubUrl: "",
      demoUrl: "",
      linkedinPost:
        "https://www.linkedin.com/posts/hamza-fallahi-b3b5b0246_webdevelopment-microservices-reactjs-activity-7334637544271212544-q9yO",
      featured: true,
      tags: [
        "React",
        "Node.js",
        "Docker",
        "Redis",
        "RabbitMQ",
        "Keycloak",
        "NGINX",
      ],
    },
    {
      title: "Référentiel ESG - Web Platform",
      description:
        "Built a web platform using Next.js to inform businesses about ESG practices.",
      imageUrl: "/TAA ESG REF new.png",
      githubUrl: "",
      demoUrl: "https://taa-esg.tn",
      linkedinPost:
        "https://www.linkedin.com/posts/hamza-fallahi-b3b5b0246_nextjs-esg-sustainability-activity-7334634162630361088-5L6h",
      featured: true,
      tags: ["Next.js"],
    },
    {
      title: "EsenNET Job Fair 2024 Website",
      description:
        "Created a responsive website for EsenNET Job Fair 2024 using Next.js.",
      imageUrl: "/esen.webp",
      githubUrl: "",
      demoUrl: "https://esenet-jobfair2024.vercel.app/",
      linkedinPost: null,
      featured: false,
      tags: ["Next.js", "PostgreSQL", "Google Sheets"],
    },
    {
      title: "9arini.tn - E-Learning Platform",
      description:
        "Developed the platform using PHP, AJAX, and MySQL.",
      imageUrl: "/9arini.webp",
      githubUrl: "https://github.com/hamzafallahi/9arini.tn-MVC-CRUD",
      demoUrl: "",
      linkedinPost: null,
      featured: false,
      tags: ["PHP", "AJAX", "MySQL", ".NET"],
    },
    {
      title: "Esen Hive Club Website",
      description:
        "Developed a web application using Node.js, React, and PostgreSQL.",
      imageUrl: "/HIVE.webp",
      githubUrl: "",
      demoUrl:
        "https://drive.google.com/file/d/1nVrumS_sSEqMskdmC3Byt_6hdb7m8GF0/view",
      linkedinPost: null,
      featured: false,
      tags: ["Node.js", "React", "PostgreSQL", "JWT"],
    },
    {
      title: "Doiini - Task Management App",
      description:
        "Designed and developed a task management app with Angular and Spring Boot.",
      imageUrl: "/doiini.webp",
      githubUrl: "https://github.com/hamzafallahi/doiini",
      demoUrl: "https://doiini.vercel.app/",
      linkedinPost: null,
      featured: false,
      tags: ["Angular", "Spring Boot", "MySQL"],
    },
    {
      title: "OPC Client-Server Web App",
      description:
        "Developed a web application for OPC Client-Server using Spring Boot and Angular.",
      imageUrl: "/opc.webp",
      githubUrl: "",
      demoUrl: "",
      linkedinPost: null,
      featured: false,
      tags: ["Spring Boot", "Angular", "MongoDB", "MySQL", "OPC UA"],
    },
  ];

  for (const proj of projects) {
    await prisma.project.create({
      data: {
        ...proj,
        personId: person.id,
      },
    });
  }

  console.log(`Created ${projects.length} projects`);

  // 4. Create Admin User (default password: in .env - change in production!)
  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD!, 10);
  await prisma.adminUser.create({
    data: {
      username: process.env.ADMIN_USERNAME,
      passwordHash,
    },
  });

  console.log(`Created admin user (username: ${process.env.ADMIN_USERNAME})`);

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
