import { IProject } from '@/types';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const projectImage = (filename: string) =>
    `${basePath}/projects/nihal/${filename}`;

export const GENERAL_INFO = {
    email: 'nihalpatel8880@gmail.com',
    emailSubject: "Let's collaborate on a project",
    emailBody: 'Hi Nihal, I am reaching out to you because...',
    github: 'https://github.com/Nihal0801',
    linkedin: 'https://www.linkedin.com/in/patel7nv/',
};

export const SOCIAL_LINKS = [
    { name: 'github', url: GENERAL_INFO.github },
    { name: 'linkedin', url: GENERAL_INFO.linkedin },
    { name: 'email', url: `mailto:${GENERAL_INFO.email}` },
];

export const MY_STACK = {
    languages: [
        { name: 'Python' },
        { name: 'C#' },
        { name: 'Java' },
        { name: 'JavaScript' },
        { name: 'C' },
        { name: 'SQL' },
        { name: 'MATLAB' },
    ],
    'AI & cloud': [
        { name: 'AI systems' },
        { name: 'Agent orchestration' },
        { name: 'AWS cloud fundamentals' },
        { name: 'REST APIs' },
        { name: 'Data analysis' },
    ],
    'XR & graphics': [
        { name: 'Unity' },
        { name: 'Unreal Engine' },
        { name: 'Blender' },
        { name: 'Vuforia' },
        { name: 'Meta Quest' },
        { name: 'XR Interaction Toolkit' },
    ],
    'systems & tools': [
        { name: 'Git & GitHub' },
        { name: 'Linux' },
        { name: 'Object-oriented programming' },
        { name: 'Real-time interaction' },
        { name: 'WordPress' },
    ],
};

export const EDUCATION = [
    {
        school: 'University of Cincinnati',
        location: 'Cincinnati, Ohio, United States',
        degree: 'Bachelor of Science, Computer Science',
        duration: 'Aug 2025 - Present',
        score: 'GPA 3.941',
    },
    {
        school: 'Nirma University',
        location: 'Gujarat, India',
        degree: 'Bachelor of Science, Computer Science',
        duration: 'Jul 2023 - Apr 2025',
        score: 'CGPA 8.46',
    },
];

export const MY_EXPERIENCE = [
    {
        title: 'Summer Research Intern',
        company: 'University of Cincinnati - Office of Research',
        duration: 'May 2026 - Jul 2026',
        details: [
            'Developed a VR-based manufacturing training environment using Unreal Engine, Meta Quest Pro, and KAT VR.',
            'Analyzed gaze validity, confidence, frame rate, and task-completion telemetry to evaluate performance and interaction.',
            'Built an attention-adaptive geometry system that adjusted scene detail based on visual attention.',
        ],
    },
    {
        title: 'Web Developer',
        company: 'Ascasys Cloud Healthcare - Ahmedabad, India',
        duration: 'Sep 2024 - Present',
        details: [
            'Contribute to healthcare-focused web applications with an emphasis on responsive design and performance.',
            'Collaborate in Agile sprints to deliver secure, scalable, and user-friendly solutions.',
            'Introduced structured testing that reduced bug-resolution time by 15%.',
        ],
    },
    {
        title: 'Web Development Intern',
        company: 'Renodia Diamond Pvt. Ltd. - Remote, India',
        duration: 'Dec 2024 - Jan 2025',
        details: [
            'Designed and deployed an e-commerce site with WordPress, WooCommerce, and Elementor Pro.',
            'Implemented SSL, firewall protection, automated backups, and responsive optimization.',
            'Raised traffic by approximately 20% while reducing load time from four seconds to two.',
        ],
    },
];

export const PROJECTS: IProject[] = [
    {
        title: 'ORBIT',
        slug: 'orbit',
        year: 2026,
        description: 'A modular multi-agent AI orchestration platform designed to coordinate models, agents, tools, routing, memory, execution, and evaluation through a unified architecture.',
        role: 'Designing the architecture and building the orchestration layer, with a focus on modularity, model routing, tool use, and observable execution.',
        techStack: ['Python', 'AI Systems', 'Multi-Agent Architecture', 'Cloud'],
        thumbnail: projectImage('orbit.svg'),
        longThumbnail: projectImage('orbit.svg'),
        images: [projectImage('orbit.svg')],
        sourceCode: 'https://github.com/Nihal0801/OrbiT',
    },
    {
        title: 'ATTENTION-ADAPTIVE GEOMETRY',
        slug: 'attention-adaptive-geometry',
        year: 2026,
        description: 'An Unreal Engine research system that dynamically adjusts scene geometry according to a user’s visual attention, exploring better rendering efficiency in immersive environments.',
        role: 'Built the gaze-to-geometry pipeline and evaluated attention signals alongside frame-rate and interaction telemetry during a University of Cincinnati research internship.',
        techStack: ['Unreal Engine', 'Eye Tracking', 'Adaptive Geometry', 'XR'],
        thumbnail: projectImage('aage.svg'),
        longThumbnail: projectImage('aage.svg'),
        images: [projectImage('aage.svg')],
        sourceCode: 'https://github.com/Nihal0801/Dynamic-Meshing',
    },
    {
        title: 'VR MANUFACTURING TRAINING',
        slug: 'vr-manufacturing-training',
        year: 2026,
        description: 'An immersive manufacturing training environment combining virtual reality, locomotion, gaze tracking, and real-time performance measurement.',
        role: 'Integrated Unreal Engine, Meta Quest Pro, and KAT VR; captured gaze data and analyzed session performance for immersive training research.',
        techStack: ['Unreal Engine', 'Meta Quest Pro', 'KAT VR', 'Telemetry'],
        thumbnail: projectImage('vr-manufacturing.svg'),
        longThumbnail: projectImage('vr-manufacturing.svg'),
        images: [projectImage('vr-manufacturing.svg')],
    },
    {
        title: 'VR CLASSROOM SIMULATION',
        slug: 'vr-classroom-simulation',
        year: 2026,
        description: 'An immersive classroom simulation with real-time object interaction, animated 3D assets, controller-based input, drawing surfaces, and event-driven system behavior.',
        role: 'Developed the Unity experience, built Blender assets, implemented Meta Quest 3 interaction, and optimized performance on standalone hardware.',
        techStack: ['Unity', 'C#', 'Blender', 'Meta Quest 3'],
        thumbnail: projectImage('vr-classroom.svg'),
        longThumbnail: projectImage('vr-classroom.svg'),
        images: [projectImage('vr-classroom.svg')],
        sourceCode: 'https://github.com/Nihal0801/Langsam-418',
    },
    {
        title: 'AR KNICK-KNACK',
        slug: 'ar-knick-knack',
        year: 2026,
        description: 'A marker-based augmented reality application that anchors a 3D Taj Mahal environment to a cube marker and displays real-time weather data.',
        role: 'Built the Unity and Vuforia application, integrated the OpenWeather API, and designed dynamic contextual UI panels.',
        techStack: ['Unity', 'Vuforia', 'OpenWeather API', 'C#'],
        thumbnail: projectImage('ar-weather.svg'),
        longThumbnail: projectImage('ar-weather.svg'),
        images: [projectImage('ar-weather.svg')],
        sourceCode: 'https://github.com/Nihal0801/ar-knickknack',
    },
    {
        title: 'SCHEDULX',
        slug: 'schedulx',
        year: 2025,
        description: 'An intelligent CPU scheduling visualizer covering FCFS, SJF, SRTF, Round Robin, and Priority scheduling with interactive Gantt charts and performance metrics.',
        role: 'Implemented the scheduling algorithms and built the GTK interface for visualizing turnaround time, waiting time, and algorithm behavior.',
        techStack: ['C', 'GTK', 'Algorithms', 'Data Structures'],
        thumbnail: projectImage('schedulx.svg'),
        longThumbnail: projectImage('schedulx.svg'),
        images: [projectImage('schedulx.svg')],
    },
];

export const RECOGNITION = [
    {
        title: 'Summer Research Intern',
        organization: 'University of Cincinnati Office of Research',
        date: 'May 2026 - Jul 2026',
    },
    {
        title: "Dean's List",
        organization: 'UC College of Engineering & Applied Science',
        date: 'Dec 2025',
    },
    {
        title: 'International Outreach Scholarship',
        organization: 'University of Cincinnati',
        date: 'Oct 2024 - Present',
    },
    {
        title: 'Academic Scholar',
        organization: 'Nirma University',
        date: 'May 2024',
    },
];
