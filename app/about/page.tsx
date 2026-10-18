"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Footer } from "@/components/SiteShell";
import { images } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);
const collage = [images.crew, images.pehel, images.documentary, images.pehel, images.crew, images.documentary, images.crew, images.pehel, images.documentary, images.pehel, images.crew, images.documentary, images.pehel, images.documentary, images.crew, images.pehel];

export default function About() {
  const collageRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const intro = gsap.fromTo(".about-hero .hero-animate", { y: 60, opacity: 0 }, { y: 0, opacity: 1, stagger: .13, duration: .9, ease: "power3.out", delay: .15 });
    const cards = collageRef.current?.querySelectorAll(".collage-card");
    let timeline: gsap.core.Timeline | undefined;
    if (cards && collageRef.current) {
      gsap.set(cards, { scale: .25, opacity: 0, rotation: (i) => (i%2?1:-1)*(8+i*2) });
      timeline = gsap.timeline({ scrollTrigger: { trigger: collageRef.current.parentElement, start: "top top", end: "bottom bottom", scrub: 1 } });
      cards.forEach((card,i) => timeline!.to(card, { scale: 1, opacity: 1, rotation: (i%2?1:-1)*3, duration: .35, ease: "back.out(1.8)" }, i*.08));
      timeline.to(cards, { y: (i) => -160 - i*12, scale: 1.12, duration: .8, stagger: .015 }, .9);
    }
    const reveal = gsap.fromTo(".about-statement", { y: 90, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".about-statement", start: "top 82%", once: true } });
    return () => { intro.kill(); timeline?.scrollTrigger?.kill(); timeline?.kill(); reveal.kill(); };
  }, []);
  return <>
    <section className="photo-hero about-hero"><div className="photo-hero-frame"><img src={images.crew} alt="Illustrative group portrait of student event organizers"/><div className="photo-shade"/><div className="photo-hero-content"><div className="badges hero-animate"><span>TEAM INDIGO</span><span>GGITS / ONE STUDENT CREW</span></div><div className="photo-hero-grid"><h1 className="display hero-animate">The crew<br/>behind it</h1><p className="photo-hero-aside hero-animate">Team Indigo is the event management club at Gyan Ganga Institute of Technology and Sciences. Through Pehel, we bring the college together to celebrate the auxiliary staff who care for our campus.</p></div></div></div></section>
    <div className="collage-track"><section className="collage" ref={collageRef}><div className="collage-center"><span>NO MAGIC TRICK.</span><h2>Just a lot of<br/><em>good people.</em></h2><span>AND A VERY LONG RUN SHEET.</span></div><div className="collage-grid">{collage.map((photo,i)=><div className={`collage-card collage-${i+1}`} key={i}><img src={photo} alt=""/></div>)}</div></section></div>
    <section className="name-marquee"><div className="marquee-line">{Array.from({length:4},(_,i)=><span key={i}>TEAM INDIGO © &nbsp; ✳ &nbsp; </span>)}</div><div className="stamps"><span>[ PLANS IN PROGRESS ]</span><span>[ PASSCODE: SHOW UP ]</span><span>[ PEHEL EVERY DIWALI ]</span><span>[ PEOPLE FIRST ]</span></div></section>
    <section className="about-editorial section-pad"><div className="section-topline"><span>01 / WHY WE DO IT</span><span>FOR THE PEOPLE WHO CARE FOR OUR CAMPUS</span></div><div className="about-editorial-grid"><h2 className="editorial about-statement">We plan the event.<br/>They make <em>the campus.</em></h2><div className="about-side"><span>WHAT DRIVES US / 001</span><p>Pehel puts the auxiliary staff of GGITS at the heart of a Diwali celebration. Our documentary recognizes their work keeping the college safe and clean. The performances and gift hampers are our way of saying thank you, with the wider college community helping make it happen.</p></div></div><div className="blue-bars"><i/><i/><i/></div><div className="about-strip"><div className="about-strip-track">{[...collage.slice(0,6),...collage.slice(0,6)].map((photo,i)=><img key={i} src={photo} alt={i<6?"Illustrative Pehel event scene":""}/>)}</div></div></section>
    <Footer/>
  </>;
}
