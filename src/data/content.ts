export const artist = {
  name: "Sasmita Mishra",
  eyebrow: "3D Artist · Portfolio 2025",
  headline: "Shaping quiet worlds, one polygon at a time.",
  intro:
    "A character and environment artist building restrained cinematic worlds for games, product stories, and immersive brand moments.",
  status: "Available for freelance & studio collaborations",
  portrait: "/About_Image.png",
  portraitAlt: "Studio portrait of Sasmita Mishra",
  portraitCaption: "Personal archive, 2025",
  bio:
    "Sasmita Mishra is a 3D artist focused on quiet atmosphere, expressive silhouettes, and tactile digital surfaces. Her practice moves between stylized character modeling, environmental storytelling, sculpting, and product visualization, always with an eye for restraint and emotional clarity.",
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
  "Character modeling",
  "Environment art",
  "Digital sculpting",
  "Look development",
  "Retopology",
  "Lighting",
];

export const tools = [
  "Blender",
  "ZBrush",
  "Substance Painter",
  "Maya",
  "Unreal Engine",
  "Marvelous Designer",
];

export const education = [
  {
    years: "2021 - 2023",
    title: "MFA, Digital Arts",
    institution: "National Institute of Design",
  },
  {
    years: "2017 - 2021",
    title: "BFA, Visual Communication",
    institution: "Srishti Institute of Art, Design and Technology",
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
};

export const projects: Project[] = [
  {
    id: "quiet-courier",
    title: "Quiet Courier",
    category: "Character Modeling",
    image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=900&h=1200&fit=crop",
    alt: "Moody 3D character study",
  },
  {
    id: "morning-atelier",
    title: "Morning Atelier",
    category: "Environment & Scenes",
    image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=900&h=1200&fit=crop",
    alt: "Soft abstract architectural render",
  },
  {
    id: "heirloom-speaker",
    title: "Heirloom Speaker",
    category: "Product Visualization",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=900&h=1200&fit=crop",
    alt: "Premium speaker product render",
  },
  {
    id: "clay-guardian",
    title: "Clay Guardian",
    category: "Sculpting",
    image: "https://images.unsplash.com/photo-1617791160536-598cf32026fb?w=900&h=1200&fit=crop",
    alt: "Close sculptural digital form",
  },
  {
    id: "winter-room",
    title: "Winter Room",
    category: "Environment & Scenes",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=900&h=1200&fit=crop",
    alt: "Minimal 3D room with geometric forms",
  },
  {
    id: "field-mask",
    title: "Field Mask",
    category: "Character Modeling",
    image: "https://images.unsplash.com/photo-1604076913837-52ab5629fba9?w=900&h=1200&fit=crop",
    alt: "Stylized character mask and material study",
  },
];
