"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cta, Footer } from "@/components/SiteShell";
import { DonationPopup } from "@/components/DonationPopup";
import { beatPlaceImages, events, images, stories, teachersDayImages, tourismDayImages } from "@/lib/content";

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
  "/images/pehel-images/Pehel129.webp",
];

export default function Events() {
  const heroRef = useRef<HTMLElement>(null);
  const pehelCollageRef = useRef<HTMLDivElement>(null);
  const beatPlaceCollageRef = useRef<HTMLDivElement>(null);
  const tourismDayCollageRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLImageElement>(null);
  const [preview, setPreview] = useState<number | null>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const hero = gsap.fromTo(".photo-hero .hero-animate", { y: 55, opacity: 0 }, { y: 0, opacity: 1, duration: .9, stagger: .12, ease: "power3.out", delay: .15 });
    const st = ScrollTrigger.create({ trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true, onUpdate: self => { gsap.set(".events-mosaic", { opacity: self.progress * .9 }); }});
    const collageTimelines: gsap.core.Timeline[] = [];
    [pehelCollageRef.current, beatPlaceCollageRef.current, tourismDayCollageRef.current].forEach(track => {
      const cards = track?.querySelectorAll(".collage-card");
      if (!track || !cards?.length) return;
      gsap.set(cards, { scale: .25, opacity: 0, rotation: (i) => (i%2?1:-1)*(8+i*2) });
      const timeline = gsap.timeline({ scrollTrigger: { trigger: track, start: "top top", end: "bottom bottom", scrub: 1 } });
      cards.forEach((card,i) => timeline.to(card, { scale: 1, opacity: 1, rotation: (i%2?1:-1)*3, duration: .35, ease: "back.out(1.8)" }, i*.06));
      timeline.to(cards, { y: (i) => -160 - i*8, scale: 1.12, duration: .8, stagger: .01 }, 1.1);
      collageTimelines.push(timeline);
    });
    const descriptionReveals = gsap.utils.toArray<HTMLElement>(".pehel-reveal, .beatplace-reveal, .tourism-reveal").map(element =>
      gsap.fromTo(element, { y: 45, opacity: 0 }, { y: 0, opacity: 1, duration: .8, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 86%", once: true } })
    );
    return () => { hero.kill(); st.kill(); collageTimelines.forEach(timeline => { timeline.scrollTrigger?.kill(); timeline.kill(); }); descriptionReveals.forEach(tween => tween.kill()); };
  }, []);
  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setActive(index => (index + 1) % stories.length), 6000);
    return () => window.clearInterval(id);
  }, [paused]);
  const move = (e: React.MouseEvent) => {
    if (!previewRef.current) return;
    const previewBox = previewRef.current.getBoundingClientRect();
    const x = Math.min(e.clientX + 24, window.innerWidth - previewBox.width - 12);
    const y = Math.max(12, Math.min(e.clientY - previewBox.height / 2, window.innerHeight - previewBox.height - 12));
    gsap.to(previewRef.current, { x, y, duration: .35, ease: "power3.out", overwrite: true });
  };
  return <>
    <section className="photo-hero events-hero" ref={heroRef}><div className="photo-hero-frame"><img className="events-photo" src="/images/pehel-poster.png" alt="Pehel: Ek Nayi Subah 10th anniversary Diwali poster"/><div className="events-mosaic" aria-hidden="true"/><div className="photo-shade"/><div className="photo-hero-content"><div className="badges hero-animate"><span>TEAM INDIGO PRESENTS</span><span>GGITS / OUR EVENTS</span></div><div className="photo-hero-grid"><h1 className="display hero-animate">Pehel - एक नई सुबह</h1><div className="photo-hero-aside hero-animate"><p>Pehel is Team Indigo’s flagship event. Beat Blaze, Tourism Day, and Teachers’ Day are also part of our event lineup.</p><Cta href="/contact">BE PART OF IT</Cta></div></div></div></div></section>
    <section className="archive section-pad"><div className="section-topline"><span>01 / TEAM INDIGO EVENTS</span><span>MORE THAN ONE REASON TO SHOW UP</span></div><h2 className="editorial">Events that bring<br/><em>campus together.</em></h2><p className="archive-disclaimer">Pehel is our flagship event, alongside Beat Blaze, Tourism Day, and Teachers’ Day. More Team Indigo events will be added here.</p><div className="archive-head"><span>TEAM INDIGO</span><span>EVENT</span><span>TYPE</span><span>EXPLORE</span></div><div className="archive-list" onMouseMove={move} onMouseLeave={()=>setPreview(null)}>{events.map((item,i)=><a href={i===0?"#inside-pehel":i===1?"#inside-beat-place":i===2?"#inside-tourism-day":"#inside-teachers-day"} key={item.title} className="archive-row" onMouseEnter={()=>setPreview(i)}><span className="archive-num">0{i+1}</span><span className="archive-mobile-image"><img src={item.image} alt=""/></span><h3>{item.title}</h3><span>TEAM INDIGO</span><span>{item.type}</span><b>↗</b></a>)}</div><img ref={previewRef} className={`archive-preview ${preview!==null?"visible":""} ${preview!==null&&events[preview]?.title==="Beat Blaze"?"archive-preview-poster":""}`} src={events[preview??0].image} alt="" aria-hidden="true"/></section>
    <section className="stories section-pad" id="inside-pehel"><div className="section-topline"><span>02 / INSIDE PEHEL</span><span>IDEAS BECOME ACTION</span></div><div className="stories-head"><h2 className="display reveal">One event.<br/><em>Many ways</em> to care.</h2><p>Performances, a documentary, and a campus-wide hamper drive come together for the auxiliary staff of GGITS.</p></div><div className="story-card" onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)}><div className="story-image"><img src={stories[active].image} alt={stories[active].title}/><span className="image-index">0{active+1} / 03</span></div><div className="story-content"><div className="badges"><span>{stories[active].label}</span><span>TEAM INDIGO</span></div><h3 className="display">{stories[active].title}</h3><p>{stories[active].description}</p><Cta href="#pahal-memories">EXPLORE PEHEL</Cta><div className="story-controls"><div>{stories.map((story,i)=><button key={story.number} aria-label={`Show story ${i+1}`} aria-current={active===i} onClick={()=>setActive(i)}><i style={{width: active===i?"100%":"0%"}}/></button>)}</div><span>MORE OF THE STORY ↗</span></div></div></div></section>
    <div className="collage-track pahal-collage-track" id="pahal-memories" ref={pehelCollageRef}><section className="collage pahal-collage"><div className="collage-center"><span>TEAM INDIGO / GGITS</span><h2>Pehel:<br/><em>Ek Nayi Subah<br/>Yaadein</em></h2><span>MEMORIES FROM PEHEL</span></div><div className="collage-grid">{pehelImages.map((photo,i)=><div className={`collage-card collage-${i+1}`} key={photo}><img src={photo} alt="Pehel event memory"/></div>)}</div></section></div>
    <section className="pehel-story section-pad">
      <div className="section-topline pehel-reveal"><span>03 / PEHEL</span><span>A DECADE OF GRATITUDE</span></div>
      <div className="pehel-anniversary-banner pehel-reveal">
        <div className="pehel-anniversary-number" aria-hidden="true">10<span>TH</span></div>
        <div className="pehel-anniversary-copy"><span>[ DIWALI / A DECADE TOGETHER ]</span><h2>Ten years of<br/><em>gratitude.</em></h2><p>Celebrating the people who make our campus feel like home.</p></div>
        {[0,1,2].map((burst)=><div className={`pehel-firework pehel-firework-${burst+1}`} key={burst} aria-hidden="true">{Array.from({length:12},(_,ray)=><i key={ray} style={{transform:`rotate(${ray*30}deg)`}}/>)}</div>)}
        <span className="pehel-diya" aria-hidden="true">✦</span>
      </div>
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
    <section className="stories section-pad beatplace-intro" id="inside-beat-place">
      <div className="section-topline"><span>04 / BEAT BLAZE</span><span>INTERNATIONAL DANCE DAY</span></div>
      <div className="stories-head"><h2 className="display">Beat Blaze.<br/><em>Where Rhythm<br/>Meets Passion.</em></h2><p>When words fall short, let the rhythm speak!</p></div>
      <div className="story-card beatplace-story-card">
        <div className="beatplace-mini-collage" aria-label="Beat Blaze dance performances">
          {beatPlaceImages.slice(0,3).map((photo,i)=><div className={`beatplace-mini-image beatplace-mini-image-${i+1}`} key={photo}><img src={photo} alt={i===0?"Dancer performing at Beat Blaze":`Beat Blaze dance performance ${i+1}`}/></div>)}
        </div>
        <div className="story-content"><div className="badges"><span>TEAM INDIGO / DANCE</span><span>BEAT BLAZE</span></div><h3 className="display">Every move<br/>tells a story.</h3><p>Beat Blaze is an electrifying dance competition organized by Team Indigo at Gyan Ganga Institute of Technology and Sciences to celebrate International Dance Day. Bringing together passionate dancers from every branch, Beat Blaze transforms the stage into a vibrant showcase of talent, creativity, and expression.</p><Cta href="#beatplace-memories">EXPLORE THE MOVES</Cta></div>
      </div>
    </section>
    <div className="collage-track beatplace-collage-track" id="beatplace-memories" ref={beatPlaceCollageRef}>
      <section className="collage beatplace-collage"><div className="collage-center"><span>TEAM INDIGO / INTERNATIONAL DANCE DAY</span><h2>Beat Blaze:<br/><em>Where Rhythm<br/>Meets Passion</em></h2><span>EVERY BEAT / EVERY STORY</span></div><div className="collage-grid">{beatPlaceImages.map((photo,i)=><div className={`collage-card collage-${i+1}`} key={photo}><img src={photo} alt="Beat Blaze dance performance"/></div>)}</div></section>
    </div>
    <section className="beatplace-story section-pad">
      <div className="section-topline beatplace-reveal"><span>05 / THE SPIRIT OF BEAT BLAZE</span><span>MOVE / CREATE / INSPIRE</span></div>
      <div className="beatplace-story-heading beatplace-reveal"><span>[ PASSION TAKES CENTER STAGE ]</span><h2 className="display">More than<br/>a <em>competition.</em></h2></div>
      <div className="beatplace-copy-grid">
        <p className="beatplace-reveal">From powerful solo performances and perfectly synchronized duos to high-energy group choreographies, every performance tells a story. The competition celebrates diverse dance styles, individual artistry, teamwork, and the courage to own the stage. With every beat, every move, and every performance, participants compete not just to win, but to inspire, entertain, and leave their mark.</p>
        <p className="beatplace-reveal">More than a competition, Beat Blaze is a celebration of movement, music, and the spirit of dance—where passion takes center stage, talent knows no boundaries, and every beat brings the campus alive.</p>
      </div>
    </section>
    <section className="stories section-pad tourism-intro" id="inside-tourism-day">
      <div className="section-topline"><span>06 / TOURISM DAY</span><span>SPANDAN / CULTURAL SHOWCASE</span></div>
      <div className="stories-head"><h2 className="display">Tourism Day.<br/><em>Celebrating cultures,<br/>one performance at a time.</em></h2><p>Explore the world through dance, tradition, and student performances.</p></div>
      <div className="story-card tourism-story-card">
        <div className="beatplace-mini-collage tourism-mini-collage" aria-label="Tourism Day cultural performances">
          {tourismDayImages.slice(0,3).map((photo,i)=><div className={`beatplace-mini-image beatplace-mini-image-${i+1}`} key={photo}><img src={photo} alt={`Tourism Day cultural performance ${i+1}`}/></div>)}
        </div>
        <div className="story-content"><div className="badges"><span>TEAM INDIGO / SPANDAN</span><span>TOURISM DAY</span></div><h3 className="display">One stage.<br/>Many cultures.</h3><p>Tourism Day at our college is a vibrant celebration of cultures, traditions, and the diversity that makes our world unique. Organized as part of Spandan, the event brings together students from different branches, each representing an allotted country through captivating dance performances inspired by its culture and traditions.</p><Cta href="#tourism-day-memories">EXPLORE THE CELEBRATION</Cta></div>
      </div>
    </section>
    <div className="collage-track tourism-collage-track" id="tourism-day-memories" ref={tourismDayCollageRef}>
      <section className="collage tourism-collage"><div className="collage-center"><span>TEAM INDIGO / SPANDAN</span><h2>Tourism Day:<br/><em>Celebrating<br/>cultures together</em></h2><span>UNITY IN DIVERSITY / GGITS</span></div><div className="collage-grid">{tourismDayImages.map((photo,i)=><div className={`collage-card collage-${i+1}`} key={photo}><img src={photo} alt="Tourism Day cultural dance performance"/></div>)}</div></section>
    </div>
    <section className="beatplace-story section-pad tourism-story">
      <div className="section-topline tourism-reveal"><span>07 / TOURISM DAY</span><span>UNITY IN DIVERSITY</span></div>
      <div className="beatplace-story-heading tourism-reveal"><span>[ AROUND THE WORLD / ONE CAMPUS ]</span><h2 className="display">Cultures<br/>come <em>alive.</em></h2></div>
      <div className="beatplace-copy-grid">
        <p className="tourism-reveal">At the heart of this celebration is Team Indigo, which takes charge of organizing and managing the performances at Spandan Auditorium. From coordinating the participating branches to bringing the stage to life, Indigo ensures that every performance becomes a memorable cultural experience.</p>
        <p className="tourism-reveal">Tourism Day is more than just a series of performances; it is an opportunity for students to explore the world through art, appreciate different cultures, and celebrate unity in diversity—all without leaving their campus.</p>
      </div>
    </section>
    <section className="stories section-pad tourism-intro teachersday-intro" id="inside-teachers-day">
      <div className="section-topline"><span>08 / TEACHERS’ DAY</span><span>AN ANNUAL TRIBUTE</span></div>
      <div className="stories-head"><h2 className="display">Teachers’ Day.<br/><em>Celebrating the people<br/>who help us grow.</em></h2><p>A day for gratitude, good games, and performances made for our teachers.</p></div>
      <div className="story-card tourism-story-card teachersday-story-card">
        <div className="beatplace-mini-collage tourism-mini-collage" aria-label="Teachers’ Day celebrations">
          {teachersDayImages.slice(0,3).map((photo,i)=><div className={`beatplace-mini-image beatplace-mini-image-${i+1}`} key={photo}><img src={photo} alt={`Teachers’ Day celebration ${i+1}`}/></div>)}
        </div>
        <div className="story-content"><div className="badges"><span>TEAM INDIGO / GGITS</span><span>TEACHERS’ DAY</span></div><h3 className="display">For the ones<br/>who guide us.</h3><p>Every year, Team Indigo brings the GGITS community together to celebrate Teachers’ Day and recognize the teachers who guide, encourage, and inspire us.</p><Cta href="#teachers-day-memories">SEE THE CELEBRATION</Cta></div>
      </div>
    </section>
    <section className="teachersday-gallery section-pad" id="teachers-day-memories">
      <div className="section-topline"><span>TEACHERS’ DAY / MOMENTS</span><span>GAMES / PERFORMANCES / GRATITUDE</span></div>
      <div className="teachersday-gallery-grid">{teachersDayImages.map((photo,i)=><div className={`teachersday-gallery-card teachersday-gallery-card-${i+1}`} key={photo}><img src={photo} alt={`Teachers’ Day celebration photo ${i+1}`}/></div>)}</div>
    </section>
    <section className="beatplace-story section-pad tourism-story teachersday-story">
      <div className="section-topline"><span>09 / THE TEACHERS’ DAY TRIBUTE</span><span>GAMES / PERFORMANCES / THANKS</span></div>
      <div className="beatplace-story-heading"><span>[ CELEBRATING OUR TEACHERS ]</span><h2 className="display">A day made<br/><em>for them.</em></h2></div>
      <div className="beatplace-copy-grid">
        <p>Team Indigo organizes games that invite teachers to join in, share a laugh, and enjoy a little friendly competition. Students also prepare performances especially for them, bringing music, dance, and celebration to the day.</p>
        <p>The celebration is our chance to pay tribute to the teachers whose care, dedication, and guidance shape campus life. It is a simple, heartfelt thank-you for all they do.</p>
      </div>
    </section>
    <section className="events-outlook section-pad">
      <div className="section-topline"><span>10 / THE STORY CONTINUES</span><span>MORE EVENTS / MORE MOMENTS</span></div>
      <div className="events-outlook-copy"><h2 className="display">This is just<br/>the <em>beginning.</em></h2><p>These are only a few of the events Team Indigo brings to campus. There are many more moments, ideas, and celebrations behind us—and plenty more still to come. Stay tuned; we can’t wait to share what’s next.</p><span>[ THE NEXT ONE IS ALWAYS IN THE MAKING ✳ ]</span></div>
    </section>
    <Footer/>
  </>;
}
