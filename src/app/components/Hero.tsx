"use client";
import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Button } from "@/components/ui/button";

const overview =
  "A proactive Senior Informatics Engineering student with practical experience as a Full-Stack Developer. I specialize in building robust backend systems with Node.js and bringing ideas to life on the web.";

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement | null>(null);
  const canvasWrapperRef = useRef<HTMLDivElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [shouldLoad3D, setShouldLoad3D] = useState(false);

  // Dynamically import CanvasScene ONLY when needed (client, no SSR)
  const CanvasScene = dynamic(() => import("./Canvas"), {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center w-full h-full text-sm text-muted-foreground">
        Initializing 3D…
      </div>
    ),
  });

  // Helper types for optional idle callback API
  interface IdleDeadline {
    didTimeout: boolean;
    timeRemaining: () => number;
  }
  type ExtendedWindow = Window & {
    requestIdleCallback?: (
      callback: (deadline: IdleDeadline) => void,
      opts?: { timeout: number }
    ) => number;
    cancelIdleCallback?: (handle: number) => void;
  };
  const win: ExtendedWindow =
    typeof window !== "undefined"
      ? (window as ExtendedWindow)
      : ({} as ExtendedWindow);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 200);
    return () => clearTimeout(timeout);
  }, []);

  // Trigger loading the heavy 3D bundle when: in viewport OR user idle OR user interacts (scroll/move)
  useEffect(() => {
    if (shouldLoad3D) return; // already decided

    const markShouldLoad = () => setShouldLoad3D(true);

    // 1. Intersection Observer
    const target = canvasWrapperRef.current;
    let observer: IntersectionObserver | null = null;
    if (target && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              markShouldLoad();
              observer?.disconnect();
            }
          });
        },
        { rootMargin: "200px" }
      );
      observer.observe(target);
    }

    // 2. Idle callback (fallback to timeout)
    const idleId: number | ReturnType<typeof setTimeout> =
      win.requestIdleCallback
        ? win.requestIdleCallback(() => markShouldLoad(), { timeout: 2500 })
        : setTimeout(markShouldLoad, 2000);

    // 3. First user interaction (scroll/move) triggers early load
    const interactionHandler = () => markShouldLoad();
    window.addEventListener("scroll", interactionHandler, {
      once: true,
      passive: true,
    });
    window.addEventListener("mousemove", interactionHandler, { once: true });
    window.addEventListener("touchstart", interactionHandler, {
      once: true,
      passive: true,
    });

    return () => {
      if (observer) observer.disconnect();
      if (win.cancelIdleCallback && typeof idleId === "number") {
        win.cancelIdleCallback(idleId);
      } else clearTimeout(idleId);
      window.removeEventListener("scroll", interactionHandler);
      window.removeEventListener("mousemove", interactionHandler);
      window.removeEventListener("touchstart", interactionHandler);
    };
    // win is a stable global reference; we intentionally exclude it from deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldLoad3D]);

  useEffect(() => {
    if (!isMounted) return;

    const heroElements = [
      ".hero-title",
      ".hero-name",
      ".hero-subtitle",
      ".hero-description",
      ".hero-button",
    ];

    gsap.set(heroElements, { opacity: 0, y: 20 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to(".hero-title", { opacity: 1, y: 0, duration: 0.8, delay: 0.2 })
      .to(".hero-name", { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
      .to(".hero-subtitle", { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
      .to(".hero-description", { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
      .to(".hero-button", { opacity: 1, y: 0, duration: 0.8 }, "-=0.6");
  }, [isMounted]);

  return (
    <section ref={heroRef} className="min-h-screen flex items-center -mt-20">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 w-full">
        <div className="flex flex-col md:flex-row items-center justify-center w-full">
          <div className="w-full mt-40 md:w-1/2">
            <p className="hero-title text-brand font-mono text-base mb-3 tracking-wide">
              Hi, my name is
            </p>
            <h1 className="hero-name text-4xl sm:text-6xl md:text-7xl font-bold text-foreground mb-3">
              Rizaldi Abyannata
            </h1>
            <div className="hero-description max-w-xl mb-10">
              <TextGenerateEffect
                words={overview}
                className="text-lg text-muted-foreground leading-relaxed"
              />
            </div>
            <Button
              variant="brand"
              size="lg"
              asChild
              className="hero-button btn-glow font-mono text-lg px-8 py-4"
            >
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  const contactEl = document.querySelector("#contact");
                  if (contactEl) {
                    contactEl.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Get In Touch
              </a>
            </Button>
          </div>
          <div
            ref={canvasWrapperRef}
            className="w-full md:w-1/2 h-[50vh] md:h-[80vh] flex items-center justify-center relative"
          >
            {shouldLoad3D ? (
              <CanvasScene />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-center">
                <div className="size-12 rounded-full border border-border animate-pulse" />
                <p className="text-sm text-muted-foreground max-w-[200px]">
                  3D model will load shortly…
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
