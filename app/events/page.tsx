"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cta, Footer } from "@/components/SiteShell";
import { archive, images } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

export default function Events() {
  const heroRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLImageElement>(null);
  const [preview, setPreview] = useState<number | null>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const hero = gsap.fromTo(".photo-hero .hero-animate", { y: 55, opacity: 0 }, { y: 0, opacity: 1, duration: .9, stagger: .12, ease: "power3.out", delay: .15 });
    const st = ScrollTrigger.create({ trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true, onUpdate: self => { gsap.set(".events-photo", { scale: 1 + self.progress * .14, filter: `brightness(${1-self.progress*.35})` }); gsap.set(".events-mosaic", { opacity: self.progress * .9 }); }});
    return () => { hero.kill(); st.kill(); };
  }, []);
  const move = (e: React.MouseEvent) => {
    if (!previewRef.current) return;
    gsap.to(previewRef.current, { x: e.clientX + 24, y: e.clientY - 85, duration: .55, ease: "power3.out", overwrite: true });
  };
  return <>
    <section className="photo-hero events-hero" ref={heroRef}><div className="photo-hero-frame"><img className="events-photo" src={images.pehel} alt="Illustrative scene of a Diwali celebration with students and campus staff"/><div className="events-mosaic" aria-hidden="true"/><div className="photo-shade"/><div className="photo-hero-content"><div className="badges hero-animate"><span>TEAM INDIGO PRESENTS</span><span>EVERY DIWALI / GGITS</span></div><div className="photo-hero-grid"><h1 className="display hero-animate">Pehel</h1><div className="photo-hero-aside hero-animate"><p>Pehel is our Diwali event for the auxiliary staff of GGITS. We organize performances, share a documentary about their hard work, and distribute gift hampers funded by contributions from across the college.</p><Cta href="/contact">BE PART OF IT</Cta></div></div></div></div></section>
    <section className="archive section-pad"><div className="section-topline"><span>01 / INSIDE PEHEL</span><span>MADE FOR OUR AUXILIARY STAFF</span></div><h2 className="editorial">One celebration.<br/><em>Many acts of gratitude.</em></h2><p className="archive-disclaimer">Pehel takes place every Diwali. The next date, venue, and contribution details will be added when confirmed by Team Indigo.</p><div className="archive-head"><span>PART OF PEHEL</span><span>EVENT</span><span>FOCUS</span><span>EXPLORE</span></div><div className="archive-list" onMouseMove={move} onMouseLeave={()=>setPreview(null)}>{archive.map((item,i)=><a href="/contact" key={item.title} className="archive-row" onMouseEnter={()=>setPreview(i)}><span className="archive-num">0{i+1}</span><span className="archive-mobile-image"><img src={item.image} alt=""/></span><h3>{item.title}</h3><span>{item.type}</span><span>{item.theme}</span><b>↗</b></a>)}</div><img ref={previewRef} className={`archive-preview ${preview!==null?"visible":""}`} src={archive[preview??0].image} alt="" aria-hidden="true"/></section>
    <Footer/>
  </>;
}
