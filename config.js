/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║          PORTFOLIO CONFIG — EDIT EVERYTHING HERE         ║
 * ║   All sections, skills, projects, colors — one file.     ║
 * ║   Content sourced from Prasad Suryavanshi's résumé.      ║
 * ╚══════════════════════════════════════════════════════════╝
 */

const CONFIG = {

  /* ── CONTACT DELIVERY ───────────────────────────────────────
   |  The contact form lets the visitor send their message via
   |  WhatsApp or Email — no API keys or accounts required.
   |    • WhatsApp goes to  personal.phone   (below)
   |    • Email goes to      personal.email   (below)
   |  Change those two values to redirect where messages land.
   ─────────────────────────────────────────────────────────── */

  /* ── THEME ─────────────────────────────────────────────── */
  theme: {
    defaultMode: 'dark',          // 'dark' | 'light'
    accentColor:  '#7c3aed',      // primary violet
    accentColor2: '#06b6d4',      // secondary cyan
    accentColor3: '#f59e0b',      // highlight amber
    particleCount: 80,            // background particles (lower = better perf)
    enableCursor:  true,          // custom animated cursor
    enableParticles: true,        // particle network background
    enableTilt: true,             // 3D card tilt on hover
  },

  /* ── PERSONAL INFO ──────────────────────────────────────── */
  personal: {
    name:       'Prasad Suryavanshi',
    nameShort:  'PS',
    title:      'Full Stack Developer · .NET & Angular',
    tagline:    'Building scalable, cloud-native enterprise applications across the .NET & Angular stack — one clean commit at a time.',
    bio: [
      'I\'m a <strong>Full Stack Developer</strong> with <strong>5+ years</strong> designing, building, and maintaining enterprise web applications across the <strong>.NET</strong> and <strong>Angular</strong> stack — from scalable RESTful APIs to responsive single-page apps.',
      'My work centres on <strong>clean architecture</strong>, <strong>performance optimization</strong>, and <strong>secure design</strong> — streaming multi-gigabyte files from Azure, automating document workflows, and shipping event-driven, cloud-native solutions on <strong>Microsoft Azure</strong>.',
      'I thrive in <strong>Agile teams</strong> through code reviews and end-to-end delivery — from requirements through production support — and I actively integrate modern <strong>AI-assisted development</strong> tools into my workflow.',
    ],
    // Rotating typewriter roles
    roles: [
      '.NET Full Stack Developer',
      'Angular Frontend Developer',
      'ASP.NET Core API Engineer',
      'Azure Cloud Developer',
      'SQL Server Specialist',
      'Clean Architecture Advocate',
    ],
    // Contact & social
    email:    'suryavanshiprasad007@gmail.com',
    phone:    '+91 89756 74089',
    location: 'Pune, Maharashtra, India',
    linkedin: 'https://linkedin.com/in/prasad-suryavanshi007',
    github:   'https://github.com/PS2000007',
    twitter:  '',               // leave blank to hide
    website:  '',               // leave blank to hide
    resume:   'Prasad_Suryavanshi_Resume.pdf',  // drop the PDF in this folder to enable download
    // Avatar: use a URL to a photo, or leave '' for the SVG placeholder
    avatar:   '',
  },

  /* ── STATS (hero counters) ──────────────────────────────── */
  stats: [
    { label: 'Years Experience', value: 5  },
    { label: 'Projects Shipped',  value: 6  },
    { label: 'Technologies',      value: 25 },
    { label: 'Languages',         value: 3  },
  ],

  /* ── SKILLS ─────────────────────────────────────────────── */
  /* level: 0-100  |  color: any CSS color or 'accent' / 'accent2' */
  skillCategories: [
    {
      icon:  '⌨️',
      title: 'Languages',
      skills: [
        { name: 'C#',                  level: 92, color: 'accent'  },
        { name: 'SQL / T-SQL',         level: 90, color: 'accent'  },
        { name: 'TypeScript',          level: 88, color: 'accent'  },
        { name: 'JavaScript',          level: 86, color: 'accent'  },
        { name: 'HTML5 / CSS3',        level: 88, color: 'accent'  },
      ],
    },
    {
      icon:  '🔷',
      title: 'Backend · .NET',
      skills: [
        { name: '.NET Core',           level: 93, color: '#60a5fa' },
        { name: 'ASP.NET Core Web API', level: 92, color: '#60a5fa' },
        { name: 'Entity Framework Core', level: 88, color: '#60a5fa' },
        { name: 'ASP.NET MVC',         level: 84, color: '#60a5fa' },
        { name: 'LINQ / ADO.NET',      level: 86, color: '#60a5fa' },
      ],
    },
    {
      icon:  '🅰️',
      title: 'Frontend · Angular',
      skills: [
        { name: 'Angular',             level: 90, color: '#f87171' },
        { name: 'RxJS',                level: 85, color: '#f87171' },
        { name: 'TypeScript',          level: 88, color: '#f87171' },
        { name: 'Bootstrap',           level: 86, color: '#f87171' },
        { name: 'Responsive SPA',      level: 88, color: '#f87171' },
      ],
    },
    {
      icon:  '🗄️',
      title: 'Databases',
      skills: [
        { name: 'SQL Server',          level: 90, color: '#34d399' },
        { name: 'MySQL',               level: 80, color: '#34d399' },
        { name: 'Stored Procedures',   level: 87, color: '#34d399' },
        { name: 'Query Optimization',  level: 85, color: '#34d399' },
        { name: 'Code-First Migrations', level: 86, color: '#34d399' },
      ],
    },
    {
      icon:  '☁️',
      title: 'Cloud & DevOps',
      skills: [
        { name: 'Azure Functions',     level: 86, color: 'accent2' },
        { name: 'Azure Blob Storage',  level: 87, color: 'accent2' },
        { name: 'Azure App Services',  level: 82, color: 'accent2' },
        { name: 'Git / GitHub',        level: 88, color: 'accent2' },
        { name: 'CI/CD',               level: 80, color: 'accent2' },
      ],
    },
    {
      icon:  '🏛️',
      title: 'Architecture & Security',
      skills: [
        { name: 'RESTful Services',    level: 90, color: '#f59e0b' },
        { name: 'Microservices',       level: 80, color: '#f59e0b' },
        { name: 'Repository & UoW',    level: 86, color: '#f59e0b' },
        { name: 'JWT & RBAC',          level: 88, color: '#f59e0b' },
        { name: 'Clean Architecture',  level: 85, color: '#f59e0b' },
      ],
    },
  ],

  /* ── TECH BADGES (pill row) ─────────────────────────────── */
  techBadges: [
    'C#', '.NET Core', 'ASP.NET Core', 'Web API', 'EF Core', 'LINQ',
    'ADO.NET', 'Angular', 'RxJS', 'TypeScript', 'JavaScript', 'Bootstrap',
    'SQL Server', 'MySQL', 'T-SQL', 'Azure Functions', 'Blob Storage',
    'App Services', 'Git', 'GitHub', 'CI/CD', 'JWT', 'RBAC', 'Microservices',
    'Repository Pattern', 'iText7', 'Postman', 'SSMS', 'Visual Studio',
    'GitHub Copilot', 'Claude AI', 'ChatGPT',
  ],

  /* ── EXPERIENCE ─────────────────────────────────────────── */
  experience: [
    {
      role:    'Programmer Analyst — Full Stack Developer',
      company: 'Rheal Software',
      period:  'May 2022 — Present',
      type:    'Pune, India · Full-time',
      logo:    '',   // URL to company logo (optional)
      highlights: [
        'Built and maintained end-to-end claim-processing workflows using .NET Core Web API, Angular, Azure Functions, and SQL Server',
        'Engineered a high-performance Azure Function that streams directly from Blob Storage to generate large (2–4 GB) ZIP archives — dramatically reducing memory footprint and processing time',
        'Developed dynamic, responsive Angular components leveraging RxJS for reactive state management and real-time updates',
        'Secured applications with JWT authentication and role-based access control (RBAC) across user and administrator roles',
        'Automated PDF inspection reports with iText7 and invoice generation driven by inspection & estimate data',
        'Optimized SQL queries and stored procedures, and collaborated in an Agile team through code reviews and daily stand-ups',
      ],
      tags: ['.NET Core', 'Angular', 'Azure Functions', 'SQL Server', 'EF Core', 'RxJS', 'JWT / RBAC', 'iText7'],
    },
  ],

  /* ── PROJECTS ───────────────────────────────────────────── */
  /* color: any CSS gradient or hex  |  github/live: '' to hide button */
  projects: [
    {
      icon:    '📋',
      title:   'Claim Management System (CMS)',
      desc:    'End-to-end claim-processing platform handling high-volume claim data. RESTful APIs on ASP.NET Core, reactive Angular UI with RxJS, Azure Functions for event-driven background tasks, and JWT + RBAC security across user and admin roles.',
      tags:    ['.NET Core', 'Angular', 'Azure Functions', 'SQL Server', 'JWT / RBAC', 'RxJS'],
      color:   'linear-gradient(135deg,#7c3aed,#6366f1)',
      github:  '',
      live:    '',
      featured: true,
    },
    {
      icon:    '🔍',
      title:   'Grip — Claim Inspection & Document Platform',
      desc:    'Claim inspection and document management for claims, inspections, documents, and invoices. EF Core (Code-First) data layer, automated PDF reports via iText7, Azure Blob Storage for photos, and a streaming Azure Function generating 2–4 GB ZIP archives.',
      tags:    ['.NET Core', 'Angular', 'EF Core', 'Azure Blob', 'iText7', 'Streaming'],
      color:   'linear-gradient(135deg,#06b6d4,#0ea5e9)',
      github:  '',
      live:    '',
      featured: true,
    },
    {
      icon:    '🎉',
      title:   'Party Space Management System',
      desc:    'Venue-booking and event-scheduling platform with real-time availability checking and user registration. Built on .NET Core Web API and Angular with Repository & Unit of Work patterns, EF Core migrations, seeding, and transactional consistency.',
      tags:    ['.NET Core', 'Angular', 'EF Core', 'SQL Server', 'Repository / UoW', 'LINQ'],
      color:   'linear-gradient(135deg,#f59e0b,#f97316)',
      github:  '',
      live:    '',
      featured: true,
    },
    {
      icon:    '🏗️',
      title:   'Construction Management System',
      desc:    'Web-based project tracking and resource management application for construction workflows.',
      tags:    ['ASP.NET', 'SQL Server', 'Bootstrap'],
      color:   'linear-gradient(135deg,#10b981,#059669)',
      github:  'https://github.com/PS2000007',
      live:    '',
      featured: false,
    },
    {
      icon:    '⌨️',
      title:   'Typing Institute Management System',
      desc:    'Student enrollment, batch scheduling, and progress-tracking system for a typing institute.',
      tags:    ['.NET', 'SQL Server', 'C#'],
      color:   'linear-gradient(135deg,#ec4899,#a855f7)',
      github:  'https://github.com/PS2000007',
      live:    '',
      featured: false,
    },
    {
      icon:    '📇',
      title:   'Contacts Management System',
      desc:    'CRUD-based contact organizer with search and categorization for fast, structured contact handling.',
      tags:    ['C#', '.NET', 'CRUD'],
      color:   'linear-gradient(135deg,#f43f5e,#e11d48)',
      github:  'https://github.com/PS2000007',
      live:    '',
      featured: false,
    },
  ],

  /* ── EDUCATION ──────────────────────────────────────────── */
  education: [
    {
      icon:    '🎓',
      degree:  'Master of Computer Application (MCA)',
      school:  'Sinhgad Institute of Management and Computer Application',
      place:   'Pune, India',
      period:  'June 2021 — June 2023',
      score:   'GPA 8.06',
    },
    {
      icon:    '📘',
      degree:  'BBA (Computer Application)',
      school:  'Dada Patil College',
      place:   'Karjat, India',
      period:  'June 2018 — June 2021',
      score:   'GPA 8.70',
    },
  ],

  /* ── CERTIFICATIONS ─────────────────────────────────────── */
  certifications: [
    {
      badge: '🏅',
      code:  'GCC-TBC',
      title: 'Computer Typing — English, 40 WPM',
      org:   'Govt. of Maharashtra',
      year:  'Certified',
      color: '#7c3aed',
    },
    {
      badge: '🥈',
      code:  'GCC-TBC',
      title: 'Computer Typing — English, 30 WPM',
      org:   'Govt. of Maharashtra',
      year:  'Certified',
      color: '#06b6d4',
    },
    {
      badge: '🏅',
      code:  'GCC-TBC',
      title: 'Computer Typing — Marathi, 40 WPM',
      org:   'Govt. of Maharashtra',
      year:  'Certified',
      color: '#f59e0b',
    },
    {
      badge: '🥈',
      code:  'GCC-TBC',
      title: 'Computer Typing — Marathi, 30 WPM',
      org:   'Govt. of Maharashtra',
      year:  'Certified',
      color: '#10b981',
    },
  ],

  /* ── ABOUT TAGS ─────────────────────────────────────────── */
  aboutTags: [
    'RESTful APIs', 'Microservices', 'Clean Architecture',
    'Repository & UoW', 'Code-First Migrations', 'JWT & RBAC',
    'Azure Functions', 'Blob Storage', 'EF Core', 'LINQ',
    'RxJS', 'Agile / Scrum', 'CI/CD', 'AI-Assisted Dev',
  ],

  /* ── NAV LINKS ──────────────────────────────────────────── */
  navLinks: [
    { label: 'About',     href: '#about'    },
    { label: 'Skills',    href: '#skills'   },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects',  href: '#projects' },
    { label: 'Education', href: '#education' },
    { label: 'Certs',     href: '#certifications' },
    { label: 'Contact',   href: '#contact'  },
  ],

};
