export const artist = {
  name: "Sasmita Mishra",
  role: "Illustrator",
  level: "Professional",
  categories: ["Illustrator", "Graphic Designer", "Concept Artist"],
  website: "www.sasmitamishra.com",
  bio: `Sasmita Mishra is a professional illustrator and visual artist with over eight years of experience creating compelling artwork for publishing, editorial, and brand campaigns. Her work blends traditional illustration techniques with contemporary digital aesthetics, resulting in pieces that feel both timeless and fresh.

She has collaborated with leading publishers, magazines, and creative agencies worldwide, delivering illustrations that tell stories with clarity and emotional depth. From children's book spreads to editorial features and concept art, Sasmita approaches every project with meticulous attention to composition, color, and narrative.

Based in India, she works with clients across the globe, bringing a unique perspective shaped by diverse cultural influences and a passion for visual storytelling.`,
  social: [
    { name: "Instagram", href: "https://instagram.com", label: "IG" },
    { name: "Behance", href: "https://behance.net", label: "BE" },
    { name: "Dribbble", href: "https://dribbble.com", label: "DR" },
    { name: "LinkedIn", href: "https://linkedin.com", label: "LI" },
  ],
};

export const portfolioImages = [
  { id: 1, src: "https://picsum.photos/seed/art01/400/560", alt: "Abstract geometric illustration" },
  { id: 2, src: "https://picsum.photos/seed/art02/400/560", alt: "Botanical watercolor study" },
  { id: 3, src: "https://picsum.photos/seed/art03/400/560", alt: "Character concept sketch" },
  { id: 4, src: "https://picsum.photos/seed/art04/400/560", alt: "Editorial magazine cover" },
  { id: 5, src: "https://picsum.photos/seed/art05/400/560", alt: "Pattern design study" },
  { id: 6, src: "https://picsum.photos/seed/art06/400/560", alt: "Children's book spread" },
  { id: 7, src: "https://picsum.photos/seed/art07/400/560", alt: "Landscape illustration" },
  { id: 8, src: "https://picsum.photos/seed/art08/400/560", alt: "Portrait illustration" },
  { id: 9, src: "https://picsum.photos/seed/art09/400/560", alt: "Typography poster design" },
  { id: 10, src: "https://picsum.photos/seed/art10/400/560", alt: "Fantasy character art" },
  { id: 11, src: "https://picsum.photos/seed/art11/400/560", alt: "Minimal line art" },
  { id: 12, src: "https://picsum.photos/seed/art12/400/560", alt: "Color study composition" },
];

export type ServiceItem = {
  id: string;
  number: string;
  title: string;
  subItems?: string[];
};

export const services: ServiceItem[] = [
  {
    id: "book",
    number: "01",
    title: "Book Illustrations",
    subItems: ["Picture Books", "Chapter Books", "Cover Art", "Interior Spreads"],
  },
  {
    id: "editorial",
    number: "02",
    title: "Editorial Illustrations",
    subItems: [
      "Magazine Covers",
      "Feature Articles",
      "Infographics",
      "Op-Ed Illustrations",
      "Newspaper Features",
      "Digital Publications",
    ],
  },
  {
    id: "branding",
    number: "03",
    title: "Branding & Identity",
    subItems: ["Logo Illustrations", "Brand Mascots", "Packaging Art", "Pattern Design"],
  },
  {
    id: "concept",
    number: "04",
    title: "Concept Art",
    subItems: ["Character Design", "Environment Art", "Prop Design", "Storyboards"],
  },
  {
    id: "custom",
    number: "05",
    title: "Custom Commissions",
    subItems: ["Personal Portraits", "Gift Illustrations", "Wall Murals", "Event Artwork"],
  },
  {
    id: "workshops",
    number: "06",
    title: "Workshops & Mentoring",
    subItems: ["Group Workshops", "One-on-One Sessions", "Portfolio Reviews"],
  },
];

export type Package = {
  number: string;
  name: string;
  includes: string[];
  time: string;
  price: string;
};

export const packages: Package[] = [
  {
    number: "01",
    name: "Children's Book Illustration Package",
    includes: [
      "20 full-color illustrations",
      "3 rounds of revisions",
      "Print-ready files",
      "Character design sheet",
    ],
    time: "14 Days",
    price: "$5,000",
  },
  {
    number: "02",
    name: "Editorial Illustration Package",
    includes: [
      "1 custom editorial illustration",
      "2 rounds of revisions",
      "High-res digital files",
      "Usage rights for publication",
    ],
    time: "7 Days",
    price: "$2,500",
  },
  {
    number: "03",
    name: "Brand Identity Illustration",
    includes: [
      "5 brand illustrations",
      "2 style directions",
      "Vector & raster formats",
      "Social media adaptations",
    ],
    time: "10 Days",
    price: "$3,500",
  },
  {
    number: "04",
    name: "Concept Art Package",
    includes: [
      "10 concept sketches",
      "3 refined illustrations",
      "Mood board & color studies",
      "Source files included",
    ],
    time: "12 Days",
    price: "$4,000",
  },
  {
    number: "05",
    name: "Custom Portrait Commission",
    includes: [
      "1 custom portrait illustration",
      "2 rounds of revisions",
      "High-res print file",
      "Digital delivery",
    ],
    time: "5 Days",
    price: "$800",
  },
];

export const navLinks = [
  { label: "Studio", href: "#studio" },
  { label: "Book", href: "#portfolio" },
  { label: "Talents", href: "#hero" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#portfolio" },
];
