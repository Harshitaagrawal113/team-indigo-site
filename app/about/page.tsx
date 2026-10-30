"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Footer } from "@/components/SiteShell";
import { coreTeam, mentors, teamLeads, teamMembers } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);
const collagePeople = [...teamMembers, ...mentors];
const collage = Array.from({ length: 16 }, (_, i) => collagePeople[i % collagePeople.length].image);
const aboutTeamLeads = [teamLeads[1], teamLeads[0], ...teamLeads.slice(2)];
const teamDepartments: Record<string, string> = {
  "Harshita Agrawal": "AIML",
  "Bhavya Upadhyay": "CSBS",
  "Ayushman Dubey": "CS",
  "Gaurav Jain": "CS",
  "Shreyash Agrawal": "CSBS",
  "Shiva Sharma": "BSC",
  "Arpit Sharma": "AIML",
  "Sanidhya Tiwari": "CS",
  "Shailendra Yadav": "AIML",
  "Harsh Tripathi": "AIML",
};
const aboutTeam = [...aboutTeamLeads, ...coreTeam, { name: "Shreyash Agrawal", role: "GRAPHICS HEAD", image: "/images/shreyash-new.webp", group: "CORE TEAM" }].map(member => ({
  ...member,
  academic: (() => {
    const batch = member.name === "Shiva Sharma" ? "'27" : member.group === "CORE TEAM" ? "'28" : ["Harshita Agrawal", "Bhavya Upadhyay", "Ayushman Dubey", "Gaurav Jain"].includes(member.name) ? "'28" : "";
    return [teamDepartments[member.name] ? `${teamDepartments[member.name]}${batch}` : batch].filter(Boolean).join("");
  })(),
}));
const mentorDepartments: Record<string, string> = {
  "Ujjwal Singh Thakur": "AIML",
  "Anushka Bondre": "AIML",
  "Suryansh Asati": "CS",
  "Aaditya Chhipa": "CS",
  "Siddharth Nema": "CSBS",
  "Ayush Pandey": "AIML",
};
const btsImages = [
  "/images/bts/WhatsApp%20Image%202026-10-25%20at%2015.43.18.jpeg",
  "/images/bts/WhatsApp%20Image%202026-10-25%20at%2015.45.35.jpeg",
  "/images/bts/WhatsApp%20Image%202026-10-25%20at%2015.45.35%20(1).jpeg",
  "/images/bts/WhatsApp%20Image%202026-10-25%20at%2015.45.35%20(2).jpeg",
  "/images/bts/WhatsApp%20Image%202026-10-25%20at%2015.45.35%20(3).jpeg",
  "/images/bts/WhatsApp%20Image%202026-10-25%20at%2015.45.35%20(4).jpeg",
  "/images/bts/WhatsApp%20Image%202026-10-25%20at%2015.45.35%20(5).jpeg",
  "/images/bts/WhatsApp%20Image%202026-10-25%20at%2015.45.35%20(6).jpeg",
  "/images/bts/tt.webp",
];

export default function About() {
  const collageRef = useRef<HTMLElement>(null);
  const btsPointer = useRef<{ x: number; id: number } | null>(null);
  const btsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [btsIndex, setBtsIndex] = useState(0);
  const [btsDrag, setBtsDrag] = useState(0);
  const [btsExit, setBtsExit] = useState(0);
  const [btsAnimating, setBtsAnimating] = useState(false);
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
  useEffect(() => () => { if (btsTimer.current) clearTimeout(btsTimer.current); }, []);
  const advanceBts = (direction: number) => {
    if (btsAnimating) return;
    setBtsAnimating(true);
    setBtsExit(direction);
    btsTimer.current = setTimeout(() => {
      setBtsIndex(index => (index + direction + btsImages.length) % btsImages.length);
      setBtsDrag(0);
      setBtsExit(0);
      setBtsAnimating(false);
    }, 360);
  };
  const startBtsSwipe = (event: React.PointerEvent<HTMLDivElement>) => {
    if (btsAnimating) return;
    btsPointer.current = { x: event.clientX, id: event.pointerId };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const moveBtsSwipe = (event: React.PointerEvent<HTMLDivElement>) => {
    if (btsPointer.current?.id === event.pointerId && !btsAnimating) setBtsDrag(event.clientX - btsPointer.current.x);
  };
  const endBtsSwipe = (event: React.PointerEvent<HTMLDivElement>) => {
    if (btsPointer.current?.id !== event.pointerId) return;
    const distance = event.clientX - btsPointer.current.x;
    btsPointer.current = null;
    if (Math.abs(distance) > 90) advanceBts(distance < 0 ? 1 : -1);
    else setBtsDrag(0);
  };
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rails = Array.from(document.querySelectorAll<HTMLElement>(".about-team-scroll, .mentor-marquee"));
    const paused = new Set<HTMLElement>();
    const pause = (event: Event) => paused.add(event.currentTarget as HTMLElement);
    const resume = (event: Event) => paused.delete(event.currentTarget as HTMLElement);
    rails.forEach(rail => {
      rail.addEventListener("pointerenter", pause);
      rail.addEventListener("pointerdown", pause);
      rail.addEventListener("pointerleave", resume);
      rail.addEventListener("pointerup", resume);
    });
    let frame = 0;
    const tick = () => {
      rails.forEach(rail => {
        if (paused.has(rail)) return;
        const halfway = rail.scrollWidth / 2;
        if (halfway > rail.clientWidth && rail.scrollLeft >= halfway) rail.scrollLeft -= halfway;
        rail.scrollLeft += .45;
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      rails.forEach(rail => {
        rail.removeEventListener("pointerenter", pause);
        rail.removeEventListener("pointerdown", pause);
        rail.removeEventListener("pointerleave", resume);
        rail.removeEventListener("pointerup", resume);
      });
    };
  }, []);
  return <>
    <section className="photo-hero about-hero"><div className="photo-hero-frame"><img src="/images/beatblaze/fteam.webp" alt="Team Indigo crew"/><div className="photo-shade"/><div className="photo-hero-content"><div className="badges hero-animate"><span>TEAM INDIGO</span><span>GGITS / ONE STUDENT CREW</span></div><div className="photo-hero-grid"><h1 className="display hero-animate">The crew<br/>behind it</h1><p className="photo-hero-aside hero-animate">Team Indigo is the event management club at Gyan Ganga Institute of Technology and Sciences. Through Pehel, we bring the college together to celebrate the auxiliary staff who care for our campus.</p></div></div></div></section>
    <div className="collage-track"><section className="collage" ref={collageRef}><div className="collage-center"><span>NO MAGIC TRICK.</span><h2>Just a lot of<br/><em>amazing people.</em></h2><span>AND A VERY LONG RUN SHEET.</span></div><div className="collage-grid">{collage.map((photo,i)=><div className={`collage-card collage-${i+1}`} key={i}><img src={photo} alt=""/></div>)}</div></section></div>
    <section className="name-marquee"><div className="marquee-line">{Array.from({length:4},(_,i)=><span key={i}>TEAM INDIGO © &nbsp; ✳ &nbsp; </span>)}</div><div className="stamps"><span>[ PLANS IN PROGRESS ]</span><span>[ PASSCODE: SHOW UP ]</span><span>[ PEHEL EVERY DIWALI ]</span><span>[ PEOPLE FIRST ]</span></div></section>
    <section className="team section-pad"><div className="section-topline"><span>02 / PEOPLE POWER</span><span>THE BEHIND-THE-SCENES BIT</span></div><h2 className="display">Meet the crew<br/>making it <em>happen.</em></h2><p className="team-intro">The people who make Team Indigo and Pehel happen.</p><div className="team-scroll about-team-scroll" aria-label="Team leads and core team members" tabIndex={0}>{[...aboutTeam,...aboutTeam].map((member,i)=><article className="team-card" key={`${member.name}-${i}`} aria-hidden={i>=aboutTeam.length}><div className="team-photo"><img src={member.image} alt={i<aboutTeam.length?member.name:""} draggable={false}/><span className="team-pixel" aria-hidden="true">✳</span></div><span className="role-badge">{member.group}</span><h3>{member.name}</h3><p>{member.role}</p>{member.academic&&<p className="team-academic">{member.academic}</p>}</article>)}</div><div className="team-note">[ DRAG TO EXPLORE / TEAM INDIGO · GGITS ]</div></section>
    <section className="mentors section-pad">
      <div className="section-topline"><span>03 / THE MENTORS</span><span>PAST LEADS / ALWAYS IN OUR CORNER</span></div>
      <div className="mentors-heading"><h2 className="display">The people who<br/>help us <em>grow.</em></h2><p>Past year leads, still guiding the crew. Their experience and encouragement help us find our way through every new event.</p></div>
      <div className="mentor-marquee" aria-label="Team Indigo mentors" tabIndex={0}>
        <div className="mentor-marquee-track">{[...mentors,...mentors].map((mentor,i)=><article className="mentor-card" key={`${mentor.name}-${i}`} aria-hidden={i>=mentors.length}><div className="mentor-photo"><img src={mentor.image} alt={i<mentors.length?mentor.name:""}/><span>FORMER LEAD / MENTOR</span></div><h3>{mentor.name}</h3><p className="team-academic">{mentorDepartments[mentor.name]} '27</p></article>)}</div>
      </div>
      <div className="mentor-note">[ THE NEXT GENERATION, WITH A LITTLE GUIDANCE ]</div>
    </section>
    <section className="bts-moments section-pad">
      <div className="section-topline"><span>04 / OFF THE RUN SHEET</span><span>WHERE THE REAL STORIES HAPPEN</span></div>
      <div className="bts-heading"><h2 className="display">The moments<br/><em>between.</em></h2><p>The best memories aren’t always on stage. They’re in the brainstorms, the setup, the little wins, the last-minute teamwork, and the laughter that keeps everyone going. Here’s a glimpse of Team Indigo behind the scenes—making every moment happen, together.</p></div>
      <div className="bts-deck-wrap">
        <div className="bts-deck" aria-label="Team Indigo behind-the-scenes photo deck">
          {[2,1,0].map(offset=>{
            const index=(btsIndex+offset)%btsImages.length;
            const isTop=offset===0;
            return <div className={`bts-card${isTop?" is-top":""}${isTop&&btsExit?" is-leaving":""}`} key={`${btsIndex}-${offset}`} style={{zIndex:3-offset,transform:isTop?`translate3d(${btsExit?`calc(${btsExit*100}vw)`: `${btsDrag}px`},0,0) rotate(${btsExit?btsExit*15:btsDrag*.025}deg)`: `translate3d(0,${offset*13}px,0) scale(${1-offset*.035}) rotate(${offset%2?1.2:-1.2}deg)`}} onPointerDown={isTop?startBtsSwipe:undefined} onPointerMove={isTop?moveBtsSwipe:undefined} onPointerUp={isTop?endBtsSwipe:undefined} onPointerCancel={isTop?endBtsSwipe:undefined} role={isTop?"group":undefined} aria-label={isTop?`Photo ${btsIndex+1} of ${btsImages.length}`:undefined}>
              <img src={btsImages[index]} alt={`Team Indigo behind-the-scenes moment ${index+1}`} draggable={false}/>
            </div>;
          })}
        </div>
        <div className="bts-deck-controls"><button type="button" onClick={()=>advanceBts(-1)} aria-label="Previous BTS photo">←</button><span aria-live="polite">{String(btsIndex+1).padStart(2,"0")} / {String(btsImages.length).padStart(2,"0")}</span><button type="button" onClick={()=>advanceBts(1)} aria-label="Next BTS photo">→</button></div>
      </div>
    </section>
    <Footer/>
  </>;
}
