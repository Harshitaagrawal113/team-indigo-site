"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { BrandMark } from "./BrandMark";
import { club, images } from "@/lib/content";

const routes = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update(); media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return reduced;
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const reduced = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem("es-visited") || reduced) { setLoading(false); return; }
    const tween = gsap.to({ value: 0 }, { value: 100, duration: 1.55, ease: "power2.inOut", onUpdate() { setProgress(Math.round(this.targets()[0].value)); }, onComplete() {
      sessionStorage.setItem("es-visited", "1");
      gsap.to(".loader", { yPercent: -100, duration: .85, ease: "power3.inOut", onComplete: () => setLoading(false) });
    }});
    return () => { tween.kill(); };
  }, [reduced]);

  useEffect(() => { setMenuOpen(false); window.scrollTo(0, 0); }, [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = menuOpen || loading ? "hidden" : "";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [menuOpen, loading]);

  useEffect(() => {
    if (!navRef.current || reduced) return;
    gsap.to(navRef.current, { width: menuOpen ? (window.innerWidth < 620 ? "calc(100vw - 28px)" : 650) : (window.innerWidth < 620 ? 270 : 350), height: menuOpen ? (window.innerWidth < 620 ? 480 : 370) : 54, duration: .55, ease: "power3.inOut" });
    gsap.to(overlayRef.current, { opacity: menuOpen ? .58 : 0, duration: .35, pointerEvents: menuOpen ? "auto" : "none" });
  }, [menuOpen, reduced]);

  const navigate = useCallback((href: string) => {
    if (href === pathname) { setMenuOpen(false); return; }
    if (transitioning) return;
    setMenuOpen(false);
    if (reduced) { router.push(href); return; }
    setTransitioning(true);
    const tiles = coverRef.current?.querySelectorAll("span");
    if (!tiles) { router.push(href); setTransitioning(false); return; }
    const order = gsap.utils.shuffle(Array.from(tiles));
    gsap.set(coverRef.current, { visibility: "visible" });
    gsap.fromTo(order, { scale: 0 }, { scale: 1, duration: .26, ease: "steps(1)", stagger: { each: .014, from: "random" }, onComplete: () => {
      router.push(href);
      window.setTimeout(() => {
        gsap.to(order, { scale: 0, duration: .23, ease: "steps(1)", stagger: { each: .012, from: "random" }, onComplete: () => { gsap.set(coverRef.current, { visibility: "hidden" }); setTransitioning(false); } });
      }, 180);
    }});
  }, [pathname, reduced, router, transitioning]);

  return <>
    {loading && <div className="loader" aria-label="Loading site"><div className="loader-inner"><BrandMark className="loader-mark"/><div className="loader-word">TEAM<br/>INDIGO<span>©</span></div><div className="loader-row"><span>[ ACCESS OPEN TO EVERYONE ]</span><span>{String(progress).padStart(3, "0")}%</span></div><div className="loader-bar"><i style={{ width: `${progress}%` }} /></div><p>MAKING MOMENTS MATTER</p></div></div>}
    <div className="crt" aria-hidden="true" />
    <div ref={overlayRef} className="menu-scrim" onClick={() => setMenuOpen(false)} />
    <header ref={navRef} className={`site-nav ${menuOpen ? "is-open" : ""}`}>
      <div className="nav-top"><button className="brand-button" onClick={() => navigate("/")} aria-label="Go to home"><BrandMark className="nav-mark"/><span>{club.name}</span></button><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}><span/><span/></button></div>
      <div className="nav-body" aria-hidden={!menuOpen}>
        <div className="nav-links">{routes.map((route, i) => <button key={route.href} className={pathname === route.href ? "active" : ""} onClick={() => navigate(route.href)} tabIndex={menuOpen ? 0 : -1}><span className="nav-index">0{i+1}</span>{route.label}<span className="nav-arrow">↗</span></button>)}</div>
        <div className="nav-art"><BrandMark/><p>THE PEOPLE BEHIND<br/>PEHEL & MORE</p><span>[ EVERYONE'S INVITED ]</span></div>
        <div className="nav-bottom"><span>GGITS / STUDENT MADE</span><span>SCROLL TO EXPLORE ↙</span></div>
      </div>
    </header>
    <main id="main">{children}</main>
    <div ref={coverRef} className="pixel-cover" aria-hidden="true">{Array.from({ length: 96 }, (_, i) => <span key={i}/>)}</div>
  </>;
}

export function PageLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return <Link href={href} className={className}>{children}</Link>;
}

export function Cta({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} className="cta"><span>{children}</span><b aria-hidden="true">↗</b></Link>;
}

export function Footer() {
  return <footer className="footer"><div className="footer-top"><div className="footer-window"><div className="window-bar"><span/> INDIGO FILE_001 <b>✕</b></div><div className="footer-window-body"><p>GOOD THINGS TAKE A CREW.</p><Link href="/contact">JOIN THE CONVERSATION ↗</Link></div></div><div className="footer-note">TEAM INDIGO<br/>GGITS</div></div><div className="ticker"><div className="ticker-track">{Array.from({length:4},(_,i)=><span key={i}>PEHEL BEGINS WITH PEOPLE <b>✦</b> EVERY CAMPUS MOMENT IS MADE TOGETHER <b>✦</b></span>)}</div></div><div className="footer-bottom"><div className="footer-logo">T<span>I</span><sup>©</sup></div><div className="footer-links"><Link href="/">HOME</Link><Link href="/events">EVENTS</Link><Link href="/about">ABOUT</Link><Link href="/contact">CONTACT</Link></div><div className="footer-credit">© 2026 TEAM INDIGO / GGITS<br/>CONCEPT SITE · IMAGES ARE ILLUSTRATIVE</div></div><div className="footer-photo" style={{backgroundImage:`url(${images.pehel})`}}/></footer>;
}
