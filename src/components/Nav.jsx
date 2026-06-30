import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useLang } from '../context/LangContext'

export default function Nav() {
  const { lang, setLang, tr } = useLang()
  const [menuOpen, setMenuOpen] = useState(false)

  const linkStyle = (isActive) => ({
    fontSize: '12px',
    fontWeight: 500,
    color: isActive ? '#8B3A2A' : '#1A1108',
    textDecoration: 'none',
    borderBottom: isActive ? '1.5px solid #8B3A2A' : '1.5px solid transparent',
    paddingBottom: '2px',
    cursor: 'pointer',
    transition: 'color 0.2s',
  })

  const close = () => setMenuOpen(false)

  return (
    <>
      <nav className="nav" style={{
        background: '#F0EAE1',
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 68px',
        borderBottom: '1px solid #CDBFAF',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <NavLink to="/" onClick={close}>
          <img src="/logo.png" alt="MGG Law Group" style={{ height: '56px', width: 'auto', mixBlendMode: 'multiply' }} />
        </NavLink>

        {/* Desktop links */}
        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
          <NavLink to="/" end style={({ isActive }) => linkStyle(isActive)}>{tr.nav.home}</NavLink>
          <NavLink to="/tim" style={({ isActive }) => linkStyle(isActive)}>{tr.nav.team}</NavLink>
          <NavLink to="/usluge" style={({ isActive }) => linkStyle(isActive)}>{tr.nav.services}</NavLink>
          <NavLink to="/novosti" style={({ isActive }) => linkStyle(isActive)}>{tr.nav.news}</NavLink>

          <div style={{ width: '1px', height: '16px', background: '#CDBFAF' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => setLang('en')}
              style={{ fontSize: '11px', color: lang === 'en' ? '#1A1108' : '#9A8070', fontWeight: lang === 'en' ? 700 : 400, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >EN</button>
            <span style={{ color: '#CDBFAF', fontSize: '10px' }}>·</span>
            <button
              onClick={() => setLang('hr')}
              style={{ fontSize: '11px', color: lang === 'hr' ? '#1A1108' : '#9A8070', fontWeight: lang === 'hr' ? 700 : 400, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >HR</button>
          </div>
        </div>

        {/* Hamburger (mobile only) */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(o => !o)}
          style={{ display: 'none', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0 }}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <line x1="2" y1="2" x2="16" y2="16" stroke="#1A1108" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="16" y1="2" x2="2" y2="16" stroke="#1A1108" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
              <line x1="0" y1="1" x2="22" y2="1" stroke="#1A1108" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="0" y1="7" x2="22" y2="7" stroke="#1A1108" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="0" y1="13" x2="22" y2="13" stroke="#1A1108" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`nav-mobile${menuOpen ? ' open' : ''}`}>
        <NavLink to="/" end className="nav-mobile-link" onClick={close} style={{ color: '#1A1108', textDecoration: 'none' }}>{tr.nav.home}</NavLink>
        <NavLink to="/tim" className="nav-mobile-link" onClick={close} style={{ color: '#1A1108', textDecoration: 'none' }}>{tr.nav.team}</NavLink>
        <NavLink to="/usluge" className="nav-mobile-link" onClick={close} style={{ color: '#1A1108', textDecoration: 'none' }}>{tr.nav.services}</NavLink>
        <NavLink to="/novosti" className="nav-mobile-link" onClick={close} style={{ color: '#1A1108', textDecoration: 'none' }}>{tr.nav.news}</NavLink>

        <div className="nav-mobile-lang">
          <button
            onClick={() => { setLang('en'); close() }}
            style={{ fontSize: '13px', color: lang === 'en' ? '#1A1108' : '#9A8070', fontWeight: lang === 'en' ? 700 : 400, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >EN</button>
          <span style={{ color: '#CDBFAF' }}>·</span>
          <button
            onClick={() => { setLang('hr'); close() }}
            style={{ fontSize: '13px', color: lang === 'hr' ? '#1A1108' : '#9A8070', fontWeight: lang === 'hr' ? 700 : 400, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >HR</button>
        </div>
      </div>
    </>
  )
}
