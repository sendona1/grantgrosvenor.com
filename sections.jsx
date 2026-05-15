/* global React, Eyebrow, Button, Arrow, SectionHeader, StatGrid, Stripes, Ticker, Field, Modal, Questionnaire, COACHING_QUESTIONS, GROUP_QUESTIONS, FORM_ENDPOINTS */
const { useState, useEffect } = React;

/* ===== Nav ================================================================ */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLink = (href, label) => (
    <a
      className="gg-nav__link"
      href={href}
      onClick={() => setMenuOpen(false)}
    >{label}</a>
  );

  return (
    <nav className={`gg-nav ${scrolled ? 'gg-nav--scrolled' : ''}`}>
      <div className="gg-nav__inner">
        <a className="gg-nav__brand" href="#top">GRANTGROSVENOR</a>
        <div className={`gg-nav__links ${menuOpen ? 'gg-nav__links--open' : ''}`}>
          {navLink('#story', 'STORY')}
          {navLink('#coaching', 'COACHING')}
          {navLink('#group', 'COMEBACK GROUP')}
          {navLink('#sobriety', 'SOBRIETY')}
        </div>
        <button className="gg-nav__menu" onClick={() => setMenuOpen(o => !o)}>
          {menuOpen ? 'CLOSE' : 'MENU'}
        </button>
      </div>
    </nav>
  );
}

/* ===== Hero =============================================================== */
function Hero() {
  return (
    <section className="gg-hero" id="top">
      <div className="gg-hero__photo" aria-hidden="true"></div>
      <div className="gg-hero__photo-tag">WASHINGTON MILE · DEMPSEY INDOOR · BIB GROSVENOR</div>

      <div className="gg-hero__inner">
        <div className="gg-hero__top">
          <div className="gg-hero__bib">
            <span className="gg-hero__bib-cap">800M · 1:46.45</span>
            <span className="gg-hero__bib-num">3:58</span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span className="gg-hero__bib-cap" style={{ color: 'var(--gg-fg-3)' }}>EUGENE, OR · WORLD RANKED</span>
            <div style={{ fontFamily: 'var(--gg-font-mono)', fontSize: 12, color: 'var(--gg-fg-3)', letterSpacing: '0.16em', marginTop: 6, textTransform: 'uppercase' }}>
              EST. 2018 · BACK 2026
            </div>
          </div>
        </div>

        <h1 className="gg-hero__title">
          UNFINISHED<br />
          <span className="gg-hero__title-sub">BUSINESS.</span>
        </h1>

        <p className="gg-hero__lede">
          5 years completely removed from the sport. Climbing the corporate ladder, partying, addiction. Now sober — I'm back, running faster than I did in college, and competing on the world stage. This is the comeback I dreamed about.
        </p>

        <div className="gg-hero__cta-row">
          <Button variant="gold" as="a" href="#coaching">APPLY FOR 1:1 COACHING <Arrow /></Button>
          <Button variant="outline" as="a" href="#story">READ THE STORY</Button>
        </div>

        <div className="gg-hero__bottom">
          <div className="gg-hero__credit-list">
            <span>SUB-4 MILER</span>
            <span>2× NCAA CHAMPION</span>
            <span>UNIVERSITY OF OREGON</span>
            <span>WORLD RANKED</span>
          </div>
          <span className="gg-hero__bib-cap" style={{ color: 'var(--gg-fg-3)' }}>↓ SCROLL</span>
        </div>
      </div>
    </section>
  );
}

/* ===== Stats ============================================================== */
function StatsSection() {
  return (
    <section className="gg-section" style={{ paddingTop: 0 }}>
      <div className="gg-container">
        <StatGrid items={[
          { value: '3:58', cap: 'SUB-FOUR MILE · AT 33', gold: true },
          { value: '2×',   cap: 'NCAA NATIONAL CHAMPION · OREGON' },
          { value: '5',    sup: 'YR', cap: 'AWAY · NOW BACK · SOBER' },
        ]} />
      </div>
    </section>
  );
}

/* ===== Story ============================================================== */
function StorySection() {
  return (
    <section className="gg-section" id="story">
      <div className="gg-container">
        <SectionHeader
          number="00"
          label="THE STORY"
          status="GRIT · REINVENTION · UNFINISHED"
          title={<>Walked away.<br/>Came back faster.</>}
        />
        <div className="gg-story">
          <div className="gg-story__media">
            <span className="gg-story__media-tag">FLAGSTAFF, AZ · ALTITUDE BLOCK · 2026</span>
          </div>
          <div className="gg-story__copy">
            <p>I was the kid who broke four. I was the kid who won two NCAA titles in Oregon green. And I was the kid who, at the peak of all of it, walked off the track and stayed off it for five years.</p>
            <p>Five years completely removed from running. Climbing the corporate ladder, partying, addiction. The version of me that walked away wasn't afraid to lose — he was afraid that winning was all he was.</p>
            <p>I won't pretend I'm proud of every mile of those years. But every one of them is in this comeback. The reason I'm faster now than I was at twenty-one isn't talent — I always had that. It's that I finally know what it costs and I'm willing to pay it.</p>
            <blockquote className="gg-story__pull">I have unfinished business with this sport, and I'm not done until it's finished.</blockquote>
            <p>Now sober, I'm back, running faster than I did in college, and competing on the world stage. This is the comeback I dreamed about. The story that's still being written.</p>
            <p>This page is for three groups of people: brand partners who want to back the comeback, runners who want me to coach them, and post-collegiate athletes who feel like they left something on the track. Pick the door that's yours.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== Breaker (full-bleed photo strip between sections) ================ */
function Breaker() {
  return (
    <section className="gg-breaker" aria-hidden="false">
      <div className="gg-breaker__caption">
        <div className="gg-breaker__inner">
          <h3 className="gg-breaker__quote">Faster than I was at <em>twenty-one.</em></h3>
          <span className="gg-breaker__tag">SOLO TEMPO · NORTHERN AZ · 2026</span>
        </div>
      </div>
    </section>
  );
}

/* ===== Funnel section (reusable for Coaching + Group) ===================== */
function FunnelSection({ id, number, label, status, title, subtitle, paragraphs, points, panel, onApply }) {
  return (
    <section className="gg-section" id={id}>
      <div className="gg-container">
        <SectionHeader number={number} label={label} status={status} title={title} subtitle={subtitle} />
        <div className="gg-funnel">
          <div className="gg-funnel__copy">
            {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            <ul className="gg-funnel__list">
              {points.map((pt, i) => (
                <li className="gg-funnel__list-item" key={i}>
                  <span className="gg-funnel__list-num">/ {String(i+1).padStart(2,'0')}</span>
                  <span className="gg-funnel__list-text">{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="gg-funnel__panel">
            <div className="gg-funnel__panel-header">
              <span className="gg-funnel__panel-tag">{panel.tag}</span>
              <div style={{ textAlign: 'right' }}>
                <div className="gg-funnel__panel-meta">SLOTS</div>
                <div style={{ fontFamily: 'var(--gg-font-display)', fontSize: 32, lineHeight: 1, color: 'var(--gg-gold)', marginTop: 4 }}>{panel.slots}</div>
              </div>
            </div>
            <ul className="gg-funnel__panel-includes">
              {panel.includes.map((it, i) => <li key={i}>{it}</li>)}
            </ul>
            <Button variant="gold" onClick={onApply}>
              {panel.cta} <Arrow />
            </Button>
            <div className="gg-funnel__panel-meta" style={{ textAlign: 'center' }}>
              {panel.meta}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ===== Sobriety outreach modal =========================================== */
function SobrietyModal({ onClose }) {
  const [v, setV] = useState({ name: '', email: '', message: '' });
  const [phase, setPhase] = useState('form'); // form | submitting | sent | error
  const [err, setErr] = useState('');
  const set = k => e => setV(s => ({ ...s, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setPhase('submitting');
    try {
      const res = await fetch(FORM_ENDPOINTS.sobriety, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `[Sobriety Outreach] Message from ${v.name || 'anonymous'}`,
          _replyto: v.email || '',
          submitted_at: new Date().toISOString(),
          ...v,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Error ${res.status}`);
      }
      setPhase('sent');
    } catch (e) {
      setErr(e.message || 'Something went wrong. Try again.');
      setPhase('error');
    }
  };

  return (
    <Modal title="Write to Me" step="PRIVATE · CONFIDENTIAL" onClose={onClose}>
      {phase === 'sent' ? (
        <>
          <div className="gg-modal__cleared">
            <span className="gg-modal__cleared-tag">RECEIVED</span>
            <h4 className="gg-modal__cleared-title">Got it.<br/>I'll be in touch.</h4>
            <p style={{ margin: 0, color: 'var(--gg-fg-1)', fontSize: 15, lineHeight: 1.6 }}>
              I read every one of these personally. I'll reply within a few days. You're not alone in this.
            </p>
          </div>
          <div className="gg-form__cta-row" style={{ marginTop: 8 }}>
            <p className="gg-form__legal">Your message was sent privately. Nothing is stored in your browser.</p>
            <Button variant="outline" onClick={onClose}>CLOSE</Button>
          </div>
        </>
      ) : (
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p style={{ margin: 0, color: 'var(--gg-fg-2)', fontSize: 14, lineHeight: 1.6 }}>
            This goes directly to me. You don't have to explain everything — just say what's on your mind. Name and email are optional if you'd rather stay anonymous, but I can't reply without an email.
          </p>
          <Field label="Your name (optional)" name="name" value={v.name} onChange={set('name')} />
          <Field label="Email (optional — needed to reply)" type="email" name="email" value={v.email} onChange={set('email')} />
          <Field label="What's on your mind" name="message" textarea required rows={6}
            value={v.message} onChange={set('message')}
            placeholder="Say as much or as little as you want." />
          {phase === 'error' && (
            <div style={{ background: '#2a0e0d', border: '1px solid var(--gg-error)', padding: 12, borderRadius: 4, fontSize: 13, color: 'var(--gg-fg-1)' }}>
              {err}
            </div>
          )}
          <div className="gg-form__cta-row">
            <p className="gg-form__legal">Your message is sent privately. Your email is never shared.</p>
            <Button variant="gold" type="submit" disabled={!v.message.trim() || phase === 'submitting'}>
              {phase === 'submitting' ? 'SENDING…' : 'SEND'} <Arrow />
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}

/* ===== Sobriety =========================================================== */
function SobrietySection() {
  const [open, setOpen] = useState(false);
  return (
    <section className="gg-sobriety" id="sobriety">
      <div className="gg-sobriety__inner">
        <div style={{ display: 'flex', gap: 16, alignItems: 'baseline', borderTop: '2px solid var(--gg-gold)', paddingTop: 16, marginBottom: 16 }}>
          <span className="gg-section-head__num">/ 03</span>
          <span className="gg-section-head__label">SOBRIETY</span>
          <span className="gg-section-head__status" style={{ marginLeft: 'auto' }}>NO PITCH · NO PAYWALL</span>
        </div>
        <h2 className="gg-section-head__title" style={{ marginBottom: 32 }}>Sober is the<br/>only way I run.</h2>

        <div className="gg-sobriety__copy">
          <p>I'm not going to make a brand out of this. But I'm also not going to hide it, because the version of me that did is the version that lost five years.</p>
          <p>I drank because I was scared of how much I cared. I drank because winning made me feel separate, and I didn't know what to do with that. I drank for a lot of reasons that all sounded smart at 2 a.m. and stupid at 6 a.m. on a track.</p>
          <p>Today I run sober and I run faster. Those two facts are not unrelated. If you're an athlete reading this and the same thing is loud in your life — you can write to me. I'm not a counselor. I'm just someone who's been there and is willing to pick up.</p>
          <p style={{ color: 'var(--gg-fg-2)' }}>If you're in crisis, please contact <a style={{ color: 'var(--gg-gold)', borderBottom: '1px solid var(--gg-gold)' }} href="https://988lifeline.org" target="_blank" rel="noreferrer">988</a> or the <a style={{ color: 'var(--gg-gold)', borderBottom: '1px solid var(--gg-gold)' }} href="https://www.samhsa.gov/find-help/national-helpline" target="_blank" rel="noreferrer">SAMHSA helpline</a>. Then write to me when you're ready.</p>
        </div>

        <Button variant="outline" onClick={() => setOpen(true)}>
          SOBRIETY/ADDICTION OUTREACH <Arrow />
        </Button>

        <div className="gg-sobriety__sig">— G.G. · WRITTEN SOBER · 2026</div>
      </div>
      {open && <SobrietyModal onClose={() => setOpen(false)} />}
    </section>
  );
}

/* ===== Footer ============================================================ */
function Footer() {
  return (
    <footer className="gg-footer">
      <div className="gg-container">
        <div className="gg-footer__inner">
          <div>
            <div className="gg-footer__brand-line">RUN<br/>WHAT'S LEFT.</div>
            <div className="gg-footer__brand-sub">GRANT GROSVENOR · EUGENE, OR · {new Date().getFullYear()}</div>
          </div>
          <div className="gg-footer__col">
            <h4>SITE</h4>
            <ul>
              <li><a href="#story">Story</a></li>
              <li><a href="#coaching">1:1 Coaching</a></li>
              <li><a href="#group">Comeback Collective</a></li>
              <li><a href="#sobriety">Sobriety</a></li>
            </ul>
          </div>
          <div className="gg-footer__col">
            <h4>ELSEWHERE</h4>
            <ul>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Strava</a></li>
              <li><a href="#">YouTube</a></li>
            </ul>
          </div>
        </div>
        <div className="gg-footer__bottom">
          <span>© {new Date().getFullYear()} GRANT GROSVENOR</span>
          <span>BUILT WITH UNFINISHED BUSINESS</span>
          <span>SUB-4 · 2× NCAA · WORLD RANKED</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, {
  Nav, Hero, StatsSection, StorySection, Breaker, FunnelSection, SobrietySection, Footer,
});
