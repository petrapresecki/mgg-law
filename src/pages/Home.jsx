import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { useLang } from '../context/LangContext'

export default function Home() {
  const { tr } = useLang()
  const h = tr.home

  return (
    <>
      <Nav />

      {/* HERO */}
      <section className="hero" style={{ display: 'flex', minHeight: '700px', background: '#F0EAE1' }}>
        <div className="hero-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 88px 84px 68px' }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(56px, 7vw, 108px)', fontWeight: 400, lineHeight: 0.97, color: '#1A1108', marginBottom: '44px', letterSpacing: '-.025em', whiteSpace: 'pre-line' }}>
            {h.hero_h1}
          </h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', marginBottom: '56px' }}>
            <span style={{ fontSize: '14px', color: '#7A6050', letterSpacing: '.02em' }}>dr. sc. Sandra Marković</span>
            <span style={{ fontSize: '14px', color: '#7A6050', letterSpacing: '.02em' }}>Sidonija Grbavac</span>
            <span style={{ fontSize: '14px', color: '#7A6050', letterSpacing: '.02em' }}>dr. sc. Dino Gliha</span>
          </div>
          <a href="mailto:info@mgg-law.eu" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '11px', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: '#8B3A2A', textDecoration: 'none', paddingBottom: '4px', borderBottom: '1.5px solid #8B3A2A', alignSelf: 'flex-start' }}>
            {h.contact_cta} <span style={{ letterSpacing: 0, fontSize: '14px' }}>→</span>
          </a>
        </div>
        <div className="hero-image" style={{ flex: 1.4, position: 'relative', overflow: 'hidden' }}>
          <img src="/assets/DSC_0297.jpg" alt="MGG Law tim" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,17,8,.28) 0%, transparent 50%)' }} />
          <div style={{ position: 'absolute', bottom: '28px', left: '28px' }}>
            <p style={{ fontSize: '9px', fontWeight: 600, color: 'rgba(240,234,225,.38)', letterSpacing: '.18em', textTransform: 'uppercase' }}>Tim · Zagreb</p>
          </div>
        </div>
      </section>

      {/* SPECIALTY STRIP */}
      <div style={{ background: '#1A1108', display: 'flex', flexWrap: 'wrap' }}>
        <div className="specialty-item" style={{ flex: 1, padding: '24px 68px', borderRight: '1px solid #2C1E10', display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.24em', textTransform: 'uppercase', color: '#8B3A2A' }}>{tr.specialties.Sandra}</p>
          <p style={{ fontSize: '13px', color: '#C8B8A8' }}>dr. sc. Sandra Marković</p>
        </div>
        <div className="specialty-item" style={{ flex: 1, padding: '24px 32px', borderRight: '1px solid #2C1E10', display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.24em', textTransform: 'uppercase', color: '#8B3A2A' }}>{tr.specialties.Sidonija}</p>
          <p style={{ fontSize: '13px', color: '#C8B8A8' }}>Sidonija Grbavac</p>
        </div>
        <div className="specialty-item" style={{ flex: 1, padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.24em', textTransform: 'uppercase', color: '#8B3A2A' }}>{tr.specialties.Dino}</p>
          <p style={{ fontSize: '13px', color: '#C8B8A8' }}>dr. sc. Dino Gliha</p>
        </div>
      </div>

      {/* ABOUT */}
      <section className="about-section" style={{ background: '#FFFFFF', padding: '100px 68px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '80px' }}>
          <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.26em', textTransform: 'uppercase', color: '#8B3A2A', whiteSpace: 'nowrap' }}>{h.about_label}</span>
          <div style={{ flex: 1, height: '1px', background: '#E4D8C8' }} />
        </div>
        <div style={{ display: 'flex', gap: '96px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '280px' }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(42px, 4.5vw, 66px)', fontWeight: 400, color: '#1A1108', lineHeight: 1.06, letterSpacing: '-.02em', marginBottom: '52px', whiteSpace: 'pre-line' }}>
              {h.about_h2}
            </h2>
            <p style={{ fontSize: '15px', lineHeight: 1.9, color: '#3A2C1E', marginBottom: '22px' }}>{h.about_p1}</p>
            <p style={{ fontSize: '15px', lineHeight: 1.9, color: '#3A2C1E', marginBottom: '22px' }}>{h.about_p2}</p>
            <p style={{ fontSize: '15px', lineHeight: 1.9, color: '#3A2C1E', marginBottom: '56px' }}>{h.about_p3}</p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '20px', color: '#8B3A2A', lineHeight: 1.55, whiteSpace: 'pre-line' }}>{h.about_pet}</p>
          </div>
          <div className="about-sidebar" style={{ width: '352px', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '420px', marginBottom: '44px', position: 'relative', overflow: 'hidden' }}>
              <img src="/assets/IMG_0482.jpg" alt="MGG Law ured" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,17,8,.28) 0%, transparent 50%)' }} />
              <div style={{ position: 'absolute', bottom: '14px', left: '14px' }}>
                <p style={{ fontSize: '9px', color: 'rgba(240,234,225,.38)', letterSpacing: '.14em', textTransform: 'uppercase' }}>{h.office_label}</p>
              </div>
            </div>
            <div>
              {[
                { name: 'dr. sc. Sandra Marković', spec: 'Sudsko, ustavno i upravno pravo' },
                { name: 'Sidonija Grbavac', spec: 'Obiteljsko i odvjetničko pravo' },
                { name: 'dr. sc. Dino Gliha', spec: 'Korporativno pravo i intelektualno vlasništvo' },
              ].map((p, i, arr) => (
                <div key={p.name} style={{ padding: '20px 0', borderTop: '1px solid #E4D8C8', borderBottom: i === arr.length - 1 ? '1px solid #E4D8C8' : 'none' }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 500, color: '#1A1108', marginBottom: '5px', lineHeight: 1.2 }}>{p.name}</p>
                  <p style={{ fontSize: '11px', color: '#8B3A2A', fontWeight: 600, letterSpacing: '.04em' }}>{p.spec}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact-section" style={{ background: '#1A1108', padding: '96px 68px' }}>
        <div style={{ display: 'flex', gap: '80px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ flexShrink: 0, maxWidth: '400px' }}>
            <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.26em', textTransform: 'uppercase', color: '#8B3A2A', marginBottom: '28px' }}>{h.contact_label}</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(44px, 4.5vw, 68px)', fontWeight: 400, color: '#F0EAE1', lineHeight: 1.04, letterSpacing: '-.025em', marginBottom: '32px', whiteSpace: 'pre-line' }}>
              {h.contact_h2}
            </h2>
            <p style={{ fontSize: '14px', lineHeight: 1.82, color: '#9A8070' }}>{h.contact_p}</p>
          </div>
          <div style={{ flex: 1, display: 'flex', gap: '56px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.22em', textTransform: 'uppercase', color: '#8B3A2A', marginBottom: '20px' }}>{h.phone_label}</p>
              <a href="tel:+38595377849" style={{ fontSize: '16px', fontWeight: 600, color: '#F0EAE1', textDecoration: 'none', padding: '16px 0', borderTop: '1px solid #2C1E10', display: 'block' }}>+385 95 3778 849</a>
              <a href="mailto:info@mgg-law.eu" style={{ fontSize: '16px', fontWeight: 600, color: '#F0EAE1', textDecoration: 'none', padding: '16px 0', borderTop: '1px solid #2C1E10', display: 'block' }}>info@mgg-law.eu</a>
              <a href="mailto:sandra.markovic@mgg-law.eu" style={{ fontSize: '14px', color: '#9A8070', textDecoration: 'none', padding: '14px 0', borderTop: '1px solid #2C1E10', display: 'block' }}>sandra.markovic@mgg-law.eu</a>
              <a href="mailto:sidonija.grbavac@mgg-law.eu" style={{ fontSize: '14px', color: '#9A8070', textDecoration: 'none', padding: '14px 0', borderTop: '1px solid #2C1E10', display: 'block' }}>sidonija.grbavac@mgg-law.eu</a>
              <a href="mailto:dino.gliha@mgg-law.eu" style={{ fontSize: '14px', color: '#9A8070', textDecoration: 'none', padding: '14px 0', borderTop: '1px solid #2C1E10', borderBottom: '1px solid #2C1E10', display: 'block' }}>dino.gliha@mgg-law.eu</a>
            </div>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.22em', textTransform: 'uppercase', color: '#8B3A2A', marginBottom: '20px' }}>{h.address_label}</p>
              <div style={{ borderTop: '1px solid #2C1E10', padding: '20px 0' }}>
                <p style={{ fontSize: '15px', color: '#F0EAE1', fontWeight: 500, marginBottom: '4px' }}>{h.address_street}</p>
                <p style={{ fontSize: '14px', color: '#9A8070', marginBottom: '20px' }}>{h.address_city}</p>
                <a href="https://www.google.com/maps/search/?api=1&query=Ulica+Kneza+Mutimira+1,+Zagreb" target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#8B3A2A', textDecoration: 'none', borderBottom: '1px solid #8B3A2A', paddingBottom: '3px', display: 'inline-block' }}>
                  {h.maps_link}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
