import { useEffect, useRef } from "react";

/**
 * Full-screen photo viewer. Loads the 1800px version of a photo only once it's
 * actually opened, and prefetches its immediate neighbours so stepping through
 * the set feels instant.
 */
export default function PhotoLightbox({ photos, index, onClose, onNavigate, labels }) {
  const closeRef = useRef(null);
  const open = index !== null;

  // Keyboard: escape closes, arrows step through
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onNavigate(-1);
      else if (e.key === "ArrowRight") onNavigate(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, onNavigate]);

  // Hold the page still behind the overlay
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Warm up the neighbours
  useEffect(() => {
    if (!open) return;
    for (const step of [1, -1]) {
      const n = photos[(index + step + photos.length) % photos.length];
      if (n) {
        const im = new Image();
        im.src = n.full;
      }
    }
  }, [open, index, photos]);

  if (!open) return null;

  const btn = {
    background: "none",
    border: "1px solid rgba(240,234,225,.32)",
    color: "#F0EAE1",
    cursor: "pointer",
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    lineHeight: 1,
    flexShrink: 0,
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={labels.label}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(20,13,6,.95)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 24px",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize: "10px",
            letterSpacing: ".2em",
            textTransform: "uppercase",
            color: "rgba(240,234,225,.55)",
          }}
        >
          {index + 1} / {photos.length}
        </span>
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label={labels.close}
          style={btn}
        >
          ✕
        </button>
      </div>

      <div
        className="lightbox-body"
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          padding: "0 24px 32px",
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(-1);
          }}
          aria-label={labels.prev}
          style={btn}
        >
          ‹
        </button>
        <img
          src={photos[index].full}
          alt={labels.label}
          onClick={(e) => e.stopPropagation()}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            display: "block",
            cursor: "default",
          }}
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(1);
          }}
          aria-label={labels.next}
          style={btn}
        >
          ›
        </button>
      </div>
    </div>
  );
}
