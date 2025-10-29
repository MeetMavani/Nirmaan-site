"use client";
import { ReactLenis } from "lenis/react"
import StickyCards from "@/components/StickyCards/StickyCards"
import './page.css'

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
      <ReactLenis root/>
      <section className="intro bg-[#1a1a1a] text-[#edf1e8]">
        <h1 className="portfolio-page-title-intro">Our Projects</h1>
      </section>

      <StickyCards projects={stickyCardsData} />

      <section className="outro bg-[#1a1a1a] text-[#edf1e8]">
        <h1 className="portfolio-page-title-outro">More Projects in Progress</h1>
      </section>
    </div>
  );
};
  
export default Technologies;
  