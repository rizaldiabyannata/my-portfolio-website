"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 200);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const el = sectionRef.current;
    if (!el) return;

    const children = gsap.utils.toArray<HTMLElement>(el.children);

    gsap.set(children, { autoAlpha: 0, y: 20 });

    gsap.to(children, {
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      autoAlpha: 1,
      y: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: "power3.out",
    });
  }, [isMounted]);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 text-center max-w-2xl mx-auto"
    >
      <h2 className="text-brand font-mono text-lg mb-4">
        04. What&apos;s Next?
      </h2>
      <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
        Get In Touch
      </h3>
      <p className="text-muted-foreground text-lg mb-10">
        I&apos;m actively seeking new opportunities and collaborations. My inbox
        is always open. Whether you have a question or just want to connect,
        feel free to reach out!
      </p>
      <Button
        asChild
        variant="brand"
        size="lg"
        className="btn-glow font-mono text-lg px-8 py-4"
      >
        <a href="mailto:mail@rizaldiabyannata.dev">Say Hello</a>
      </Button>
    </section>
  );
};

export default Contact;
