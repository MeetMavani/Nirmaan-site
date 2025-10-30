'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitText from 'gsap/SplitText';
import { Barlow_Condensed } from 'next/font/google';
import './page.css';


gsap.registerPlugin(SplitText);

type SplitTextInstance = {
    chars?: HTMLElement[];
    revert?: () => void;
};

const barlow = Barlow_Condensed({
    subsets: ['latin'],
    weight: [
        '100', '200', '300', '400', '500', '600', '700', '800', '900'
    ],
});


const Profiles = () => {
    const sectionRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const root = sectionRef.current;
        if (!root) return;

        // Scope DOM queries to the current section only
        const profileImagesContainer = root.querySelector(".profile-images");
        const profileImages = root.querySelectorAll(".profile-images .img");
        const nameElements = root.querySelectorAll(".profile-names .name");
        const nameHeadings = root.querySelectorAll(".profile-names .name h1");

        // SplitText setup and tracking for cleanup
        const splits: SplitTextInstance[] = [];
        nameHeadings.forEach((heading) => {
            const split = new SplitText(heading, { type: "chars" });
            const splitInstance = split as unknown as SplitTextInstance;
            splitInstance.chars?.forEach((char: HTMLElement) => {
                char.classList.add("letter");
            });
            splits.push(splitInstance);
        });

        const defaultLetters = nameElements[0]?.querySelectorAll(".letter");
        if (defaultLetters && defaultLetters.length > 0) {
            gsap.set(defaultLetters, { y: "100%" });
        }

        const canHover = window.matchMedia('(hover: hover)').matches;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const listeners: Array<{ el: Element; type: string; handler: EventListener }> = [];

        if (prefersReducedMotion) {
            if (defaultLetters && defaultLetters.length > 0) {
                gsap.set(defaultLetters, { y: "0%" });
            }
        } else if (canHover) {
            profileImages.forEach((img, index) => {
                const correspondingName = nameElements[index + 1];
                const letters = correspondingName?.querySelectorAll(".letter");
                if (!letters || letters.length === 0) return;

                const onEnter = () => {
                    gsap.to(img, {
                        width: 140,
                        height: 140,
                        duration: 0.5,
                        ease: "power4.out"
                    });

                    gsap.to(letters, {
                        y: "-100%",
                        ease: "power4.out",
                        duration: 0.75,
                        stagger: {
                            each: 0.025,
                            from: "center",
                        },
                    });
                };

                const onLeave = () => {
                    gsap.to(img, {
                        width: 70,
                        height: 70,
                        duration: 0.5,
                        ease: "power4.out"
                    });

                    gsap.to(letters, {
                        y: "0%",
                        ease: "power4.out",
                        duration: 0.75,
                        stagger: {
                            each: 0.025,
                            from: "center",
                        },
                    });
                };

                img.addEventListener("mouseenter", onEnter);
                img.addEventListener("mouseleave", onLeave);
                listeners.push({ el: img, type: "mouseenter", handler: onEnter });
                listeners.push({ el: img, type: "mouseleave", handler: onLeave });
            });

            if (profileImagesContainer && defaultLetters && defaultLetters.length > 0) {
                const onContainerEnter = () => {
                    gsap.to(defaultLetters, {
                        y: "0%",
                        ease: "power4.out",
                        duration: 0.75,
                        stagger: {
                            each: 0.025,
                            from: "center",
                        },
                    });
                };

                const onContainerLeave = () => {
                    gsap.to(defaultLetters, {
                        y: "100%",
                        ease: "power4.out",
                        duration: 0.75,
                        stagger: {
                            each: 0.025,
                            from: "center",
                        },
                    });
                };

                profileImagesContainer.addEventListener("mouseenter", onContainerEnter);
                profileImagesContainer.addEventListener("mouseleave", onContainerLeave);
                listeners.push({ el: profileImagesContainer, type: "mouseenter", handler: onContainerEnter });
                listeners.push({ el: profileImagesContainer, type: "mouseleave", handler: onContainerLeave });
            }
        } else {
            // No hover capability (touch devices): keep default text visible
            if (defaultLetters && defaultLetters.length > 0) {
                gsap.set(defaultLetters, { y: "0%" });
            }
        }

        return () => {
            // Remove all registered listeners
            listeners.forEach(({ el, type, handler }) => {
                el.removeEventListener(type, handler);
            });

            // Revert SplitText to restore original DOM
            splits.forEach((split) => split.revert && split.revert());
        };
    }, []);

  return (
        <section ref={sectionRef} className={`team ${barlow.className}`}>
            <div className="profile-images">
            <div className="img"><img src="/profiles/img1.png" alt="Kashyap"/></div>
            <div className="img"><img src="/profiles/img2.png" alt="Disha"/></div>
            <div className="img"><img src="/profiles/img3.png" alt="Shubhankar"/></div>
            <div className="img"><img src="/profiles/img4.png" alt="Meet"/></div>
            </div>

            <div className="profile-names">
                <div className="name default"><h1>The Squad</h1></div>
                <div className="name"><h1>Kashyap</h1></div>
                <div className="name"><h1>Disha</h1></div>
                <div className="name"><h1>Shubhankar</h1></div>
                <div className="name"><h1>Meet</h1></div>
            </div>
        </section>
  );
}

export default Profiles;