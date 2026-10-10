import { InsightCard } from "@/components/InsightCard";
import { Media } from "@/components/Media";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getArticles, getProfile } from "@/sanity/queries";
import type { Project } from "@/sanity/types";

function ProjectCard({ project: p }: { project: Project }) {
  const content = (
    <>
      <Media
        image={p.image}
        placeholder="Project image"
        className="project__image"
        ratio={16 / 10}
        sizes="(min-width: 1080px) 540px, 100vw"
      />
      <div className="meta meta--spread">
        <span className="meta__key">{p.sector}</span>
        <span>{p.year}</span>
      </div>
      <div className="project__title">
        {p.title}
        {p.url && <span className="project__arrow"> ↗</span>}
      </div>
      <div className="project__body">{p.body}</div>
      {p.outcome && <div className="project__outcome">{p.outcome}</div>}
    </>
  );
  return p.url ? (
    <a className="project project--link" href={p.url} target="_blank" rel="noreferrer">
      {content}
    </a>
  ) : (
    <article className="project">{content}</article>
  );
}

export default async function Home() {
  const [profile, articles] = await Promise.all([getProfile(), getArticles()]);
  const showInsights = profile.showInsights && articles.length > 0;

  return (
    <>
      <SiteHeader name={profile.name} showInsights={showInsights} />

      <main>
        <section className="container hero">
          <div>
            {profile.role && <div className="hero__role">{profile.role}</div>}
            <h1 className="hero__title">{profile.headline}</h1>
            <p className="hero__intro">{profile.intro}</p>
            <div className="hero__actions">
              <a href="#contact" className="btn btn--accent">
                Get in touch <span>→</span>
              </a>
              <a href="#experience" className="btn btn--outline">
                View experience
              </a>
            </div>
          </div>
          {profile.showPortrait && (
            <Media
              image={profile.portrait}
              placeholder="Portrait photograph"
              className="hero__portrait"
              ratio={4 / 5}
              sizes="(min-width: 960px) 560px, 100vw"
              priority
            />
          )}
        </section>

        {profile.stats.length > 0 && (
          <section className="band band--closed">
            <div className="container stats">
              {profile.stats.map((s) => (
                <div className="stat" key={s.label}>
                  <div className="stat__value">{s.value}</div>
                  <div className="stat__label">{s.label}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section id="about" className="container section">
          <div className="split about__intro">
            <div>
              <div className="eyebrow">About</div>
              <h2 className="section-title">{profile.aboutHeading}</h2>
            </div>
            <div className="about__body">
              {profile.aboutBody.map((paragraph, i) => (
                <p className="prose" key={i}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <div className="principles">
            {profile.principles.map((p, i) => (
              <div className="principle" key={p.title}>
                <div className="principle__n">{String(i + 1).padStart(2, "0")}</div>
                <div className="principle__title">{p.title}</div>
                <div className="principle__body">{p.body}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="experience" className="band band--closed">
          <div className="container section">
            <div className="section-head">
              <div>
                <div className="eyebrow">Experience</div>
                <h2 className="section-title">Career</h2>
              </div>
              <a href={profile.cvUrl ? `${profile.cvUrl}?dl=` : "#"} className="btn btn--outline btn--sm">
                Download full CV ↓
              </a>
            </div>
            <div className="rule-list">
              {profile.career.map((c) => (
                <div className="career-row" key={`${c.years}-${c.role}`}>
                  <div className="career-row__years">{c.years}</div>
                  <div>
                    <div className="career-row__role">{c.role}</div>
                    <div className="career-row__org">{c.org}</div>
                  </div>
                  <div className="career-row__note">{c.note}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="container section">
          <div className="eyebrow">Featured projects</div>
          <h2 className="section-title projects__title">Selected work</h2>
          <div className="projects">
            {profile.projects.map((p) => (
              <ProjectCard project={p} key={p.title} />
            ))}
          </div>
        </section>

        <section id="technology" className="band">
          <div className="container section split tech">
            <div>
              <div className="eyebrow">Technology</div>
              <h2 className="section-title tech__title">{profile.techHeading}</h2>
              <p className="prose">{profile.techIntro}</p>
            </div>
            <div className="rule-list">
              {profile.tech.map((t) => (
                <div className="tech-row" key={t.title}>
                  <div className="tech-row__title">{t.title}</div>
                  <div className="tech-row__tools">
                    {t.tools.map((tool) => (
                      <span className="pill" key={tool}>
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {showInsights && (
          <section id="insights" className="band">
            <div className="container section">
              <div className="eyebrow">Insights</div>
              <h2 className="section-title projects__title">Perspectives</h2>
              <div className="insights">
                {articles.map((a) => (
                  <InsightCard article={a} key={a.slug} />
                ))}
              </div>
            </div>
          </section>
        )}

        <section id="contact" className="container contact">
          <div className="contact__card">
            <div className="contact__lead">
              <h2 className="contact__title">{profile.contactHeading}</h2>
              {profile.email && (
                <a href={`mailto:${profile.email}`} className="btn btn--accent">
                  {profile.email} →
                </a>
              )}
            </div>
            <dl className="contact__list">
              {profile.contacts.map((k) => (
                <div className="contact__row" key={k.label}>
                  <dt className="contact__label">{k.label}</dt>
                  <dd className="contact__value">{k.url ? <a href={k.url}>{k.value}</a> : k.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>

      <SiteFooter name={profile.name} />
    </>
  );
}
