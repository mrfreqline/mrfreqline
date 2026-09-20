import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Reviews & Community Feedback | MrFreqline",
  description: "Read real user reviews, ratings, and testimonials about MrFreqline's free calculators, developer utilities, and web resources.",
  keywords: ["mrfreqline reviews", "user testimonials", "tool ratings", "community feedback"],
  alternates: {
    canonical: "https://mrfreqline.vercel.app/reviews",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
