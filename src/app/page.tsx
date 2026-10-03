import { Clock3, Mail } from "lucide-react";
import Image from "next/image";
import { GitHubIcon } from "@/components/icons/github-icon";
import { LinkedInIcon } from "@/components/icons/linkedin-icon";
import { PrintButton } from "@/components/print-button";
import { ProductLinks } from "@/components/product-links";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { contacts, detailLines, resume } from "@/lib/resume";
import { profileSchema } from "@/lib/seo";

const icons = [Mail, GitHubIcon, LinkedInIcon];

export default function ResumePage() {
  const { sidebar, experiences, education } = resume;
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to résumé
      </a>
      <script type="application/ld+json">
        {JSON.stringify(profileSchema).replace(/</g, "\\u003c")}
      </script>
      <main id="main-content" className="resume-shell">
        <div className="page-tools">
          <span className="edition">CURRICULUM VITAE</span>
          <PrintButton />
        </div>
        <div className="resume-content">
          <header className="resume-header">
            <div className="identity">
              <h1>
                {sidebar.name}
                <span className="alternate-name" lang="zh-Hans">
                  {sidebar.alternate_name}
                </span>
              </h1>
              <p className="tagline">{sidebar.tagline}</p>
              <p className="timezone">
                <Clock3 size={13} aria-hidden="true" />
                {sidebar.timezone}
              </p>
              <nav className="contact-links" aria-label="Contact links">
                {contacts.map((contact, index) => {
                  const Icon = icons[index];
                  return (
                    <a
                      key={contact.name}
                      href={contact.href}
                      className="contact-link"
                      title={contact.label}
                      aria-label={`${contact.name}: ${contact.label}`}
                    >
                      <Icon className="size-4" aria-hidden="true" />
                      <span>{contact.name}</span>
                    </a>
                  );
                })}
              </nav>
            </div>
            <Image
              src={`/assets/images/${sidebar.avatar}`}
              width={112}
              height={112}
              className="portrait"
              alt={`${sidebar.name}'s profile picture`}
              priority
            />
            <div className="print-contacts">
              {contacts.map((contact) => (
                <a key={contact.name} href={contact.href}>
                  {contact.label}
                </a>
              ))}
            </div>
          </header>

          <Section aria-labelledby="profile-title">
            <h2 id="profile-title">{resume["career-profile"].title}</h2>
            <p className="summary">
              <ProductLinks text={resume["career-profile"].summary.trim()} />
            </p>
          </Section>

          <Section aria-labelledby="experience-title">
            <h2 id="experience-title">Work Experience</h2>
            <div className="entries">
              {experiences.map((work) => (
                <article
                  className="resume-entry"
                  key={`${work.company}-${work.time}`}
                >
                  <Card className="border-none">
                    <CardHeader>
                      <div className="entry-heading">
                        <h3>{work.company}</h3>
                        <span className="period">{work.time}</span>
                      </div>
                      <p className="role">{work.role}</p>
                    </CardHeader>
                    <CardContent className="entry-details">
                      <p className="work-context">{work.context}</p>
                      <ul>
                        {detailLines(work.details).map((line) => (
                          <li key={line}>
                            <ProductLinks text={line} />
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </article>
              ))}
            </div>
          </Section>

          <Section aria-labelledby="skills-title">
            <h2 id="skills-title">Skills</h2>
            <ul className="skills-list">
              {resume.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </Section>

          <Section aria-labelledby="education-title">
            <h2 id="education-title">Education</h2>
            <div className="entries education-entries">
              {education.map((item) => (
                <article className="resume-entry" key={item.university}>
                  <div className="entry-heading">
                    <h3>{item.university}</h3>
                    <span className="period">{item.time}</span>
                  </div>
                  <p className="degree">{item.degree.trim()}</p>
                  {item.details && (
                    <p className="education-details">{item.details.trim()}</p>
                  )}
                </article>
              ))}
            </div>
          </Section>

          <div className="personal-sections">
            <Section aria-labelledby="languages-title">
              <h2 id="languages-title">Languages</h2>
              <ul className="language-list">
                {sidebar.languages.map((language) => (
                  <li key={language.idiom}>
                    <span>{language.idiom}</span>
                    <span className="muted">{language.level}</span>
                  </li>
                ))}
              </ul>
            </Section>
            <Section aria-labelledby="interests-title">
              <h2 id="interests-title">Interests</h2>
              <ul className="interest-list">
                {sidebar.interests.map((interest) => (
                  <li key={interest.item}>
                    {interest.link ? (
                      <a href={interest.link}>{interest.item}</a>
                    ) : (
                      interest.item
                    )}
                  </li>
                ))}
              </ul>
            </Section>
          </div>
        </div>
        <footer className="site-footer">
          <span>{sidebar.name}</span>
          <a href="https://github.com/BartoszJarocki/cv">
            Based on Minimalist CV <span aria-hidden="true">↗</span>
          </a>
        </footer>
      </main>
    </>
  );
}
