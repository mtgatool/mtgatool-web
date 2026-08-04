import { RefObject, useEffect, useRef } from "react";

/**
 * Drives the showcase parallax through the DOM instead of React state.
 *
 * The container gets a `--parallax` custom property holding its distance to
 * the middle of the viewport; the layers inside read it from their transforms.
 * Scrolling therefore never re-renders React, and the property is written at
 * most once per animation frame, in sync with the browser's own paint.
 */
export default function useParallax(
  anchorOffset: number
): RefObject<HTMLDivElement> {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    let frame = 0;
    let containerTop = 0;

    const measure = (): void => {
      containerTop = container.offsetTop;
    };

    const paint = (): void => {
      frame = 0;
      const offset =
        containerTop + anchorOffset - window.innerHeight / 2 - window.scrollY;
      container.style.setProperty("--parallax", `${offset}px`);
    };

    const onScroll = (): void => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(paint);
      }
    };

    const remeasure = (): void => {
      measure();
      onScroll();
    };

    measure();
    paint();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", remeasure);

    // The showcases sit below content that can still grow after mount (fonts,
    // the hero's download button), so keep the cached offsetTop honest.
    const observer = new ResizeObserver(remeasure);
    observer.observe(document.body);

    return (): void => {
      if (frame !== 0) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", remeasure);
      observer.disconnect();
    };
  }, [anchorOffset]);

  return containerRef;
}
