"use client";

import { club, images } from "@/lib/content";
import { Footer } from "@/components/SiteShell";
import Link from "next/link";

const notes = ["PEHEL BEGINS WITH PEOPLE", "EVERY CONTRIBUTION COUNTS", "A CAMPUS COMES TOGETHER", "EVERY DIWALI", "THANK YOU TO OUR AUXILIARY STAFF", "TEAM INDIGO / GGITS"];
const contactMarqueeImages = [
  { src: images.pehel, alt: "Pehel celebration" },
  { src: images.crew, alt: "Team Indigo leads" },
  { src: images.team, alt: "Team Indigo" },
  { src: "/images/footer1.webp", alt: "Team Indigo event" },
  { src: "/images/footer2.jpeg", alt: "Team Indigo event" },
  { src: "/images/footer3.jpeg", alt: "Team Indigo event" },
  { src: "/images/footer4.jpeg", alt: "Team Indigo event" },
];

export default function Contact() {
  return <>
    <section className="contact-page">
      <div className="contact-main">
        <Link className="contact-brand-lockup" href="/" aria-label="Team Indigo home"><img src="/images/logo.png" alt=""/><span>TEAM INDIGO / GGITS</span></Link>
        <div className="contact-center">
          <p className="micro">[ YOUR IDEA IS INVITED ]</p>
          <h1 className="display">Let’s make<br/>something <em>happen.</em></h1>
          <p>Have an event idea, want to perform, or hoping to join Pehel? Find the crew on our socials and say hello.</p>
          <a className="contact-copy" href={club.socials[0].href} target="_blank" rel="noreferrer">MESSAGE US ON INSTAGRAM <b>↗</b></a>
        </div>
        <p className="contact-fineprint">STUDENT-RUN, PEOPLE-FIRST<br/>GYAN GANGA INSTITUTE / JABALPUR</p>
      </div>
      <section className="contact-socials" aria-labelledby="contact-social-heading">
        <div className="contact-social-intro"><span>[ FIND YOUR WAY IN ]</span><h2 id="contact-social-heading">Follow the<br/><em>good stuff.</em></h2><p>Event updates, behind-the-scenes moments, and ways to get involved with Team Indigo.</p></div>
        <div className="contact-social-links">{club.socials.map((social, index) => <a className="contact-social-card" key={social.label} href={social.href} target="_blank" rel="noreferrer"><span className="contact-social-icon">{index === 0 ? "ig" : "in"}</span><span><small>FOLLOW TEAM INDIGO ON</small><strong>{social.label}</strong></span><b aria-hidden="true">↗</b></a>)}
          <a className="contact-social-card contact-social-card-plain" href="/events"><span className="contact-social-icon">✳</span><span><small>EXPLORE THE FLAGSHIP EVENT</small><strong>Pehel / Ek Nayi Subah</strong></span><b aria-hidden="true">↗</b></a>
        </div>
      </section>
      <div className="contact-ticker"><div className="ticker-track">{Array.from({length:3},(_,i)=><span key={i}>{notes.map((note,j)=><span key={j}>{note} <b>✦</b> </span>)}</span>)}</div></div>
      <div className="contact-photo-strip"><div className="contact-photo-track">{[...contactMarqueeImages,...contactMarqueeImages].map((photo,i)=><img key={`${photo.src}-${i}`} src={photo.src} alt={i<contactMarqueeImages.length?photo.alt:""}/>)}</div></div>
      <div className="contact-bottom"><span>TEAM INDIGO © 2026</span><span>GYAN GANGA INSTITUTE OF TECHNOLOGY AND SCIENCES</span></div>
      <div className="creator-credit"><span>WEBSITE / DESIGN & DEVELOPMENT</span><strong>Harshita Agrawal</strong><a href="https://harshitaagrawal113.github.io/portfolio/#" target="_blank" rel="noreferrer">PORTFOLIO <b aria-hidden="true">↗</b></a></div>
    </section>
    <Footer/>
  </>;
}
