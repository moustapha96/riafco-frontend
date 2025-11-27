/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState, useCallback } from "react";
import { buildImageUrl } from "../utils/imageUtils";

/**
 * props:
 * - images: string[] (urls absolues ou relatives)
 * - title?: string (optionnel pour l'aria-label)
 */
export default function Gallery({ images = [], title = "Galerie" }) {
    const [isOpen, setIsOpen] = useState(false);
    const [index, setIndex] = useState(0);

    const open = useCallback((i) => {
        setIndex(i);
        setIsOpen(true);
        document.body.style.overflow = "hidden"; // lock scroll
    }, []);
    const close = useCallback(() => {
        setIsOpen(false);
        document.body.style.overflow = ""; // unlock scroll
    }, []);

    const prev = useCallback(
        () => setIndex((i) => (i - 1 + images.length) % images.length),
        [images.length]
    );
    const next = useCallback(
        () => setIndex((i) => (i + 1) % images.length),
        [images.length]
    );

    // Keyboard shortcuts
    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e) => {
            if (e.key === "Escape") close();
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isOpen, close, prev, next]);

    // Swipe on mobile
    useEffect(() => {
        if (!isOpen) return;
        let startX = 0;
        let endX = 0;
        const onTouchStart = (e) => (startX = e.changedTouches[0].screenX);
        const onTouchEnd = (e) => {
            endX = e.changedTouches[0].screenX;
            const dx = endX - startX;
            if (dx > 50) prev();
            if (dx < -50) next();
        };
        window.addEventListener("touchstart", onTouchStart);
        window.addEventListener("touchend", onTouchEnd);
        return () => {
            window.removeEventListener("touchstart", onTouchStart);
            window.removeEventListener("touchend", onTouchEnd);
        };
    }, [isOpen, prev, next]);

    const thumbs = useMemo(() => images.filter(Boolean).map(img => buildImageUrl(img)), [images]);

    if (!thumbs.length) return null;

    return (
        <div className="mt-6">

            <div
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
                aria-label={title}
            >
                {thumbs.map((src, i) => (
                    <button
                        key={src + i}
                        type="button"
                        onClick={() => open(i)}
                        className="group relative overflow-hidden rounded-lg border border-slate-200/60 dark:border-slate-700/60"
                    >
                        <img
                            src={src}
                            alt={`Photo ${i + 1}`}
                            loading="lazy"
                            className="h-32 sm:h-36 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                ))}
            </div>

            {/* Lightbox */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-[1000] bg-black/90 backdrop-blur-[2px] flex items-center justify-center"
                    aria-modal="true"
                    role="dialog"
                >
                    {/* Close */}
                    <button
                        onClick={close}
                        className="absolute top-4 right-4 rounded-full bg-white/10 hover:bg-white/20 text-white w-10 h-10 flex items-center justify-center"
                        aria-label="Fermer"
                        title="Fermer (Esc)"
                    >
                        ✕
                    </button>

                    {/* Prev */}
                    <button
                        onClick={prev}
                        className="absolute left-3 sm:left-6 rounded-full bg-white/10 hover:bg-white/20 text-white w-10 h-10 flex items-center justify-center"
                        aria-label="Précédente"
                        title="Précédente (←)"
                    >
                        ‹
                    </button>

                    {/* Image */}
                    <div className="max-h-[85vh] max-w-[92vw] sm:max-w-[80vw]">
                        <img
                            src={thumbs[index]}
                            alt={`Image ${index + 1} sur ${thumbs.length}`}
                            className="max-h-[85vh] w-auto rounded-xl shadow-2xl"
                        />
                        <div className="mt-3 text-center text-slate-200 text-sm">
                            {index + 1} / {thumbs.length}
                        </div>
                    </div>

                    {/* Next */}
                    <button
                        onClick={next}
                        className="absolute right-3 sm:right-6 rounded-full bg-white/10 hover:bg-white/20 text-white w-10 h-10 flex items-center justify-center"
                        aria-label="Suivante"
                        title="Suivante (→)"
                    >
                        ›
                    </button>
                </div>
            )}
        </div>
    );
}
