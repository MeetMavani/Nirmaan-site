"use client";

import { ReactLenis } from "lenis/react";
import Link from "next/link";

import StickyCards from "@/components/StickyCards/StickyCards";
import { Button } from "@/components/ui/button";
import { Barlow_Condensed } from "next/font/google";

import "./page.css";

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const projects = [
  {
    name: 'Shreya Motors App',
    tagline: 'Electric vehicle management platform',
    problem: 'Application required to manage electric vehicles and their rental assignments',
    solution: 'Built a comprehensive application with real time location updates, batteries and charging management',
    result: '80% improvement in logistics, 50% improved charging and battery management, new implementation of database',
    tech: ['Bubble.io'],
    image: "/sticky-cards/card_1.jpg"
  },
  {
    name: 'Ajinkya Social Foundation',
    tagline: 'Non-Profit Organization website',
    problem: 'Required website to improve reach and simplify donation process',
    solution: 'Developed a dynamic website having integrated payment gateway along with CMS and CRUD functionalities',
    result: 'Information about the NGO became accessible, improved donation frequency by 70%, simplified donation process significantly',
    tech: ['Next.js', 'Python', 'TensorFlow', 'PostgreSQL', 'Redis'],
    image: "/sticky-cards/card_2.jpg"
  },
  {
    name: 'Zenova',
    tagline: 'GSAP Showcase',
    problem: 'Needed a showcase for GSAP and Framer Motion abilities of the team',
    solution: 'Created a scroll controlled website with smooth animations and responsive UI',
    result: 'Displayed animation skills of the team',
    image: "/sticky-cards/card_3.jpg"
  },
  {
    name: 'WeConnect Overseas',
    tagline: 'Educational support platform',
    problem: 'WeConnect Oversease needed a complete overhaul of their homepage',
    solution: 'Built a modern, elegant and catchy homepage with smooth minimalist animations and pleasing UI',
    result: 'Improvement in establishing trust in students',
    image: "/sticky-cards/card_4.jpg"
  }
];

const Technologies = () => {
  // Transform projects data for StickyCards
  const stickyCardsData = projects.map((project, index) => ({
    index: String(index + 1).padStart(2, '0'),
    title: project.name,
    image: project.image,
    description: `${project.problem} ${project.solution} ${project.result}`
  }));

  return (
    <div className="portfolio-page">
      <ReactLenis root />
      <section className="intro">
        <div className="portfolio-page-section">
          <span className="portfolio-page-eyebrow">Case studies</span>
          <h1
            className={`${barlow.className} portfolio-page-title-intro gradient-text`}
          >
            Our Projects
          </h1>
          <p className="portfolio-page-subhead">
            A snapshot of the products and platforms we craft for founders and
            teams who expect thoughtful design, strong engineering, and lasting
            partnerships.
          </p>
        </div>
      </section>

      <StickyCards projects={stickyCardsData} />

      <section className="outro">
        <div className="portfolio-page-section">
          <h2 className="portfolio-page-eyebrow">Let’s build together</h2>
          <h1
            className={`${barlow.className} portfolio-page-title-outro gradient-text`}
          >
            More Projects in Progress
          </h1>
          <p className="portfolio-page-subhead">
            We&apos;re constantly shipping new products—from growth experiments
            to production-grade systems. Share your idea and we&apos;ll help map
            the path to launch.
          </p>
          <div className="portfolio-page-actions">
            <Link href="/contact">
              <Button size="lg" className="portfolio-page-cta">
                Start a project
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
  
export default Technologies;
  