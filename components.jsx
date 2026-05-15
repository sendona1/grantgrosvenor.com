/* global React */
const { useState, useEffect, useRef } = React;

function Eyebrow({ children, color = 'gold' }) {
  const c = color === 'muted' ? 'var(--gg-fg-3)' : 'var(--gg-gold)';
  return (
    <span style={{
      fontFamily: 'var(--gg-font-body)', fontWeight: 600, fontSize: 12,
      letterSpacing: '0.16em', textTransform: 'uppercase', color: c,
    }}>{children}</span>
  );
}

function Button({ variant = 'gold', size, children, onClick, disabled, type = 'button', as = 'button', href }) {
  const cls = [
    'gg-btn',
    `gg-btn--${variant}`,
    size === 'sm' && 'gg-btn--sm',
  ].filter(Boolean).join(' ');
  if (as === 'a') return <a className={cls} href={href} onClick={onClick}>{children}</a>;
  return <button className={cls} onClick={onClick} disabled={disabled} type={type}>{children}</button>;
}

function Arrow() { return <span className="gg-arrow" aria-hidden="true"></span>; }

function SectionHeader({ number, label, status, title, subtitle, id }) {
  return (
    <header className="gg-section-head" id={id}>
      <div className="gg-section-head__row">
        <span className="gg-section-head__num">/ {number}</span>
        <span className="gg-section-head__label">{label}</span>
        {status && <span className="gg-section-head__status">{status}</span>}
      </div>
      <h2 className="gg-section-head__title">{title}</h2>
      {subtitle && <p className="gg-section-head__sub">{subtitle}</p>}
    </header>
  );
}

function StatGrid({ items }) {
  return (
    <div className="gg-stat-grid">
      {items.map((it, i) => (
        <div className="gg-stat-grid__cell" key={i}>
          <div className={`gg-stat-grid__num ${it.gold ? 'gg-stat-grid__num--gold' : ''}`}>
            {it.value}{it.sup && <span className="gg-stat-grid__sup">{it.sup}</span>}
          </div>
          <div className="gg-stat-grid__cap">{it.cap}</div>
        </div>
      ))}
    </div>
  );
}

function Stripes() {
  return (
    <div className="gg-stripes">
      <div style={{ background: 'var(--gg-green)' }}></div>
      <div style={{ background: 'var(--gg-fg-1)' }}></div>
      <div style={{ background: 'var(--gg-gold)' }}></div>
      <div style={{ background: 'var(--gg-fg-1)', opacity: 0.4 }}></div>
      <div style={{ background: 'var(--gg-green)', opacity: 0.6 }}></div>
    </div>
  );
}

function Ticker({ items }) {
  const dbl = [...items, ...items];
  return (
    <div className="gg-ticker">
      <div className="gg-ticker__track">
        {dbl.map((s, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
            {s}
            <span className="gg-ticker__dot">●</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Field({ label, type = 'text', name, value, onChange, placeholder, required, error, hint, options, textarea, rows }) {
  const classes = ['gg-field', error && 'gg-field--err'].filter(Boolean).join(' ');
  const common = {
    name, value: value ?? '', onChange,
    placeholder, required,
    className: textarea ? 'gg-field__textarea' : (options ? 'gg-field__select' : 'gg-field__input'),
  };
  return (
    <div className={classes}>
      {label && <label className="gg-field__label">{label}{required && <span style={{ color: 'var(--gg-gold)', marginLeft: 4 }}>*</span>}</label>}
      {textarea
        ? <textarea {...common} rows={rows || 4}></textarea>
        : options
          ? <select {...common}>
              <option value="">Select…</option>
              {options.map(o => <option key={o.value || o} value={o.value || o}>{o.label || o}</option>)}
            </select>
          : <input type={type} {...common} />}
      {hint && !error && <span className="gg-field__hint">{hint}</span>}
      {error && <span className="gg-field__err">{error}</span>}
    </div>
  );
}

function Modal({ title, onClose, children, step }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [onClose]);
  return (
    <div className="gg-modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="gg-modal" role="dialog" aria-modal="true">
        <div className="gg-modal__head">
          <div>
            {step && <div className="gg-modal__step">{step}</div>}
            <h3 className="gg-modal__title" style={{ marginTop: step ? 6 : 0 }}>{title}</h3>
          </div>
          <button className="gg-modal__close" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="gg-modal__body">{children}</div>
      </div>
    </div>
  );
}

Object.assign(window, {
  Eyebrow, Button, Arrow, SectionHeader, StatGrid, Stripes, Ticker, Field, Modal,
});
