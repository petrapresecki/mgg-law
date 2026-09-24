import { useCallback, useEffect, useRef, useState } from "react";
import PhotoLightbox from "./PhotoLightbox";

/**
 * Photo strip that drifts on its own but yields to the visitor.
 *
 * The list is rendered twice inside a native scroll container: the drift is
 * just scrollLeft being nudged each frame, which means dragging, swiping,
 * trackpads and the arrow buttons all work against the same mechanism and
 * can't fight the animation. Whenever scrollLeft crosses either end of the
 * first copy it jumps by half the track, so the loop never shows a seam.
 *
 * Each photo keeps its natural width at a shared height, so the portrait and
 * landscape shots from one shoot sit together without being cropped to a
 * common tile shape. Clicking one opens it full-screen.
 */
export default function PhotoMarquee({ photos, alt, labels, speed = 42, height = 320 }) {
  const scroller = useRef(null);
  const drag = useRef(null);
  const suppressClick = useRef(false);
  const paused = useRef(false);
  const inView = useRef(true);
  const [index, setIndex] = useState(null);
  const [copies, setCopies] = useState(2);

  const track = Array.from({ length: copies }, () => photos).flat();

  // A short selection may not span a wide screen twice over, which would leave
  // a visible gap at the loop point. Repeat the list until it comfortably does.
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const fit = () => {
      const one = el.scrollWidth / copies;
      if (!one) return;
      const need = Math.max(2, Math.ceil((el.clientWidth * 2) / one));
      if (need !== copies) setCopies(need);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [copies, photos]);

  // Auto-drift plus the seamless wrap. Runs every frame so the wrap applies to
  // user scrolling too, but only advances when nothing else is going on.
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    let raf;
    let last = performance.now();

    const tick = (now) => {
      const dt = Math.min(now - last, 100) / 1000;
      last = now;
      const seg = el.scrollWidth / copies;
      if (seg > 0) {
        const idle =
          !reduce && !paused.current && inView.current && index === null && !drag.current;
        if (idle) el.scrollLeft += speed * dt;
        if (el.scrollLeft >= seg) el.scrollLeft -= seg;
        else if (el.scrollLeft <= 0) el.scrollLeft += seg;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [speed, index, copies]);

  // Don't animate a strip nobody is looking at
  useEffect(() => {
    const el = scroller.current;
    if (!el || !window.IntersectionObserver) return;
    const io = new IntersectionObserver(
      ([e]) => {
        inView.current = e.isIntersecting;
      },
      { rootMargin: "120px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Mouse dragging. Touch is left to native scrolling, which already feels
  // better than anything reimplemented here.
  //
  // Deliberately NOT using setPointerCapture: capturing retargets the click
  // that follows pointerup to the capturing element, so the <img> onClick
  // would never fire and photos couldn't be opened. Window listeners give the
  // same tracking outside the element without touching click dispatch.
  const onPointerDown = (e) => {
    if (e.pointerType !== "mouse") return;
    const el = scroller.current;
    if (!el) return;
    drag.current = { x: e.clientX, left: el.scrollLeft, moved: 0 };

    const move = (ev) => {
      if (!drag.current) return;
      const dx = ev.clientX - drag.current.x;
      drag.current.moved = Math.max(drag.current.moved, Math.abs(dx));
      el.scrollLeft = drag.current.left - dx;
    };
    const up = () => {
      // A drag shouldn't also count as a click on whatever is under the cursor
      if (drag.current && drag.current.moved > 6) suppressClick.current = true;
      drag.current = null;
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const nudge = (dir) => {
    const el = scroller.current;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const openAt = (i) => {
    if (suppressClick.current) {
      suppressClick.current = false;
      return;
    }
    setIndex(i % photos.length);
  };

  const navigate = useCallback(
    (step) => setIndex((i) => (i + step + photos.length) % photos.length),
    [photos.length]
  );

  return (
    <>
      <div
        className="marquee-wrap"
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
      >
        <style>{`
          .marquee-wrap { position: relative; }
          .marquee {
            overflow-x: auto; overflow-y: hidden;
            scrollbar-width: none; -ms-overflow-style: none;
            cursor: grab; touch-action: pan-x;
          }
          .marquee::-webkit-scrollbar { display: none; }
          .marquee:active { cursor: grabbing; }
          .marquee-track { display: flex; gap: 18px; width: max-content; }
          .marquee img {
            height: ${height}px; width: auto; display: block; flex-shrink: 0;
            background: #E4D8C8; cursor: zoom-in;
            -webkit-user-drag: none; user-select: none;
            transition: opacity .25s ease;
          }
          .marquee img:hover { opacity: .82; }

          /* Fade the photos out into the background at both edges */
          .marquee-wrap::before, .marquee-wrap::after {
            content: ''; position: absolute; top: 0; bottom: 0; width: 120px;
            pointer-events: none; z-index: 1;
          }
          .marquee-wrap::before { left: 0; background: linear-gradient(to right, #F0EAE1, transparent); }
          .marquee-wrap::after { right: 0; background: linear-gradient(to left, #F0EAE1, transparent); }

          .marquee-btn {
            position: absolute; top: 50%; transform: translateY(-50%); z-index: 2;
            width: 48px; height: 48px; border-radius: 50%;
            background: rgba(240,234,225,.92); border: 1px solid #CDBFAF;
            color: #1A1108; font-size: 20px; line-height: 1; cursor: pointer;
            display: flex; align-items: center; justify-content: center;
            transition: background .2s ease;
          }
          .marquee-btn:hover { background: #FFFFFF; }
          .marquee-prev { left: 24px; }
          .marquee-next { right: 24px; }

          @media (max-width: 600px) {
            .marquee img { height: ${Math.round(height * 0.68)}px; }
            .marquee-wrap::before, .marquee-wrap::after { width: 48px; }
            .marquee-btn { display: none; }
          }
        `}</style>

        <button
          className="marquee-btn marquee-prev"
          onClick={() => nudge(-1)}
          aria-label={labels.prev}
        >
          ‹
        </button>

        <div
          className="marquee"
          ref={scroller}
          aria-label={alt}
          onPointerDown={onPointerDown}
        >
          <div className="marquee-track">
            {track.map((photo, i) => (
              <img
                key={i}
                src={photo.thumb}
                width={photo.w}
                height={photo.h}
                alt={i < photos.length ? alt : ""}
                aria-hidden={i >= photos.length}
                loading="lazy"
                decoding="async"
                draggable={false}
                onClick={() => openAt(i)}
              />
            ))}
          </div>
        </div>

        <button
          className="marquee-btn marquee-next"
          onClick={() => nudge(1)}
          aria-label={labels.next}
        >
          ›
        </button>
      </div>

      <PhotoLightbox
        photos={photos}
        index={index}
        onClose={() => setIndex(null)}
        onNavigate={navigate}
        labels={labels}
      />
    </>
  );
}
