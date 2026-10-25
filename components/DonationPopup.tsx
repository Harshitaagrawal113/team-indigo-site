"use client";

import { useEffect, useState } from "react";
import { BrandMark } from "@/components/BrandMark";

export function DonationPopup({ featured = false }: { featured?: boolean }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return <>
    {featured && <section className="donation-feature-wrap"><div className="donation-feature">
      <div className="donation-feature-photo"><img src="/images/pehel-poster.png" alt="Pehel: Ek Nayi Subah 10th anniversary poster"/><span>PEHEL / A NEW DAWN</span></div>
      <div className="donation-feature-copy"><span className="donation-kicker">[ CELEBRATING 10 YEARS OF GRATITUDE ]</span><h2>Help light up<br/><em>Pehel.</em></h2><p>Be part of a day made to celebrate the people who care for our campus. Contribute to Pehel: Ek Nayi Subah.</p><button onClick={() => setOpen(true)}>OPEN CONTRIBUTION QR <b aria-hidden="true">↗</b></button></div>
    </div></section>}
    <button className="donation-tab" onClick={() => setOpen(true)}>
      <span>PEHEL / 10 YEARS</span>
      <strong>Make a contribution <b aria-hidden="true">↗</b></strong>
    </button>
    {open && <div className="donation-backdrop" data-lenis-prevent onClick={() => setOpen(false)}>
      <section className="donation-dialog" role="dialog" aria-modal="true" aria-labelledby="donation-title" onClick={event => event.stopPropagation()}>
        <button className="donation-close" aria-label="Close donation window" onClick={() => setOpen(false)}>×</button>
        <div className="donation-copy">
          <span className="donation-kicker">[ A DECADE OF GRATITUDE ]</span>
          <BrandMark className="donation-mark" />
          <h2 id="donation-title">Light up<br/><em>Pehel.</em></h2>
          <p>Scan the QR code to contribute to Pehel: Ek Nayi Subah.</p>
          <span className="donation-footnote">EVERY CONTRIBUTION HELPS MAKE THE DAY SPECIAL.</span>
        </div>
        <div className="donation-qr-wrap">
          <img className="donation-qr-image" src="/images/pehel-donation-qr.png" alt="Scan this QR code to contribute to Pehel"/>
          <span className="donation-scan">[ SCAN TO CONTRIBUTE ]</span>
        </div>
      </section>
    </div>}
  </>;
}
