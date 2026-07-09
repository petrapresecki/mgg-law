import { useState, useEffect } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { useLang } from '../context/LangContext'
import { team } from '../data/team'

function PersonOverlay({ member, onClose, tr }) {
  return (
    <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0, zIndex: 1000, background: '#F0EAE1', overflowY: 'auto', animation: 'overlayIn .24s ease' }}>
      {/* Sticky top bar */}
      <div className="overlay-bar" style={{ position: 'sticky', top: 0, zIndex: 10, background: '#F0EAE1', borderBottom: '1px solid #E4D8C8', padding: '20px 68px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.22em', textTransform: 'uppercase', color: '#9A8070' }}>MGG Law Group</span>
          <span style={{ color: '#CDBFAF' }}>·</span>
          <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: '#8B3A2A' }}>{tr.team_label}</span>
        </div>
        <button
          onClick={onClose}
          style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1.5px solid #CDBFAF', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <line x1="1" y1="1" x2="13" y2="13" stroke="#1A1108" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="13" y1="1" x2="1" y2="13" stroke="#1A1108" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="overlay-body" style={{ maxWidth: '1100px', margin: '0 auto', padding: '72px 68px 100px' }}>
        {/* Header: photo + name */}
        <div className="overlay-header" style={{ display: 'flex', gap: '56px', alignItems: 'flex-start', marginBottom: '64px', flexWrap: 'wrap' }}>
          <div className="overlay-photo" style={{ width: '200px', flexShrink: 0 }}>
            <div className="overlay-photo-img" style={{ width: '200px', height: '256px', position: 'relative', overflow: 'hidden', background: member.photoBg }}>
              {member.photo && (
                <img src={member.photo} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: member.photoPosition || 'center top', display: 'block' }} />
              )}
            </div>
            <p style={{ fontSize: '8px', fontWeight: 600, color: '#CDBFAF', letterSpacing: '.16em', textTransform: 'uppercase', marginTop: '10px' }}>MGG · Zagreb</p>
          </div>

          <div style={{ flex: 1, paddingTop: '4px', minWidth: '240px' }}>
            <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.22em', textTransform: 'uppercase', color: '#8B3A2A', marginBottom: '14px' }}>{member.role}</p>
            <h2 style={{ fontFamily: "'Spectral', serif", fontSize: 'clamp(36px, 4vw, 64px)', fontWeight: 300, color: '#1A1108', lineHeight: 1.02, letterSpacing: '-.025em', marginBottom: '14px' }}>{member.name}</h2>
            <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '.14em', textTransform: 'uppercase', color: '#9A8070', marginBottom: '32px' }}>{member.specialty}</p>

            {member.works && member.works.length > 0 && (
              <div style={{ borderTop: '1px solid #E4D8C8', paddingTop: '24px' }}>
                <p style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '.26em', textTransform: 'uppercase', color: '#1A1108', marginBottom: '12px' }}>{tr.works_label}</p>
                <div>
                  {member.works.map((work) => (
                    <a key={work.title} href={work.url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#8B3A2A', textDecoration: 'none', padding: '10px 0', borderBottom: '1px solid #E4D8C8' }}>
                      <span style={{ fontSize: '10px', color: '#CDBFAF', flexShrink: 0 }}>→</span>
                      {work.title}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div style={{ height: '1px', background: '#CDBFAF', marginBottom: '52px' }} />

        {/* Bio */}
        <div style={{ maxWidth: '720px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {member.bio.map((para, i) => (
            <p key={i} style={{ fontSize: '16px', lineHeight: 1.9, color: '#3A2C1E' }}>{para}</p>
          ))}
        </div>

        <Section label={tr.career_label} items={member.career} renderItem={TimelineRow} />

        <Section label={tr.academic_label} items={member.academic} renderItem={TimelineRow} />

        <Section label={tr.education_label} items={member.education} renderItem={TimelineRow} />

        <Section label={tr.certifications_label} items={member.certifications} renderItem={TimelineRow} />

        <Section label={tr.awards_label} items={member.awards} renderItem={TimelineRow} />

        <Section label={tr.memberships_label} items={member.memberships} renderItem={TimelineRow} />

        {member.languages && (
          <div style={{ marginTop: '44px' }}>
            <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.26em', textTransform: 'uppercase', color: '#1A1108', marginBottom: '12px' }}>{tr.languages_label}</p>
            <p style={{ fontSize: '14px', color: '#3A2C1E' }}>{member.languages}</p>
          </div>
        )}

        <div style={{ marginTop: '72px', paddingTop: '32px', borderTop: '1px solid #E4D8C8' }}>
          <span onClick={onClose} style={{ cursor: 'pointer', fontSize: '10px', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: '#8B3A2A', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            {tr.back}
          </span>
        </div>
      </div>
    </div>
  )
}

// Splits a leading year token off a plain string entry so string-based sections
// match the two-column career layout. Handles single years ("1997."), ranges
// ("2016.–2022.", "2020-2021") and comma lists ("2014, 2015") — anything up to
// the first ", " / " – " separator that precedes non-numeric text.
function toEntry(item) {
  if (typeof item !== 'string') return item
  const m = item.match(/^(\d[\d.,\s–—-]*?)[,–—]\s+(\D.*)$/)
  if (!m) return { years: '', position: item }
  return { years: m[1].replace(/[\s,–—-]+$/, ''), position: m[2] }
}

function TimelineRow(item) {
  const { years, position } = toEntry(item)
  return (
    <div style={{ display: 'flex', gap: '32px', padding: '13px 0', borderBottom: '1px solid #E4D8C8' }}>
      <span style={{ fontSize: '11px', color: '#9A8070', flexShrink: 0, width: '128px', paddingTop: '2px', lineHeight: 1.5 }}>{years}</span>
      <span style={{ fontSize: '14px', lineHeight: 1.62, color: '#3A2C1E' }}>{position}</span>
    </div>
  )
}

function Section({ label, items, renderItem }) {
  if (!items || items.length === 0) return null
  return (
    <div style={{ marginTop: '44px' }}>
      <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.26em', textTransform: 'uppercase', color: '#1A1108', marginBottom: '20px' }}>{label}</p>
      <div>{items.map((item, i) => <div key={i}>{renderItem(item)}</div>)}</div>
    </div>
  )
}

export default function Tim() {
  const { tr, lang } = useLang()
  const [selected, setSelected] = useState(null)
  const t = tr.team
  const teamData = team[lang]

  useEffect(() => {
    document.title = lang === 'en'
      ? 'Our Team – MGG Law Group'
      : 'Tim – MGG Law Group';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = lang === 'en'
      ? 'Meet the attorneys at MGG Law Group – dr. sc. Sandra Marković, Sidonija Grbavac and dr. sc. Dino Gilha.'
      : 'Upoznajte tim MGG Law Group – dr. sc. Sandra Marković, Sidonija Grbavac i dr. sc. Dino Gilha.';
  }, [lang]);

  return (
    <>
      <Nav />

      {/* HERO */}
      <section className="hero" style={{ display: 'flex', minHeight: '580px', background: '#F0EAE1' }}>
        <div className="hero-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 88px 84px 68px' }}>
          <h1 style={{ fontFamily: "'Spectral', serif", fontSize: 'clamp(56px, 7vw, 104px)', fontWeight: 300, lineHeight: 0.97, color: '#1A1108', marginBottom: '36px', letterSpacing: '-.025em' }}>
            {t.hero_h1}
          </h1>
          <p style={{ fontSize: '15px', lineHeight: 1.82, color: '#7A6050', maxWidth: '480px' }}>{t.hero_p}</p>
        </div>
        <div className="hero-image" style={{ width: '540px', flexShrink: 0, background: 'linear-gradient(168deg,#BEB0A0 0%,#A89080 28%,#907A6C 58%,#AFA090 100%)', position: 'relative', overflow: 'hidden' }}>
          <img src="/assets/IMG_0482.jpg" alt="MGG Law ured" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(26,17,8,.32) 0%,transparent 55%)' }} />
          <div style={{ position: 'absolute', bottom: '28px', left: '28px' }}>
            <p style={{ fontSize: '9px', fontWeight: 600, color: 'rgba(240,234,225,.4)', letterSpacing: '.18em', textTransform: 'uppercase' }}>{t.office_tag}</p>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section style={{ background: '#1A1108', padding: '72px 68px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: "'Spectral', serif", fontStyle: 'italic', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 300, color: '#F0EAE1', lineHeight: 1.52, marginBottom: '36px', letterSpacing: '-.01em' }}>
            {t.quote}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
            <div style={{ width: '32px', height: '1px', background: '#8B3A2A' }} />
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: '#9A8070' }}>{t.quote_attr}</span>
            <div style={{ width: '32px', height: '1px', background: '#8B3A2A' }} />
          </div>
        </div>
      </section>

      {/* TEAM GRID */}
      <section className="team-section" style={{ background: '#FFFFFF', padding: '100px 68px 120px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '72px' }}>
          <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.26em', textTransform: 'uppercase', color: '#8B3A2A', whiteSpace: 'nowrap' }}>{t.team_label}</span>
          <div style={{ flex: 1, height: '1px', background: '#E4D8C8' }} />
          <span style={{ fontSize: '10px', color: '#9A8070', letterSpacing: '.06em' }}>{t.team_count}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '72px 40px' }}>
          {teamData.map((member) => (
            <MemberCard key={member.name} member={member} onClick={() => setSelected(member)} profile={t.profile} />
          ))}
        </div>
      </section>

      <Footer />

      {selected && (
        <PersonOverlay member={selected} onClose={() => setSelected(null)} tr={t} />
      )}
    </>
  )
}

function MemberCard({ member, onClick, profile }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '6px',
        overflow: 'hidden',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 4px 16px rgba(139,58,42,.07), 0 20px 56px rgba(26,17,8,.13)'
          : '0 2px 8px rgba(26,17,8,.04)',
        transition: 'transform .35s cubic-bezier(.25,.46,.45,.94), box-shadow .35s cubic-bezier(.25,.46,.45,.94)',
      }}
    >
      <div style={{ height: '420px', position: 'relative', overflow: 'hidden', background: member.cardBg }}>
        {member.photo && (
          <img src={member.photo} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: member.photoPosition || 'center top', display: 'block' }} />
        )}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(26,17,8,.28) 0%, transparent 52%)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity .35s ease',
        }} />
      </div>
      <div style={{ padding: '22px 20px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.22em', textTransform: 'uppercase', color: '#8B3A2A', marginBottom: '10px' }}>{member.role}</p>
        <h3 style={{ fontFamily: "'Spectral', serif", fontSize: '30px', fontWeight: 300, color: '#1A1108', lineHeight: 1.15, letterSpacing: '-.01em', marginBottom: '14px' }}>{member.name}</h3>
        <p style={{ fontSize: '13px', lineHeight: 1.78, color: '#7A6050', flex: 1 }}>{member.shortBio}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '22px', paddingTop: '18px', borderTop: `1px solid ${hovered ? '#CDBFAF' : '#E4D8C8'}`, transition: 'border-color .35s ease' }}>
          <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: '#8B3A2A' }}>{profile}</span>
          <span style={{ fontSize: '16px', color: '#8B3A2A', display: 'inline-block', transform: hovered ? 'translateX(4px)' : 'translateX(0)', transition: 'transform .3s ease' }}>→</span>
        </div>
      </div>
    </div>
  )
}
