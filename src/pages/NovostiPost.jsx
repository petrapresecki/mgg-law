import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { useLang } from '../context/LangContext'

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('hr-HR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function NovostiPost() {
  const { slug } = useParams()
  const { tr } = useLang()
  const t = tr.news
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch(`https://mgg-law.eu/wp-json/wp/v2/posts?slug=${slug}&_embed=wp:featuredmedia`)
      .then(r => r.json())
      .then(data => {
        if (data.length > 0) {
          setPost(data[0])
          document.title = `${data[0].title.rendered} – MGG Law Group`;
        } else setError(true)
        setLoading(false)
      })
      .catch(() => { setError(true); setLoading(false) })
  }, [slug])

  const imageUrl = post?._embedded?.['wp:featuredmedia']?.[0]?.source_url

  return (
    <>
      <Nav />

      {/* HERO — split when image exists, full-width otherwise */}
      <section
        className="post-detail-hero"
        style={{
          display: 'flex',
          minHeight: imageUrl ? '480px' : 'auto',
          borderBottom: '1px solid #CDBFAF',
        }}
      >
        {/* Left: meta + title */}
        <div style={{
          flex: imageUrl ? '0 0 55%' : '1',
          background: '#F0EAE1',
          padding: '80px 88px 80px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <Link
            to="/novosti"
            style={{ display: 'inline-block', fontSize: '10px', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: '#8B3A2A', textDecoration: 'none' }}
          >
            {t.back}
          </Link>

          <div>
            {loading && <p style={{ fontSize: '14px', color: '#9A8070' }}>{t.loading}</p>}
            {error && <p style={{ fontSize: '14px', color: '#8B3A2A' }}>{t.error}</p>}
            {post && (
              <>
                <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: '#9A8070', marginBottom: '20px' }}>
                  {formatDate(post.date)}
                </p>
                <h1
                  style={{ fontFamily: "'Spectral', serif", fontSize: 'clamp(40px, 5vw, 72px)', fontWeight: 400, lineHeight: 1.0, color: '#1A1108', letterSpacing: '-.025em' }}
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
              </>
            )}
          </div>
        </div>

        {/* Right: featured image (only when available) */}
        {imageUrl && (
          <div style={{
            flex: '0 0 45%',
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }} />
        )}
      </section>

      {/* BODY */}
      {post && (
        <section
          className="post-detail-body"
          style={{ background: '#FFFFFF', padding: '88px 88px 120px' }}
        >
          <div
            className="post-content"
            style={{ margin: '0 auto' }}
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        </section>
      )}

      <Footer />
    </>
  )
}
