"use client";
import { ReactLenis } from "lenis/react"
import StickyCards from "@/components/StickyCards/StickyCards"
import './page.css'

  const Technologies = () => {
    return (
      <>
        <ReactLenis root/>
        <section className="intro">
          <h1>The Projects</h1>
        </section>

        <StickyCards />

        <section className="outro">
          <h1>More Projects in Progress</h1>
        </section>
      </>
    );
  };
  
  export default Technologies;
  