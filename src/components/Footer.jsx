import { useLang } from '../context/LangContext'

export default function Footer() {
  const { lang, setLang, tr } = useLang()

  return (
    <footer className="footer" style={{ background: '#F0EAE1', borderTop: '1px solid #CDBFAF' }}>
      <style>{`
        .footer-inner { padding: 56px 68px; }
        .footer-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 40px; margin-bottom: 40px; }
        .footer-bottom { border-top: 1px solid #CDBFAF; padding-top: 20px; display: flex; justify-content: space-between; align-items: center; }

        @media (max-width: 600px) {
          .footer-inner { padding: 28px 24px 24px; }
          .footer-top { flex-direction: column; gap: 16px; margin-bottom: 24px; }
          .footer-top > div { margin: 0; }
          .footer-top p { margin: 0 0 10px; }
          .footer-bottom { flex-direction: column; align-items: flex-start; gap: 2px; padding-top: 16px; }
        }
      `}</style>

      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <img src="/logo.png" alt="MGG Law Group" style={{ height: '64px', width: 'auto', mixBlendMode: 'multiply', display: 'block', marginBottom: '14px' }} />
            <p style={{ fontSize: '13px', lineHeight: 1.78, color: '#7A6050' }}>
              Ulica Kneza Mutimira 1<br />10000 Zagreb
            </p>
          </div>

          <div>
            <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.24em', textTransform: 'uppercase', color: '#8B3A2A', marginBottom: '16px' }}>
              {tr.footer.contact_label}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a href="tel:+38595377849" style={{ fontSize: '13px', color: '#1A1108', textDecoration: 'none' }}>+385 95 3778 849</a>
              <a href="mailto:info@mgg-law.eu" style={{ fontSize: '13px', color: '#1A1108', textDecoration: 'none' }}>info@mgg-law.eu</a>
            </div>
          </div>

          <div>
            <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.24em', textTransform: 'uppercase', color: '#8B3A2A', marginBottom: '16px' }}>
              {tr.footer.lang_label}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button onClick={() => setLang('en')} style={{ fontSize: '13px', color: lang === 'en' ? '#1A1108' : '#9A8070', fontWeight: lang === 'en' ? 700 : 400, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                {tr.footer.lang_en}
              </button>
              <span style={{ color: '#CDBFAF', fontSize: '13px' }}>|</span>
              <button onClick={() => setLang('hr')} style={{ fontSize: '13px', color: lang === 'hr' ? '#1A1108' : '#9A8070', fontWeight: lang === 'hr' ? 700 : 400, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                {tr.footer.lang_hr}
              </button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p style={{ fontSize: '11px', color: '#9A8070' }}>{tr.footer.copyright}</p>
          <p style={{ fontSize: '11px', color: '#9A8070' }}>{tr.footer.location}</p>
        </div>
      </div>
    </footer>
  )
}
