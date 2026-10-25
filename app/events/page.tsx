"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cta, Footer } from "@/components/SiteShell";
import { DonationPopup } from "@/components/DonationPopup";
import { events, images, stories } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

const pehelImages = [
  "/images/pehel-images/Pehel1.jpeg", "/images/pehel-images/Pehel12.jpeg",
  "/images/pehel-images/Pehel13.jpeg", "/images/pehel-images/Pehel14.jpeg",
  "/images/pehel-images/Pehel15.jpeg", "/images/pehel-images/Pehel16.jpeg",
  "/images/pehel-images/Pehel17.jpeg", "/images/pehel-images/Pehel18.jpeg",
  "/images/pehel-images/Pehel19.jpeg", "/images/pehel-images/Pehel120.jpeg",
  "/images/pehel-images/Pehel121.jpeg", "/images/pehel-images/Pehel122.jpeg",
  "/images/pehel-images/Pehel123.jpeg", "/images/pehel-images/Pehel124.jpeg",
  "/images/pehel-images/Pehel125.jpeg", "/images/pehel-images/Pehel126.jpeg",
  "/images/pehel-images/Pehel127.jpeg", "/images/pehel-images/Pehel128.jpeg",
  "/images/pehel-images/Pehel129.jpg",
];

export default function Events() {
  const heroRef = useRef<HTMLElement>(null);
  const pehelCollageRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLImageElement>(null);
  const [preview, setPreview] = useState<number | null>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const hero = gsap.fromTo(".photo-hero .hero-animate", { y: 55, opacity: 0 }, { y: 0, opacity: 1, duration: .9, stagger: .12, ease: "power3.out", delay: .15 });
    const st = ScrollTrigger.create({ trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true, onUpdate: self => { gsap.set(".events-photo", { scale: 1 + self.progress * .14, filter: `brightness(${1-self.progress*.35})` }); gsap.set(".events-mosaic", { opacity: self.progress * .9 }); }});
    const cards = pehelCollageRef.current?.querySelectorAll(".collage-card");
    let collageTimeline: gsap.core.Timeline | undefined;
    if (cards && pehelCollageRef.current) {
      gsap.set(cards, { scale: .25, opacity: 0, rotation: (i) => (i%2?1:-1)*(8+i*2) });
      collageTimeline = gsap.timeline({ scrollTrigger: { trigger: pehelCollageRef.current, start: "top top", end: "bottom bottom", scrub: 1 } });
      cards.forEach((card,i) => collageTimeline!.to(card, { scale: 1, opacity: 1, rotation: (i%2?1:-1)*3, duration: .35, ease: "back.out(1.8)" }, i*.06));
      collageTimeline.to(cards, { y: (i) => -160 - i*8, scale: 1.12, duration: .8, stagger: .01 }, 1.1);
    }
    const descriptionReveals = gsap.utils.toArray<HTMLElement>(".pehel-reveal").map(element =>
      gsap.fromTo(element, { y: 45, opacity: 0 }, { y: 0, opacity: 1, duration: .8, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 86%", once: true } })
    );
    return () => { hero.kill(); st.kill(); collageTimeline?.scrollTrigger?.kill(); collageTimeline?.kill(); descriptionReveals.forEach(tween => tween.kill()); };
  }, []);
  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setActive(index => (index + 1) % stories.length), 6000);
    return () => window.clearInterval(id);
  }, [paused]);
  const move = (e: React.MouseEvent) => {
    if (!previewRef.current) return;
    gsap.to(previewRef.current, { x: e.clientX + 24, y: e.clientY - 85, duration: .55, ease: "power3.out", overwrite: true });
  };
  return <>
    <section className="photo-hero events-hero" ref={heroRef}><div className="photo-hero-frame"><img className="events-photo" src={images.pehel} alt="Illustrative scene of a Diwali celebration with students and campus staff"/><div className="events-mosaic" aria-hidden="true"/><div className="photo-shade"/><div className="photo-hero-content"><div className="badges hero-animate"><span>TEAM INDIGO PRESENTS</span><span>GGITS / OUR EVENTS</span></div><div className="photo-hero-grid"><h1 className="display hero-animate">Pahal - एक नई सुबह</h1><div className="photo-hero-aside hero-animate"><p>Pahal is Team Indigo’s flagship event. Beat Blaze, Open Day, and Winter Breeze are also part of our event lineup.</p><Cta href="/contact">BE PART OF IT</Cta></div></div></div></div></section>
    <section className="archive section-pad"><div className="section-topline"><span>01 / TEAM INDIGO EVENTS</span><span>MORE THAN ONE REASON TO SHOW UP</span></div><h2 className="editorial">Events that bring<br/><em>campus together.</em></h2><p className="archive-disclaimer">Pahal is our flagship event, alongside Beat Blaze, Open Day, and Winter Breeze. More Team Indigo events will be added here.</p><div className="archive-head"><span>TEAM INDIGO</span><span>EVENT</span><span>TYPE</span><span>EXPLORE</span></div><div className="archive-list" onMouseMove={move} onMouseLeave={()=>setPreview(null)}>{events.map((item,i)=><a href={i===0?"#inside-pehel":"/contact"} key={item.title} className="archive-row" onMouseEnter={()=>setPreview(i)}><span className="archive-num">0{i+1}</span><span className="archive-mobile-image"><img src={item.image} alt=""/></span><h3>{item.title}</h3><span>TEAM INDIGO</span><span>{item.type}</span><b>↗</b></a>)}</div><img ref={previewRef} className={`archive-preview ${preview!==null?"visible":""}`} src={events[preview??0].image} alt="" aria-hidden="true"/></section>
    <section className="stories section-pad" id="inside-pehel"><div className="section-topline"><span>02 / INSIDE PEHEL</span><span>IDEAS BECOME ACTION</span></div><div className="stories-head"><h2 className="display reveal">One event.<br/><em>Many ways</em> to care.</h2><p>Performances, a documentary, and a campus-wide hamper drive come together for the auxiliary staff of GGITS.</p></div><div className="story-card" onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)}><div className="story-image"><img src={stories[active].image} alt={stories[active].title}/><span className="image-index">0{active+1} / 03</span></div><div className="story-content"><div className="badges"><span>{stories[active].label}</span><span>TEAM INDIGO</span></div><h3 className="display">{stories[active].title}</h3><p>{stories[active].description}</p><Cta href="#pahal-memories">EXPLORE PEHEL</Cta><div className="story-controls"><div>{stories.map((story,i)=><button key={story.number} aria-label={`Show story ${i+1}`} aria-current={active===i} onClick={()=>setActive(i)}><i style={{width: active===i?"100%":"0%"}}/></button>)}</div><span>MORE OF THE STORY ↗</span></div></div></div></section>
    <div className="collage-track pahal-collage-track" id="pahal-memories" ref={pehelCollageRef}><section className="collage pahal-collage"><div className="collage-center"><span>TEAM INDIGO / GGITS</span><h2>Pehel:<br/><em>Ek Nayi Subah<br/>Yaadein</em></h2><span>MEMORIES FROM PEHEL</span></div><div className="collage-grid">{pehelImages.map((photo,i)=><div className={`collage-card collage-${i+1}`} key={photo}><img src={photo} alt="Pehel event memory"/></div>)}</div></section></div>
    <section className="pehel-story section-pad">
      <div className="section-topline pehel-reveal"><span>03 / PEHEL</span><span>A DECADE OF GRATITUDE</span></div>
      <div className="pehel-story-head pehel-reveal"><div><span className="pehel-anniversary">CELEBRATING 10 YEARS OF GRATITUDE</span><h2 className="display">Pehel: Ek Nayi<br/><em>Subah.</em></h2></div><p>Every day, a team of people keeps our campus clean, safe, and running smoothly, often before we arrive and long after we leave. <strong>Pehel</strong> is our way of saying thank you.</p></div>
      <div className="pehel-story-body"><p className="pehel-story-intro pehel-reveal">Held every year just before Diwali, Pehel is our flagship event dedicated to the auxiliary staff of our college. Funds are raised through contributions from students, teachers, and the wider college community, and the result is a day designed entirely around those who make our college life safe and happy.</p>
        <div className="pehel-pointers-head pehel-reveal"><span>WHAT THE DAY INCLUDES</span><span>FOUR MOMENTS / ONE BIG THANK YOU</span></div>
        <div className="pehel-pointers">
          <article className="pehel-pointer pehel-reveal"><span>01 / SHARE</span><h3>Diwali Hampers</h3><p>Thoughtfully put together with essential, festive items that many families wish to buy but often can’t afford, so they can celebrate Diwali with joy and dignity.</p></article>
          <article className="pehel-pointer pehel-reveal"><span>02 / CELEBRATE</span><h3>Performances</h3><p>Music, dance, and cultural acts presented by students, just for them.</p></article>
          <article className="pehel-pointer pehel-reveal"><span>03 / WATCH</span><h3>Documentary Screenings</h3><p>Meaningful films shown for their enjoyment and reflection.</p></article>
          <article className="pehel-pointer pehel-reveal"><span>04 / PLAY</span><h3>Games and Activities</h3><p>Fun, interactive moments where everyone can laugh, play, and take a break together.</p></article>
        </div>
      </div>
      <div className="pehel-closing pehel-reveal"><span>[ PEHEL / EK NAYI SUBAH ]</span><p>Pehel is more than a charity drive. It is a day when our staff are the guests of honour, and when the whole college comes together to show that their work is seen, valued, and appreciated.</p><p>This year, <strong>Pehel marks its 10th anniversary.</strong> A decade of Pehel is a decade of small gestures growing into a tradition, and we’re proud to continue lighting up this festive season with <em>Pehel: Ek Nayi Subah</em>, a new dawn of warmth, respect, and togetherness.</p><b>BE A PART OF PEHEL. CONTRIBUTE, VOLUNTEER, OR SIMPLY JOIN US ON THE DAY.</b></div>
    </section>
    <DonationPopup featured />
    <Footer/>
  </>;
}
