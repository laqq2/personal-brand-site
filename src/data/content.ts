export interface Project {
  name: string;
  desc: string;
  meta?: string;
  status: "LIVE" | "HACKATHON";
  href: string;
}

export interface StoryEntry {
  age: number;
  head: string;
  body: string;
}

export interface NowEntry {
  left: string;
  right: string;
  live: boolean;
}

export const ABOUT = {
  heading: "ABOUT",
  blurb:
    "I build AI products that solve problems I've lived personally. Currently: LockonAI — automated exam marking for VCE students.",
  meta: "Software engineer · AI founder · Melbourne",
} as const;

export const CONTACT = {
  heading: "CONTACT",
  title: "Let's talk.",
  body: "I'm always open to interesting problems, collabs, or conversations about building things. Reach out.",
} as const;

export const PROJECTS: Project[] = [
  {
    name: "LockonAI",
    desc: "AI tutor for VCE Maths. Trained on 2,800+ VCAA questions — generates personalised practice targeting your exact weaknesses, using active recall and spaced repetition. Built solo in 30 days.",
    meta: "2,800+ questions · active recall · weakness targeting",
    status: "LIVE",
    href: "https://lockonai.app/",
  },
  {
    name: "LumePath",
    desc: "Safety-first pedestrian routing for Clayton. Routes by ambient light data, not speed. Built at hackathon.",
    status: "HACKATHON",
    href: "https://lumepath-gold.vercel.app/",
  },
  {
    name: "Focal",
    desc: "Chrome extension productivity tool. Focus timer, distraction logging, task management, and Google Calendar sync — built around Kolb's Reflection Cycle and iCanStudy principles. Weekly reflection, goal setting, and prioritisation baked in.",
    meta: "Kolb's reflection · iCanStudy principles · Google Calendar API",
    status: "LIVE",
    href: "https://focal-web-alpha.vercel.app/app",
  },
  {
    name: "Personal Brand Site",
    desc: "This site. Steven.com-inspired motion design with a terminal iris hero — type-driven, immersive, zero clutter.",
    status: "LIVE",
    href: "#",
  },
];

export const STACK: [string, string][] = [
  ["Python", "language"],
  ["Java", "language"],
  ["JavaScript", "language"],
  ["React", "frontend"],
  ["Tailwind CSS", "frontend"],
  ["HTML / CSS", "frontend"],
  ["Supabase", "backend"],
  ["Git / GitHub", "tooling"],
  ["NumPy / Pandas", "data"],
  ["PyTorch", "ai/ml (learning)"],
  ["Vite", "tooling"],
  ["REST APIs", "backend"],
  ["Vercel", "deployment"],
];

export const STORY: StoryEntry[] = [
  {
    age: 15,
    head: "THE KID WHO DIDN'T MAKE IT.",
    body: "First job at Hungry Jack's. Failed Melbourne High entrance. My sister got into three selective schools. I hid in games — Fortnite top 0.05%, Valorant Immortal 2 top 0.14%. I wasn't lazy. My obsession was pointed at the wrong target.",
  },
  {
    age: 16,
    head: "PROMOTED. THEN FAILED MY SACS.",
    body: "Became crew coach. Started failing Methods and Psychology. Chose to prove the 'bad student' story wrong. Atomic Habits. 6-day training split. Shifted from fixed to systems mindset.",
  },
  {
    age: 17,
    head: "REBUILT EVERYTHING.",
    body: "Invested in iCanStudy (Justin Sung). Rebuilt study from scratch during VCE. Result: 94.8 ATAR. Scaled 46 in the subject I failed.",
  },
  {
    age: 18,
    head: "STARTED THINKING LIKE A FOUNDER.",
    body: "Entered Monash accelerated masters. Tutored 50+ students. Watched the same broken feedback loop repeat. Invested $1K in Stage Academy. Started reading Hormozi.",
  },
  {
    age: 19,
    head: "SHIPPED THE FIX.",
    body: "Built LockonAI solo in 30 days. 320+ VCAA-style questions tested. Marks handwritten work in under 30 seconds. Live with real users.",
  },
];

export const NOW: NowEntry[] = [
  { left: "Converting LockonAI free users to paid", right: "ongoing", live: true },
  { left: "Building my personal brand on LinkedIn + TikTok", right: "ongoing", live: true },
  { left: "2nd year Software Engineering @ Monash", right: "2024 — 2026", live: false },
];

export const EDUCATION =
  "Bachelor of Software Engineering (Honours) — Monash University · WAM 81.75 · Accelerated Masters Pathway";

export interface IrisSlide {
  label: string;
  src: string;
  alt: string;
}

export const IRIS_SLIDES: IrisSlide[] = [
  {
    label: "LockonAI",
    src: "/images/iris/lockonai.png",
    alt: "LockonAI app interface scanning handwritten math",
  },
  {
    label: "Focal",
    src: "/images/iris/focal.png",
    alt: "Focal productivity dashboard",
  },
  {
    label: "Code",
    src: "/images/iris/code.png",
    alt: "Developer code editor through a circular lens",
  },
  {
    label: "Evan",
    src: "/images/iris/portrait.png",
    alt: "Portrait of Evan",
  },
];

export const STUDIO_IMAGE = {
  src: "/images/iris/studio.png",
  alt: "Developer studio at night with neon green accent lighting",
} as const;

/** @deprecated use IRIS_SLIDES */
export const PORTRAIT_SLIDES = IRIS_SLIDES;
