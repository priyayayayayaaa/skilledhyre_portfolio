export interface Capability {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  technologies: string[];
  features: string[];
  exampleProject: {
    title: string;
    impact: string;
  };
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  industry: string;
  challenge: string;
  solution: string;
  technologies: string[];
  metrics: {
    value: string;
    label: string;
  }[];
  heroImage: string;
  accentColor: string;
}

export interface TechItem {
  name: string;
  category: "AI" | "DEVELOPMENT" | "DATA & CLOUD" | "BUSINESS SYSTEMS" | "MARKETING";
  proficiency: number;
  popular: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  category: "Leadership" | "Technology" | "Design" | "Marketing" | "Growth";
  specialization: string[];
  about: string;
  roleDescription: string;
  keyContributions: string[];
  avatar: string;
  linkedin: string;
  twitter?: string;
  experience?: string;
  leadershipVision?: string;
  imagePosition?: string;
  imageScale?: string;
}

export interface StatItem {
  id: string;
  number: number;
  suffix: string;
  label: string;
  description: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  clientTitle: string;
  companyName: string;
  metricsResult: string;
  rating: number;
  avatar: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
}

export const CAPABILITIES: Capability[] = [
  {
    id: "ai-automation",
    title: "AI & AUTOMATION",
    shortDesc: "Turn manual routines into autonomous intelligent systems.",
    fullDesc: "Bespoke LLM pipelines, autonomous agents, and process automations engineered to cut operational drag.",
    technologies: ["Generative AI", "LLMs", "Predictive Analytics", "RAG Systems", "Python"],
    features: ["Autonomous backend workflows", "Custom LLM & RAG architectures", "Intelligent document extraction"],
    exampleProject: {
      title: "Enterprise Autonomous Workflow Engine",
      impact: "60% ↓ Manual Ops",
    },
  },
  {
    id: "software-engineering",
    title: "SOFTWARE ENGINEERING",
    shortDesc: "Mission-critical backend architectures built for speed and resilience.",
    fullDesc: "Robust microservices and enterprise software built using C#, .NET Core, and cloud infrastructure.",
    technologies: ["C#", ".NET Core", "ASP.NET Core", "REST / gRPC", "Cloud Native"],
    features: ["High-concurrency API cores", "Serverless cloud architecture", "DevOps & CI/CD pipelines"],
    exampleProject: {
      title: "High-Throughput Financial Core",
      impact: "99.999% Uptime",
    },
  },
  {
    id: "web-mobile",
    title: "WEB & MOBILE",
    shortDesc: "Cinematic, sub-second web and mobile platforms built to scale.",
    fullDesc: "Ultra-fast Next.js web applications and cross-platform mobile apps with responsive design systems.",
    technologies: ["Next.js", "TypeScript", "React Native", "Tailwind CSS", "Framer Motion"],
    features: ["Sub-second Web Vitals load times", "Native iOS & Android platforms", "Offline PWA architecture"],
    exampleProject: {
      title: "Next-Gen SaaS Analytics Portal",
      impact: "3.2x Engagement",
    },
  },
  {
    id: "erp-business-systems",
    title: "ERP & BUSINESS SYSTEMS",
    shortDesc: "Unified business engines custom-built around your exact logic.",
    fullDesc: "Custom ERP and CRM engines eliminating spreadsheet chaos and centralizing company-wide data.",
    technologies: ["Custom ERP", "SQL Core", "Workflow Triggers", "API Gateways"],
    features: ["Real-time inventory & ops tracking", "Automated billing reconciliation", "Role-based security"],
    exampleProject: {
      title: "Global Supply Chain Suite",
      impact: "3x Operational Velocity",
    },
  },
  {
    id: "product-engineering",
    title: "PRODUCT ENGINEERING",
    shortDesc: "From raw concept to market-ready scalable SaaS products.",
    fullDesc: "Full-cycle product architecture combining UX, rapid sprint delivery, and cloud infrastructure.",
    technologies: ["System Design", "SaaS Core", "Telemetry", "Feature Flags"],
    features: ["MVP sprint execution", "Scalable cloud database design", "Continuous deployment"],
    exampleProject: {
      title: "B2B AI Product Flagship",
      impact: "0 to 50k Users in 4 Mo",
    },
  },
  {
    id: "digital-marketing",
    title: "DIGITAL MARKETING",
    shortDesc: "Performance acquisition funnels engineered for measurable ROI.",
    fullDesc: "Data-driven paid ads, conversion rate optimization, and multi-channel acquisition funnels.",
    technologies: ["Performance Ads", "Funnel CRO", "Omnichannel Ads", "Attribution"],
    features: ["Multi-channel ad funnels", "High-converting landing pages", "LTV attribution modeling"],
    exampleProject: {
      title: "B2B Omnichannel Growth Engine",
      impact: "+180% Qualified Pipeline",
    },
  },
  {
    id: "seo-smm",
    title: "SEO & SMM",
    shortDesc: "Dominate search rankings and build high-intent organic traffic.",
    fullDesc: "Technical SEO audits, programmatic content expansion, and authority-building social media strategy.",
    technologies: ["Technical SEO", "Programmatic Content", "Organic Reach", "Analytics"],
    features: ["Deep programmatic SEO hubs", "High-intent keyword mapping", "Social brand storytelling"],
    exampleProject: {
      title: "SaaS Organic Takeover",
      impact: "1.4M Monthly Organic",
    },
  },
  {
    id: "lead-generation",
    title: "LEAD GENERATION",
    shortDesc: "Automated 24/7 lead acquisition and CRM enrichment pipelines.",
    fullDesc: "Intelligent lead scoring, automated nurture flows, and real-time CRM pipeline sync.",
    technologies: ["Automated Funnels", "AI Lead Scoring", "HubSpot / CRM", "Nurture Sequences"],
    features: ["Automated lead capture matrix", "Instant sales rep alerts", "Verified B2B lead enrichment"],
    exampleProject: {
      title: "Automated B2B Lead Engine",
      impact: "+42% Qualified Leads",
    },
  },
  {
    id: "tech-talent",
    title: "TECH TALENT",
    shortDesc: "Augment your team with pre-vetted top 1% senior engineers.",
    fullDesc: "Senior developers, AI researchers, and cloud engineers ready to deploy into your sprints in 14 days.",
    technologies: ["Senior .NET Developers", "AI Engineers", "Full-Stack Pods", "DevOps"],
    features: ["Top 1% pre-vetted senior devs", "14-day rapid deployment", "Sprint velocity alignment"],
    exampleProject: {
      title: "Dedicated Engineering Pod",
      impact: "2x Sprint Speed",
    },
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "project-01",
    title: "AI-Powered Business Automation",
    subtitle: "Enterprise Workflow Transformation",
    category: "AI & Automation",
    industry: "Logistics",
    challenge: "Manual data entry created 48-hour order backlogs across legacy ERP systems.",
    solution: "Deployed an AI document parser and automated workflow engine to index and process incoming orders automatically.",
    technologies: ["Python", "Generative AI", "C# .NET", "PostgreSQL"],
    metrics: [
      { value: "60% ↓", label: "Manual Ops" },
      { value: "10x", label: "Speed" },
      { value: "99.8%", label: "Accuracy" },
    ],
    heroImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    accentColor: "#00F2FE",
  },
  {
    id: "project-02",
    title: "Custom Business Platform",
    subtitle: "Unified Enterprise Workstation",
    category: "Software Engineering",
    industry: "Fintech",
    challenge: "Fragmented SaaS tools and spreadsheets caused data duplication and slow reporting.",
    solution: "Engineered a centralized business workstation with live telemetry, billing, and customer operations.",
    technologies: ["ASP.NET Core", "React", "TypeScript", "SQL Server"],
    metrics: [
      { value: "3x Faster", label: "Workflow" },
      { value: "100%", label: "Centralized" },
      { value: "$450k", label: "Annual Savings" },
    ],
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    accentColor: "#8A2BE2",
  },
  {
    id: "project-03",
    title: "Digital Growth System",
    subtitle: "Performance & Conversion Funnel",
    category: "Digital Marketing",
    industry: "B2B SaaS",
    challenge: "High website traffic but low-intent lead conversions under 1.2%.",
    solution: "Re-architected the funnel with programmatic SEO hubs and dynamic conversion landing pages.",
    technologies: ["Next.js", "Programmatic SEO", "HubSpot API", "GA4"],
    metrics: [
      { value: "+42%", label: "Leads" },
      { value: "4.8x", label: "ROAS" },
      { value: "-35%", label: "CPA" },
    ],
    heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    accentColor: "#00E5FF",
  },
  {
    id: "project-04",
    title: "Intelligent Talent Scale Engine",
    subtitle: "AI Talent Screening Platform",
    category: "Tech Talent",
    industry: "Human Capital",
    challenge: "6-week recruitment cycles slowed tech client sprint delivery.",
    solution: "Built an AI vetting engine with automated code scoring and candidate availability matching.",
    technologies: ["Python", "React Native", "Node.js", "OpenAI"],
    metrics: [
      { value: "14 Days", label: "Placement" },
      { value: "98%", label: "Retention" },
      { value: "2.4x", label: "Velocity" },
    ],
    heroImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
    accentColor: "#3B82F6",
  },
];

export const TECH_CATEGORIES = ["AI", "DEVELOPMENT", "DATA & CLOUD", "BUSINESS SYSTEMS", "MARKETING"] as const;

export const TECHNOLOGIES: TechItem[] = [
  { name: "Generative AI", category: "AI", proficiency: 95, popular: true },
  { name: "Machine Learning", category: "AI", proficiency: 90, popular: true },
  { name: "LLM & RAG Pipelines", category: "AI", proficiency: 94, popular: true },
  { name: "Predictive Analytics", category: "AI", proficiency: 88, popular: false },
  
  { name: "C#", category: "DEVELOPMENT", proficiency: 96, popular: true },
  { name: ".NET Core", category: "DEVELOPMENT", proficiency: 98, popular: true },
  { name: "ASP.NET Core", category: "DEVELOPMENT", proficiency: 95, popular: true },
  { name: "React & Next.js", category: "DEVELOPMENT", proficiency: 96, popular: true },
  { name: "TypeScript", category: "DEVELOPMENT", proficiency: 95, popular: true },
  { name: "Python", category: "DEVELOPMENT", proficiency: 92, popular: true },

  { name: "SQL & PostgreSQL", category: "DATA & CLOUD", proficiency: 94, popular: true },
  { name: "Azure & AWS Cloud", category: "DATA & CLOUD", proficiency: 90, popular: true },
  { name: "Analytics Telemetry", category: "DATA & CLOUD", proficiency: 88, popular: false },

  { name: "Custom ERP Engines", category: "BUSINESS SYSTEMS", proficiency: 96, popular: true },
  { name: "CRM Automation", category: "BUSINESS SYSTEMS", proficiency: 92, popular: true },
  { name: "API Gateways", category: "BUSINESS SYSTEMS", proficiency: 90, popular: false },

  { name: "Technical SEO", category: "MARKETING", proficiency: 95, popular: true },
  { name: "Performance Marketing", category: "MARKETING", proficiency: 94, popular: true },
  { name: "Funnel Conversion", category: "MARKETING", proficiency: 90, popular: false },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "DISCOVER",
    subtitle: "Audit & Blueprint",
    description: "Audit business friction, metrics, and bottlenecks to isolate high-leverage opportunities.",
    deliverables: ["Audit Report", "ROI Matrix"],
  },
  {
    step: "02",
    title: "DEFINE",
    subtitle: "System Architecture",
    description: "Map software architecture, AI triggers, UX journeys, and growth funnels.",
    deliverables: ["Architecture Specs", "UI Wireframes"],
  },
  {
    step: "03",
    title: "DESIGN",
    subtitle: "Precision Engineering",
    description: "Craft modern interfaces while engineers establish clean database schemas and code standards.",
    deliverables: ["Prototypes", "Design System"],
  },
  {
    step: "04",
    title: "BUILD",
    subtitle: "Agile Sprints & AI Integration",
    description: "Execute bi-weekly sprints, building robust software and wiring up AI automation.",
    deliverables: ["Production Code", "API Docs"],
  },
  {
    step: "05",
    title: "GROW",
    subtitle: "Scale & Optimize",
    description: "Deploy platforms, launch marketing channels, monitor live telemetry, and continuously optimize.",
    deliverables: ["Live Launch", "Telemetry Dashboard"],
  },
];

export const WHY_US_PILLARS = [
  {
    id: "business-first",
    title: "BUSINESS FIRST",
    highlight: "We solve business problems, not just write code.",
    description: "We start with revenue drivers, operational friction, and ROI before building technology.",
  },
  {
    id: "one-team",
    title: "ONE ECOSYSTEM",
    highlight: "Engineering, AI & Growth under one roof.",
    description: "No juggling separate agencies. Software, AI automation, marketing, and talent operate seamlessly.",
  },
  {
    id: "built-to-scale",
    title: "BUILT TO SCALE",
    highlight: "Engineered for tomorrow's growth.",
    description: "Resilient cloud microservices, clean code standards, and database architecture built to scale.",
  },
  {
    id: "measurable-impact",
    title: "MEASURABLE IMPACT",
    highlight: "Clear outcomes, zero fluff.",
    description: "We measure success in hours saved, faster workflows, higher conversion, and revenue growth.",
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "team-01",
    name: "Arun Kumar",
    designation: "Founder & Director | SkilledHyre Labs, SkilledHyre, Codzskill & StartupGaatha",
    category: "Leadership",
    experience: "15+ Years Experience",
    specialization: [
      "Software & Technology",
      "AI & Digital Transformation",
      "Digital Marketing & SEO",
      "Business Development",
      "Product Strategy",
      "Team Leadership",
    ],
    about: "Technology entrepreneur and business leader specializing in enterprise software development, digital transformation, AI automation, and growth strategy.",
    roleDescription: "Directs technology innovation, product strategy, client partnerships, and enterprise scaling initiatives across SkilledHyre Labs, SkilledHyre, Codzskill, and StartupGaatha.",
    leadershipVision: "Building innovative, scalable, and technology-driven businesses that create measurable business value and sustainable growth.",
    keyContributions: [
      "Pioneered technology innovation and enterprise growth frameworks",
      "Drove strategic digital transformation and AI automation for global clients",
      "Built and scaled high-performance software, marketing, and strategy pods across SkilledHyre Labs, SkilledHyre, Codzskill, and StartupGaatha",
    ],
    avatar: "/images/arun-kumar.jpg",
    linkedin: "https://www.linkedin.com/in/arun-k-915020b6/",
    imagePosition: "object-[center_12%]",
    imageScale: "scale-100",
  },
  {
    id: "team-02",
    name: "Smita Kumari",
    designation: "Co-Founder & Director | SkilledHyre Labs, SkilledHyre, Codzskill & StartupGaatha",
    category: "Leadership",
    experience: "10+ Years Experience",
    specialization: [
      "Software & App Development",
      "Digital Marketing",
      "Technical Staffing",
      "Bootcamps & Live Projects",
      "Industry Exposure",
      "Expert Mentoring",
    ],
    about: "Technology and business professional with 10+ years of experience in software, app & web development, digital marketing, technical staffing, and talent development.",
    roleDescription: "Directs organizational scaling, talent operations, technical staffing frameworks, and skill bootcamps across SkilledHyre Labs, SkilledHyre, Codzskill, and StartupGaatha.",
    leadershipVision: "Focused on building skilled talent, delivering technology solutions, and creating industry-ready professionals across all ecosystem brands.",
    keyContributions: [
      "Co-Founder & Director across SkilledHyre Labs, SkilledHyre, Codzskill & StartupGaatha ecosystems",
      "Architected tech staffing and talent development frameworks",
      "Spearheaded live project bootcamps and expert mentoring initiatives",
    ],
    avatar: "/images/smita-kumari.jpg",
    linkedin: "https://www.linkedin.com/in/smita-kumari-3aab491aa/",
    imagePosition: "object-[center_12%]",
    imageScale: "scale-100",
  },
  {
    id: "team-03",
    name: "Shweta Tiwari",
    designation: "Co-Founder & Business Head | StartupGaatha, SkilledHyre, Codzskill & SkilledHyre Labs",
    category: "Leadership",
    experience: "1+ Year Experience",
    specialization: [
      "Digital Marketing",
      "Business Head & Growth",
      "Client Management",
      "SEO & Content",
      "Social Media Strategy",
      "Business Operations",
      "Team Coordination",
      "Lead Generation",
    ],
    about: "Digital marketing and business operations professional specializing in business management, client relationships, team coordination, SEO, content creation, social media marketing, and operational execution.",
    roleDescription: "Drives business head operations, digital growth, client relationships, team coordination, and day-to-day marketing execution across StartupGaatha, SkilledHyre, Codzskill, and SkilledHyre Labs.",
    leadershipVision: "Focused on driving business growth, strengthening client relationships, and building effective marketing operations across technology and talent-focused businesses.",
    keyContributions: [
      "Co-Founder & Business Head across StartupGaatha, SkilledHyre, Codzskill & SkilledHyre Labs",
      "Directed client management, lead generation, and brand growth strategies",
      "Managed cross-functional team coordination, SEO, and business operations",
    ],
    avatar: "/images/shweta-tiwari.png",
    linkedin: "https://www.linkedin.com/in/shweta-tiwari-318894332/",
    imagePosition: "object-[center_12%]",
    imageScale: "scale-100",
  },
  {
    id: "team-04",
    name: "Khushi Kashyap",
    designation: "Social Media Executive & Content Creator | SkilledHyre",
    category: "Marketing",
    specialization: [
      "Content Creation",
      "Digital Marketing",
      "Social Media Strategy",
      "Video Content",
      "Brand Engagement",
    ],
    about: "Driving brand engagement, content creation, social media growth, and digital marketing initiatives at SkilledHyre.",
    roleDescription: "Manages organic social media campaigns, content strategies, short-form video concepts, and audience engagement across digital platforms, with a focus on strengthening brand presence and driving digital growth.",
    keyContributions: [
      "Leads social media content initiatives for SkilledHyre",
      "Develops engaging short-form video content and creative concepts",
      "Supports organic audience growth and brand engagement",
      "Contributes to digital marketing campaigns and content funnels",
    ],
    avatar: "/images/khushi-kashyap.png",
    linkedin: "https://www.linkedin.com/in/khushi-kashyap-aa817337a/",
    imagePosition: "object-[center_12%]",
    imageScale: "scale-100",
  },
  {
    id: "team-05",
    name: "Rikendra Singh Rawat",
    designation: "Video Editor & Motion Designer | SkilledHyre",
    category: "Design",
    specialization: [
      "Video Editing",
      "Motion Graphics",
      "Visual Storytelling",
      "Video Ads",
      "Creative Direction",
    ],
    about: "Creating high-impact visual content, motion graphics, video ads, and dynamic brand assets that strengthen SkilledHyre’s digital presence.",
    roleDescription: "Leads video editing, motion graphics, visual storytelling, brand reels, and promotional content, transforming ideas into engaging visual experiences for SkilledHyre and its marketing initiatives.",
    keyContributions: [
      "Produces engaging video content and promotional creatives",
      "Creates motion graphics and branded short-form content",
      "Develops visual narratives for digital marketing campaigns",
      "Supports SkilledHyre’s brand communication through impactful video assets",
    ],
    avatar: "/images/rikendra-rawat.jpg",
    linkedin: "https://www.linkedin.com/in/rikendra-singh-rawat-a2b567304/",
    imagePosition: "object-[center_12%]",
    imageScale: "scale-100",
  },
  {
    id: "team-06",
    name: "Himanshi",
    designation: "Search & AI Visibility Executive | SkilledHyre",
    category: "Marketing",
    specialization: [
      "SEO",
      "AEO",
      "GEO",
      "Technical SEO",
      "Keyword Strategy",
      "AI Search Optimization",
      "Organic Growth",
    ],
    about: "Driving organic search growth and AI-search visibility through SEO, AEO, GEO, content optimization, and data-driven search strategies.",
    roleDescription: "Manages technical SEO, keyword research, AEO, GEO, content optimization, and search analytics to strengthen brand discoverability across search engines and AI-powered platforms.",
    keyContributions: [
      "Drives SEO, AEO & GEO strategies to improve digital visibility",
      "Optimizes content for search engines, AI answers, and generative search",
      "Develops keyword and content strategies aligned with search intent",
      "Conducts technical SEO audits and identifies organic growth opportunities",
      "Uses search performance data to drive continuous optimization",
    ],
    avatar: "/images/seo-executive.jpg",
    linkedin: "https://linkedin.com",
    imagePosition: "object-[center_12%]",
    imageScale: "scale-100",
  },
  {
    id: "team-07",
    name: "Abhishek Patel",
    designation: "WordPress Developer | SkilledHyre",
    category: "Technology",
    specialization: [
      "WordPress",
      "PHP",
      "Custom CMS",
      "WooCommerce",
      "Web Performance",
      "Website Development",
    ],
    about: "WordPress Developer & CMS Specialist at SkilledHyre, specializing in custom WordPress development, CMS solutions, website performance, and scalable web experiences.",
    roleDescription: "Builds and manages custom WordPress websites, themes, plugins, CMS workflows, and performance-focused web solutions to deliver secure, scalable, and high-performing digital experiences.",
    keyContributions: [
      "Develops custom WordPress themes and plugins",
      "Builds scalable and performance-focused CMS solutions",
      "Optimizes websites for speed, usability, and performance",
      "Works on secure and efficient WordPress development workflows",
      "Supports the development of customized web portals for client projects",
    ],
    avatar: "/images/wordpress-developer.jpg",
    linkedin: "https://linkedin.com",
    imagePosition: "object-[center_12%]",
    imageScale: "scale-100",
  },
  {
    id: "team-08",
    name: "Priya Kumari",
    designation: "Full Stack Developer & Marketing Management | SkilledHyre",
    category: "Technology",
    specialization: [
      "MERN Stack",
      "Marketing Automation",
      "React & Node.js",
      "Digital Marketing",
      "Product Strategy",
    ],
    about: "Building at the intersection of technology and growth — developing web applications while turning marketing ideas into automated, scalable digital systems.",
    roleDescription: "Works across MERN development, marketing automation, campaign systems, and digital operations, connecting technology with marketing to create smoother and more scalable growth workflows.",
    keyContributions: [
      "Builds scalable MERN-based web applications",
      "Turns marketing workflows into automated digital systems",
      "Connects product development with marketing and growth initiatives",
      "Works across both technology and marketing operations",
      "Contributes to building smarter, scalable digital solutions",
    ],
    avatar: "/images/priya-kumari.jpg",
    linkedin: "https://www.linkedin.com/in/priya-kumari-2b669b2a2/",
    imagePosition: "object-[center_12%]",
    imageScale: "scale-100",
  },
  {
    id: "team-09",
    name: "Himanshu Kumar",
    designation: "Full Stack Developer | SkilledHyre",
    category: "Technology",
    specialization: [
      "Full Stack Development",
      "React & Node.js",
      "API Development",
      "UI/UX Engineering",
      "Web Applications",
    ],
    about: "Full Stack Developer at SkilledHyre, building scalable web applications, modern interfaces, and robust backend systems that turn ideas into functional digital products.",
    roleDescription: "Engineers full-stack web platforms, API services, responsive interfaces, and cloud-ready solutions, focusing on performance, scalability, and seamless user experiences.",
    keyContributions: [
      "Builds scalable full-stack web applications",
      "Develops modern, responsive frontend experiences",
      "Engineers robust backend services and API integrations",
      "Creates reusable components for consistent product experiences",
      "Delivers production-ready web solutions for client projects",
    ],
    avatar: "/images/himanshu-kumar.png",
    linkedin: "https://www.linkedin.com/in/himanshu-devdesign/",
    imagePosition: "object-[center_12%]",
    imageScale: "scale-100",
  },
];

export const COMPANY_STATS: StatItem[] = [
  {
    id: "stat-projects",
    number: 120,
    suffix: "+",
    label: "Projects Delivered",
    description: "Platforms, AI engines & growth systems shipped.",
  },
  {
    id: "stat-industries",
    number: 15,
    suffix: "+",
    label: "Industries Served",
    description: "Fintech, Logistics, SaaS, Healthcare & Supply Chain.",
  },
  {
    id: "stat-experts",
    number: 45,
    suffix: "+",
    label: "Technology Experts",
    description: "Senior engineers, AI researchers & strategists.",
  },
  {
    id: "stat-experience",
    number: 8,
    suffix: "+",
    label: "Years Experience",
    description: "Building what moves business forward.",
  },
  {
    id: "stat-clients",
    number: 95,
    suffix: "%",
    label: "Client Retention",
    description: "Long-term partnerships rooted in tangible ROI.",
  },
  {
    id: "stat-countries",
    number: 14,
    suffix: "",
    label: "Countries Served",
    description: "Clients across NA, Europe, Asia & Middle East.",
  },
];

export interface Testimonial {
  id: string;
  clientName: string;
  clientTitle: string;
  companyName: string;
  companyLogo?: string;
  companyLogoText?: string;
  quote: string;
  metricsResult: string;
  rating: number;
  avatar: string;
  category: "AI & Automation" | "Software Engineering" | "Digital Marketing" | "Tech Talent";
  verified?: boolean;
  date?: string;
  projectLink?: string;
}

export interface ClientLogoItem {
  name: string;
  label: string;
  logoUrl?: string;
  industry: string;
  testimonialId: string;
  website?: string;
}

export const CLIENT_LOGOS: ClientLogoItem[] = [
  {
    name: "Positive Minds",
    label: "POSITIVE MINDS",
    logoUrl: "/images/positive-minds-logo.png",
    industry: "Wellness & Digital Strategy",
    testimonialId: "test-positive-minds",
    website: "https://positiveminds.co.in/",
  },
  {
    name: "Vastu Infinity",
    label: "VASTU INFINITY",
    logoUrl: "/images/vastu-infinity-logo.png",
    industry: "Vastu & Digital Growth",
    testimonialId: "test-vastu-infinity",
  },
  {
    name: "Ankur Incorporation",
    label: "ANKUR INCORPORATION",
    logoUrl: "/images/ankur-incorporation-logo.png",
    industry: "Business Growth & Consulting",
    testimonialId: "test-ankur-incorporation",
  },
  {
    name: "Designer Karigar",
    label: "DESIGNER KARIGAR",
    logoUrl: "/images/designer-karigar-logo.png",
    industry: "Fashion & Creative Design",
    testimonialId: "test-designer-karigar",
  },
  {
    name: "ED Event Destination",
    label: "EVENT DESTINATION",
    logoUrl: "/images/event-destination-logo.png",
    industry: "Events & Destination Management",
    testimonialId: "test-event-destination",
  },
  {
    name: "PSR Convention Centre",
    label: "PSR CONVENTION",
    logoUrl: "/images/psr-convention-logo.png",
    industry: "Venue & Event Hospitality",
    testimonialId: "test-psr-convention",
  },
  {
    name: "Organispec",
    label: "ORGANISPEC",
    logoUrl: "/images/organispec-logo.png",
    industry: "Organic Farming & Produce",
    testimonialId: "test-organispec",
  },
  {
    name: "AppNAI",
    label: "APPNAI TECHNOLOGIES",
    logoUrl: "/images/appnai-logo.png",
    industry: "AI & Social Good Tech",
    testimonialId: "test-appnai",
  },
  {
    name: "AI Skill School",
    label: "AI SKILL SCHOOL",
    logoUrl: "/images/ai-skill-school-logo.png",
    industry: "AI Education & EdTech",
    testimonialId: "test-ai-skill-school",
  },
  {
    name: "Masazo",
    label: "MASAZO",
    logoUrl: "/images/masazo-logo.png",
    industry: "Lifestyle & Brand Experience",
    testimonialId: "test-masazo",
  },
  {
    name: "ShineMyName",
    label: "SHINEMYNAME",
    industry: "Personal Branding & Digital Strategy",
    testimonialId: "test-shinemyname",
  },
  {
    name: "Kanpur Kitchen",
    label: "KANPUR KITCHEN",
    industry: "Kitchenware & Food Products",
    testimonialId: "test-kanpur-kitchen",
  },
  {
    name: "Sinha Constructions",
    label: "SINHA CONSTRUCTIONS",
    industry: "Construction & Real Estate",
    testimonialId: "test-sinha-constructions",
  },
  {
    name: "Maitri Ghar Ka Swad",
    label: "MAITRI GHAR KA SWAD",
    logoUrl: "/images/maitri-logo.png",
    industry: "Grocery & Home Food Products",
    testimonialId: "test-maitri-ghar-ka-swad",
  },
  {
    name: "AdishTechno",
    label: "ADISHTECHNO",
    logoUrl: "/images/adish-techno-logo.png",
    industry: "IT Services & Technology",
    testimonialId: "test-adish-techno",
  },
  {
    name: "Career Critics",
    label: "CAREER CRITICS",
    logoUrl: "/images/career-critics-logo.png",
    industry: "EdTech & Career Guidance",
    testimonialId: "test-career-critics",
  },
  {
    name: "Cosmo Organic",
    label: "COSMO ORGANIC",
    logoUrl: "/images/cosmo-organic-logo.png",
    industry: "Organic Products & E-Commerce",
    testimonialId: "test-cosmo-organic",
  },
  {
    name: "Honey Allahabad Dental",
    label: "HONEY ALLAHABAD DENTAL",
    logoUrl: "/images/honey-allahabad-dental-logo.png",
    industry: "Healthcare & Dental Care",
    testimonialId: "test-honey-allahabad-dental",
  },
  {
    name: "Biogenesis Oil — Qatar",
    label: "BIOGENESIS OIL",
    industry: "Energy & Oil Industry (Qatar)",
    testimonialId: "test-biogenesis-oil",
  },
  {
    name: "Envision Your Business — London",
    label: "ENVISION BUSINESS",
    industry: "Business Advisory (UK)",
    testimonialId: "test-envision-business",
  },
  {
    name: "Maplewood Burgers — USA",
    label: "MAPLEWOOD BURGERS",
    industry: "Restaurant & Hospitality (USA)",
    testimonialId: "test-maplewood-burgers",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-positive-minds",
    quote: "Working with the team has given us a more structured approach to our digital presence. From social media and content to SEO and digital marketing, they understand our brand and consistently work towards improving our online visibility. Their communication and involvement make the collaboration smooth and productive.",
    clientName: "Gagandeep Siidhu",
    clientTitle: "Founder & Director",
    companyName: "Positive Minds",
    companyLogo: "/images/positive-minds-logo.png",
    companyLogoText: "POSITIVE MINDS",
    metricsResult: "SMM • SEO • Digital Marketing",
    rating: 5,
    avatar: "/images/gagandeep-siidhu.png",
    category: "Digital Marketing",
    verified: true,
    date: "Aug 2026",
    projectLink: "https://positiveminds.co.in/",
  },
  {
    id: "test-vastu-infinity",
    quote: "We had a great experience working with SkilledHyre for our Social Media Marketing and Digital Marketing requirements. Their team understood our brand well and helped us strengthen our online presence through creative content, consistent social media management, and effective digital marketing strategies. The team is professional, responsive, and dedicated to delivering quality results. We truly appreciate their efforts and support in helping Vastu Infinity grow digitally. We highly recommend SkilledHyre to businesses looking for reliable and result-oriented digital marketing and SMM services.",
    clientName: "Vastu Infinity",
    clientTitle: "Founder & Director",
    companyName: "Vastu Infinity",
    companyLogo: "/images/vastu-infinity-logo.png",
    companyLogoText: "VASTU INFINITY",
    metricsResult: "SMM & Digital Marketing",
    rating: 5,
    avatar: "/images/vastu-infinity-client.png",
    category: "Digital Marketing",
    verified: true,
    date: "Sep 2026",
  },
  {
    id: "test-ankur-incorporation",
    quote: "SkilledHyre has been handling our Social Media Marketing and SEO with a very professional and result-oriented approach. The team understands the brand requirements well, creates engaging content, and consistently works on improving our online visibility and reach. Their SEO efforts have helped strengthen our digital presence, while their SMM strategy has made our social media communication more consistent and engaging. The team is responsive, creative, and open to feedback. Overall, a great team to work with for SMM, SEO, and digital marketing services. Highly recommended!",
    clientName: "Ankur Incorporation",
    clientTitle: "Founder & Director",
    companyName: "Ankur Incorporation",
    companyLogo: "/images/ankur-incorporation-logo.png",
    companyLogoText: "ANKUR INCORPORATION",
    metricsResult: "SMM • SEO • Digital Marketing",
    rating: 5,
    avatar: "/images/ankur-incorporation-client.png",
    category: "Digital Marketing",
    verified: true,
    date: "Sep 2026",
  },
  {
    id: "test-designer-karigar",
    quote: "We had a great experience working with SkilledHyre for our SMM and SEO. The team has been very professional, creative, and consistent with their work. Our social media presence has become much more engaging, and the SEO efforts have helped improve our online visibility. The team understands our requirements well, is responsive to feedback, and keeps the work organized. Overall, we are happy with the services and would recommend SkilledHyre to businesses looking for reliable SMM and SEO support.",
    clientName: "Designer Karigar Team",
    clientTitle: "Founder & Creative Director",
    companyName: "Designer Karigar",
    companyLogo: "/images/designer-karigar-logo.png",
    companyLogoText: "DESIGNER KARIGAR",
    metricsResult: "SMM • SEO • Brand Reach",
    rating: 5,
    avatar: "/images/designer-karigar-logo.png",
    category: "Digital Marketing",
    verified: true,
    date: "Sep 2026",
  },
  {
    id: "test-event-destination",
    quote: "Great experience working with SkilledHyre for our SMM and SEO. Their team understands the event industry well and has helped us build a more professional and engaging online presence. We appreciate their creativity, consistency, and quick response to feedback. Highly recommended!",
    clientName: "ED Event Destination",
    clientTitle: "Managing Director",
    companyName: "ED Event Destination",
    companyLogo: "/images/event-destination-logo.png",
    companyLogoText: "EVENT DESTINATION",
    metricsResult: "SMM • SEO • Event Marketing",
    rating: 5,
    avatar: "/images/event-destination-logo.png",
    category: "Digital Marketing",
    verified: true,
    date: "Sep 2026",
  },
  {
    id: "test-psr-convention",
    quote: "We’re happy with SkilledHyre’s SMM and SEO services. Their team has helped us showcase our venue professionally and improve our online visibility. They are creative, responsive, and consistent.",
    clientName: "PSR Convention Centre",
    clientTitle: "Management",
    companyName: "PSR Convention Centre",
    companyLogo: "/images/psr-convention-logo.png",
    companyLogoText: "PSR CONVENTION",
    metricsResult: "SMM • SEO • Venue Visibility",
    rating: 5,
    avatar: "/images/psr-convention-logo.png",
    category: "Digital Marketing",
    verified: true,
    date: "Sep 2026",
  },
  {
    id: "test-organispec",
    quote: "SkilledHyre has done a great job with our SMM and SEO. Their content clearly communicates our products and keeps our brand active online. We appreciate their consistency and creative approach.",
    clientName: "Organispec Team",
    clientTitle: "Founder & Director",
    companyName: "Organispec",
    companyLogo: "/images/organispec-logo.png",
    companyLogoText: "ORGANISPEC",
    metricsResult: "SMM • SEO • Brand Reach",
    rating: 5,
    avatar: "/images/organispec-logo.png",
    category: "Digital Marketing",
    verified: true,
    date: "Sep 2026",
  },
  {
    id: "test-appnai",
    quote: "Great experience working with SkilledHyre for our SMM and SEO. They understand our AI and wellness-focused brand and have helped us communicate our offerings in a much more engaging way.",
    clientName: "AppNAI Technologies",
    clientTitle: "Head of Digital",
    companyName: "AppNAI",
    companyLogo: "/images/appnai-logo.png",
    companyLogoText: "APPNAI",
    metricsResult: "SMM • SEO • AI Branding",
    rating: 5,
    avatar: "/images/appnai-logo.png",
    category: "Digital Marketing",
    verified: true,
    date: "Sep 2026",
  },
  {
    id: "test-ai-skill-school",
    quote: "SkilledHyre has helped us present our AI education and training programs more effectively online. Their SMM and SEO work is consistent, creative, and focused on improving our digital presence.",
    clientName: "AI Skill School",
    clientTitle: "Academic Director",
    companyName: "AI Skill School",
    companyLogo: "/images/ai-skill-school-logo.png",
    companyLogoText: "AI SKILL SCHOOL",
    metricsResult: "SMM • SEO • EdTech Growth",
    rating: 5,
    avatar: "/images/ai-skill-school-logo.png",
    category: "Digital Marketing",
    verified: true,
    date: "Sep 2026",
  },
  {
    id: "test-masazo",
    quote: "We’ve had a positive experience with SkilledHyre. Their SMM and SEO team is creative, responsive, and understands our brand requirements well. Our online presence has become much more consistent.",
    clientName: "Masazo Brand Team",
    clientTitle: "Creative Director",
    companyName: "Masazo",
    companyLogo: "/images/masazo-logo.png",
    companyLogoText: "MASAZO",
    metricsResult: "SMM • SEO • Digital Presence",
    rating: 5,
    avatar: "/images/masazo-logo.png",
    category: "Digital Marketing",
    verified: true,
    date: "Sep 2026",
  },
  {
    id: "test-shinemyname",
    quote: "SkilledHyre has been great with our SMM and SEO. They bring fresh ideas to our content and have helped us create a stronger and more engaging online presence. Highly recommended!",
    clientName: "ShineMyName",
    clientTitle: "Founder & Lead Strategist",
    companyName: "ShineMyName",
    companyLogoText: "SHINEMYNAME",
    metricsResult: "SMM • SEO • Organic Reach",
    rating: 5,
    avatar: "",
    category: "Digital Marketing",
    verified: true,
    date: "Sep 2026",
  },
  {
    id: "test-kanpur-kitchen",
    quote: "Working with SkilledHyre has been a great experience. Their SMM content helps us showcase our kitchen products in an attractive way, while their SEO efforts support our online visibility. Very professional team.",
    clientName: "Kanpur Kitchen Team",
    clientTitle: "Managing Director",
    companyName: "Kanpur Kitchen",
    companyLogoText: "KANPUR KITCHEN",
    metricsResult: "SMM • SEO • Showcase",
    rating: 5,
    avatar: "",
    category: "Digital Marketing",
    verified: true,
    date: "Sep 2026",
  },
  {
    id: "test-sinha-constructions",
    quote: "SkilledHyre has helped us create a more professional digital presence for our construction business. Their SMM and SEO work is well-planned and aligned with our business requirements.",
    clientName: "Sinha Constructions Team",
    clientTitle: "Managing Director",
    companyName: "Sinha Constructions",
    companyLogoText: "SINHA CONSTRUCTIONS",
    metricsResult: "SMM • SEO • Digital Presence",
    rating: 5,
    avatar: "",
    category: "Digital Marketing",
    verified: true,
    date: "Sep 2026",
  },
  {
    id: "test-maitri-ghar-ka-swad",
    quote: "We’re happy with SkilledHyre’s SMM and SEO services. They have helped us showcase our grocery products through engaging content and improve our digital presence. Very creative and supportive team.",
    clientName: "Maitri Ghar Ka Swad",
    clientTitle: "Founder & Director",
    companyName: "Maitri Ghar Ka Swad",
    companyLogo: "/images/maitri-logo.png",
    companyLogoText: "MAITRI GHAR KA SWAD",
    metricsResult: "SMM • SEO • Product Showcase",
    rating: 5,
    avatar: "/images/maitri-logo.png",
    category: "Digital Marketing",
    verified: true,
    date: "Sep 2026",
  },
  {
    id: "test-adish-techno",
    quote: "SkilledHyre has been doing a great job with our SMM and SEO. They understand the technology space and create professional content that communicates our services clearly. We’re happy with their work.",
    clientName: "AdishTechno Team",
    clientTitle: "Head of Engineering",
    companyName: "AdishTechno",
    companyLogo: "/images/adish-techno-logo.png",
    companyLogoText: "ADISHTECHNO",
    metricsResult: "SMM • SEO • Tech Marketing",
    rating: 5,
    avatar: "/images/adish-techno-logo.png",
    category: "Digital Marketing",
    verified: true,
    date: "Sep 2026",
  },
  {
    id: "test-career-critics",
    quote: "SkilledHyre has helped us strengthen our online presence through consistent SMM and SEO. Their team understands the education and career space and is very responsive to our requirements.",
    clientName: "Career Critics Team",
    clientTitle: "Academic Lead",
    companyName: "Career Critics",
    companyLogo: "/images/career-critics-logo.png",
    companyLogoText: "CAREER CRITICS",
    metricsResult: "SMM • SEO • Student Reach",
    rating: 5,
    avatar: "/images/career-critics-logo.png",
    category: "Digital Marketing",
    verified: true,
    date: "Sep 2026",
  },
  {
    id: "test-cosmo-organic",
    quote: "We had a great experience working with SkilledHyre for our website, SMM, and SEO. They understood our organic product business well and created a professional digital presence for our brand. Creative and responsive team!",
    clientName: "Cosmo Organic Team",
    clientTitle: "Founder & Director",
    companyName: "Cosmo Organic",
    companyLogo: "/images/cosmo-organic-logo.png",
    companyLogoText: "COSMO ORGANIC",
    metricsResult: "Website • SMM • SEO",
    rating: 5,
    avatar: "/images/cosmo-organic-logo.png",
    category: "Digital Marketing",
    verified: true,
    date: "Sep 2026",
  },
  {
    id: "test-honey-allahabad-dental",
    quote: "SkilledHyre has helped us build a more professional and informative online presence. Their SMM and SEO work is consistent and relevant to our dental practice. We appreciate their creativity and support.",
    clientName: "Honey Allahabad Dental",
    clientTitle: "Medical Director",
    companyName: "Honey Allahabad Dental",
    companyLogo: "/images/honey-allahabad-dental-logo.png",
    companyLogoText: "HONEY ALLAHABAD DENTAL",
    metricsResult: "SMM • SEO • Patient Awareness",
    rating: 5,
    avatar: "/images/honey-allahabad-dental-logo.png",
    category: "Digital Marketing",
    verified: true,
    date: "Sep 2026",
  },
  {
    id: "test-biogenesis-oil",
    quote: "SkilledHyre has been great to work with for our digital marketing. Their team understands our requirements, communicates well, and consistently delivers professional work.",
    clientName: "Biogenesis Oil Team",
    clientTitle: "Director of Operations",
    companyName: "Biogenesis Oil — Qatar",
    companyLogoText: "BIOGENESIS OIL (QATAR)",
    metricsResult: "Digital Marketing • Qatar",
    rating: 5,
    avatar: "",
    category: "Digital Marketing",
    verified: true,
    date: "Sep 2026",
  },
  {
    id: "test-envision-business",
    quote: "We had a very positive experience with SkilledHyre. Their team is professional, creative, and understands our business well. Their digital marketing support has helped strengthen our online presence.",
    clientName: "Envision Business Team",
    clientTitle: "Managing Partner",
    companyName: "Envision Your Business — London",
    companyLogoText: "ENVISION BUSINESS (UK)",
    metricsResult: "Digital Marketing • UK",
    rating: 5,
    avatar: "",
    category: "Digital Marketing",
    verified: true,
    date: "Sep 2026",
  },
  {
    id: "test-maplewood-burgers",
    quote: "SkilledHyre has done a great job with our digital marketing. Their team understands the restaurant industry and creates engaging content that represents our brand well. Professional, responsive, and consistent!",
    clientName: "Maplewood Burgers Team",
    clientTitle: "Founder & General Manager",
    companyName: "Maplewood Burgers — USA",
    companyLogoText: "MAPLEWOOD BURGERS (USA)",
    metricsResult: "Digital Marketing • USA",
    rating: 5,
    avatar: "",
    category: "Digital Marketing",
    verified: true,
    date: "Sep 2026",
  },
];

