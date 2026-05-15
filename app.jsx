/* global React, ReactDOM, Nav, Hero, StatsSection, StorySection, Breaker, FunnelSection,
   SobrietySection, Footer, Stripes, Ticker, Questionnaire,
   COACHING_QUESTIONS, GROUP_QUESTIONS */
const { useState } = React;

const COACHING_PANEL = {
  tag: 'APPLY ONLY',
  slots: '6',
  cta: 'APPLY FOR 1:1 COACHING',
  meta: 'APPLICATION ONLY · NOTHING CHARGED YET',
  includes: [
    'Custom periodized training, week-by-week',
    'Weekly 1:1 video call (45 min)',
    'Daily messaging access · video form review',
    'Race-day pacing plans and recovery protocols',
    'Direct line to me, not an assistant',
  ],
};

const GROUP_PANEL = {
  tag: 'COHORT BASED',
  slots: '40',
  cta: 'JOIN COMEBACK COLLECTIVE GROUP',
  meta: 'APPLICATION ONLY · NOTHING CHARGED YET',
  includes: [
    'Private group of post-collegiate athletes who came back',
    'Monthly Q&A and accountability calls with me',
    'Training templates · pacing tools · race calendar',
    'Sober-curious channel for athletes who want one',
    'Honest community. No grindset slogans.',
  ],
};

function App() {
  const [open, setOpen] = useState(null); // 'coaching' | 'group' | null

  return (
    <>
      <Nav />
      <Hero />
      <Stripes />
      <Ticker items={['SUB-4', '2× NCAA', 'WORLD RANKED', 'OREGON', 'SOBER', 'UNFINISHED', 'BACK FASTER', 'COMEBACK SZN', '3:58.58 AT 33']} />
      <StatsSection />
      <StorySection />

      <Breaker />

      <FunnelSection
        id="coaching"
        number="01"
        label="COACHING"
        status="6 SLOTS · APPLICATION OPEN"
        title={<>1:1 Custom<br/>Training & Coaching</>}
        paragraphs={[
          "I coach a small number of athletes who are already serious — and want to take the next step in a way that actually compounds.",
          "Not everyone who applies is a fit. Coaching is a relationship and the wrong one wastes both of our time. A few questions, then we talk."
        ]}
        points={[
          'You\'re training consistently and want a coach who treats that as table stakes.',
          'You have a specific time goal — not a vibe — and a date.',
          'You can take honest feedback without flinching.',
          'You\'re willing to commit three months minimum, because that\'s how training works.',
        ]}
        panel={COACHING_PANEL}
        onApply={() => setOpen('coaching')}
      />

      <FunnelSection
        id="group"
        number="02"
        label="COMEBACK COLLECTIVE"
        status="COHORT-BASED · ROLLING ENTRY"
        title="Comeback Collective Group."
        subtitle="For post-collegiate athletes."
        paragraphs={[
          "If you stopped competing and you can't quite let it go — this group is for you. Post-collegiate runners, swimmers, throwers, the whole spread. Some are deep in their comeback, some are still on the fence.",
          "It's the room I wish I'd had during my five years off. We train together remotely, we talk honestly, and we don't pretend any of it is easy.",
        ]}
        points={[
          'You\'re a post-collegiate athlete (any sport) with unfinished business.',
          'You want a community that isn\'t a Discord full of strangers.',
          'You\'re ready to be honest about where you are.',
          'You can show up, even when it\'s ugly.',
        ]}
        panel={GROUP_PANEL}
        onApply={() => setOpen('group')}
      />

      <SobrietySection />

      <Footer />

      <Questionnaire
        open={open === 'coaching'}
        onClose={() => setOpen(null)}
        productKey="coaching"
        productLabel="1-on-1 Coaching"
        questions={COACHING_QUESTIONS}
      />
      <Questionnaire
        open={open === 'group'}
        onClose={() => setOpen(null)}
        productKey="group"
        productLabel="Comeback Collective Group"
        questions={GROUP_QUESTIONS}
      />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
