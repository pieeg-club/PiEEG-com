"use client";

/** Octopus Headband register-interest form: replaces the purchase box on /store/octopus-headband. */

import UpcomingSubscribe from "@/components/upcoming-store/UpcomingSubscribe";

export default function OctopusHeadbandSubscribe() {
  return (
    <UpcomingSubscribe
      product="Octopus Headband"
      title="Interested? Sign up for Octopus Headband"
      intro="Leave your email if you're interested. We'll send you the first details, the price and the order date when Octopus Headband is ready."
      button="I'm interested — notify me"
      footnote="One email when it's ready — no spam. Octopus Headband is in development; specifications may change."
    />
  );
}
