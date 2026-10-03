import { resume } from "./resume";

export const canonicalUrl = "https://zqyin.com/";
export const seoTitle = `${resume.sidebar.name} (${resume.sidebar.alternate_name}) — ${resume.sidebar.tagline}`;
export const seoDescription = resume["career-profile"].summary
  .trim()
  .replace(/\s+/g, " ");
export const shareImage = {
  url: `${canonicalUrl}assets/images/resume-share.png`,
  width: 1200,
  height: 630,
  alt: `${resume.sidebar.name} (${resume.sidebar.alternate_name}), ${resume.sidebar.tagline} — Large-scale LLM inference systems`,
};

export const profileSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${canonicalUrl}#profile`,
  url: canonicalUrl,
  name: seoTitle,
  description: seoDescription,
  inLanguage: "en",
  mainEntity: {
    "@type": "Person",
    "@id": `${canonicalUrl}#person`,
    name: resume.sidebar.name,
    alternateName: resume.sidebar.alternate_name,
    jobTitle: resume.sidebar.tagline,
    url: canonicalUrl,
    image: `${canonicalUrl}assets/images/${resume.sidebar.avatar}`,
    sameAs: [
      `https://github.com/${resume.sidebar.github}`,
      `https://linkedin.com/in/${resume.sidebar.linkedin}`,
    ],
  },
};
