import type { Project, Experience, Skill, Achievement } from "@/types";

// ─── PROJECTS ────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    id: "retinopathy",
    title: "AI-Based Diabetic\nRetinopathy System",
    subtitle: "Deep Learning Medical Screening",
    description:
      "Developed a non-invasive, AI-driven screening system for early detection of Diabetic Retinopathy (DR) using retinal fundus images. Implemented convolutional neural networks (CNNs) using TensorFlow and PyTorch to classify DR severity levels.",
    tags: ["Python", "TensorFlow", "PyTorch", "CNN", "OpenCV", "Deep Learning"],
    status: "live",
    role: "AI/ML Developer",
    team: 3,
    duration: "11 months",
    linesOfCode: "5,400",
    impact: "High-accuracy early detection of DR severity",
    github: "https://github.com/shivamkumar",
    color: "#FF3D93",
    accentColor: "#FF3D93",
    architecture: [
      "Custom CNN with ResNet50 backbone",
      "TensorFlow/PyTorch training pipeline",
      "OpenCV fundus image pre-processing",
      "Explainable AI heatmap generation",
    ],
    challenges: [
      "Mitigating class imbalance in clinical datasets",
      "Optimizing model inference time",
      "Ensuring high sensitivity for early-stage detection",
    ],
  },
  {
    id: "campus-uncovered",
    title: "Campus Uncovered",
    subtitle: "Student Media Platform",
    description:
      "Co-founded and operated a student-focused media initiative aimed at uncovering campus stories, opportunities, and student experiences. Developed content, outreach, and community engagement strategies to grow audience reach to 10,000+ followers.",
    tags: ["Next.js", "TypeScript", "Power BI", "Figma", "Social Analytics"],
    status: "live",
    role: "Co-founder & Operator",
    team: 8,
    duration: "1 year+",
    linesOfCode: "4,200",
    impact: "Grew platform to 10,000+ campus followers",
    github: "https://github.com/shivamkumar",
    color: "#3578FF",
    accentColor: "#3578FF",
    architecture: [
      "Next.js community web hub",
      "Power BI analytics suite",
      "Figma design system & assets",
      "Automated cross-platform publishing",
    ],
    challenges: [
      "Consistent content generation with student schedules",
      "Tracking cross-platform analytics systematically",
    ],
  },
  {
    id: "frosh-booking",
    title: "Frosh Centralized\nBooking System",
    subtitle: "Student Booking & QR Validation",
    description:
      "Engineered a centralized booking system to process and validate registration data for 3,500+ students, creating backend reporting tools to support operational decision-making. Developed a Python-based data validation system using QR codes that cut check-in times by 90%.",
    tags: ["Python", "Figma", "HTML", "CSS", "QR Codes", "Data Validation"],
    status: "live",
    role: "Technical & Design Head",
    team: 5,
    duration: "2 months",
    linesOfCode: "2,900",
    impact: "Cut check-in times by 90% for 3,500+ students",
    github: "https://github.com/shivamkumar",
    color: "#FF8A3D",
    accentColor: "#FF8A3D",
    architecture: [
      "Python data validation algorithms",
      "Figma UI/UX layouts",
      "QR Code generation and reading scripts",
      "Operational reporting dashboards",
    ],
    challenges: [
      "Processing high-concurrency registration checks",
      "Scanning QR codes reliably in various lighting conditions",
    ],
  },
];

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────

export const experiences: Experience[] = [
  {
    id: "saturnalia-finance",
    company: "Saturnalia",
    role: "Overall Finance Head",
    period: "June 2024 – May 2026",
    duration: "2 years",
    type: "leadership",
    description:
      "Managed financial operations for a 1 Crore budget. Built reporting and tracking systems to monitor spend, vendor payments, and budget utilization across multiple student teams. Coordinated with internal stakeholders and external vendors to reduce payment cycle times by 4 days.",
    achievements: [
      "Managed financial operations for a 1 Crore budget",
      "Built reporting & tracking systems for cross-team spend",
      "Reduced vendor payment cycle times by 4 days",
      "Coordinated with over 30 external vendors & university officials",
    ],
    color: "#FF3D93",
    logo: "💰",
  },
  {
    id: "frosh-tech",
    company: "Frosh",
    role: "Technical and Design Head",
    period: "June 2023 – March 2025",
    duration: "22 months",
    type: "leadership",
    description:
      "Conducted exploratory data analysis on historical event expenses to optimize a budget of 15 Lakh, reducing costs by 20%. Spearheaded an Instagram strategy that achieved 3000+ new followers in 3 weeks. Led cross-functional operations for onboarding 4,000+ students, coordinating 100+ team leads.",
    achievements: [
      "Optimized 15 Lakh budget, reducing costs by 20% through EDA",
      "Boosted Instagram reach by 60% with 3,000+ new followers in 3 weeks",
      "Led cross-functional onboarding operations for 4,000+ students",
      "Coordinated 100+ team leads across finance, logistics, design, & marketing",
    ],
    color: "#3578FF",
    logo: "⚡",
  },
  {
    id: "plex-consulting",
    company: "Plex Consulting Wing",
    role: "Student Consultant",
    period: "Feb 2024 – Jan 2025",
    duration: "1 year",
    type: "internship",
    description:
      "Established the first consulting club of the university, impacting nearly 15,000 students by spreading consulting principles and knowledge. Conducted an introductory consulting workshop for 3000+ freshers.",
    achievements: [
      "Co-founded the university's first consulting club",
      "Created consulting curricula and case interview frameworks",
      "Conducted a large-scale workshop for 3,000+ freshers",
      "Consulted student startups on go-to-market strategies",
    ],
    color: "#22C55E",
    logo: "💼",
  },
];

// ─── SKILLS ───────────────────────────────────────────────────────────────────

export const skills: Skill[] = [
  // Programming Languages from Resume
  { name: "Python", category: "Programming", level: 90, years: 4, icon: "🐍" },
  { name: "C/C++", category: "Programming", level: 85, years: 3, icon: "💻" },
  { name: "JavaScript", category: "Programming", level: 80, years: 2, icon: "🟨" },
  { name: "HTML", category: "Programming", level: 92, years: 4, icon: "🌐" },
  { name: "CSS", category: "Programming", level: 88, years: 4, icon: "🎨" },

  // Tools from Resume
  { name: "Power BI", category: "Tools", level: 85, years: 2, icon: "📊" },
  { name: "Figma", category: "Tools", level: 88, years: 2, icon: "📐" },
  { name: "Firebase", category: "Tools", level: 75, years: 2, icon: "🔥" },
  { name: "Photoshop", category: "Tools", level: 80, years: 3, icon: "🔵" },
  { name: "Illustrator", category: "Tools", level: 78, years: 2, icon: "🟧" },
  { name: "Notion", category: "Tools", level: 90, years: 3, icon: "📝" },
  { name: "Excel", category: "Tools", level: 85, years: 4, icon: "📈" },
];

export const skillCategories = ["Programming", "Tools"];

// ─── ACHIEVEMENTS ─────────────────────────────────────────────────────────────

export const achievements: Achievement[] = [
  {
    id: "campus-scale",
    title: "Co-Founded Campus Uncovered",
    event: "Student Media Initiative",
    year: "2025",
    description:
      "Successfully scaled a campus media platform from scratch to over 10,000 active student followers, creating high-impact visual narratives and community engagement campaigns.",
    icon: "🚀",
    color: "#3578FF",
  },
  {
    id: "booking-efficiency",
    title: "Cut Onboarding Check-in by 90%",
    event: "Frosh Student Onboarding",
    year: "2024",
    description:
      "Developed a custom QR-code data validation system in Python that streamlined check-in workflows for over 3,500 students, eliminating physical bottlenecks.",
    icon: "⏱",
    color: "#FF8A3D",
  },
  {
    id: "budget-management",
    title: "1 Crore Financial Leadership",
    event: "Saturnalia Festival Budget",
    year: "2025",
    description:
      "Directly managed financial planning and payment workflows for a 1 Crore student festival, optimizing budget tracking tools and slashing vendor payment cycles by 4 days.",
    icon: "💰",
    color: "#22C55E",
  },
];

// ─── HISTORY MILESTONES ───────────────────────────────────────────────────────

export const historyMilestones = [
  { year: "2022", event: "Started Electronics & Communication Engineering at TIET", icon: "🎓" },
  { year: "2023", event: "Appointed Technical & Design Head of Frosh", icon: "⚡" },
  { year: "2024", event: "Co-Founded university consulting wing to train 15,000+ students", icon: "💼" },
  { year: "2024", event: "Appointed Overall Finance Head of Saturnalia (1 Cr budget)", icon: "💰" },
  { year: "2025", event: "Co-founded Campus Uncovered student media initiative (10K+ followers)", icon: "📱" },
  { year: "2025", event: "Developed AI Diabetic Retinopathy screening system using PyTorch", icon: "🧠" },
];

// ─── TERMINAL COMMANDS ────────────────────────────────────────────────────────

export const terminalCommands: Record<string, string> = {
  help: `Available commands:
  about       → Learn about Shivam
  projects    → View featured projects
  skills      → List all skills
  experience  → Work experience timeline
  resume      → Download resume
  contact     → Get in touch
  github      → Open GitHub profile
  linkedin    → Open LinkedIn
  hire        → Why hire Shivam?
  clear       → Clear terminal
  help        → Show this message`,

  about: `Shivam Kumar — Software Engineer & Creator
  ─────────────────────────────────────────
  Role:    Software Engineer | AI Developer | Leader
  Status:  🟢 Available for opportunities
  Based:   Patiala, Punjab, India
  
  Bachelor of Engineering in Electronics and Communication at Thapar Institute
  of Engineering and Technology (TIET).
  
  I build systems where engineering meets design — leading 1 Crore financial
  operations, co-founding media platforms to 10K+ followers, and deploying AI models.`,

  projects: `Featured Projects:
  ─────────────────
  [1] AI-Based Diabetic Retinopathy System → PyTorch + CNN Image Analysis
  [2] Campus Uncovered                     → Media Platform + Outreach
  [3] Frosh Booking & QR Validation        → Python + Event Automation
  
  Type a project name or scroll to Artboard 02.`,

  skills: `Technical Skills:
  ─────────────────
  Languages   HTML · CSS · C/C++ · Python · JavaScript
  Tools       Power BI · Figma · Firebase · Photoshop · Illustrator · Notion · Excel`,

  experience: `Experience:
  ──────────
  Overall Finance Head   Saturnalia festival (1 Cr budget)     2024–2026
  Tech & Design Head     Frosh onboarding & operations         2023–2025
  Student Consultant     Plex Consulting Wing                  2024–2025`,

  hire: `Why hire Shivam?
  ────────────────
  ✓ Strong engineering fundamentals with deep Python & C/C++ expertise
  ✓ Financial leadership: Managed a 1 Crore budget & optimized vendor pipelines
  ✓ Co-founded Campus Uncovered, scaling organic reach to 10,000+ followers
  ✓ Built QR automation check-in system that saved 90% in onboarding times
  ✓ Full-stack AI developer with experience in PyTorch & TensorFlow CNN models
  
  Email: 0828tejas@gmail.com`,

  resume: `Opening resume...
  Downloading: Shivam_Kumar_Resume.pdf`,

  contact: `Get in touch:
  ─────────────
  Email    0828tejas@gmail.com
  Phone    +91 85215 28744
  Location Patiala, Punjab
  LinkedIn linkedin.com/in/shiviiii
  GitHub   github.com/shivamkumar`,

  github: "Opening GitHub: github.com/shivamkumar",
  linkedin: "Opening LinkedIn: linkedin.com/in/shiviiii",

  clear: "__CLEAR__",
};

// ─── AI ASSISTANT RESPONSES ───────────────────────────────────────────────────

export const aiResponses: Record<string, string> = {
  default:
    "I'm Shivam's AI assistant. Ask me anything about his background, projects, experience, or skills!",

  summarize: `Shivam Kumar is a Software Engineer studying Electronics & Communication at Thapar Institute.
He's built automated medical AI tools using PyTorch, managed financial operations for a 1 Crore budget festival, co-founded a student media platform with 10K+ followers, and designed centralized student validation tools in Python.`,

  hire: `Shivam brings rare versatility:
1. Operations & Finance: Managed 1 Cr budget for Saturnalia.
2. Technical Execution: Built QR scan systems for 3,500+ students and AI diagnosis tools.
3. Media Growth: Co-founded Campus Uncovered, reaching 10,000+ followers.
4. Problem Solving: Conducted cost analysis reducing festival expenses by 20%.`,

  "campus uncovered": `Campus Uncovered is a student-focused media initiative co-founded by Shivam. He oversaw outreach and content strategy, scaling audience organic engagement to over 10,000 followers.`,

  "retinopathy project": `The Diabetic Retinopathy system uses CNNs (TensorFlow/PyTorch) and OpenCV to process retinal fundus images for non-invasive early diagnosis of DR severity.`,

  education: `Shivam is pursuing a Bachelor of Engineering in Electronics & Communication at Thapar Institute of Engineering and Technology (2022–Present). Prior education includes Chinmaya Vidyalaya (85%) and St. Xavier's (88.6%).`,

  strengths: `1. Analytical execution: Budget optimization using exploratory data analysis.
2. Systems automation: QR check-in automation cutting check-in times by 90%.
3. Technical design: Strong combination of Figma UI/UX, Python, and PyTorch deep learning.`,
};

// ─── CAMPUS UNCOVERED STATS ───────────────────────────────────────────────────

export const campusStats = [
  { label: "Followers", value: "10K+", icon: "👥" },
  { label: "Check-in Save", value: "90%", icon: "⏱" },
  { label: "Saturnalia Budget", value: "1 Cr", icon: "💰" },
  { label: "Frosh Onboarding", value: "3.5K+", icon: "🤝" },
  { label: "Frosh Budget Cut", value: "20%", icon: "📉" },
  { label: "Consulting Reach", value: "15K+", icon: "📊" },
];

// ─── RESUME METADATA ──────────────────────────────────────────────────────────

export const resumeData = {
  atsScore: 94,
  version: "v4.0",
  lastUpdated: "June 2025",
  format: "ATS-Optimized PDF",
  pages: 1,
  keywords: [
    "Software Engineer",
    "Python",
    "C/C++",
    "HTML",
    "CSS",
    "JavaScript",
    "Power BI",
    "Figma",
    "Firebase",
    "TensorFlow",
    "PyTorch",
  ],
};
