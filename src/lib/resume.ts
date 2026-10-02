import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parse } from "yaml";

type Resume = {
  sidebar: {
    name: string;
    tagline: string;
    avatar: string;
    email: string;
    timezone: string;
    website: string;
    linkedin: string;
    github: string;
    languages: { idiom: string; level: string }[];
    interests: { item: string; link?: string }[];
  };
  "career-profile": { title: string; summary: string };
  credentials?: {
    title: string;
    issuer: string;
    issued: string;
    link: string;
  }[];
  affiliations?: { organization: string; role: string; time: string }[];
  experiences: {
    role: string;
    time: string;
    company: string;
    details: string;
  }[];
  education: {
    degree: string;
    university: string;
    time: string;
    details?: string;
  }[];
};

// The original YAML remains the single content source, read only at build time.
export const resume = parse(
  readFileSync(join(process.cwd(), "_data/data.yml"), "utf8"),
) as Resume;
export const contacts = [
  {
    name: "Email",
    label: resume.sidebar.email,
    href: `mailto:${resume.sidebar.email}`,
  },
  {
    name: "Website",
    label: resume.sidebar.website,
    href: `http://${resume.sidebar.website}`,
  },
  {
    name: "GitHub",
    label: `github.com/${resume.sidebar.github}`,
    href: `https://github.com/${resume.sidebar.github}`,
  },
  {
    name: "LinkedIn",
    label: `linkedin.com/in/${resume.sidebar.linkedin}`,
    href: `https://linkedin.com/in/${resume.sidebar.linkedin}`,
  },
];

export function detailLines(details: string) {
  return details
    .trim()
    .split("\n")
    .map((line) => line.replace(/^\s*-\s*/, "").trim())
    .filter(Boolean);
}

// Tags repeat terms explicitly present in each entry; they do not add skills.
export function technicalTags(details: string) {
  return ["SaaS", "Transformer", "BERT", "GPT"].filter((term) =>
    details.includes(term),
  );
}
