export const artist = {
  name: "Sasmita Pani",
  eyebrow: "3D Artist · Portfolio 2025",
  headline: "Shaping quiet worlds, one polygon at a time.",
  intro:
    "A character and environment artist building restrained cinematic worlds for games, product stories, and immersive brand moments.",
  status: "Available for freelance & studio collaborations",
  portrait: "/About_Image.png",
  portraitAlt: "Studio portrait of Sasmita Pani",
  portraitCaption: "Personal archive, 2025",
  bio: [
    "Hi, I'm Sasmita Pani, a passionate 3D Artist who believes that great design is more than creating visually appealing assets—it's about crafting experiences that connect with people. I approach every project with curiosity, creativity, and a constant desire to learn, turning ideas into immersive digital worlds.",
    "With a strong foundation in 3D Modeling, Texturing, and Sculpting, I enjoy transforming concepts into detailed and believable visuals. My curiosity drives me to continuously refine my skills, explore new techniques, and stay inspired by the ever-evolving world of digital art.",
  ],
  email: "hello@sasmitamishra.com",
  socials: [
    { name: "Instagram", href: "https://instagram.com", handle: "@sasmita.3d" },
    { name: "LinkedIn", href: "https://linkedin.com", handle: "Sasmita Mishra" },
  ],
};

export const navLinks = [
  { label: "Home", href: "#home", id: "home" },
  { label: "About", href: "#about", id: "about" },
  { label: "Work", href: "#work", id: "work" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export const skills = [
  "3D Modeling and Texturing",
  "Lighting",
  "Environment Design",
];

export const tools = [
  { name: "Photoshop", icon: "/tools/photoshop.svg" },
  { name: "3ds Max", icon: "/tools/3ds-max.svg" },
  { name: "Maya", icon: "/tools/maya.svg" },
  { name: "Substance", icon: "/tools/substance.svg" },
  { name: "Blender", icon: "/tools/blender.svg" },
  { name: "ZBrush", icon: "/tools/zbrush.svg" },
];

export const education = [
  {
    years: "2024 - 2026",
    title: "Advanced Design in 3D Edge Plus",
    institution: "MAAC Institute",
  },
  {
    years: "2022 - 2024",
    title: "Higher Secondary Education",
    institution: "Loyola School",
  },
];

export const projectCategories = [
  "All",
  "Character Modeling",
  "Environment & Scenes",
  "Product Visualization",
  "Sculpting",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type Project = {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, "All">;
  image: string;
  alt: string;
  detailImages: string[];
  writeup: string;
  toolsUsed: string[];
};
