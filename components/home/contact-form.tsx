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
      <label className="block text-[calc(2.04*var(--u))] leading-[1.2] max-[900px]:text-[17px]" htmlFor="contact-email">Leave your email our team will<br />reach out with the next step.</label>
      <div className="mt-[calc(1.6*var(--u))] flex h-[calc(3.45*var(--u))] w-[calc(27.6*var(--u))] overflow-hidden rounded-full bg-[#ffffff70] max-[900px]:mt-[15px] max-[900px]:h-[42px] max-[900px]:w-full max-[900px]:max-w-[340px]">
        <input
          className="w-full min-w-0 border-0 bg-transparent px-[calc(1.1*var(--u))] text-[calc(2*var(--u))] text-white outline-offset-[-4px] placeholder:text-[#ffffff90] max-[900px]:px-4 max-[900px]:text-[16px]"
          id="contact-email"
          name="email"
          type="email"
          placeholder="you@email.com"
          required
          autoComplete="email"
        />
        <button className="cursor-pointer border-0 bg-none px-[calc(.7*var(--u))] text-white max-[900px]:px-[13px]" aria-label="Start an email to Two Minds" type="submit">
          <ArrowRight className="h-[calc(1.6*var(--u))] w-[calc(1.6*var(--u))] max-[900px]:size-5" />
        </button>
      </div>
    </form>
  );
}
