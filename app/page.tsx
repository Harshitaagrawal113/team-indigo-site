"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BrandMark } from "@/components/BrandMark";
import { Cta, Footer } from "@/components/SiteShell";
import { images, roles, stories } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

const manifesto = "Team Indigo is the event management club at Gyan Ganga Institute of Technology and Sciences. Our work is about people. Every Diwali, we organize Pehel for the auxiliary staff who help keep our college safe and clean. We bring performances, tell their stories through a documentary, and collect contributions across campus for gift hampers. We believe the people who care for our campus deserve a moment made for them.";
const photos = [images.pehel, images.documentary, images.crew];

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, paused: false, x: 0, scroll: 0 });
  const lastTrail = useRef(0);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const intro = gsap.fromTo(".hero .rise", { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: .12, duration: 1.05, ease: "power3.out", delay: .2 });
    const words = wordsRef.current?.querySelectorAll("span");
    let story: ScrollTrigger | undefined;
    if (storyRef.current && words) {
      gsap.set(words, { x: (i) => 240 + i * 12, opacity: .18 });
      story = ScrollTrigger.create({ trigger: storyRef.current.parentElement, start: "top top", end: "bottom bottom", scrub: 1, onUpdate: self => {
        words.forEach((word, i) => {
          const n = i / words.length;
          const p = Math.max(0, Math.min(1, (self.progress - n * .65) * 4));
          gsap.set(word, { x: (1-p) * (240 + i*12), opacity: .18 + p*.82 });
        });
      }});
    }
    const reveals = gsap.utils.toArray<HTMLElement>(".reveal").map(el => gsap.fromTo(el, { y: 65, opacity: 0 }, { y: 0, opacity: 1, duration: .9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", once: true } }));
    return () => { intro.kill(); story?.kill(); reveals.forEach(t => t.kill()); };
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setActive(n => (n + 1) % stories.length), 6000);
    return () => window.clearInterval(id);
  }, [paused]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const drift = () => {
      const el = teamRef.current;
      if (el && !dragRef.current.paused && !dragRef.current.active) {
        el.scrollLeft += .45;
        const halfway = el.scrollWidth / 2;
        if (el.scrollLeft >= halfway) el.scrollLeft -= halfway;
      }
      frame = requestAnimationFrame(drift);
    };
    frame = requestAnimationFrame(drift);
    return () => cancelAnimationFrame(frame);
  }, []);

  const startDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current.active = true;
    dragRef.current.x = e.clientX;
    dragRef.current.scroll = e.currentTarget.scrollLeft;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const moveDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragRef.current.active) e.currentTarget.scrollLeft = dragRef.current.scroll - (e.clientX - dragRef.current.x);
  };
  const stopDrag = () => { dragRef.current.active = false; };

  const makeTrail = (event: React.MouseEvent<HTMLElement>) => {
    if (!trailRef.current || window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    const now = Date.now(); if (now - lastTrail.current < 130) return; lastTrail.current = now;
    const box = heroRef.current!.getBoundingClientRect();
    const el = document.createElement("img");
    el.src = photos[Math.floor(Math.random()*photos.length)]; el.alt = ""; el.className = "trail-item";
    el.style.left = `${event.clientX - box.left}px`; el.style.top = `${event.clientY - box.top}px`;
    el.style.transform = `translate(-50%, -50%) rotate(${Math.random()*30-15}deg)`;
    trailRef.current.appendChild(el);
    gsap.fromTo(el, { scale: .35, opacity: 0 }, { scale: 1, opacity: .95, duration: .25, onComplete: () => gsap.to(el, { y: -75, opacity: 0, duration: .75, delay: .12, onComplete: () => el.remove() }) });
  };

  return <>
    <section className="hero" ref={heroRef} onMouseMove={makeTrail}>
      <div ref={trailRef} className="hero-trail" aria-hidden="true" />
      <BrandMark className="hero-mark rise" />
      <p className="micro rise">[ GGITS / PEOPLE FIRST ]</p>
      <h1 className="hero-title rise"><span>Team <i className="inline-star">✳</i> Indigo</span><span>Making moments</span><span>that <i className="inline-photo"><img src={images.pehel} alt=""/></i> matter.</span></h1>
      <p className="micro rise">[ A LITTLE MORE THAN AN EVENT ]</p>
      <BrandMark className="hero-mark bottom rise" />
      <div className="hero-bottom"><span>GYAN GANGA INSTITUTE OF TECHNOLOGY AND SCIENCES</span><span>SCROLL TO GET THE STORY ↓</span></div>
    </section>

    <div className="manifesto-track"><section className="manifesto" ref={storyRef} aria-label="Our story">
      <div className="manifesto-kicker">THE REASON WE SHOW UP / 001</div>
      <div className="manifesto-words" ref={wordsRef}>{manifesto.split(" ").map((word,i)=><span key={i}>{word} </span>)}</div>
      <div className="manifesto-bottom"><p>TEAM INDIGO<br/>GGITS</p><p>PEHEL / EVERY DIWALI<br/>FOR OUR AUXILIARY STAFF</p><div className="manifesto-stickers"><div className="sticker"><BrandMark/></div><img src={images.pehel} alt="Illustrative Diwali event scene"/></div></div>
    </section></div>

    <section className="event-intro section-pad"><div className="section-topline"><span>01 / OUR SIGNATURE EVENT</span><span>THIS IS THE GOOD PART ↘</span></div><h2 className="editorial reveal">Pehel begins with a simple idea: <em>celebrate the people behind our campus.</em></h2><div className="photo-ribbon reveal">{photos.map((photo,i)=><img key={i} src={photo} alt={i===0?"Illustrative Pehel celebration":i===1?"Illustrative documentary scene":"Illustrative student organizers"}/>)}</div></section>

    <section className="stories section-pad"><div className="section-topline"><span>02 / INSIDE PEHEL</span><span>IDEAS BECOME ACTION</span></div><div className="stories-head"><h2 className="display reveal">One event.<br/><em>Many ways</em> to care.</h2><p>Performances, a documentary, and a campus-wide hamper drive come together for the auxiliary staff of GGITS.</p></div><div className="story-card" onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)}><div className="story-image"><img src={stories[active].image} alt={stories[active].title}/><span className="image-index">0{active+1} / 03</span></div><div className="story-content"><div className="badges"><span>{stories[active].label}</span><span>TEAM INDIGO</span></div><h3 className="display">{stories[active].title}</h3><p>{stories[active].description}</p><Cta href="/events">EXPLORE PEHEL</Cta><div className="story-controls"><div>{stories.map((story,i)=><button key={story.number} aria-label={`Show story ${i+1}`} aria-current={active===i} onClick={()=>setActive(i)}><i style={{width: active===i?"100%":"0%"}}/></button>)}</div><span>MORE OF THE STORY ↗</span></div></div></div></section>

    <section className="team section-pad"><div className="section-topline"><span>03 / PEOPLE POWER</span><span>THE BEHIND-THE-SCENES BIT</span></div><h2 className="display reveal">Meet the crew<br/>making it <em>happen.</em></h2><p className="team-intro">Pehel takes performers, filmmakers, organizers, and a whole college willing to give.</p><div className="team-scroll" ref={teamRef} aria-label="Club team roles" onMouseEnter={()=>dragRef.current.paused=true} onMouseLeave={()=>dragRef.current.paused=false} onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={stopDrag} onPointerCancel={stopDrag}>{[...roles,...roles].map((role,i)=><article className="team-card" key={`${role}-${i}`} aria-hidden={i>=roles.length}><div className="team-photo"><img src={images.crew} alt={i<roles.length?"Illustrative portrait of student event organizers":""} style={{objectPosition:`${14+(i%roles.length)*18}% center`}}/><span className="team-pixel" aria-hidden="true">✳</span></div><span className="role-badge">{role}</span><h3>THE {role.toLowerCase()} CREW</h3><p>Real team portraits coming soon</p></article>)}</div><div className="team-note">[ DRAG TO EXPLORE / ILLUSTRATIVE PORTRAITS TO BE REPLACED ]</div></section>
    <Footer/>
  </>;
}
