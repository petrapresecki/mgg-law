import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { useLang } from '../context/LangContext'

const WP_API = 'https://mgg-law.eu/wp-json/wp/v2/posts?per_page=20&_embed=wp:featuredmedia,wp:term&orderby=date&order=desc'

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('hr-HR', { day: 'numeric', month: 'long', year: 'numeric' })
}

function decodeHtml(html) {
  const txt = document.createElement('textarea')
  txt.innerHTML = html
  return txt.value
}

function stripHtml(html) {
  const stripped = html.replace(/<[^>]+>/g, '').trim()
  return decodeHtml(stripped)
}

export default function Novosti() {
  const { tr, lang } = useLang()
  const t = tr.news
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    document.title = lang === 'en'
      ? 'News – MGG Law Group'
      : 'Novosti – MGG Law Group';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = lang === 'en'
      ? 'Latest news and legal insights from MGG Law Group, Zagreb.'
      : 'Najnovije vijesti i pravni članci MGG Law Group, Zagreb.';
  }, [lang]);

  useEffect(() => {
    fetch(WP_API)
      .then(r => r.json())
      .then(data => { setPosts(data); setLoading(false) })
      .catch(() => { setError(true); setLoading(false) })
  }, [])

  return (
    <>
      <Nav />

      {/* HERO */}
      <section className="news-hero" style={{ background: '#F0EAE1', padding: '108px 88px 96px', borderBottom: '1px solid #CDBFAF' }}>
        <h1 style={{ fontFamily: "'Spectral', serif", fontSize: 'clamp(56px, 8vw, 118px)', fontWeight: 300, lineHeight: 0.92, color: '#1A1108', letterSpacing: '-.025em', marginBottom: '40px' }}>
          {t.hero_h1}
        </h1>
        <p style={{ fontSize: '14px', lineHeight: 1.85, color: '#7A6050', maxWidth: '480px' }}>{t.hero_p}</p>
      </section>

      {/* POSTS */}
      <section className="posts-section" style={{ background: '#FFFFFF', padding: '80px 88px 120px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '64px' }}>
          <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.26em', textTransform: 'uppercase', color: '#8B3A2A', whiteSpace: 'nowrap' }}>{t.label}</span>
          <div style={{ flex: 1, height: '1px', background: '#E4D8C8' }} />
        </div>

        {loading && <p style={{ fontSize: '14px', color: '#9A8070' }}>{t.loading}</p>}
        {error && <p style={{ fontSize: '14px', color: '#8B3A2A' }}>{t.error}</p>}
        {!loading && !error && posts.length === 0 && <p style={{ fontSize: '14px', color: '#9A8070' }}>{t.no_posts}</p>}

        {!loading && !error && (
          <div className="posts-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '16px' }}>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} readMore={t.read_more} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  )
}

function PostCard({ post, readMore }) {
  const [hovered, setHovered] = useState(false)
  const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url
  const category = post._embedded?.['wp:term']?.[0]?.[0]?.name
  const excerpt = stripHtml(post.excerpt?.rendered || '')

  if (imageUrl) {
    return (
      <Link
        to={`/novosti/${post.slug}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ display: 'block', textDecoration: 'none', borderRadius: '4px', overflow: 'hidden', position: 'relative', height: '300px' }}
      >
        {/* image */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
          transition: 'transform .5s ease',
        }} />

        {/* gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(15,10,5,.08) 0%, rgba(15,10,5,.72) 100%)',
        }} />

        {/* content */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '24px 28px' }}>
          {category && (
            <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,.7)', marginBottom: '8px' }}>
              {category}
            </span>
          )}
          <h2
            style={{ fontFamily: "'Spectral', serif", fontSize: '24px', fontWeight: 400, color: '#FFFFFF', lineHeight: 1.2, letterSpacing: '-.01em', margin: 0 }}
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
        </div>
      </Link>
    )
  }

  // Text fallback for posts without a featured image
  return (
    <Link
      to={`/novosti/${post.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textDecoration: 'none', background: hovered ? '#F5EFE7' : '#F0EAE1', borderRadius: '4px', padding: '32px', height: '300px', transition: 'background .2s' }}
    >
      <div>
        <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: '#9A8070', marginBottom: '16px' }}>
          {category && <><span style={{ color: '#8B3A2A' }}>{category}</span> · </>}{formatDate(post.date)}
        </p>
        <h2
          style={{ fontFamily: "'Spectral', serif", fontSize: '26px', fontWeight: 400, color: '#1A1108', lineHeight: 1.2, letterSpacing: '-.01em', marginBottom: '14px' }}
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        {excerpt && (
          <p style={{ fontSize: '13px', lineHeight: 1.7, color: '#7A6050', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {excerpt}
          </p>
        )}
      </div>
      <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: '#8B3A2A' }}>
        {readMore}
      </span>
    </Link>
  )
}
