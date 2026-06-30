import { useState, useEffect } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { useLang } from '../context/LangContext'
import { services } from '../data/services'

export default function Usluge() {
  const { tr, lang } = useLang()
  const [activeIndex, setActiveIndex] = useState(0)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [sheetIndex, setSheetIndex] = useState(0)
  const t = tr.services
  const servicesData = services[lang]
  const active = servicesData[activeIndex]
  const sheetService = servicesData[sheetIndex]

  useEffect(() => {
    document.body.style.overflow = sheetOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [sheetOpen])

  const handleClick = (i) => {
    if (window.matchMedia('(max-width: 768px)').matches) {
      setSheetIndex(i)
      setSheetOpen(true)
    } else {
      setActiveIndex(i)
    }
  }

  return (
    <>
      <Nav />

      {/* HERO */}
      <section className="services-hero" style={{ background: '#F0EAE1', padding: '108px 88px 96px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', borderBottom: '1px solid #CDBFAF', flexWrap: 'wrap', gap: '48px' }}>
        <div>
          <div style={{ width: '28px', height: '2px', background: '#8B3A2A', marginBottom: '44px' }} />
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(64px, 8vw, 118px)', fontWeight: 400, lineHeight: 0.92, color: '#1A1108', letterSpacing: '-.025em', whiteSpace: 'pre-line' }}>
            {t.hero_h1}
          </h1>
        </div>
        <div className="services-hero-desc" style={{ maxWidth: '320px', textAlign: 'right', paddingBottom: '6px' }}>
          <p style={{ fontSize: '14px', lineHeight: 1.85, color: '#7A6050', marginBottom: '28px' }}>{t.hero_p}</p>
          <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.24em', textTransform: 'uppercase', color: '#8B3A2A' }}>{t.count}</span>
        </div>
      </section>

      {/* SPLIT PANEL */}
      <section style={{ background: '#FFFFFF' }}>
        <div className="services-header" style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '52px 88px 0' }}>
          <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.26em', textTransform: 'uppercase', color: '#8B3A2A', whiteSpace: 'nowrap' }}>{t.services_label}</span>
          <div style={{ flex: 1, height: '1px', background: '#E4D8C8' }} />
          <span style={{ fontSize: '10px', color: '#9A8070', letterSpacing: '.08em' }}>{t.range}</span>
        </div>

        <div className="services-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'start' }}>
          {/* LEFT: index list */}
          <div className="services-list" style={{ borderRight: '1px solid #E4D8C8' }}>
            {servicesData.map((svc, i) => {
              const isActive = activeIndex === i
              return (
                <div
                  key={svc.num}
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => handleClick(i)}
                  className="services-list-item"
                  style={{ display: 'flex', alignItems: 'center', gap: '28px', padding: '22px 88px', borderBottom: '1px solid #E4D8C8', cursor: 'pointer', background: isActive ? '#FAF7F4' : '#FFFFFF', transition: 'background .15s ease' }}
                >
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '26px', fontWeight: 300, color: isActive ? '#8B3A2A' : '#D4C8B8', minWidth: '44px', flexShrink: 0, lineHeight: 1, transition: 'color .2s ease' }}>{svc.num}</span>
                  <span style={{ fontSize: '10px', fontWeight: 600, color: isActive ? '#1A1108' : '#7A6A58', textTransform: 'uppercase', letterSpacing: '.11em', flex: 1, lineHeight: 1.5, transition: 'color .2s ease' }}>{svc.name}</span>
                  <span style={{ fontSize: '13px', color: isActive ? '#8B3A2A' : 'transparent', flexShrink: 0, transition: 'color .2s ease', marginLeft: '8px' }}>→</span>
                </div>
              )
            })}
          </div>

          {/* RIGHT: sticky content panel */}
          <div className="services-panel" style={{ position: 'sticky', top: '72px', padding: '64px 88px 64px 72px' }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '88px', fontWeight: 300, color: '#EDE4D8', lineHeight: 1, display: 'block', letterSpacing: '-.03em', marginBottom: '16px' }}>
              {active.num}
            </span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '40px', fontWeight: 400, color: '#1A1108', lineHeight: 1.12, letterSpacing: '-.015em', marginBottom: '36px', maxWidth: '460px' }}>
              {active.name}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '44px' }}>
              {active.paragraphs.map((para, i) => (
                <p key={i} style={{ fontSize: '14px', lineHeight: 1.92, color: '#5A4030', maxWidth: '440px' }}>{para}</p>
              ))}
            </div>
            <a href="mailto:info@mgg-law.eu" style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.22em', textTransform: 'uppercase', color: '#8B3A2A', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
              {t.consult}
            </a>
          </div>
        </div>
      </section>

      {/* DARK CTA STRIP */}
      <section className="services-cta" style={{ background: '#1A1108', padding: '88px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '64px', flexWrap: 'wrap' }}>
        <div>
          <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.24em', textTransform: 'uppercase', color: '#8B3A2A', marginBottom: '20px' }}>{t.cta_label}</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(40px, 4vw, 60px)', fontWeight: 400, color: '#F0EAE1', lineHeight: 1.08, letterSpacing: '-.02em', whiteSpace: 'pre-line' }}>
            {t.cta_h2}
          </h2>
        </div>
        <div className="services-cta-actions" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px', flexShrink: 0 }}>
          <a href="tel:+38595377849" style={{ fontSize: '14px', color: '#9A8070', textDecoration: 'none' }}>+385 95 3778 849</a>
          <a href="mailto:info@mgg-law.eu" style={{ fontSize: '14px', color: '#9A8070', textDecoration: 'none' }}>info@mgg-law.eu</a>
          <a href="mailto:info@mgg-law.eu" style={{ marginTop: '16px', display: 'inline-flex', alignItems: 'center', gap: '12px', background: '#8B3A2A', color: '#F0EAE1', fontSize: '9px', fontWeight: 700, letterSpacing: '.22em', textTransform: 'uppercase', textDecoration: 'none', padding: '18px 36px' }}>
            {t.contact_us}
          </a>
        </div>
      </section>

      {/* MOBILE SLIDE-UP SHEET */}
      <div
        className="service-sheet"
        style={{
          position: 'fixed',
          inset: 0,
          background: '#FFFFFF',
          zIndex: 200,
          overflowY: 'auto',
          transform: sheetOpen ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.38s cubic-bezier(0.32, 0.72, 0, 1)',
        }}
      >
        <div style={{ position: 'sticky', top: 0, background: '#FFFFFF', borderBottom: '1px solid #E4D8C8', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 1 }}>
          <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.24em', textTransform: 'uppercase', color: '#8B3A2A' }}>{t.services_label}</span>
          <button
            onClick={() => setSheetOpen(false)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0 4px 16px', color: '#1A1108', fontSize: '18px', lineHeight: 1 }}
            aria-label="Close"
          >✕</button>
        </div>
        <div style={{ padding: '48px 24px 80px' }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '72px', fontWeight: 300, color: '#EDE4D8', lineHeight: 1, display: 'block', letterSpacing: '-.03em', marginBottom: '12px' }}>
            {sheetService.num}
          </span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', fontWeight: 400, color: '#1A1108', lineHeight: 1.15, letterSpacing: '-.015em', marginBottom: '32px' }}>
            {sheetService.name}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '40px' }}>
            {sheetService.paragraphs.map((para, i) => (
              <p key={i} style={{ fontSize: '14px', lineHeight: 1.92, color: '#5A4030' }}>{para}</p>
            ))}
          </div>
          <a href="mailto:info@mgg-law.eu" style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.22em', textTransform: 'uppercase', color: '#8B3A2A', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            {t.consult}
          </a>
        </div>
      </div>

      <div
        className="service-sheet-backdrop"
        onClick={() => setSheetOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(26,17,8,0.5)',
          zIndex: 199,
          opacity: sheetOpen ? 1 : 0,
          transition: 'opacity 0.38s ease',
          pointerEvents: sheetOpen ? 'auto' : 'none',
        }}
      />

      <Footer />
    </>
  )
}
