"use client";

import { ArrowRight } from "lucide-react";
import { contact } from "@/lib/site";

export function ContactForm() {
  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      const email = new FormData(event.currentTarget).get("email");
      // mailto: link, not an internal route.
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.href = `${contact}?subject=Let%27s%20talk&body=${encodeURIComponent(`Please reach out to me at ${email}.`)}`;
    }}>
      <label htmlFor="contact-email">Leave your email our team will<br />reach out with the next step.</label>
      <div className="email-field"><input id="contact-email" name="email" type="email" placeholder="you@email.com" required autoComplete="email" /><button aria-label="Start an email to Two Minds" type="submit"><ArrowRight /></button></div>
    </form>
  );
}
