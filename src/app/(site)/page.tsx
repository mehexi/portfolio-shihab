import { cacheLife } from "next/cache";
import { Media } from "@/components/Media";
import { getProfile } from "@/sanity/queries";

async function currentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export default async function Home() {
  const profile = await getProfile();
  const year = await currentYear();
  const showInsights = profile.showInsights && profile.insights.length > 0;

  return (
    <>
      <header className="site-header">
        <div className="container site-header__inner">
          <div className="site-header__brand">{profile.name}</div>
          <nav className="site-nav">
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#technology">Technology</a>
            {showInsights && <a href="#insights">Insights</a>}
          </nav>
          <a href="#contact" className="site-header__cta">
            Contact
          </a>
        </div>
      </header>

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
              <article className="project" key={p.title}>
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
                <div className="project__title">{p.title}</div>
                <div className="project__body">{p.body}</div>
                {p.outcome && <div className="project__outcome">{p.outcome}</div>}
              </article>
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
                {profile.insights.map((i) => (
                  <a
                    className="insight"
                    key={i.title}
                    href={i.url ?? "#"}
                    {...(i.url && { target: "_blank", rel: "noreferrer" })}
                  >
                    <Media
                      image={i.image}
                      placeholder="Image"
                      className="insight__image"
                      ratio={3 / 2}
                      sizes="(min-width: 1080px) 350px, (min-width: 720px) 50vw, 100vw"
                    />
                    <div className="meta">
                      <span className="meta__key">{i.type}</span>
                      <span>{i.source}</span>
                    </div>
                    <div className="insight__title">{i.title}</div>
                  </a>
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

      <footer className="container site-footer">
        <div>
          © {year} {profile.name}
        </div>
        <div className="site-footer__links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
      </footer>
    </>
  );
}
