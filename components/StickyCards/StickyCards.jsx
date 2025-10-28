"use client";
import "./StickyCards.css"

import { useRef, useEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const StickyCards = ({ projects }) => {

    const stickyCardsData = projects || [
        {
          index: "01",
          title: "Fast Performance",
          image: "/sticky-cards/card_1.jpg",
          description: "Experience lightning-fast load times and smooth interactions powered by optimized rendering and caching."
        },
        {
          index: "02",
          title: "Seamless Design",
          image: "/sticky-cards/card_2.jpg",
          description: "A clean and responsive layout ensures consistent visual experience across all screen sizes."
        },
        {
          index: "03",
          title: "Intuitive Interface",
          image: "/sticky-cards/card_3.jpg",
          description: "Built with user experience in mind, the interface offers clear navigation and minimal learning curve."
        },
        {
          index: "04",
          title: "Secure & Reliable",
          image: "/sticky-cards/card_4.jpg",
          description: "Implements robust authentication, validation, and encryption to safeguard user data."
        },
      ];
      
    const container = useRef(null);

    useEffect(() => {
        const stickyCards = document.querySelectorAll(".sticky-card");

        stickyCards.forEach((card, index) => {
            // Pin the card (except the last one)
            if (index < stickyCards.length - 1) {
                ScrollTrigger.create({
                    trigger: card,
                    start: "top top",
                    endTrigger: stickyCards[stickyCards.length - 1],
                    end: "top top",
                    pin: true,
                    pinSpacing: false,
                })
            }

            // Animate the card when the next card comes into view
            if (index < stickyCards.length - 1) {
                ScrollTrigger.create({
                    trigger: stickyCards[index + 1],
                    start: "top bottom",
                    end: "top top",
                    onUpdate: (self) => {
                        const progress = self.progress;
                        const scale = 1 - progress * 0.25;
                        const rotation = (index % 2 === 0 ? 5 : -5) * progress;
                        const afterOpacity = progress;

                        gsap.set(card, {
                            scale: scale,
                            rotation: rotation,
                            "--after-opacity": afterOpacity,
                        })
                    }
                })
            }
        })

        // Cleanup function
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return(
        <div className="sticky-cards" ref={container}>
            {stickyCardsData.map((cardData, index) => {
                return (
                    <div className="sticky-card" key={index}>
                        <div className="sticky-card-index">
                            <h1>{cardData.index}</h1>
                        </div>
                        <div className="sticky-card-content">
                            <div className="sticky-card-content-wrapper">
                                <h1 className="sticky-card-header">{cardData.title}</h1>

                                <div className="sticky-card-img">
                                    <img src={cardData.image} alt="" />
                                </div>

                                <div className="sticky-card-copy">
                                    <div className="sticky-card-copy-title">
                                        <p>About:</p>
                                    </div>
                                    <div className="sticky-card-copy-description">
                                        <p>{cardData.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
};

export default StickyCards;
