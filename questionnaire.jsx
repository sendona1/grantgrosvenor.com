/* global React, Field, Button, Arrow, Modal */
const { useState } = React;

/* =========================================================================
   FORM-TO-EMAIL DELIVERY
   -------------------------------------------------------------------------
   Applications submit via Formspree — the destination address is configured
   in the Formspree dashboard, never in this file.

   SETUP (5 min):
   1. Go to https://formspree.io and sign in with grantgrosvenor1@gmail.com
   2. Create TWO forms: "Coaching Applications" and "Comeback Collective Applications"
   3. Copy each endpoint URL (looks like https://formspree.io/f/abc1234)
   4. Paste them into FORM_ENDPOINTS below
   5. In Formspree dashboard → set destination email for each form

   For the "Work With Me" contact form, also create a third form called
   "Work With Me / Brand Partnerships" and set CONTACT_ENDPOINT below.
   ========================================================================= */

const FORM_ENDPOINTS = {
  coaching: 'https://formspree.io/f/mlgzyooq',
  group:    'https://formspree.io/f/xzdolkkb',
  sobriety: 'https://formspree.io/f/mykoqblg',
  contact:  'https://formspree.io/f/REPLACE_WITH_CONTACT_FORM_ID',
};

const COACHING_QUESTIONS = [
  { name: 'name',       label: 'Your name',                      type: 'text',     required: true },
  { name: 'email',      label: 'Email',                          type: 'email',    required: true },
  { name: 'experience', label: 'Experience level',               required: true,
    options: ['High-school competitive', 'NCAA D1/D2/D3', 'Post-collegiate / club', 'Masters / open', 'Other'] },
  { name: 'pr_mile',    label: 'Mile / 1500m PR',                type: 'text',     required: true,
    placeholder: 'e.g. 4:12 mile / 3:52 1500m', hint: 'Best official time. Approximate is fine.' },
  { name: 'goals',      label: "What's the goal — and the deadline?", textarea: true, required: true,
    placeholder: 'A specific time, a race, a year. Be precise.' },
  { name: 'training',   label: 'Where are you training right now?',   textarea: true, required: true,
    placeholder: 'Coach, club, mileage, weekly structure.' },
  { name: 'why',        label: 'Why me, why now?',                    textarea: true, required: true,
    placeholder: 'I read every one of these.' },
];

const GROUP_QUESTIONS = [
  { name: 'name',       label: 'Your name',                            type: 'text',  required: true },
  { name: 'email',      label: 'Email',                                type: 'email', required: true },
  { name: 'experience', label: 'Experience level',                     required: true,
    options: ['High-school competitive', 'NCAA D1/D2/D3', 'Post-collegiate / club', 'Masters / open', 'Other'] },
  { name: 'last_competed', label: 'When did you stop competing?',      required: true,
    options: ['Still competing', 'Within the last year', '1–3 years ago', '3–5 years ago', '5+ years ago'] },
  { name: 'why_join',   label: 'Why would you like to join the Comeback Collective Group?',
    textarea: true, required: true,
    placeholder: 'Be specific. The thing you didn\'t finish, and where you are now.',
    hint: '200 words max. I read every one of these.' },
];

function Questionnaire({ open, onClose, productKey, productLabel, questions }) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [phase,  setPhase]  = useState('form'); // 'form' | 'submitting' | 'sent' | 'error'
  const [submitError, setSubmitError] = useState('');

  if (!open) return null;

  const reset = () => {
    setValues({}); setErrors({}); setPhase('form'); setSubmitError('');
  };
  const close = () => { reset(); onClose(); };

  const filled = questions.filter(q => q.required).every(q => (values[q.name] || '').trim().length > 0);
  const progress = Math.round(
    100 * questions.filter(q => (values[q.name] || '').trim().length > 0).length / questions.length
  );

  const set = (name) => (e) => {
    setValues(v => ({ ...v, [name]: e.target.value }));
    if (errors[name]) setErrors(er => { const n = { ...er }; delete n[name]; return n; });
  };

  const submit = async (e) => {
    e.preventDefault();
    const errs = {};
    questions.forEach(q => {
      const v = (values[q.name] || '').trim();
      if (q.required && !v) errs[q.name] = 'Required';
      if (q.type === 'email' && v && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) errs[q.name] = 'Invalid email';
    });
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setPhase('submitting');
    setSubmitError('');

    const payload = {
      _subject: `[${productLabel}] New application from ${values.name || 'unknown'}`,
      _replyto: values.email || '',
      product: productLabel,
      submitted_at: new Date().toISOString(),
      ...values,
    };

    try {
      const endpoint = FORM_ENDPOINTS[productKey];
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Submit failed (${res.status})`);
      }
      setPhase('sent');
    } catch (err) {
      console.error(err);
      // Demo mode until Formspree endpoints are configured
      if (FORM_ENDPOINTS[productKey].includes('REPLACE_WITH_')) {
        console.warn('[demo] Formspree endpoint not configured — showing success state.');
        setPhase('sent');
        return;
      }
      setSubmitError(err.message || 'Something went wrong. Try again, or email me directly.');
      setPhase('error');
    }
  };

  const isForm = phase === 'form' || phase === 'submitting' || phase === 'error';

  return (
    <Modal
      title={phase === 'sent' ? "Got it. I'll be in touch." : `Apply: ${productLabel}`}
      step={phase === 'sent' ? 'APPLICATION RECEIVED' : 'APPLICATION FORM'}
      onClose={close}
    >
      {isForm && (
        <>
          <div className="gg-modal__progress" aria-hidden="true">
            <div className="gg-modal__progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p style={{ margin: 0, color: 'var(--gg-fg-2)', fontSize: 14, lineHeight: 1.6 }}>
              {productKey === 'coaching'
                ? "I don't take every athlete. A few short questions — if we're a fit, I'll reach back out within 5 business days."
                : "A few short questions. The group only works if everyone in it actually wants to be there. I'll review and reach back out within 5 business days."}
            </p>
            {questions.map(q => (
              <Field
                key={q.name}
                {...q}
                value={values[q.name]}
                onChange={set(q.name)}
                error={errors[q.name]}
              />
            ))}

            {phase === 'error' && (
              <div style={{ background: '#2a0e0d', border: '1px solid var(--gg-error)', padding: 12, borderRadius: 4, fontSize: 13, color: 'var(--gg-fg-1)' }}>
                {submitError}
              </div>
            )}

            <div className="gg-form__cta-row">
              <p className="gg-form__legal">
                Submitting sends your application directly. Nothing is charged. Your email is used only to reply.
              </p>
              <Button variant="gold" type="submit" disabled={!filled || phase === 'submitting'}>
                {phase === 'submitting' ? 'SENDING…' : 'SUBMIT APPLICATION'} <Arrow />
              </Button>
            </div>
          </form>
        </>
      )}

      {phase === 'sent' && (
        <>
          <div className="gg-modal__cleared">
            <span className="gg-modal__cleared-tag">APPLICATION RECEIVED</span>
            <h4 className="gg-modal__cleared-title">Thanks, {values.name?.split(' ')[0] || 'runner'}.<br />I'll be in touch.</h4>
            <p style={{ margin: 0, color: 'var(--gg-fg-1)', fontSize: 15, lineHeight: 1.6 }}>
              {productKey === 'coaching'
                ? "I read every application personally. If we're a fit, I'll reach back out within 5 business days with next steps."
                : "I read every application personally. If we're a fit, I'll reach back out within 5 business days with onboarding details."}
            </p>
          </div>
          <div className="gg-form__cta-row" style={{ marginTop: 8 }}>
            <p className="gg-form__legal">A copy of your responses wasn't kept in the browser — only sent.</p>
            <Button variant="outline" onClick={close}>CLOSE</Button>
          </div>
        </>
      )}
    </Modal>
  );
}

Object.assign(window, {
  Questionnaire,
  COACHING_QUESTIONS,
  GROUP_QUESTIONS,
  FORM_ENDPOINTS,
});
